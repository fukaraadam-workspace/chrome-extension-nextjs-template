namespace NodeJS {
  interface ProcessEnv {
    // --- From .env ---
    NEXT_PUBLIC_APP_TITLE: string;
    // --- From .env.{environment} ---
    NEXT_PUBLIC_APP_DESCRIPTION: string;
  }
}
