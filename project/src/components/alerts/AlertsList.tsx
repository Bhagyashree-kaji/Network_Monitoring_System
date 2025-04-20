import React from 'react';
import { Alert as AlertType, AlertLevel } from '../../types';
import Alert from '../ui/Alert';
import { formatTimestamp } from '../../utils/mockData';
import Button from '../ui/Button';

interface AlertsListProps {
  alerts: AlertType[];
  onResolve: (id: string) => void;
  className?: string;
}

const getAlertVariant = (level: AlertLevel) => {
  switch (level) {
    case AlertLevel.LOW:
      return 'info';
    case AlertLevel.MEDIUM:
      return 'warning';
    case AlertLevel.HIGH:
    case AlertLevel.CRITICAL:
      return 'error';
    default:
      return 'info';
  }
};

const AlertsList: React.FC<AlertsListProps> = ({ alerts, onResolve, className = '' }) => {
  // Sort alerts by timestamp (newest first) and priority
  const sortedAlerts = [...alerts].sort((a, b) => {
    // First sort by resolved status
    if (a.resolved !== b.resolved) {
      return a.resolved ? 1 : -1;
    }
    
    // Then sort by level priority
    const levelPriority = {
      [AlertLevel.CRITICAL]: 0,
      [AlertLevel.HIGH]: 1,
      [AlertLevel.MEDIUM]: 2,
      [AlertLevel.LOW]: 3
    };
    
    if (levelPriority[a.level] !== levelPriority[b.level]) {
      return levelPriority[a.level] - levelPriority[b.level];
    }
    
    // Finally sort by timestamp
    return b.timestamp - a.timestamp;
  });

  return (
    <div className={`space-y-4 ${className}`}>
      {sortedAlerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`transition-opacity ${alert.resolved ? 'opacity-60' : 'opacity-100'}`}
        >
          <Alert
            variant={getAlertVariant(alert.level)}
            title={`${alert.level} Alert: ${alert.message}`}
            className="flex flex-col"
          >
            <div className="mt-2 text-sm">
              <div className="flex flex-col space-y-1">
                <div>
                  <span className="font-medium">Time:</span> {formatTimestamp(alert.timestamp)}
                </div>
                <div>
                  <span className="font-medium">Source:</span> {alert.sourceIP}
                </div>
                {alert.destinationIP && (
                  <div>
                    <span className="font-medium">Destination:</span> {alert.destinationIP}
                  </div>
                )}
              </div>
              <div className="mt-3 flex justify-end">
                {!alert.resolved ? (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => onResolve(alert.id)}
                  >
                    Resolve
                  </Button>
                ) : (
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                    Resolved
                  </span>
                )}
              </div>
            </div>
          </Alert>
        </div>
      ))}
      
      {sortedAlerts.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No alerts found.
        </div>
      )}
    </div>
  );
};

export default AlertsList;