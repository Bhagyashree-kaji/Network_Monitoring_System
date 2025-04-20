import React, { useMemo } from 'react';
import { TimeSeriesPoint } from '../../types';

interface AreaChartProps {
  data: {
    inbound: TimeSeriesPoint[];
    outbound: TimeSeriesPoint[];
  };
  height?: number;
  className?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, height = 200, className = '' }) => {
  const chartData = useMemo(() => {
    if (!data.inbound.length || !data.outbound.length) return null;

    // Find min and max values
    const allValues = [...data.inbound.map(d => d.value), ...data.outbound.map(d => d.value)];
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const range = maxValue - minValue;

    // Find min and max timestamps
    const allTimestamps = [...data.inbound.map(d => d.timestamp), ...data.outbound.map(d => d.timestamp)];
    const minTimestamp = Math.min(...allTimestamps);
    const maxTimestamp = Math.max(...allTimestamps);
    const timeRange = maxTimestamp - minTimestamp;

    // Calculate points for the SVG paths
    const inboundPath = data.inbound.map((point, i) => {
      const x = ((point.timestamp - minTimestamp) / timeRange) * 100;
      const y = 100 - (((point.value - minValue) / (range || 1)) * 80);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');

    const outboundPath = data.outbound.map((point, i) => {
      const x = ((point.timestamp - minTimestamp) / timeRange) * 100;
      const y = 100 - (((point.value - minValue) / (range || 1)) * 80);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');

    // Create area chart by adding bottom points
    const inboundAreaPath = `${inboundPath} L${
      ((data.inbound[data.inbound.length - 1].timestamp - minTimestamp) / timeRange) * 100
    },100 L${((data.inbound[0].timestamp - minTimestamp) / timeRange) * 100},100 Z`;

    const outboundAreaPath = `${outboundPath} L${
      ((data.outbound[data.outbound.length - 1].timestamp - minTimestamp) / timeRange) * 100
    },100 L${((data.outbound[0].timestamp - minTimestamp) / timeRange) * 100},100 Z`;

    return {
      inboundPath,
      outboundPath,
      inboundAreaPath,
      outboundAreaPath,
      minValue,
      maxValue
    };
  }, [data]);

  if (!chartData) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }

  return (
    <div className={`w-full ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* Grid lines */}
        <line x1="0" y1="20" x2="100" y2="20" stroke="#e5e7eb" strokeWidth="0.5" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="#e5e7eb" strokeWidth="0.5" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="#e5e7eb" strokeWidth="0.5" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="#e5e7eb" strokeWidth="0.5" />
        
        {/* Area fills */}
        <path
          d={chartData.inboundAreaPath}
          fill="rgba(59, 130, 246, 0.2)"
          className="transition-all duration-300"
        />
        <path
          d={chartData.outboundAreaPath}
          fill="rgba(16, 185, 129, 0.2)"
          className="transition-all duration-300"
        />
        
        {/* Lines */}
        <path
          d={chartData.inboundPath}
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          className="transition-all duration-300"
        />
        <path
          d={chartData.outboundPath}
          stroke="#10b981"
          strokeWidth="2"
          fill="none"
          className="transition-all duration-300"
        />
      </svg>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <div>
          {new Date(data.inbound[0].timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        <div>
          {new Date(data.inbound[data.inbound.length - 1].timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-2 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Inbound</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Outbound</span>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;