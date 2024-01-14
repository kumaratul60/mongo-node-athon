import cors from 'cors';
import express from 'express';
const app = express();

// .use for middleware configuration
//app.use(cors())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
// for url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// store file/folder
app.use(express.static("public"));

// routes import
import userRoutes from "./routes/apiRoutes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRoutes);


export { app };

