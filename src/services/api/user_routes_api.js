import { ApiCore } from "./utilities/core";

// User Profile API

let url = 'user-routes';
const plural = 'user-routes';
const single = 'user-route';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiUserRoutes = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: false,
  delete: false,
  url: url,
  plural: plural,
  single: single,
});

apiUserRoutes.massUpdate = () => {
  // Add custom api call logic here
}

export default apiUserRoutes;
