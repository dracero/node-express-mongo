import express from "express";
import mongoose from "mongoose";;
import foodRouter from "./routes/NLURoutes.js";

const app = express();

app.use(express.json());
//solo poner useNewUrlParser y useUnifiedTopology porque las otras están deprecadas
mongoose.connect(
  "mongodb+srv://euge:1234@cluster0.b2f7j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
  }
);
//si la base de datos no existe Mongo la crea
app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});