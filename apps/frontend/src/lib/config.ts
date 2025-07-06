type Environment = {
  VITE_APP_API_URL: string;
};

export function getConfig(): Environment {
  return { ...import.meta.env } as Environment;
}
