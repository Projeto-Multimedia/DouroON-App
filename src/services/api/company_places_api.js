import { ApiCore } from "./utilities/core";

// User API

let url = "company-places";
const plural = "company-places";
const single = "company-places";

// plural and single may be used for message logic if needed in the ApiCore class.

const apiCompanyPlaces = new ApiCore({
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

apiCompanyPlaces.massUpdate = () => {
  // Add custom api call logic here
};

export default apiCompanyPlaces;
