require('dotenv').config();
const admin = require('firebase-admin');
const mongoose = require('mongoose');

console.log("1. Environment Variables Loaded");
console.log("   PORT:", process.env.PORT);
console.log("   DB_URL:", process.env.DB_URL);
console.log("   Project ID:", process.env.project_id);

async function testFirebase() {
    console.log("\n2. Testing Firebase Initialization...");
    try {
        const serviceAccount = {
            projectId: process.env.project_id,
            clientEmail: process.env.client_email,
            privateKey: process.env.private_key ? process.env.private_key.replace(/\\n/g, "\n") : undefined
        };

        if (!serviceAccount.privateKey) {
            throw new Error("Private key is missing in .env");
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("   ✅ Firebase Initialized Successfully");
    } catch (error) {
        console.error("   ❌ Firebase Failed:", error.message);
    }
}

async function testMongo() {
    console.log("\n3. Testing MongoDB Connection...");
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("   ✅ MongoDB Connected Successfully");
        await mongoose.disconnect();
    } catch (error) {
        console.error("   ❌ MongoDB Failed:", error.message);
    }
}

async function run() {
    await testFirebase();
    await testMongo();
    console.log("\nTest Complete.");
}

run();
