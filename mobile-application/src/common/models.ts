export type TurnsStatusTableData = {
  items: {
    ticketNumber: string;
    queueName: string;
    statusName: string;
    statusCode: string;
  }[];
};

export type DeviceConnectionData = {
  deviceCode?: string;
  userCode?: string;
  interval?: number;
  expiresIn?: number;
  verificationURI?: string;
};

export type DeviceAuthData = {
  refreshToken?: string;
  accessToken?: string;
  refreshExpiresIn?: number;
  expiresIn?: number;
  pending?: boolean;
};

export type TokenData = {
  value: string;
  expiresAt: number;
};

export type ConnectionDetails = {
  applicationId: string;
  deviceCode: string;
  accessToken: TokenData;
  refreshToken: TokenData;
};

export type ConnectionData = DeviceConnectionData & {
  tokens?: DeviceAuthData;
};

export type ConnectionResult = Progress<ConnectionData> & {
  connect: (applicationId: string) => void;
  clear: () => void;
  connectionDetails?: ConnectionDetails;
};

export type AuthHeaders = {
  applicationId: string;
  authorization: string;
};

export type Progress<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

export type Interval = {
  clear?: () => void;
};


export type DeviceData = {
  deviceId: string;
};
