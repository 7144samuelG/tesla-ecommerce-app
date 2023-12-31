// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   cssModules: true,
// };

// module.exports = nextConfig;
// // next.config.js
module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,

    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "fs": false,
          "path": false,
          "os": false,
        }
      }
      return config
    },
  }
}
