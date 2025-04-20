import { 
  TrafficData, 
  Device, 
  Alert, 
  NetworkStats, 
  Protocol, 
  Service, 
  ConnectionStatus, 
  DeviceType, 
  AlertLevel,
  TimeSeriesData
} from '../types';

// Generate random IP address
const randomIP = () => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
};

// Generate random MAC address
const randomMAC = () => {
  return Array(6).fill(0).map(() => {
    return Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  }).join(':');
};

// Generate random traffic data
export const generateMockTrafficData = (count: number): TrafficData[] => {
  const now = Date.now();
  return Array(count).fill(0).map((_, i) => {
    const protocol = Object.values(Protocol)[Math.floor(Math.random() * Object.values(Protocol).length)];
    const service = Object.values(Service)[Math.floor(Math.random() * Object.values(Service).length)];
    const status = Object.values(ConnectionStatus)[Math.floor(Math.random() * Object.values(ConnectionStatus).length)];
    
    return {
      id: `traffic-${i}`,
      timestamp: now - Math.floor(Math.random() * 3600000),
      sourceIP: randomIP(),
      destinationIP: randomIP(),
      protocol,
      bytes: Math.floor(Math.random() * 10000),
      packets: Math.floor(Math.random() * 100),
      service,
      duration: Math.floor(Math.random() * 60000),
      status
    };
  });
};

// Generate mock devices
export const generateMockDevices = (count: number): Device[] => {
  const now = Date.now();
  return Array(count).fill(0).map((_, i) => {
    const type = Object.values(DeviceType)[Math.floor(Math.random() * Object.values(DeviceType).length)];
    
    return {
      id: `device-${i}`,
      name: `Device-${i}`,
      ip: randomIP(),
      mac: randomMAC(),
      type,
      lastSeen: now - Math.floor(Math.random() * 86400000),
      trafficIn: Math.floor(Math.random() * 1000000),
      trafficOut: Math.floor(Math.random() * 1000000)
    };
  });
};

// Generate mock alerts
export const generateMockAlerts = (count: number): Alert[] => {
  const now = Date.now();
  const alertMessages = [
    'Unusual traffic spike detected',
    'Potential port scanning activity',
    'Multiple failed login attempts',
    'Suspicious outbound connection',
    'Unrecognized device connected',
    'Potential DDoS attack',
    'Data exfiltration attempt detected',
    'Unusual protocol usage'
  ];
  
  return Array(count).fill(0).map((_, i) => {
    const level = Object.values(AlertLevel)[Math.floor(Math.random() * Object.values(AlertLevel).length)];
    
    return {
      id: `alert-${i}`,
      timestamp: now - Math.floor(Math.random() * 86400000),
      level,
      message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
      sourceIP: randomIP(),
      destinationIP: Math.random() > 0.5 ? randomIP() : undefined,
      resolved: Math.random() > 0.7
    };
  });
};

// Generate network statistics
export const generateMockNetworkStats = (): NetworkStats => {
  return {
    totalDevices: Math.floor(Math.random() * 50) + 10,
    activeConnections: Math.floor(Math.random() * 100) + 20,
    bytesIn: Math.floor(Math.random() * 10000000),
    bytesOut: Math.floor(Math.random() * 10000000),
    packetsIn: Math.floor(Math.random() * 1000000),
    packetsOut: Math.floor(Math.random() * 1000000),
    topProtocols: [
      { name: 'TCP', percentage: 45 },
      { name: 'UDP', percentage: 25 },
      { name: 'HTTP', percentage: 15 },
      { name: 'HTTPS', percentage: 10 },
      { name: 'Other', percentage: 5 }
    ],
    topServices: [
      { name: 'Web', percentage: 40 },
      { name: 'Streaming', percentage: 20 },
      { name: 'File Transfer', percentage: 15 },
      { name: 'Email', percentage: 10 },
      { name: 'Other', percentage: 15 }
    ]
  };
};

// Generate time series data for charts
export const generateTimeSeriesData = (hours: number, interval: number): TimeSeriesData => {
  const now = Date.now();
  const points = Math.floor((hours * 3600000) / interval);
  const inbound: { timestamp: number; value: number }[] = [];
  const outbound: { timestamp: number; value: number }[] = [];
  
  for (let i = 0; i < points; i++) {
    const timestamp = now - (points - i) * interval;
    inbound.push({
      timestamp,
      value: Math.floor(Math.random() * 1000) + 100
    });
    outbound.push({
      timestamp,
      value: Math.floor(Math.random() * 800) + 50
    });
  }
  
  return { inbound, outbound };
};

// Format bytes to human-readable format
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Format timestamp to readable date/time
export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};