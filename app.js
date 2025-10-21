// ESM version
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Import routes (must use .js extension or set "type": "module" in package.json)
import authRoutes from "./routes/authRoutes.js";

// Fix __dirname and __filename since they don’t exist in ESM by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Auth routes
app.use("/", authRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

