class Fetchify {
    config = {
        // Setting default values if not provided by user
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    constructor(config) {
        this.config = this.#mergeConfig(config);
    }

    async #dispatchRequest({ url, config }) {
        const finalConfig = this.#mergeConfig(config)
        // console.log("finalConfig", finalConfig)

        const abortController = new AbortController()

        // Though timeout will always be available, keeping 0 as a final safety net
        const timeout = finalConfig.timeout || 0

        let timeoutId;

        if (timeout) {
            // console.log("timeout", timeout)
            timeoutId = setTimeout(() => {
                abortController.abort()
            }, timeout)
        }

        try {
            const response = await fetch(
                `${this.config.baseURL}${url}`,
                {
                    ...finalConfig,
                    signal: abortController.signal
                }
            )

            return response
        } catch (error) {
            console.error('Fetch error:', error);
            throw error; 
        }
        finally {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }

    async get(url, config) {
        return this.#dispatchRequest({
            url,
            config: {
                ...config,
                method: 'GET'
            }
        })
    }

    async post(url, config) {
        return this.#dispatchRequest({
            url,
            config: {
                ...config,
                method: 'POST'
            }
        })
    }

    #mergeConfig(config) {
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