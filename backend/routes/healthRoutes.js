const express = require('express');
const connectDB = require('../config/db');

const router = express.Router();

router.all('/', (req, res) => {
    const dbConnected = connectDB.isDBConnected();

    if (req.method === 'HEAD') {
        return res.status(200).end();
    }

    if (dbConnected) {
        return res.status(200).json({
            status: 'ok',
            server: 'up',
            database: 'up',
            timestamp: new Date().toISOString(),
        });
    }

    return res.status(200).json({
        status: 'ok',
        server: 'up',
        database: 'down',
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
