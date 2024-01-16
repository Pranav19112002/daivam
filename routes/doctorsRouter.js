const express = require("express");
const router = express.Router();
const Doctor = require('../model/doctor');


// Route to get all rooms
router.get("/getalldoctors",async (req, res) => {
    try{
        const doctors = await Doctor.find({});
        res.send(doctors);
    }
    catch(error){
        console.log(error);
          res.status(500).send("Internal Server Error");
    }
});


// Route to get room by ID
router.get("/getdoctorbyid", async (req,res)=> {
        const doctorid = req.body.doctorid;
        try {
      const foundDoctor = await Doctor.findOne({ _id: doctorid });
      res.send(foundDoctor);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
});


// Route to add a new doctor
router.post("/adddoctor", async (req, res) => {
  try {
    const newdoctor = new Doctor(req.body);
    await newdoctor.save();
    res.send("New Doctor is Added ");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route to update doctor information
router.put("/updatedoctor/:id", async (req, res) => {
  const doctorId = req.params.id;
  const updatedDoctorDetails = req.body;

  try {
    await Doctor.updateOne({ _id: doctorId }, { $set: updatedDoctorDetails });
    res.send("Doctor details updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route to delete a doctor by ID
router.delete("/deletedoctor/:id", async (req, res) => {
  const doctorId = req.params.id;
  try {
    const deletedDoctor = await Doctor.findOneAndDelete({ _id: doctorId });
    if (deletedDoctor) {
      res.send("Doctor deleted successfully");
    } else {
      res.status(404).send("Doctor not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});





// Activation route
router.put('/handleactivate/:doctorId', async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Find the room by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }



    // Update the 'display' field to true (activate)
    doctor.display = true;

    // Save the updated room
    await doctor.save();

    return res.status(200).json({ message: 'Doctor activated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Deactivation route
router.put('/handledeactivate/:doctorId', async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Find the room by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update the 'display' field to false (deactivate)
    doctor.display = false;

    // Save the updated room
    await doctor.save();

    return res.status(200).json({ message: 'Doctor deactivated ' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.get('/getdoctorcount/:doctorId', async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Fetch the room by ID from the database
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Send the count of the room
    res.json({ count: doctor.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
