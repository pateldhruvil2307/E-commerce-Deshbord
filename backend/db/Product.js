const mongoose = require('mongoose');


const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    image:String
})  
module.exports=mongoose.model('products',productSchema);


