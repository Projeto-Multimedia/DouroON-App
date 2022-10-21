// provider.js

import { handleResponse, handleError } from './response'; 

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = 'http://10.0.2.2:8000/api'; 

/** @param {string} resource */ 
const getAll = (resource) => {
    return fetch(`${BASE_URL}/${resource}`)
        .then(handleResponse)
        .catch(handleError);
};

/** @param {string} resource */ 
/** @param {string} id */ 
const getSingle = (resource, id) => { 
  return fetch(`${BASE_URL}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const post = (resource, model) => { 
  return fetch(`${BASE_URL}/${resource}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(model),
    })
    .then(handleResponse)
    .catch(handleError);
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const put = (resource, model) => { 
  return fetch(`${BASE_URL}/${resource}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(model),
    })
    .then(handleResponse)
    .catch(handleError);
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const patch = (resource, model) => { 
  return fetch(`${BASE_URL}/${resource}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(model),
    })
    .then(handleResponse)
    .catch(handleError);
}; 

/** @param {string} resource */ 
/** @param {string} id */ 
const remove = (resource, id) => { 
  return fetch(`${BASE_URL}/${resource}/${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    })
    .then(handleResponse)
    .catch(handleError);
}; 

export const apiProvider = { 
  getAll, 
  getSingle, 
  post, 
  put, 
  patch, 
  remove, 
};
