const { GoogleGenerativeAI } = require("@google/generative-ai");
const InteractionLog = require('../models/InteractionLog');
const User = require('../models/User');

// Initialize Gemini with the CORRECT Free Tier model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

// 1. Process Audio/Text
exports.processAudio = async (req, res) => {
    const { userText } = req.body; 
    const userId = req.user.id; // Gets ID from Auth Middleware

    if (!userText) return res.status(400).json({ message: "No text provided" });

    try {
        const startTime = Date.now();

        // --- A. Fetch User Details (Dynamic Context) ---
        const user = await User.findById(userId);
        const userName = user ? user.name : "Valued Customer";

        // --- B. Create the Intelligent Prompt ---
        const prompt = `
        You are a helpful AI assistant.
        You are talking to a customer named "${userName}".
        User said: "${userText}"
        
        Instructions:
        1. Answer the user's question clearly.
        2. Be polite and use their name occasionally (not every time).
        3. Keep your answer concise (max 3-4 sentences) for voice output.
        `;

        // --- C. Generate Response ---
        const result = await model.generateContent(prompt);
        const botResponse = result.response.text();

        // --- D. Save Log to Database ---
        await InteractionLog.create({
            userId: userId,
            userQuery: userText,
            botResponse: botResponse,
            latencyMs: Date.now() - startTime,
        });

        // --- E. Send Back to Frontend ---
        res.json({ text: userText, botResponse });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "AI processing failed" });
    }
};

// 2. Fetch History
exports.getChatHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get history for THIS specific user only
        const history = await InteractionLog.find({ userId })
            .sort({ timestamp: 1 }); // Oldest first (Natural conversation flow)

        // Format for Frontend UI
        const formattedHistory = history.flatMap(log => [
            { sender: 'user', text: log.userQuery },
            { sender: 'bot', text: log.botResponse }
        ]);

        res.json(formattedHistory);
    } catch (error) {
        console.error("History Error:", error);
        res.status(500).json({ message: "Failed to fetch history" });
    }
};