module.exports = {
  apps: [
    {
      name: "api.infoera.in", // Name of your backend app
      script: "npm", // Path to your backend entry file
      args: "start",
      cwd: "/nodejsapplications/api.infoera.in", // Working directory for backend
      env: {
        NODE_ENV: "production",
        // PORT: 5454, // Port for your backend
      },
    },
    {
      name: "dashboard.infoera.in", // Name of your first frontend app
      script: "npm",
      args: "start", // Command to run your React app
      cwd: "/nodejsapplications/dashboard.infoera.in", // Working directory for dashboard
      env: {
        NODE_ENV: "production",
        // PORT: 3030,
      },
    },
    {
      name: "infoera.in", // Name of your second frontend app
      script: "npm",
      args: "start", // Command to run your React app
      cwd: "/nodejsapplications/infoera.in", // Working directory for infoera
      env: {
        NODE_ENV: "production",
        // PORT: 3000,
      },
    },
  ],
};
