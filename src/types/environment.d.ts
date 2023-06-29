export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_MAPS_API_KEY: string;
      DB_HOST: string;
    }
  }
}
