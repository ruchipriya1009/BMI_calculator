const User=require('../models/user.model')
const BMIservice=require('../services/bmi.service')
async function calculateUserBMI(req, res) {
  try {
    const { userId, weight, height } = req.body;

    await BMIservice.CalculateBMI(userId, weight, height);

    res.status(200).json({ message: "BMI calculated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const getBmiData = async (req, res) => {
  try {
    const bmiData = await BMIservice.getBmiData();
    res.json(bmiData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching BMI data" });
  }
};




module.exports = { calculateUserBMI, getBmiData };