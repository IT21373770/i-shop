import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    Product_Id:{
        type:String,
        required:true
    },
    Product_name:{
        type:String,
        required:true
    },
    Category_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Total_cost:{
        type:Number,
        required:true
    },
    Re_order_level:{
        type:Number,
        required:true
    },
    unit:{
        type:String,
        required:true
    }
});

const product = mongoose.model("product",productSchema);

export default product;