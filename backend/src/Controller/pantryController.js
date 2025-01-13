const pantryModal = require("../models/pantrySchema");

const addStaffDetails = async (req, res) => {
  try {
    

    const { staffName, contactInfo, location } = req.body;

    const newPantry = new pantryModal({
      staffName: staffName,
      contactInfo: contactInfo,
      location: location,
    });

    await newPantry.save();
    res.status(201).json({ message: "inner pantry staff details saved" });
  } catch(error) {
    res.status(201).json({ message: error.message });
  }
};
const getStaffDetails = async (req,res) =>{

  try {
      const pantry = await pantryModal.find();
      res.status(201).json(pantry);
    } catch (error) {
      res.status(500).json({ message: "Error got", error: error.message });
    }
}
const getStaffIDAndName = async (req,res) =>{

  try {
      const pantry = await pantryModal.find({}, { _id: 1, staffName: 1 });
      res.status(201).json(pantry);
    } catch (error) {
      res.status(500).json({ message: "Error got", error: error.message });
    }
  }
module.exports = { addStaffDetails,getStaffDetails,getStaffIDAndName };
