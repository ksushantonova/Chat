export interface RegisterData {
  name: string;
  email: string;
  pass: string;
  userid: string;
}

export interface Messages {
  message: string;
  username: string;
  userid: string;
}

export interface UserSocket {
  on: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
}
