import { Router } from "express";
import { stockSum, addStock, deleteStock, getStock } from "../controllers/StockController.js";

export const StockRoute = Router();

StockRoute.post('/add',addStock);
StockRoute.get('/find/:id',getStock);
StockRoute.delete('/delete/:id',deleteStock);
StockRoute.get('/sum/:id',stockSum);