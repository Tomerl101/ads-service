import mongoose from 'mongoose';
let database: mongoose.Connection;

export async function connectMongoDb() {
  // add your own uri below
  const uri: string = process.env.MONGO_PATH!;
  console.log('process.env.MONGO_PATH', process.env.MONGO_PATH);
  if (database) {
    return;
  }

  try {
    console.log('Start connection to mongodb...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      bufferCommands: false,
    });
    database = mongoose.connection;
    database.once('open', async () => {
      console.log('Connected to mongo database');
    });
    database.on('error', () => {
      console.log('Error connecting to mongo database');
    });
    return database;
  } catch (error) {
    console.log('Failed to connect mongodb with error: ', error);
    throw new Error('Failed to connect db...');
  }
}

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
