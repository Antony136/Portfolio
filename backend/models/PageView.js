const mongoose = require('mongoose');

const pageViewSchema = mongoose.Schema({
    date: {
        type: String, // format: 'YYYY-MM-DD'
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('PageView', pageViewSchema);
