const BMI = require("../models/bmi.model");
const User = require("../models/user.model");


async function CalculateBMI(userId, weight, height) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const heightInMeters = height / 100; // Convert height from cm to meters
    const bmi = weight / (heightInMeters * heightInMeters);
    
   let category = "";

   if (bmi <= 18.5) {
     category = "Underweight";
   } else if (bmi <= 24.9) {
     category = "Normal weight";
   } else if (bmi <= 29.9) {
     category = "Overweight";
   } else if (bmi <= 34.9) {
     category = "Obesity";
   } else if (bmi >= 35 && bmi <= 39.9) {
     category = "Extreme obesity";
   }else{
    category="Out of Category"
   }

    const userBMI = new BMI({
      user: userId,
      weight,
      height,
      bmi: bmi.toFixed(2), 
    category
    });

    await userBMI.save();

    user.bmi = userBMI._id;
    await user.save();

    return { message: "BMI calculated successfully",userBMI };
  } catch (error) {
    throw new Error("Failed to calculate BMI");
  }
}

const getBmiData = async () => {
  try {
   
    const bmiData = await BMI.find().sort({ date: -1 });
    return bmiData;
  } catch (error) {
    throw new Error("Error fetching BMI data");
  }
};
module.exports = { CalculateBMI, getBmiData };