const User=require(`../models/user`);


module.exports.signin=function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect(`/users/todohome`);
    }
    return res.render(`signin`);
}

module.exports.signup=function(req,res){

    if(req.isAuthenticated()){
        return res.render(`todohome`);
    }
    return res.render(`signup`);
}

module.exports.create_user=async (req,res)=>{

try {
    
    if(req.body.password!=req.body.c_password){
        
        req.flash(`error`,`Password not matches`);  
        return res.redirect(`back`);
    }
    let user=await User.findOne({email:req.body.email});
    if(user){
        req.flash(`error`,`You already have an account`);
        return res.redirect(`back`);
    }

    await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
      
    req.flash(`success`,`Account created successfully`);
    res.redirect(`/users/signin`);
    
} catch (error) {
    
    if(error){
        console.log(`error in signing-up`,error);
    }
}


}

module.exports.create_session=(req,res)=>{

    req.flash(`success`,`Logged in successfully`);       // storing flash message in locals.flash
    return res.redirect('/users/todohome');
}



module.exports.delete_session=async (req,res)=>{

    
        await req.logout((err)=>{if(err){
            console.log(`err`,err);
        }
        });
        req.flash(`success`,`Logged out successfully`);
        return res.redirect(`/`);
        
    
    
}


