import express from "express";
import mongoose from "mongoose";;
import foodRouter from "./routes/NLURoutes.js";
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
//solo poner useNewUrlParser y useUnifiedTopology porque las otras están deprecadas
mongoose.connect(
  "mongodb+srv://euge:1234@cluster0.b2f7j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true //hay que agregar esto para que sea único el nombre
  }
);
//si la base de datos no existe Mongo la crea
app.use(foodRouter);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});