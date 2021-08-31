export {};
declare global {
  interface Task {
    id?: number;
    title: string;
    description: string;
  }
  interface User {
    name: string;
    login: string;
    password: string;
  }
}