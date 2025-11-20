'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface SchemaData {
  overall: {
    success: boolean;
    message: string;
  };
  tables: {
    existing: string[];
    missing: string[];
  };
  rls: {
    enabled: string[];
    disabled: string[];
  };
}

interface TableDetail {
  table_name: string;
  columns: string;
  column_count: number;
}

const SchemaCheck = () => {
  const [schemaStatus, setSchemaStatus] = useState<{
    loading: boolean;
    data?: SchemaData;
    error?: string;
  }>({ loading: false });

  const [tableDetails, setTableDetails] = useState<{
    loading: boolean;
    data?: TableDetail[] | null;
    error?: string;
  }>({ loading: false });

  const checkSchema = async () => {
    try {
      setSchemaStatus({ loading: true });

      const response = await fetch('/api/schema-check/tables');
      const result = await response.json();

      setSchemaStatus({
        loading: false,
        data: result.success ? result.data : null,
        error: result.error
      });
    } catch (error) {
      setSchemaStatus({
        loading: false,
        data: undefined,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const getTableDetails = async () => {
    try {
      setTableDetails({ loading: true });

      const response = await fetch('/api/schema-check/tables/details');
      const result = await response.json();

      setTableDetails({
        loading: false,
        data: result.success ? result.data : null,
        error: result.error
      });
    } catch (error) {
      setTableDetails({
        loading: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Database Schema Verification</CardTitle>
          <CardDescription>
            Check if all required tables and RLS policies are properly set up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={checkSchema}
                disabled={schemaStatus.loading}
              >
                {schemaStatus.loading ? 'Checking...' : 'Check Schema'}
              </Button>
              <Button
                onClick={getTableDetails}
                disabled={tableDetails.loading}
                variant="outline"
              >
                {tableDetails.loading ? 'Loading Details...' : 'Get Table Details'}
              </Button>
            </div>

            {schemaStatus.loading && (
              <div className="p-4 bg-adsilo-muted rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}

            {schemaStatus.data && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${schemaStatus.data.overall.success
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                  <p className="font-medium">
                    {schemaStatus.data.overall.success ? '✅ Success' : '❌ Issues Found'}
                  </p>
                  <p>{schemaStatus.data.overall.message}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Existing Tables</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {schemaStatus.data.tables.existing.map((table: string, index: number) => (
                          <div key={index} className="text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded">
                            {table}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Missing Tables</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {schemaStatus.data.tables.missing.length > 0 ? (
                        <div className="space-y-2">
                          {schemaStatus.data.tables.missing.map((table: string, index: number) => (
                            <div key={index} className="text-sm bg-red-50 text-red-800 px-2 py-1 rounded">
                              {table}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-green-600">✅ All tables present</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">RLS Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Enabled:</span> {schemaStatus.data.rls.enabled.length}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Disabled:</span> {schemaStatus.data.rls.disabled.length}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {schemaStatus.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <p className="font-medium">❌ Schema Check Error</p>
                <p className="text-sm">{schemaStatus.error}</p>
              </div>
            )}

            {tableDetails.loading && (
              <div className="p-4 bg-adsilo-muted rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}

            {tableDetails.data && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Table Details</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Table Name</TableHead>
                        <TableHead>Columns</TableHead>
                        <TableHead className="text-right">Column Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableDetails.data.map((table: TableDetail, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{table.table_name}</TableCell>
                          <TableCell>
                            <div className="text-sm text-adsilo-text-secondary max-w-md truncate">
                              {table.columns}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{table.column_count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {tableDetails.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <p className="font-medium">❌ Table Details Error</p>
                <p className="text-sm">{tableDetails.error}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemaCheck;