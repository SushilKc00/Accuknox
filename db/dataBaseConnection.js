import mongoose from "mongoose";

const connectDataBase = async () => {
  try {
    await mongoose.connection
      .on("error", (error) => {
        console.log(error);
      })
      .on("connected", (error) => {
        {
          console.log(
            `Database successfully connected at ${mongoose.connection.port}`
          );
        }
      });
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(`Error is ${Error}`);
    process.exit(1);
  }
};

export default connectDataBase;
