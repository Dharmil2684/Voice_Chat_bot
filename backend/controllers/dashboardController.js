const InteractionLog = require('../models/InteractionLog');
const mongoose = require('mongoose');

exports.getStats = async (req, res) => {
    try {
        const userId = req.user.id; // Gets ID from the logged-in token

        // 1. Count YOUR conversations only
        const totalQueries = await InteractionLog.countDocuments({ userId: userId });

        // 2. Calculate Average Speed (Only for YOUR logs)
        const avgLatencyData = await InteractionLog.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // <--- CRITICAL FILTER
            { $group: { _id: null, avgLatency: { $avg: "$latencyMs" } } }
        ]);
        
        const avgLatency = avgLatencyData.length > 0 
            ? Math.round(avgLatencyData[0].avgLatency) 
            : 0;

        // 3. Get YOUR last 20 conversations
        const recentLogs = await InteractionLog.find({ userId: userId })
            .sort({ timestamp: -1 })
            .limit(20);

        res.json({
            totalQueries,
            avgLatency,
            recentLogs
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};