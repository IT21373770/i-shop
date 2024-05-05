import { Router } from "express";
import { addProduct, findProduct, getProduct, getSum, searchProduct, updateProduct, updateQty } from "../controllers/ProductController.js";

export const ProductRoute = Router();

ProductRoute.post('/add',addProduct);
ProductRoute.put('/update',updateProduct);
ProductRoute.get('/get',getProduct);
ProductRoute.get('/proId',searchProduct);
ProductRoute.post('/update1/:id',updateQty);
ProductRoute.post('/findone/:id',findProduct);
ProductRoute.post('/sum',getSum);
