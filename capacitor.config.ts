import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.enigmx',
  appName: 'enigmx',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
