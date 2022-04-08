import { Router } from "express";
import UserData from '../models/userSchema.js';
import { uuid } from 'uuidv4';
import User from "../../../fromakhil/NodeJS-server/models/userSchema.js";


const router = Router();

//CRUD operations

//Create a user

router.post('/register', async(req,res) =>{
    try{
        const { name,email,password,confirmPassword } = req.body;
        const userInfo = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        if(!userInfo.name || !userInfo.email || !userInfo.password || !userInfo.confirmPassword){
            res.json({message: "Enter all the fields"})
        }
        else{
            if(userInfo.password !== userInfo.confirmPassword){
                res.json({message: "Password doesn't match"})
            }
            else{
                if( userInfo.password.length < 6){
                    res.json({message: "Minimum password length is 6 characters"})
                }
                else{
                    const emailExists = await UserData.findOne({email : userInfo.email})
                    console.log({emailExists})
                    if(!emailExists){
                        const user = new UserData(userInfo);
                        await user.save();
                        res
                            .status(201)
                            .json({message : `user -${userInfo.name}- details added successfully!`,
                                    data: user})
                    } 
                    else{
                        res.json({message : `Email -${userInfo.email}-  already exists. Please use different account `,
                                    data: emailExists})
                    }
                }
                
            }
        }

    }
    catch(e){
        res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
    }
})

//Login user

router.post('/login', async(req,res) => {
    const { email, password} = req.body;
    try{
        if(!email || !password){
            res.json({Error: "Enter all the fields"})
        }
        else{
            const emailExists = await UserData.findOne({email: email});
            if(!emailExists){
                res.json({Error : "email doesn't exist", data: emailExists})
            }
            else{
                if(emailExists.password !== password){
                    res.json({Error: "Invalid credentials"})
                }
                else{
                    res.json({message : "Login successful!", data: emailExists})
                }
            }
        }
    }
    catch(e){
        res
            .status(500)
            .json({ Error: e.message})
    }
  
})


// Get all users
router.get('/', async(req,res) => {
    try{
        const allUsers = await UserData.find()
        res.status(200).json({message: "All user data is found", data : allUsers})
    }
    catch(e){
        res.status(500).json({message:"Internal server error", Error: e.message})
    }
});

// Get one user
router.get('/:id', async(req,res) => {
    const id = req.params.id;
    try{
        const user = await UserData.findById(id)
        res.status(200).json({message: "User found", data: user})
    }
    catch(e){
        res.status(500).json({message: "Internal server error", Error: e.message})

    }
})


//update user
router.put('/update/:id', async(req,res) => {
    const id = req.params.id;
    const {name, password} = req.body;
    const update = {
        name : name,
        password: password
    }
    const filter = { _id : id}
    
    try{
        const modifyUser = await UserData.findOneAndUpdate(filter,update,{new:true})
        res.status(200).json({message:"Update applied", data: modifyUser})

    }
    catch(e){
        res.status(500).json({Error : e.message})

    }
})

//delete a user

router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserData.findByIdAndDelete(id);
      res.status(200).json({message: "User deleted successfully", data: user});
    }catch (e) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: e.message });
    }
  })

  //delete all users

router.delete("/delete", async (req, res) => {
    try {
      const user = await UserData.remove({} , (err) => {
          console.log("Deleted all records");
      });
      res.status(200).json({message: "All users deleted successfully", data: user});
    }catch (e) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: e.message });
    }
  })


export default router;