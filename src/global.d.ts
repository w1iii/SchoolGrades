export {}

declare global {
  interface Window {
    api: {
      login: (credentials: { username: string; password: string }) => Promise<string>,
      getStudents: (gradeYear: { gradeId: string}) => Promise<string | undefined>
    }
  }
}

