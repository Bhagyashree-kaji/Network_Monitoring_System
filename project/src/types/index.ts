export interface TrafficData {
  id: string;
  timestamp: number;
  sourceIP: string;
  destinationIP: string;
  protocol: Protocol;
  bytes: number;
  packets: number;
  service: Service;
  duration: number;
  status: ConnectionStatus;
}

export interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  type: DeviceType;
  lastSeen: number;
  trafficIn: number;
  trafficOut: number;
}

export interface Alert {
  id: string;
  timestamp: number;
  level: AlertLevel;
  message: string;
  sourceIP: string;
  destinationIP?: string;
  resolved: boolean;
}

export interface NetworkStats {
  totalDevices: number;
  activeConnections: number;
  bytesIn: number;
  bytesOut: number;
  packetsIn: number;
  packetsOut: number;
  topProtocols: { name: string; percentage: number }[];
  topServices: { name: string; percentage: number }[];
}

export interface TimeSeriesPoint {
  timestamp: number;
  value: number;
}

export interface TimeSeriesData {
  inbound: TimeSeriesPoint[];
  outbound: TimeSeriesPoint[];
}

export enum Protocol {
  TCP = 'TCP',
  UDP = 'UDP',
  ICMP = 'ICMP',
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  DNS = 'DNS',
  FTP = 'FTP',
  SSH = 'SSH',
  SMTP = 'SMTP',
  OTHER = 'OTHER'
}

export enum Service {
  WEB = 'Web',
  EMAIL = 'Email',
  FILE_TRANSFER = 'File Transfer',
  STREAMING = 'Streaming',
  GAMING = 'Gaming',
  VPN = 'VPN',
  VOIP = 'VoIP',
  DATABASE = 'Database',
  UNKNOWN = 'Unknown'
}

export enum ConnectionStatus {
  ACTIVE = 'Active',
  CLOSED = 'Closed',
  BLOCKED = 'Blocked'
}

export enum DeviceType {
  DESKTOP = 'Desktop',
  LAPTOP = 'Laptop',
  MOBILE = 'Mobile',
  IOT = 'IoT Device',
  SERVER = 'Server',
  NETWORK = 'Network Device',
  UNKNOWN = 'Unknown'
}

export enum AlertLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum TimeRange {
  LAST_HOUR = '1h',
  LAST_DAY = '24h',
  LAST_WEEK = '7d',
  LAST_MONTH = '30d',
  CUSTOM = 'custom'
}