import mongoose from 'mongoose';

const connectDB = (url) => {
    console.log(url);
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('MongoDB connection established!'))
        .catch(err => console.log(err));
}

export default connectDB;