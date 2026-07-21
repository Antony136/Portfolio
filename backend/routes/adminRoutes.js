const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const PageView = require('../models/PageView');
const protect = require('../middleware/authMiddleware');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        return res.json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
});

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (JWT)
router.get('/dashboard', protect, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch all page views
        const allViews = await PageView.find().sort({ date: -1 });
        const todayDoc = allViews.find(v => v.date === today);
        const todayVisits = todayDoc ? todayDoc.count : 0;
        const totalVisits = allViews.reduce((sum, v) => sum + v.count, 0);

        // Last 7 days chart data
        const last7 = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const found = allViews.find(v => v.date === dateStr);
            last7.push({ date: dateStr, count: found ? found.count : 0 });
        }

        // Fetch all contact messages
        const messages = await Message.find().sort({ createdAt: -1 }).limit(20);
        const totalMessages = await Message.countDocuments();

        res.json({
            success: true,
            totalVisits,
            todayVisits,
            last7Days: last7,
            totalMessages,
            recentMessages: messages,
        });
    } catch (err) {
        console.error('Admin dashboard error:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
