import { ApiCore } from "./utilities/core";

// User API

let url = "company-posts";
const plural = "company-posts";
const single = "company-post";

// plural and single may be used for message logic if needed in the ApiCore class.

const apiCompanyPosts = new ApiCore({
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

apiCompanyPosts.massUpdate = () => {
  // Add custom api call logic here
};

export default apiCompanyPosts;
