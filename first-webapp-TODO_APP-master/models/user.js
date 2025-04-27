const mongoose=require(`mongoose`);

const userSchema=new mongoose.Schema({

    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    tasks:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref:`Task`
            
        }
    ]


},{timestamps:true});

const User=mongoose.model(`User`,userSchema);

module.exports=User;