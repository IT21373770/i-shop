import { Router } from "express";
import { addCategory, deleteCategory, getCategory, getCategoryId, updateCategory } from "../controllers/CategoryController.js";

export const CategoryRoute = Router();

CategoryRoute.post('/add',addCategory);
CategoryRoute.get('/get',getCategory);
CategoryRoute.put('/update/:id',updateCategory);
CategoryRoute.delete('/delete/:id',deleteCategory);
CategoryRoute.get('/CatId',getCategoryId);