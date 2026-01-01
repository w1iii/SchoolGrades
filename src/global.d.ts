export {}

declare global {
  interface Window {
    api: {
      login: (credentials: { username: string; password: string }) => Promise<string>
    }
  }
}

