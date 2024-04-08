import mongoose from 'mongoose';

const dbConnection = async () => {
   try {
    const MONGO_URI = process.env.MONGO_URI || '';
    const connection = await mongoose.connect(MONGO_URI);
    if (connection) {
        console.log(MONGO_URI);
        console.log('Mongodb connected', connection.connection.host)
        
    } else {
        console.log("Error in connecting the database ");
        
    }
    
   } catch (error) {
    console.log("Error Encountered")
    throw error;
    
   }
}

export default dbConnection;


