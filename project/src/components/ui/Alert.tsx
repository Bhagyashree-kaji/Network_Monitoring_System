import React from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const getVariantClasses = (variant: AlertVariant): string => {
  switch (variant) {
    case 'info':
      return 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100';
    case 'success':
      return 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-100';
    case 'warning':
      return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100';
    case 'error':
      return 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-100';
  }
};

const getIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'info':
      return <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />;
  }
};

const Alert: React.FC<AlertProps> = ({ variant, title, children, onClose, className = '' }) => {
  return (
    <div
      className={`${getVariantClasses(
        variant
      )} p-4 rounded-md flex items-start space-x-3 ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0">{getIcon(variant)}</div>
      <div className="flex-1 pt-0.5">
        {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss</span>
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Alert;