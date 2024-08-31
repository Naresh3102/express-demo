const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://naresh:naresh123@cluster0.puegz.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to db");
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
},{collection: 'Student'});

const UserModel = mongoose.model("", userSchema);

const app = express();
app.use(express.json());

app.get("/user", async (req, res) => {
  const userData = await UserModel.find();
  res.json(userData);
});

app.post('/user', async (req, res)=>{
    const {name, email, city} = req.body;
    const newUser = new UserModel({name, city})
    const resData = await newUser.save();
    res.json(resData)

})

// app.get("/about", (req, res) => {
//   res.send("Hello from the about");
// });

app.listen(3000, () => {
  console.log("Server is running");
});
