const express=require(`express`);
const expresslayouts=require(`express-ejs-layouts`); //to use layouts
const db=require(`./config/mongoose`);
const session=require(`express-session`);
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require(`connect-mongo`);


const app=express();
const port=27017;

const flash=require(`connect-flash`);                   // npm install connect-flash
const flash_middleware=require(`./config/flash_middleware`);      // manuual middleware created by us so that flash message is temperory store in locals.flash


app.use(express.static(`./assets`));// to enable assets
app.set(`view engine`,`ejs`);
app.set(`views`,`./views`);  // setting up view engine



app.use(expresslayouts);
app.use(express.urlencoded({extended: true}));

app.use(session({
    name: 'codeial-session using express',
    // TODO change the secret before deployment in production mode
    secret: 'secret',
    saveUninitialized: false,                                              // jaise hi session cookie m kch aaya usko encrypt kr diye
    resave: false,                                                         // yha se wapas routes m chal jaenge 
    cookie: {
        maxAge: (1000 * 60 *100)                 // duration of cookie in ms
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/TODO_APP' })   // to store login sessions in database
}));

app.use(passport.initialize());       
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.set(`layout extractStyles`,true); // this will allow layout to automatically put the css files within its head for which this layout is called
app.set(`layout extractScript`,true); // this is for javascript

app.use(flash());                            // to use  flash message library
app.use(flash_middleware.setFlash);

app.use(`/`,require(`./routes/index.js`));
app.listen(port,(err)=>{

    if(err){
        console.log(`error: ${err}`);
    }

    else{console.log(`server is connected to port:${port}`);}
})