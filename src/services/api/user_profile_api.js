import { ApiCore } from "./utilities/core";

// User Profile API

let url = 'profile-accounts';
const plural = 'profile-accounts';
const single = 'profile-account';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiProfileAccounts = new ApiCore({
  getAll: true,
  getSingle: true,
  post: false,
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
