import category from '../models/category.js';

//add category
export const addCategory = async(req, res) => {
    try {
        const id = req.body.id;
        const name  = req.body.name;
            
        const newCategory = new category({
            Category_id: id,
            Category_name: name                      
        });

        await newCategory.save();
        res.status(201).json({message:"Category added successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: "Error adding category"});
    }
};

//update category
export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const newName  = req.body.name;

        await category.updateOne({Category_id:id},{$set: {Category_name:newName} });
        res.status(201).json({message:"Category updated"});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Catogory update failed"});
    }

};

//display categories
export const getCategory = async (req, res) => {
    try {
        const categories = await category.find().sort({Category_id:1});
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error"});
    }

};

//delete category
export const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;

        const deletecat =  await category.deleteOne({ Category_id: id });
        if (deletecat.deletedCount === 1) {
            res.status(200).json({ message: "Category deleted successfully" });
        } else {
            res.status(404).json({ error: "Category not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Category delete failed"});
    }

};

//get latest category
export const getCategoryId = async (req, res) => {
    try {
        const latestCategory = await category.find({}, { Category_id: 1, _id: 0 }).sort({ _id: -1 }).limit(1);
        res.json(latestCategory);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error"});
    }

};
    
