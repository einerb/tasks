import { environment } from '../../environments/environment';

export const Endpoint = {
  AUTH: {
    LOGIN: environment.api.base + 'users/login',
  },
  USER: {
    CREATE: environment.api.base + 'users/register',
    ALL: environment.api.base + 'users',
    UPDATE: environment.api.base + 'users/update',
  },
  TASK: {
    CREATE: environment.api.base + 'tasks/create',
    ALL: environment.api.base + 'tasks',
    UPDATE: environment.api.base + 'tasks/update',
    DELETE: environment.api.base + 'tasks/delete',
  },
};
