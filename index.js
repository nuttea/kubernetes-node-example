const http = require('http');
const https = require('https');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Simulate random conditions:
    // - 2% chance of failure
    // - 5% chance of high latency (5-10 seconds)
    // - 93% normal operation
    const randomValue = Math.random();
    const shouldFail = randomValue < 0.02;
    const shouldDelay = !shouldFail && randomValue < 0.07; // 0.02 + 0.05 = 0.07
    
    if (shouldFail) {
        console.log('Simulating API failure (2% chance)');
        
        // Create and throw an error with stack trace
        const error = new Error('Simulated server error');
        console.error(error.stack);
        
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error\n');
    } else if (shouldDelay) {
        // Generate random delay between 5-10 seconds
        const randomDelay = Math.floor(Math.random() * 6) + 5;
        console.log(`Adding ${randomDelay} second delay (5% chance)`);
        
        https.get(`https://httpbin.org/delay/${randomDelay}`, (apiRes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Hello World (after ${randomDelay}s delay)\n`);
        }).on('error', (err) => {
            console.error(`API call failed: ${err.message}`);
            console.error(err.stack);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World (delay simulation failed)\n');
        });
    } else {
        // Normal response (93% of requests)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }
});

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});