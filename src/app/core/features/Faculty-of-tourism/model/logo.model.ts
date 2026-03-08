export interface Logo {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
}

export interface LogoResponse {
  success: boolean;
  data: Logo[];
  message: string;
  errors: string[];
  statusCode: number;
  timestamp: string;
}
