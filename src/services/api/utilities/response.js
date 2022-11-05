// response.js

export function handleResponse(response) {
	const responseJson = response.text();

	if (response.results) {
		return responseJson.results;
	}

	if (response.data) {
		return responseJson.data;
	}

	return responseJson;
}

export function handleError(error) {
	if (error.data) {
		return error.data;
	}
	return error;
}
