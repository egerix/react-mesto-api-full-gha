const apiConfig = {
    url: 'http://localhost:3001'
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
