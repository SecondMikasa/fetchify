class Fetchify {
    config = {
        // Setting default values if not provided by user
        headers: {
            'Content-Type': 'application/json'
        },
    };

    constructor(config) {
        this.config = this.mergeConfig(config);
        console.log(this.config)
    }

    async get(url, config) {
        console.log("config", config)
        console.log("this.config", this.config)

        const finalConfig = this.mergeConfig(config)
        console.log("finalConfig", finalConfig)

        return fetch(`${this.config.baseURL}${url}`, finalConfig)
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