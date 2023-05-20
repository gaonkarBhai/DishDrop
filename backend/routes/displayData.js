const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.foodItem, global.foodCat]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
