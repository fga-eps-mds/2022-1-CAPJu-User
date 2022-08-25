import mongoose from "mongoose";

export const mongoDB = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(
      process.env.MONGODB_URI_TESTE ||
        "mongodb+srv://capju:3npIZt0BDreDRJTI@cluster0.aqleb.mongodb.net/hellenTest?retryWrites=true&w=majority"
    );
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
