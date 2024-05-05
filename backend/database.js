import mongoose from "mongoose";

const dbConnection = async () =>{
    try{
        await mongoose.connect('mongodb+srv://udayngadissanayke99:d6Q7ZWuYTBSMDQRu@pro-db.ks4li6d.mongodb.net/')
        .then( () => {
            console.log('DB connected successfully');
        }).catch(err => console.log('db not connected'))

    }catch(err){
        console.log(err);
        throw err;
    }
}

export default dbConnection;
