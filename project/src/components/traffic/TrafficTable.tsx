import React from 'react';
import { TrafficData, Protocol, Service, ConnectionStatus } from '../../types';
import Badge from '../ui/Badge';
import { formatBytes, formatTimestamp } from '../../utils/mockData';

interface TrafficTableProps {
  data: TrafficData[];
  className?: string;
}

const getProtocolBadgeVariant = (protocol: Protocol) => {
  switch (protocol) {
    case Protocol.HTTP:
    case Protocol.HTTPS:
      return 'primary';
    case Protocol.TCP:
      return 'info';
    case Protocol.UDP:
      return 'warning';
    case Protocol.ICMP:
      return 'danger';
    default:
      return 'default';
  }
};

const getServiceBadgeVariant = (service: Service) => {
  switch (service) {
    case Service.WEB:
      return 'primary';
    case Service.STREAMING:
    case Service.GAMING:
      return 'info';
    case Service.EMAIL:
    case Service.FILE_TRANSFER:
      return 'warning';
    case Service.VPN:
    case Service.VOIP:
      return 'success';
    default:
      return 'default';
  }
};

const getStatusBadgeVariant = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.ACTIVE:
      return 'success';
    case ConnectionStatus.CLOSED:
      return 'default';
    case ConnectionStatus.BLOCKED:
      return 'danger';
    default:
      return 'default';
  }
};

const TrafficTable: React.FC<TrafficTableProps> = ({ data, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Source IP
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Destination IP
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Protocol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Service
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Data
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatTimestamp(item.timestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                {item.sourceIP}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                {item.destinationIP}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getProtocolBadgeVariant(item.protocol)}>
                  {item.protocol}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getServiceBadgeVariant(item.service)}>
                  {item.service}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatBytes(item.bytes)} / {item.packets} packets
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getStatusBadgeVariant(item.status)}>
                  {item.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficTable;