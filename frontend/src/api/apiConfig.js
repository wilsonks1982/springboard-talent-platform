/**
 * Dynamic API Configuration
 * Reads from webpack DefinePlugin injected environment variables
 */

export const getApiConfig = () => {
  const env = process.env.REACT_APP_ENV || "development";
  const baseURL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";

  const configs = {
    development: {
      baseURL,
      timeout: 10000,
      withCredentials: false,
      debug: true,
    },
    dev: {
      baseURL,
      timeout: 10000,
      withCredentials: true,
      debug: true,
    },
    production: {
      baseURL,
      timeout: 15000,
      withCredentials: true,
      debug: true,
    },
  };

  const config = configs[env] || configs.development;

  if (config.debug) {
    console.log(`🔧 API Configuration (${env}):`, config);
  }

  return config;
};
