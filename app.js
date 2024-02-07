const express= require('express')
const app  = express();
const path  = require('path');
const mongoose = require('mongoose');
const session  = require('express-session')
const User  = require('./models/user');
const bodyParser = require('body-parser');

// const session  = require('express-session');

mongoose.connect('mongodb://localhost:27017/nitratc',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected dbs");

})
.catch(err=>{
    console.log("oh connection error omi please checkout err");
    console.log(err);

})
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());
// app.use('/',(req,res)=>{
//     res.send('<h1>Om Ji Dwivedi</h1>');


// })
app.get('/register',async(req,res)=>{
    
    res.render('register');

})
app.post('/register',async(req,res)=>{
    // console.log(req.body);
    const {username,branch,otherBranch} = req.body;
    let selectedBranch = branch ==='other'? otherBranch:branch;
   
    const existBranch = await User.findOne({ branch: selectedBranch });

   if(!existBranch)
   {
    const user = new User({username,branch:selectedBranch});
    await user.save();

    console.log(req.body);
    res.send('New branch added');
   }
   else
   {
    res.send('Branch already exist');

   }

   

})


app.listen(3000,()=>{
    console.log("Connected on port 3000");

})