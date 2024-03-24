import 'dotenv/config'
import express from 'express';
import dbConnection from './database.js';
import bodyParser from 'body-parser';
import cors from "cors";

import { CategoryRoute } from './routes/CategoryRoute.js'
import { ProductRoute }  from "./routes/ProductRoute.js";
import { StockRoute } from "./routes/StockRoute.js";

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('here')
})

app.use("/api/Category", CategoryRoute);
app.use("/api/Product", ProductRoute);
app.use("/api/Stock", StockRoute);

await dbConnection();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


