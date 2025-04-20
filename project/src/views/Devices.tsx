import React, { useEffect, useState } from 'react';
import { Device } from '../types';
import DeviceList from '../components/devices/DeviceList';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Search, RefreshCw, List, Grid3X3 } from 'lucide-react';
import { generateMockDevices } from '../utils/mockData';

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDevices(generateMockDevices(12));
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter devices based on search term
  const filteredDevices = devices.filter(device => {
    const searchLower = searchTerm.toLowerCase();
    return (
      device.name.toLowerCase().includes(searchLower) ||
      device.ip.toLowerCase().includes(searchLower) ||
      device.mac.toLowerCase().includes(searchLower) ||
      device.type.toLowerCase().includes(searchLower)
    );
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDevices(generateMockDevices(12));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search devices..."
              className="w-full md:w-72 pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <div className="flex border rounded-md overflow-hidden">
              <button
                type="button"
                className={`px-3 py-2 flex items-center ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                className={`px-3 py-2 flex items-center ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">List</span>
              </button>
            </div>
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
        ) : filteredDevices.length > 0 ? (
          <DeviceList devices={filteredDevices} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No devices match your search.
          </div>
        )}
      </Card>
    </div>
  );
};

export default Devices;