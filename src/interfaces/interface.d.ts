export {};
declare global {
  interface Task {
    id?: number;
    title: string;
    description: string;
  }
  interface User {
    userId?: number;
    username: string;
    password?: string;
  }
}
