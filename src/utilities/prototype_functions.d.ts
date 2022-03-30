export {};

declare global {
  interface Date {
      toUtcMs() : number;
  }
  
}