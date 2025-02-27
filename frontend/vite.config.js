import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
  },
  build: {
    outDir: 'dist', // Output directory for your build
  },
})



// vps server code 
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3030,
//   },
//   preview: {
//     allowedHosts: ['dashboard.infoera.in'],  // Allow the host here
//   },
// })
