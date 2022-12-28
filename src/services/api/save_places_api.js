import { ApiCore } from "./utilities/core";

// User Profile API

let url = 'save-places';
const plural = 'save-places';
const single = 'save-place';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiProfileAccounts = new ApiCore({
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

apiProfileAccounts.massUpdate = () => {
  // Add custom api call logic here
}

export default apiProfileAccounts;
