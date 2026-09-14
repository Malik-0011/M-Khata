import 'dotenv/config'
import express from 'express';
import multer, { memoryStorage } from 'multer';
import cookieParser from 'cookie-parser'
import route from './Routes/Auth.Routes.js'



const app = express();


//middlewares
app.use(express.json());
app.use(cookieParser());

// 2. Configure Multer to use Memory Storage
// This stores the uploaded file as a temporary buffer in req.file.buffer
const upload = multer({ 
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: limit file size to 5MB
});


app.use("/user/", upload.single('image'), route)


export default app;