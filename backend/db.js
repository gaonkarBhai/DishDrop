const mongoose = require("mongoose");
const url = "add your own url bruh";

const connDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB CONNECTED");
    const fetchedData = await mongoose.connection.db.collection("sample").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("CategoryName").find({}).toArray();
    global.foodItem = fetchedData
    global.foodCat = foodCategory
  } catch (e) {
    console.log(e);
  }
}

module.exports = connDb;
