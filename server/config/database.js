const mongoose = require("mongoose");

async function connectToDB() {
  const dbURI = process.env.MONGO_URI;

  try {
    mongoose.set("strictQuery", false);

    mongoose
      .connect(dbURI)
      .then((con) => {
        console.log(`\n Connected to Database!: ${con.connection.host} \n `);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connectToDB,
};
