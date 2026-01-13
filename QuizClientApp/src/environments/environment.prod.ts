import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
    /*apiUrl: 'https://localhost:7265/api'*/
  apiUrl: 'https://quizapi.perfectitspot.com/api'
};
