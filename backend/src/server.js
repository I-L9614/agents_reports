import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/mongo.js";
import { seedAdmin } from "./services/seedAdmin.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    await seedAdmin();

} catch (error) {
    console.error("Failed to start server:", error.message);
}
}

startServer();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});