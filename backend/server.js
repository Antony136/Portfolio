const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const healthRoutes = require('./routes/healthRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/stats', statsRoutes);

// Basic Route for testing
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
