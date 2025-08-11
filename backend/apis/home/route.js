import { Router } from "express";

const router=Router()



router.get('/',(req,res)=>{
    res.send("this is backend")
})


export default router;