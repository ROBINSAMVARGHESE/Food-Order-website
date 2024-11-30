import foodmodel from '../models/foodmodel.js';
import fs from 'fs'

// Add a food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// all foods list
const listFood = async (req, res) => {
    try {
        const food = await foodmodel.find({});
        res.json({ success: true, data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const updateFood = async (req, res) => {
    const { id, description } = req.body;

    if (!id || !description) {
        return res.status(400).json({ success: false, message: "ID and description are required" });
    }

    try {
        // Find the food item by ID and update its description
        const updatedFood = await foodmodel.findByIdAndUpdate(id, { description }, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        res.json({ success: true, message: "Food description updated successfully", data: updatedFood });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating food description" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodmodel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
 console.log(error);
 res.json({success:false,message:"Error"})
 
    }
}



export { addFood, listFood, updateFood, removeFood }


