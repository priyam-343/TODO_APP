const mongoose =require(`mongoose`);
mongoose.set("strictQuery", false);

mongoose.connect(`mongodb://127.0.0.1/TODO_APP`);

const db=mongoose.connection;



db.on(`error`,console.error.bind(console,`error in connecting with the database`));
db.once(`open`,()=>{
    console.log(`successfully connected with db`);
})




module.exports=db;