import mongoose from "mongoose";

const connectDb=async()=>{

    mongoose.connection.on('connected',()=>{
        console.log("database connected");
        
    })
    await mongoose.connect(process.env.MONGO_URI);

}

export default connectDb;