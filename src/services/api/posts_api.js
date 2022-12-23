import { ApiCore } from "./utilities/core";

// User API

let url = "user-posts";
const plural = "user-posts";
const single = "user-post";

// plural and single may be used for message logic if needed in the ApiCore class.

const apiUserPosts = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  simplePost: true,
  put: false,
  patch: false,
  delete: false,
  url: url,
  plural: plural,
  single: single,
});

apiUserPosts.massUpdate = () => {
  // Add custom api call logic here
};

export default apiUserPosts;
