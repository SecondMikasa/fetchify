import fetchify from './fetchify.js';

// const api = fetchify.create({
//     baseURL: 'https://some-domain.com/api',
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' }
// });

const api = fetchify.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'key'
    }
});

async function main() {
    const response = await api.get('/todos', {
        headers: {
            'Content-Type': 'application/xml',
            'x-idempotency-key': 'secret-key'
        }
    });
    const data = await response.json();

    console.log(data);
}

main();