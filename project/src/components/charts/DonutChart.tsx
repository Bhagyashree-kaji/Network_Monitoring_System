import React from 'react';

interface DataItem {
  name: string;
  percentage: number;
}

interface DonutChartProps {
  data: DataItem[];
  title?: string;
  size?: number;
  className?: string;
}

const colors = [
  '#3B82F6', // blue-500
  '#10B981', // green-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#6366F1', // indigo-500
  '#14B8A6', // teal-500
];

const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  title, 
  size = 160, 
  className = '' 
}) => {
  // Calculate stroke dash array and offset for each segment
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;
  const segments = data.map((item, index) => {
    const strokeDasharray = (item.percentage / 100) * circumference;
    const segment = {
      color: colors[index % colors.length],
      name: item.name,
      percentage: item.percentage,
      strokeDasharray: `${strokeDasharray} ${circumference - strokeDasharray}`,
      strokeDashoffset: -currentOffset
    };
    currentOffset += strokeDasharray;
    return segment;
  });

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {title && <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</h3>}
      
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          
          {/* Segments */}
          {segments.map((segment, index) => (
            <circle
              key={index}
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth="10"
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-500 ease-in-out"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'donut-chart-fill 1s ease-in-out forwards'
              }}
            />
          ))}
        </svg>
        
        {/* Center text with total */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ padding: size / 5 }}
        >
          {data.length > 0 && (
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              {data.length}
            </span>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-gray-700 dark:text-gray-300 truncate max-w-[80px]" title={segment.name}>
              {segment.name} ({segment.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;