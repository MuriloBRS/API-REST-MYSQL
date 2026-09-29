import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
//import {pool} from "./config/db.js"

dotenv.config();

const app = express();
const PORT = 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Servidor MySQL rodando em http://localhost:${PORT}`);
});

//console.log(pool.host)
