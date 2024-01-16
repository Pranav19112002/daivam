
const express=require("express")
const app=express();
const cors = require('cors');



const AdminRouter = require('./routes/adminRouter')
const doctorRouter = require('./routes/doctorsRouter')
const hospitalRouter = require('./routes/hospitalRouter')
const departmentRouter = require('./routes/departmentRouter')

app.use(cors());
app.use(express.json())


app.use('./api/admin',AdminRouter)
app.use('./api/doctors',doctorRouter)
app.use('./api/hospitals',hospitalRouter)
app.use('./api/departments',departmentRouter)

app.listen(3005,()=>

    console.log("connected")
)