import * as api from '../../generated/api';

const getConfiguration = (): api.Configuration => new api.Configuration({
  basePath: 'http://localhost:5000',
});

export const getAuthAPIInstance = () => new api.AuthApi(getConfiguration());

export const getCategoriesAPIInstance = () => new api.CategoriesApi(getConfiguration());

export const getServicesAPIInstance = () => new api.ServicesApi(getConfiguration());
