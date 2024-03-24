import category from '../models/category.js';

//insert category
export const addCategory = async(req, res, next) => {
    try {
        console.log(id,name);
        const {id, name} = req.body;
            
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
        let Id = req.params.id;
        const {name} = req.body;

        await category.updateOne({category_id:Id},{$set: {Category_name:name} });
        res.status(201).json({message:"Category updated"});
    } catch (error) {
        console.log(err);
        res.status(400).json({error:"Catogory update failed"});
    }

};

//display categories
export const getCategory = async (req, res) => {
    try {
        const categories = await category.find().sort({ category_id: 1 });
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error"});
    }

};

//delete category
export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await category.deleteOne({ category_id: id });
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        console.log(err);
        res.status(400).json("Category delete failed");
    }

};

export const searchCategory = async (req, res) => {
    try {
        const latestCategory = await category.find({}, { category_id: 1 }).sort({ _id: -1 }).limit(1);
        res.json(latestCategory);
    } catch (error) {
        console.log(err);
        res.status(400).json({error:"Error"});
    }

};
    
