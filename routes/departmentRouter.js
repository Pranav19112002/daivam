const express = require("express");
const router = express.Router();
const Department = require('../model/department');


// Route to get all departments
router.get("/getalldepartment",async (req, res) => {
    try{
        const department = await Department.find({});
        res.send(department);
    }
    catch(error){
        console.log(error);
          res.status(500).send("Internal Server Error");
    }
});


// Route to get department by ID
router.get("/getdepartmentbyid", async (req,res)=> {
        const departmentid = req.body.departmentid;
        try {
      const foundDepartment = await Department.findOne({ _id: departmentid });
      res.send(foundDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
});


// Route to add a new department
router.post("/adddepartment", async (req, res) => {
  try {
    const newdepartment = new Department(req.body);
    await newdepartment.save();
    res.send("New Department is Added ");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route to update department information
router.put("/updatedepartment/:id", async (req, res) => {
  const departmentId = req.params.id;
  const updatedDepartmentDetails = req.body;

  try {
    await Department.updateOne({ _id: departmentId }, { $set: updatedDepartmentDetails });
    res.send("Department details updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Route to delete a department by ID
router.delete("/deletedepartment/:id", async (req, res) => {
  const departmentId = req.params.id;
  try {
    const deletedDepartment = await Department.findOneAndDelete({ _id: departmentId });
    if (deletedDepartment) {
      res.send("Department deleted successfully");
    } else {
      res.status(404).send("Department not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});





// Activation route
router.put('/handleactivate/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    // Find the room by ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }



    // Update the 'display' field to true (activate)
    department.display = true;

    // Save the updated room
    await department.save();

    return res.status(200).json({ message: 'Department activated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Deactivation route
router.put('/handledeactivate/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    // Find the department by ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Update the 'display' field to false (deactivate)
    department.display = false;

    // Save the updated room
    await department.save();

    return res.status(200).json({ message: 'Department deactivated ' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.get('/getdepartmentcount/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    // Fetch the room by ID from the database
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Send the count of the room
    res.json({ count: department.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
