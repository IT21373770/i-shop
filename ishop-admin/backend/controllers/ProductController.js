import Category from '../models/category.js';
import product from '../models/products.js';

//insert product details
export const addProduct = async(req, res, next) => {
        try {
            const {Product_Id,Product_name,Category_Id,Quantity,Total_cost,Re_order_level,unit} = req.body;

            const category = await Category.findById(Category_Id);
            if(!category){
                res.status(201).json({message:"Category does not exist"});
                return;
            }

            const newProduct = new product({
                Product_Id: Product_Id,
                Product_name: Product_name,
                Category_Id: Category_Id,
                Quantity: Quantity,
                Total_cost: Total_cost,             
                Re_order_level: Re_order_level,  
                unit: unit
            });

            await newProduct.save();
            res.status(201).json({message:"Product added successfully"});
        } catch (error) {
            console.log(error);
            res.status(400).json({error:"Error adding product"});
        }
};

//update product details
export const updateProduct = async(req, res) => {
    try {
        let Id = req.params.id;
        const Item_Name  = req.body.name;
        const Quantity =req.body.qty;
        const Total_Cost = Number(req.body.totalCost1);
        const Re_Order_Level = req.body.reorderlevel;
        const unit = req.body.unit;

        const updateProduct = {Item_Name,Quantity,Total_Cost,Re_Order_Level,unit}

        await product.updateOne({Item_Id:Id},{$set:updateProduct})
        res.status(201).json({message:"Product details updated"});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error updating product"});
    }
};

//display product details
export const getProduct = async (req, res) => {
    try {
        const products = await product.find().sort({Item_Name:-1});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error"});
    }
};

export const searchProduct = async (req, res) => {
    try {
        const latestProduct = await product.find({},{Item_Id:1}).sort({_id:-1}).limit(1);
        res.json(latestProduct);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error"});
    }
};

export const updateQty = async (req, res) => {
    let Id = req.params.id;
   
    const Quantity =req.body.Quantity;
    const Total_cost = req.body.cost;
    
     product.find({Product_Id:req.params.id}).then((product)=>{
        var Quantity1 =product[0].Quantity
        var cost1 =product[0].Total_cost

        update2(Quantity1,cost1)
        console.log(product)
        
    }).catch((err)=>{
        console.log(err)
    })

    function update2(qty,cost3){
        var Quantity3=Number(qty-Quantity)
        var Total_Cost3=Number(cost3-Total_cost)

        product.updateOne({Product_Id:Id},{$set:{Quantity:Quantity3,Total_cost:Total_Cost3}})

        .then(()=>{
            res.status(201).json({message:"Product details updated"})
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({error:"Product details update failed"});
        })
    }
};

export const findProduct = async (req, res) => {
    try {
        const findProd = await product.find({Product_Id:req.params.id})
        res.json(findProd);
    } catch (error) {
        console.log(err);
    }
};

export const getSum = async (req, res) => {
    try {
        const getSum = await product.aggregate([{$group:{_id:null ,price:{$sum:"$Total_cost" }}}])
        res.json(getSum);
    } catch (error) {
        console.log(err);
    }
};
