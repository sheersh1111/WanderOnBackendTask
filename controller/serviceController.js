const catchAsyncerrors = require("../middleware/catchAsyncerrors");

exports.service1=catchAsyncerrors(async(req,res,next)=>{
        res.status(200).json({sucess:true,message:'Welcome to service 1'})
});

exports.service2=catchAsyncerrors(async(req,res,next)=>{
    res.status(200).json({sucess:true,message:'Welcome to service 2'})
});
