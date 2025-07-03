module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./apps/frontend",
      script: "pnpm dev",
    },
    {
      name: "backend",
      cwd: "./apps/backend",
      script: "pnpm start:debug",
    },
  ],
};
