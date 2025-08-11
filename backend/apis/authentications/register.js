import { Router } from "express";
import argon from "argon2";
import { User_Modl } from "../../database/schemas/export.js";
import jwt from 'jsonwebtoken'
import env from 'dotenv'

const router= Router();
env.config();

router.post('/',async (req,res)=>{
    const {fname,lname,email,password} = req.body;

    if(email===process.env.ADMIN){
    const user= await User_Modl.findOne({where: {email}});

    if(user){
        res.status(409).json({msg:'invalid'});
    }

    else if (!user){
        const hash = await argon.hash(password);
        const role = 'admin'
        const secret=process.env.JWT_SECRET;
        
        
        const newUser = await User_Modl.create({
            fname,
            lname,
            email,
            password:hash,
            role
        });
        

        res.status(200).json({msg:'Welcome admin'});
    }
}
else{
    res.status(403).json({msg:'only admin allowed'})
}
})

export default router;