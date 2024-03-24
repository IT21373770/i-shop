import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    Category_id:{
        type: String,
        required: true
    },
    Category_name:{
        type: String,
        required: true
    }
});

const category = mongoose.model("category",categorySchema);

export default category;