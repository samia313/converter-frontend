module.exports = {
  apps: [
    {
      name: 'pdfilio-converter-api',
      script: './server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '350M',
      env: { NODE_ENV: 'production' },
    },
    {
      name: 'pdfilio-conversion-worker',
      script: './queue/worker.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '350M',
      env: { NODE_ENV: 'production' },
    },
  ],
}
