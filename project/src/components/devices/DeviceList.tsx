import React from 'react';
import { Device, DeviceType } from '../../types';
import Badge from '../ui/Badge';
import { formatBytes, formatTimestamp } from '../../utils/mockData';
import { Laptop, Smartphone, Server, Radio, Cpu } from 'lucide-react';

interface DeviceListProps {
  devices: Device[];
  className?: string;
}

const getDeviceIcon = (type: DeviceType) => {
  switch (type) {
    case DeviceType.DESKTOP:
    case DeviceType.LAPTOP:
      return <Laptop className="h-5 w-5" />;
    case DeviceType.MOBILE:
      return <Smartphone className="h-5 w-5" />;
    case DeviceType.SERVER:
      return <Server className="h-5 w-5" />;
    case DeviceType.NETWORK:
      return <Radio className="h-5 w-5" />;
    case DeviceType.IOT:
    default:
      return <Cpu className="h-5 w-5" />;
  }
};

const getDeviceTypeVariant = (type: DeviceType) => {
  switch (type) {
    case DeviceType.DESKTOP:
    case DeviceType.LAPTOP:
      return 'primary';
    case DeviceType.MOBILE:
      return 'info';
    case DeviceType.SERVER:
      return 'success';
    case DeviceType.NETWORK:
      return 'warning';
    case DeviceType.IOT:
      return 'danger';
    default:
      return 'default';
  }
};

const DeviceList: React.FC<DeviceListProps> = ({ devices, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {devices.map((device) => (
        <div
          key={device.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
              {getDeviceIcon(device.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                {device.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {device.ip}
              </p>
              <div className="mt-1">
                <Badge variant={getDeviceTypeVariant(device.type)}>
                  {device.type}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-gray-500 dark:text-gray-400">MAC Address:</div>
            <div className="text-gray-700 dark:text-gray-300">{device.mac}</div>
            
            <div className="text-gray-500 dark:text-gray-400">Last Activity:</div>
            <div className="text-gray-700 dark:text-gray-300">
              {formatTimestamp(device.lastSeen)}
            </div>
            
            <div className="text-gray-500 dark:text-gray-400">Traffic In:</div>
            <div className="text-blue-600 dark:text-blue-400 font-medium">
              {formatBytes(device.trafficIn)}
            </div>
            
            <div className="text-gray-500 dark:text-gray-400">Traffic Out:</div>
            <div className="text-green-600 dark:text-green-400 font-medium">
              {formatBytes(device.trafficOut)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeviceList;