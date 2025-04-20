import React, { useEffect, useState } from 'react';
import { Alert as AlertType, AlertLevel } from '../types';
import AlertsList from '../components/alerts/AlertsList';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Search, RefreshCw, Filter } from 'lucide-react';
import { generateMockAlerts } from '../utils/mockData';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<AlertLevel | 'ALL'>('ALL');

  // Fetch initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAlerts(generateMockAlerts(15));
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter alerts based on search term and level
  const filteredAlerts = alerts.filter(alert => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      alert.message.toLowerCase().includes(searchLower) ||
      alert.sourceIP.toLowerCase().includes(searchLower) ||
      (alert.destinationIP && alert.destinationIP.toLowerCase().includes(searchLower));
    
    const matchesLevel = filterLevel === 'ALL' || alert.level === filterLevel;
    
    return matchesSearch && matchesLevel;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAlerts(generateMockAlerts(15));
      setIsLoading(false);
    }, 800);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search alerts..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 text-gray-700 dark:text-gray-300 hidden sm:inline">Level:</span>
              <select
                className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value as AlertLevel | 'ALL')}
              >
                <option value="ALL">All Levels</option>
                <option value={AlertLevel.LOW}>Low</option>
                <option value={AlertLevel.MEDIUM}>Medium</option>
                <option value={AlertLevel.HIGH}>High</option>
                <option value={AlertLevel.CRITICAL}>Critical</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              leftIcon={<Filter className="h-4 w-4" />}
            >
              More Filters
            </Button>
            <Button 
              variant="secondary" 
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAlerts.length > 0 ? (
          <AlertsList alerts={filteredAlerts} onResolve={handleResolveAlert} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No alerts match your search.
          </div>
        )}
      </Card>
    </div>
  );
};

export default Alerts;