import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signUp=async(req,res,next)=>{

    const {username,email,password} =req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    // const user = new User({username,email,password:hashedPassword});
    // try{
    //      await user.save();
    //     res.status(201).json('User created successfully');
    //     }catch(err){
    //        next(err);
    //         }

}


export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    // try{
    //     const user =await User.findOne({email});
    //     if(!user) return next(errorHandler(404,'User not found'));
    //     const isValidPassword = bcryptjs.compareSync(password,user.password);
    //     if(!isValidPassword) return next(errorHandler(401,'Invalid password'));
        
        
    //     const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    //     const {password:pass,...rest}=user._doc;
    //     res.cookie('access_token',token,{httpOnly:true})   //httpOnly true : no other third party have access to our cookie
    //         .status(200)
    //         .json(rest);
            

    // }catch(err){
    //     next(err);
    //     }
    }     
    

export const google=async(req,res,next)=>{
    console.log(req.body);
    //contains req.body.email , req.body.photo , req.body.name
    
    // try{
    //     const user=await User.findOne({email : req.body.email});
    //     if(user){
    //         const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    //         const {password:pass,...rest}=user._doc;
    //         res.cookie('access_token',token,{httpOnly:true})
    //         .status(200)
    //         .json(rest);
    //     }else{
    //         const generatedPassword=Math.random().toString(36).slice(-8);
    //         const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
    //         const newUser= new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4)  ,email:req.body.email,password:hashedPassword,avatar:req.body.photo});
    //         await newUser.save();


    //         const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
    //         const {password:pass,...rest}=newUser._doc;
    //         res.cookie('access_token',token,{httpOnly:true})
    //         .status(200)
    //         .json(rest);

    //     }
    // }catch(error){
    //     next(error)
    // }
}   


export const signOut = async(req,res,next)=>{
    //  try{
    //     res.clearCookie('access_token')
    //     res.status(200).json('Sign out successfully');
    //  }catch(error){
    //     next(error);
    //  }
}
