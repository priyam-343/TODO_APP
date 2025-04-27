
const Task =require(`../models/task`);
const User=require(`../models/user`);

module.exports.home=async (req,res)=>{
         
    
          try {
            
            let user=await User.findById(req.user._id).populate(`tasks`);
           user.tasks.sort((t1,t2)=>{
            let date1 = new Date(t1.dueDate).getTime();
            let date2 = new Date(t2.dueDate).getTime();
            
             
            return date1-date2;
           /* if(date1>=date2){
                return t1>t2;
            }
            else{
                return t1<t2;
            }*/
          

           });
           
            return res.render(`todohome`,{
                tasks:user.tasks
            });
           
            
          } catch (error) {
            if(error){
                console.log(`err in rendering home page`,error);
            }
          }
    
}

module.exports.add_task=async (req,res)=>{

          
    try {
        
   let task=await Task.create({
    description:req.body.description,
    category:req.body.category,
    dueDate:req.body.dueDate,
    checked:false
   });
   let user=await User.findById(req.user._id);
    user.tasks.push(task._id);
    user.save();
   req.flash(`success`,`Task added successfully`);
   
   res.redirect(`back`);


    } catch (err) {
        
        if(err){
            console.log(`error in creating task`,err);
        }
    }
}

module.exports.delete_task=async (req,res)=>{

    try {
        await Task.findByIdAndDelete(req.query.taskid);
        let user=await User.findById(req.user._id);
        user.tasks.pull(req.query.taskid);
        user.save();
       req.flash(`success`,`Task deleted successfully`)
        res.redirect(`back`);
        
    } catch (error) {
        
        if(error){
            console.log(`err in deleting a task`,error);
        }
    }
}

module.exports.toggle_check=async (req,res)=>{
    
    let task=await Task.findById(req.body.taskid);
    task.checked=!task.checked;
    task.save();
   // console.log(task.checked);
    res.status(200).json({
        message:`done`,
        data:{checked:task.checked}  //no need to send data to ajax aage use nhi kiye hai
    })
}