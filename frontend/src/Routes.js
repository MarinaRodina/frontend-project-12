// eslint-disable-next-line import/no-anonymous-default-export
const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
};
