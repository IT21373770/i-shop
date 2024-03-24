import stock from '../models/stock.js';

//insert stock
export const addStock = async(req, res, next)=> {
        try {
            const {Product_Id,Quantity,Unit_price,Supplier,Expire_date} = req.body;
            const d = new Date();
            const date = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
            const time = d.getHours()+":"+d.getMinutes();

            const newStock = new stock({
                Product_Id: Product_Id,
                Quantity: Quantity,
                Unit_price: Unit_price,
                Supplier: Supplier,
                Expire_date: Expire_date,    
                date: date,
                time: time
            });

            await newStock.save();
            res.status(201).json("Stock added successfully");
        } catch (error) {
            console.log(error);
            res.status(400).json("Error adding stock");
        }
};

//display stock
export const getStock = async (req, res) =>{
    try {
        let Id = req.params.id;
        const stock = await stock.find({Product_Id:Id})
        res.json(stock);
    } catch (error) {
        console.log(error);
    }

};

//delete stock
export const deleteStock = async (req, res) => {
    try {
        await stock.deleteOne({_id:req.params.id})
        res.status(200).json({ message: "Stock deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json("Stock delete failed");
    }
};

export const stockSum = async (req, res) => {
    try {
        let id=req.params.id
        const stockSum = await stock.aggregate([{$match:{date:{$regex :id}}},{$group:{_id:null ,price:{$sum: { $multiply: ["$Quantity","$Unit_price"]}}}}])
        res.json(stockSum);
    } catch (error) {
        console.log(error);
    }
};