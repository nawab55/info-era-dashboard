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




// server code for ecosystem.config.js
// module.exports = {
//   apps: [
//     {
//       name: "infoera.in",
//       script: "index.js",
//       cwd: "/nodejsapplications/infoera.in",
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//     // {
//     //   name: "dashboard.infoera.in",
//     //   script: "serve",
//     //   args: "-s dist ", // Serve the "dist" folder on port, -l 3030
//     //   cwd: "/nodejsapplications/dashboard.infoera.in",
//     //   watch: false,
//     //   env: {
//     //     NODE_ENV: "production",
//     //   },
//     // },
//     {
//       name: "dashboard.infoera.in",
//       script: "npm",
//       args: "run preview", // Runs "vite preview" to serve the app
//       cwd: "/nodejsapplications/dashboard.infoera.in",
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
    
//     {
//       name: "api.infoera.in",
//       script: "server.js",
//       cwd: "/nodejsapplications/api.infoera.in",
//       watch: false,
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//   ],
// };

