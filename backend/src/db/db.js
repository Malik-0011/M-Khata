import mongoose from 'mongoose';

async function connectDB () {

try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected DB : ${conn.connection.name}`);
    
} catch (error) {
    console.log('MONGODB CONNECTION FAILED : ',error);   
}
}

export default connectDB;