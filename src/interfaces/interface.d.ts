export {};
declare global {
  interface Task {
    id?: number;
    title: string;
    description: string;
  }
  interface User {
    username: string;
    password?: string;
  }
}