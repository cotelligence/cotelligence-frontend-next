declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_URL: string;
        NEXT_PUBLIC_IS_PROD: 'true' | '';
        NEXT_PUBLIC_RPC_ENDPOINT: string;
      }
    }
  }
}
