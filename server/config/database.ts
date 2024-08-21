import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.DB_STRING as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

     console.log(`MongoDB Connected: ${(await conn).connection.host} ${process.env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB