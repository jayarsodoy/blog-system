// ESM version
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./models/db.js";
// Import routes (must use .js extension or set "type": "module" in package.json)
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import expressLayouts from "express-ejs-layouts";

// Fix __dirname and __filename since they don’t exist in ESM by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize app
const app = express();

const PgSession = connectPgSimple(session);
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as view engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout.ejs"); 
app.set("view cache", false);


// ✅ SESSION SETUP
app.use(
  session({
    store: new PgSession({
      pool: pool, // reuse your PostgreSQL pool
      tableName: "user_sessions"
    }),
    secret: "mysecretkey", // change this to something strong in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// in app.js
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.posts = req.session.posts || null;
  res.locals.comments = req.session.comments || null;
  next();
});


// Auth routes
app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes); // Add this line to include comment routes

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

