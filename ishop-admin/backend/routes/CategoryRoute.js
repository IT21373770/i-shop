import { Router } from "express";
import { addCategory, deleteCategory, getCategory, searchCategory, updateCategory } from "../controllers/CategoryController.js";

export const CategoryRoute = Router();

CategoryRoute.post('/add',addCategory);
CategoryRoute.put('/update/:id',updateCategory);
CategoryRoute.delete('/delete/:id',deleteCategory);
CategoryRoute.get('/get',getCategory);

CategoryRoute.get('/CatId',searchCategory);