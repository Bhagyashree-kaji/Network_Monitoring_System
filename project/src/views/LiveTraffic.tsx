import React, { useEffect, useState } from 'react';
import { TrafficData } from '../types';
import TrafficTable from '../components/traffic/TrafficTable';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { generateMockTrafficData } from '../utils/mockData';

const LiveTraffic: React.FC = () => {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTrafficData(generateMockTrafficData(20));
        setIsLoading(false);
      }, 800);
    };

    fetchData();

    // Set up polling if in live mode
    if (isLiveMode) {
      const interval = setInterval(() => {
        const newData = generateMockTrafficData(5);
        setTrafficData(prev => [...newData, ...prev.slice(0, 45)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  // Filter traffic data based on search term
  const filteredData = trafficData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.sourceIP.toLowerCase().includes(searchLower) ||
      item.destinationIP.toLowerCase().includes(searchLower) ||
      item.protocol.toLowerCase().includes(searchLower) ||
      item.service.toLowerCase().includes(searchLower)
    );
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTrafficData(generateMockTrafficData(20));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search traffic..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="secondary" leftIcon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={isLiveMode ? 'primary' : 'ghost'} 
              onClick={() => setIsLiveMode(true)}
            >
              Live Mode
            </Button>
            <Button 
              variant={!isLiveMode ? 'primary' : 'ghost'} 
              onClick={() => setIsLiveMode(false)}
            >
              Manual Refresh
            </Button>
            <Button 
              variant="secondary" 
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={handleRefresh}
              disabled={isLiveMode}
            >
              Refresh
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredData.length > 0 ? (
          <TrafficTable data={filteredData} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No traffic data matches your search.
          </div>
        )}
      </Card>
    </div>
  );
};

export default LiveTraffic;