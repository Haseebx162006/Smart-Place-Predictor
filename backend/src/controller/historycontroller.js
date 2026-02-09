const admin = require('../configs/firebase');

exports.getHistory = async (req, res) => {
    try {
        const uid = req.user.uid;
        console.log(`Fetching history for user: ${uid}`);

        const db = admin.firestore();
        const historyRef = db.collection('users').doc(uid).collection('history');

        const snapshot = await historyRef.orderBy('timestamp', 'desc').limit(20).get();

        if (snapshot.empty) {
            return res.json([]);
        }

        const history = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                emotion: data.emotion,
                confidence: data.confidence,
                location: data.location,
                placesCount: data.places ? data.places.length : 0,
                date: data.timestamp ? data.timestamp.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
            };
        });

        return res.json(history);
    } catch (error) {
        console.error("GET HISTORY ERROR:", error.message);
        return res.status(500).json({
            msg: "Error fetching history",
            error: error.message
        });
    }
};
