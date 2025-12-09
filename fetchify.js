class Fetchify {
    config = {
        // Setting default values if not provided by user
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    constructor(config) {
        this.config = this.mergeConfig(config);
        console.log(this.config)
    }

    dispatchRequest({ url, config }) {
        const finalConfig = this.mergeConfig(config)

        return fetch(`${this.config.baseURL}${url}`, finalConfig)
    }

    async get(url, config) {
        return this.dispatchRequest({
            url,
            config: {
                ...config,
                method: 'GET'
        }})
    }

    async post(url, config) {
        return this.dispatchRequest({
            url,
            config: {
                ...config,
                method: 'POST'
        }})
    }

    mergeConfig(config) {
        return {
            ...this.config,
            ...config, 
            headers: {
                ...(this.config.headers || {}),
                ...(config?.headers || {}),
            }
        }

    }
}

function create(config) {
    return new Fetchify(config)
}

export default {
    create,
};