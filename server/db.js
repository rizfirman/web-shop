import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

export default connectToDatabase;