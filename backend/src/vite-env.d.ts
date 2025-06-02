/// <reference types="vite/client" />

// This allows TypeScript to recognize path aliases
declare module '@/*' {
  const content: any;
  export default content;
}