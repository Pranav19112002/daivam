const express = require("express");
const router = express.Router();
const Hospital = require('../model/hospital');


// Route to get all hospitals
router.get("/getallhospital",async (req, res) => {
    try{
        const hospital = await Hospital.find({});
        res.send(hospital);
    }
    catch(error){
        console.log(error);
          res.status(500).send("Internal Server Error");
    }
});


// Route to get hospital by ID
router.get("/gethospitalbyid", async (req,res)=> {
        const hospitalId = req.body.hospitalid;
        try {
      const foundHospital = await Hospital.findOne({ _id: hospitalId });
      res.send(foundHospital);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
});


// Route to add a new hospital
router.post("/addhospital", async (req, res) => {
  try {
    const newhospital = new Hospital(req.body);
    await newhospital.save();
    res.send("New Hospital is Added ");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route to update hospital information
router.put("/updatehospital/:id", async (req, res) => {
  const hospitalId = req.params.id;
  const updatedHospitalDetails = req.body;

  try {
    await Hospital.updateOne({ _id: hospitalId }, { $set: updatedHospitalDetails });
    res.send("Hospital details updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route to delete a hospital by ID
router.delete("/deletedhospital/:id", async (req, res) => {
  const hospitalId = req.params.id;
  try {
    const deletedHospital = await Hospital.findOneAndDelete({ _id: hospitalId });
    if (deletedHospital) {
      res.send("Hospital deleted successfully");
    } else {
      res.status(404).send("Hospital not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});





// Activation route
router.put('/handleactivate/:hospitalId', async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId;

    // Find the hospital by ID
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }



    // Update the 'display' field to true (activate)
    hospital.display = true;

    // Save the updated hospital
    await hospital.save();

    return res.status(200).json({ message: 'hospital activated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Deactivation route
router.put('/handledeactivate/:hospitalId', async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId;

    // Find the hospital by ID
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Update the 'display' field to false (deactivate)
    hospital.display = false;

    // Save the updated hospital details
    await hospital.save();

    return res.status(200).json({ message: 'Hospital deactivated ' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.get('/gethospitalcount/:hospitalId', async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId;

    // Fetch the hospital by ID from the database
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    // Send the count of the hospital
    res.json({ count: hospital.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
