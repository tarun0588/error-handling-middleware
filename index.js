const express = require("express");
const app = express();

app.use(express.json())

//Middleware for error handling
function errorHandler(err, req, res, next) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
}


//Middleware for validation
function validRegistration(req, res, next){

    const { firstName, lastName, password, email, phone } = req.body;

    //validate first name and last name
    if(!firstName || firstName[0] !== firstName[0].toUpperCase()){
        return res.status(400).json({ error: 'First name must start with an uppercase letter.' });
    }
    if(!lastName || lastName[0] !== lastName[0].toUpperCase()){
        return res.status(400).json({ error: 'Last name must start with an uppercase letter.'});
    }
    
    //validate email
    if(!email || !email.includes("@") ){
        return res.status(400).json({error: "Invalid email address."})
    }

    //validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and include one special character, one uppercase letter, and one numeric character.' });
    }
    
    //validate phone number
    if(!phone || phone.length !== 10){
        return res.status(400).json({error: "Phone number must be at least 10 digits long"})
    }
    next();
}

//registration route
app.post("/register",validRegistration,(req,res)=>{
   res.status(201).json({
    message:"User registered successfully"
   })
})

//error handler middleware
app.use(errorHandler)

app.listen("4000",()=>{
    console.log("Server is running on port 4000");
})