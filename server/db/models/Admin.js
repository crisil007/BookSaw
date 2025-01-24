const mongoose=require ('mongoose')



const Admin=new mongoose.Schema({

    name:{
        type:String,
        // required:true,
        },

        email:{
            type:String,
            // required:true,
        },
        password:{                                  
            type:String,
            // required:true,
        },
        user_type:{
           type:mongoose.Schema.Types.ObjectId,
           ref:" user_type"
        },
})
module.exports=mongoose.model("Admin",Admin);