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
