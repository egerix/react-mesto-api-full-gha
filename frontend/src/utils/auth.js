import {apiConfig} from "./config";

function register(email, password) {
    return fetch(`${apiConfig.url}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(handleResponse)

}

function authorize(email, password) {
    return fetch(`${apiConfig.url}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then(handleResponse)
}

function checkToken(token) {
    return fetch(`${apiConfig.url}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then(handleResponse)
}

function handleResponse(response) {
    if (!response.ok) {
        return response.text().then((text) => {
            throw new Error(text);
        });
    }
    return response.json();
}

export {register, authorize, checkToken}
