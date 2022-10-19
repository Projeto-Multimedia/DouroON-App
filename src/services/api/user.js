import { ApiCore } from './utilities/core';

const url = 'end-users';
const plural = 'users';
const single = 'user';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiUsers = new ApiCore({
  getAll: true,
  getSingle: true,
  post: false,
  put: false,
  patch: false,
  delete: false,
  url: url,
  plural: plural,
  single: single
});

apiUsers.massUpdate = () => {
  // Add custom api call logic here
}

export default apiUsers;

