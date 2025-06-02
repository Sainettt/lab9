const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      console.log("Connected!");
      database = client.db("library");
      callback()
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    });
}
const getDatabase = () => {
  if (database) {
    return database;
  }
  throw new Error("Database not initialized");
};
module.exports = { mongoConnect, getDatabase };