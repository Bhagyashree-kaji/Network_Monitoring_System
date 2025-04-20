import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { Activity, Cpu, AlertCircle } from 'lucide-react';
import AreaChart from '../components/charts/AreaChart';
import DonutChart from '../components/charts/DonutChart';
import { 
  generateMockNetworkStats, 
  generateTimeSeriesData,
  generateMockAlerts,
  formatBytes 
} from '../utils/mockData';
import { NetworkStats, Alert as AlertType } from '../types';
import AlertsList from '../components/alerts/AlertsList';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [trafficData, setTrafficData] = useState(generateTimeSeriesData(1, 60000));
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  // Simulated data fetching
  useEffect(() => {
    setStats(generateMockNetworkStats());
    setAlerts(generateMockAlerts(3).slice(0, 3));
    
    // Update traffic data every 10 seconds
    const interval = setInterval(() => {
      setTrafficData(generateTimeSeriesData(1, 60000));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleResolveAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  if (!stats) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Card className="flex-1">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Connections
              </h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.activeConnections}
              </p>
            </div>
          </div>
        </Card>

        <Card className="flex-1">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Cpu className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Devices
              </h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.totalDevices}
              </p>
            </div>
          </div>
        </Card>

        <Card className="flex-1">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Alerts
              </h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {alerts.filter(a => !a.resolved).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Network Traffic">
          <div className="h-64">
            <AreaChart data={trafficData} height={220} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total In</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {formatBytes(stats.bytesIn)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stats.packetsIn.toLocaleString()} packets
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Out</div>
              <div className="text-xl font-semibold text-green-600 dark:text-green-400">
                {formatBytes(stats.bytesOut)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stats.packetsOut.toLocaleString()} packets
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Protocol Distribution">
            <DonutChart data={stats.topProtocols} />
          </Card>
          
          <Card title="Service Distribution">
            <DonutChart data={stats.topServices} />
          </Card>
        </div>
      </div>

      <Card title="Recent Alerts">
        <AlertsList alerts={alerts} onResolve={handleResolveAlert} />
      </Card>
    </div>
  );
};

export default Dashboard;