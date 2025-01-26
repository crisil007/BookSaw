const  mongoose=require("mongoose")
const user_type = require("./user_type")

const users=new mongoose.Schema({
    email:{
        type:String
    },
    password:{
type:String
    },
    user_type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_type"
    },
    status:{
        type: String, 
        default: 'active', enum: ['active', 'blocked']
    }
})
module.exports=mongoose.model("users",users)