const apiConfig = {
    url: 'https://api.egerix.nomoredomains.monster'
}

const authConfig = {
    tokenStorageName: 'token',
    endpoints: {
        login: '/sign-in',
        register: '/sign-up',
    }
}

export {
    apiConfig,
    authConfig,
}
