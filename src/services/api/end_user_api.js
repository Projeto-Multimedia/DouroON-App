import { ApiCore } from "./utilities/core";

// User API

const url = 'end-users';
const plural = 'end-users';
const single = 'end-user';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiEndUsers = new ApiCore({
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

apiEndUsers.massUpdate = () => {
  // Add custom api call logic here
}

export default apiEndUsers;
