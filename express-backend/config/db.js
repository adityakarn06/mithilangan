import mongoose from 'mongoose';

export const connectDB = async(URL) => {
    await mongoose.connect(URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB Error:",err));
}