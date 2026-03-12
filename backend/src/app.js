import express from 'express';
import cors from 'cors';
import authRouths from "./routes/auth.routes.js";
import usersRoutes from './routes/users.routes.js';
import reportsRoutes from './routes/reports.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static("src/uploads"));

app.get('/', (req, res) => {
    res.json({ message: "Server is running" });
});

app.use('/auth', authRouths);
app.use('/users', usersRoutes);
app.use('/reports', reportsRoutes);
app.use('/dashboard', dashboardRoutes);

export default app;