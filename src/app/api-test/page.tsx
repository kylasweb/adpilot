'use client'

import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApiTestPage = () => {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runAllTests = async () => {
    setLoading(true);
    const results: any = {};

    try {
      // Test campaigns API
      const campaignsRes = await fetch('/api/campaigns');
      results.campaigns = {
        status: campaignsRes.status,
        ok: campaignsRes.ok,
        endpoint: '/api/campaigns'
      };

      // Test cohorts API
      const cohortsRes = await fetch('/api/cohorts');
      results.cohorts = {
        status: cohortsRes.status,
        ok: cohortsRes.ok,
        endpoint: '/api/cohorts'
      };

      // Test dashboard API
      const dashboardRes = await fetch('/api/dashboard/stats');
      results.dashboard = {
        status: dashboardRes.status,
        ok: dashboardRes.ok,
        endpoint: '/api/dashboard/stats'
      };

      // Test analytics API
      const analyticsRes = await fetch('/api/analytics/performance');
      results.analytics = {
        status: analyticsRes.status,
        ok: analyticsRes.ok,
        endpoint: '/api/analytics/performance'
      };

      // Test creative API
      const creativeRes = await fetch('/api/creative');
      results.creative = {
        status: creativeRes.status,
        ok: creativeRes.ok,
        endpoint: '/api/creative'
      };

      // Test settings API
      const settingsRes = await fetch('/api/settings');
      results.settings = {
        status: settingsRes.status,
        ok: settingsRes.ok,
        endpoint: '/api/settings'
      };
    } catch (error) {
      console.error('API test error:', error);
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">API Endpoint Test</h1>
          <p className="text-adsilo-text-secondary mt-1">
            Test all implemented API endpoints
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runAllTests} 
              disabled={loading}
              className="mb-6"
            >
              {loading ? 'Running Tests...' : 'Run All Tests'}
            </Button>

            {Object.keys(testResults).length > 0 && (
              <div className="space-y-4">
                {Object.entries(testResults).map(([key, result]: [string, any]) => (
                  <div 
                    key={key} 
                    className={`p-4 rounded-lg border ${
                      result.ok 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{result.endpoint}</h3>
                        <p className="text-sm text-adsilo-text-secondary">
                          Status: {result.status}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        result.ok 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {result.ok ? 'SUCCESS' : 'FAILED'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ApiTestPage;