import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    discount:{type:Number,default:0},
    category: { type: String, required: true },
});

const foodmodel = mongoose.Model.food || mongoose.model('food', foodSchema)
export default foodmodel;