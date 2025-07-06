/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  // add any other environment variables here, e.g.:
  // readonly VITE_ANOTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
