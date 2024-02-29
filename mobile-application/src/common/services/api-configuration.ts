import * as api from '../../generated/api';

const getConfiguration = (): api.Configuration => new api.Configuration({
  basePath: 'http://localhost:5003',
});

export const getAuthAPIInstance = () => new api.AuthApi(getConfiguration());

export const getServiceTurnsAPIInstance = () => new api.ServiceturnsApi(getConfiguration());
