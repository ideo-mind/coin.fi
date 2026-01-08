export interface DemoItem {
  id: string;
  name: string;
  value: number;
}
export interface WaitlistEntry {
  email: string;
  platforms: string[];
  timestamp: string;
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}