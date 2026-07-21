const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const healthRoutes = require('./routes/healthRoutes');
const statsRoutes = require('./routes/statsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const PageView = require('./models/PageView');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Page-view tracker (fires on every request to the root API) ──
app.use(async (req, res, next) => {
    // Only count unique browser visits (not API polling), skip if from localhost dev tools
    if (req.method === 'GET' && req.path === '/') {
        const today = new Date().toISOString().split('T')[0];
        try {
            await PageView.findOneAndUpdate(
                { date: today },
                { $inc: { count: 1 } },
                { upsert: true, new: true }
            );
        } catch (e) { /* non-blocking */ }
    }
    next();
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

// Basic Route for testing / page view ping
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Portfolio API is running...',
        timestamp: new Date().toISOString(),
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
