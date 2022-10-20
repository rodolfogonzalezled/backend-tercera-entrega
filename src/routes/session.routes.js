import { Router } from "express";
import passport from 'passport';
import { upload } from "../utils/utils.js";

const router = Router();

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/session/loginfail'}),async(req,res)=>{

    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id,
        role: req.user.role,
        cart: req.user.cart
    }

    res.send({status:"success", payload:req.user._id});
});

router.get('/loginfail', (req,res)=>{
    console.log("login failed");
    res.status(500).send({status:"error", error:"Login failed"});
})

router.get('/logout', async (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({status:"error", error:"Logout error"});
        res.status(200).send("ok");
    })
});

router.post('/register', upload.single("imageProfile"), passport.authenticate('register', {failureRedirect:'/api/session/registerFail'}),  async (req, res) => {
    res.send({status: "success", payload: req.user.id});
});


router.get('/registerFail', async(req,res) => {
    console.log("Register Failed");
    res.status(500).send({status: "error", error: "Register failed"});
});

export default router;