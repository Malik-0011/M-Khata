import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import 'dotenv/config';


const port = process.env.PORT || 3000;
connectDB()


app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})