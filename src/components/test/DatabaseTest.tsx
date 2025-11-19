'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DatabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<{ 
    loading: boolean; 
    success?: boolean; 
    message?: string;
    error?: string;
  }>({ loading: false });

  const [dbInfo, setDbInfo] = useState<{ 
    loading: boolean; 
    data?: { version: string; tables: string[] } | null;
    error?: string;
  }>({ loading: false });

  const testConnection = async () => {
    try {
      setConnectionStatus({ loading: true });
      
      const response = await fetch('/api/test-db/connection');
      const result = await response.json();
      
      setConnectionStatus({ 
        loading: false, 
        success: result.success, 
        message: result.message,
        error: result.error
      });
    } catch (error) {
      setConnectionStatus({ 
        loading: false, 
        success: false, 
        message: 'Failed to test connection',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const getDatabaseInfo = async () => {
    try {
      setDbInfo({ loading: true });
      
      const response = await fetch('/api/test-db/info');
      const result = await response.json();
      
      setDbInfo({ 
        loading: false, 
        data: result.success ? result.data : null,
        error: result.error
      });
    } catch (error) {
      setDbInfo({ 
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
          <CardTitle>Database Connection Test</CardTitle>
          <CardDescription>
            Test the secure connection to your Neon PostgreSQL database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={testConnection} 
                disabled={connectionStatus.loading}
              >
                {connectionStatus.loading ? 'Testing...' : 'Test Connection'}
              </Button>
              <Button 
                onClick={getDatabaseInfo} 
                disabled={dbInfo.loading}
                variant="outline"
              >
                {dbInfo.loading ? 'Loading Info...' : 'Get Database Info'}
              </Button>
            </div>

            {connectionStatus.loading && (
              <div className="p-4 bg-adsilo-muted rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}

            {connectionStatus.message && (
              <div className={`p-4 rounded-lg ${
                connectionStatus.success 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <p className="font-medium">
                  {connectionStatus.success ? '✅ Success' : '❌ Failed'}
                </p>
                <p>{connectionStatus.message}</p>
                {connectionStatus.error && (
                  <p className="mt-2 text-sm">Error: {connectionStatus.error}</p>
                )}
              </div>
            )}

            {dbInfo.loading && (
              <div className="p-4 bg-adsilo-muted rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}

            {dbInfo.data && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Database Information</h3>
                <p className="text-sm">
                  <span className="font-medium">Version:</span> {dbInfo.data.version}
                </p>
                <div className="mt-3">
                  <p className="font-medium text-sm">Tables ({dbInfo.data.tables.length}):</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dbInfo.data.tables.map((table, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {table}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {dbInfo.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <p className="font-medium">❌ Database Info Error</p>
                <p className="text-sm">{dbInfo.error}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseTest;