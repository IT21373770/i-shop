import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stockShema = new Schema({
    Product_Id:{
        type:String,
        // required: true
    },
    Quantity:{
        type:Number,
        required: true
    },
    Unit_price:{
        type:Number,
        required: true
    },
    Supplier:{
        type:String
    },
    Expire_Date: { 
        type:String 
    },
    date: { 
        type:String 
    },
    time: { 
        type:String 
    },
});

const Stock = mongoose.model("stock",stockShema);

export default Stock;