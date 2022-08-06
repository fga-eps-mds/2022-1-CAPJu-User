import mongoose from "mongoose";

export const mongoDB = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(
      process.env.MONGODB_URI_TESTE || "mongodb://mongodb/capjuTeste"
    );
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
