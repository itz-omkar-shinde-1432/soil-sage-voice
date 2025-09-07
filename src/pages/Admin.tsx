import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Activity, TrendingUp, AlertCircle } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalUsers: 1247,
    activeToday: 89,
    analysesCompleted: 3421,
    accuracy: 94.2,
    alerts: 12
  });

  const [recentAnalyses] = useState([
    { id: 1, farmer: 'Ramesh Kumar', crop: 'Tomato', disease: 'Leaf Blight', confidence: 92, timestamp: '2 hours ago' },
    { id: 2, farmer: 'Priya Sharma', crop: 'Rice', disease: 'Brown Spot', confidence: 88, timestamp: '4 hours ago' },
    { id: 3, farmer: 'Vikash Patel', crop: 'Cotton', disease: 'Bollworm', confidence: 95, timestamp: '6 hours ago' },
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Total Users</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Active Today</span>
              </div>
              <p className="text-2xl font-bold">{stats.activeToday}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Analyses</span>
              </div>
              <p className="text-2xl font-bold">{stats.analysesCompleted.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Accuracy</span>
              </div>
              <p className="text-2xl font-bold">{stats.accuracy}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">Alerts</span>
              </div>
              <p className="text-2xl font-bold">{stats.alerts}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Analyses */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Analyses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAnalyses.map((analysis) => (
                      <div key={analysis.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{analysis.farmer}</p>
                          <p className="text-sm text-muted-foreground">
                            {analysis.crop} - {analysis.disease} ({analysis.confidence}%)
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{analysis.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>ML Model Status</span>
                      <span className="text-success font-medium">Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>API Response Time</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database Status</span>
                      <span className="text-success font-medium">Healthy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cache Hit Rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ML Model Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Model training and deployment interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">System configuration interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;