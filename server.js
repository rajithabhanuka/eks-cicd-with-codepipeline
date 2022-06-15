const express = require('express');
const app = express();

const pino = require('express-pino-logger')({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            "user-agent": req.headers["user-agent"],
            env: {
                MY_NODE_NAME: process.env.MY_NODE_NAME,
                MY_POD_NAME: process.env.MY_POD_NAME,
                MY_POD_NAMESPACE: process.env.MY_POD_NAMESPACE,
                MY_POD_IP: process.env.MY_POD_IP,
                MY_POD_SERVICE_ACCOUNT: process.env.MY_POD_SERVICE_ACCOUNT
            },
        }),
    },
});

const port = 3000;

//more options here - https://github.com/pinojs/express-pino-logger#example
app.use(pino)

app.get('/', (req, res) => {
    // res.send(`Hello World! from BHANUKA`);
    res.send(`Hello World! from ${process.env.MY_POD_IP}`);
});

app.get('/api/test', (req, res) => {
    res.json({'message': 'Hello World from /api/test!'});
});

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const shutdown = (signalName) => () => {
    console.log(`${signalName} - signal received: closing HTTP server`)
    process.exit(1);
}

process.on('SIGTERM', shutdown("SIGTERM"));
process.on('SIGINT', shutdown("SIGINT"));


