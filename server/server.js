import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connect from './db/connect.js';
import authRoutes from './routes/auth.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 9000;

//Middleware
app.use(express.json());
app.use(cors());


//Routes
app.use('/api/auth',authRoutes);

app.listen(PORT, async ()=> {
    console.log(`Listening on port - ${PORT}`);
    await connect();
});

