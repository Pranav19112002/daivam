const mongoose=require("mongoose")
var mongoUrl="mongodb+srv://pranavunnikrishnan56:anaswar@cluster0.pwm4el4.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl)
.then(()=>{
    console.log("Database Connected")

})

.catch(err =>
    {
        console.log(err)
    })

    module.exports=mongoose