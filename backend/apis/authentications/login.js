// backend/apis/authentications/login.js

import { Router } from "express";
import argon from "argon2";
import { User_Modl } from "../../database/schemas/export.js";
import jwt from 'jsonwebtoken'
import env from 'dotenv'

const router = Router();
env.config();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_SECRET;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User_Modl.findOne({ where: { email } });

    if (!user || !(await argon.verify(user.password, password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
else{
  const token = jwt.sign({id: `${user.id}`,username:`${user.fname} ${user.lname}`,email:email,role:user.role}, secret,{
    expiresIn:'1d',
  })
  return res.status(200).json({
    msg: "Login successful!",
    token
  });
}
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
