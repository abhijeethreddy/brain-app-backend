const express =require('express');
const bodyParser =require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors= require('cors');
const knex =require('knex');

const register =require('./controllers/register');
const signin =require('./controllers/signin');
const profile =require('./controllers/profile');
const image =require('./controllers/image');

const db = knex({
    client:'pg',
    connection:{
        host: 'dpg-ch2i3cd269v61fdf25pg-a',
        user: 'abhijeeth',
        password:'3hseAaVC4CfXRQiZLbCvb087o57TbUX2',
        database:'smart_brain_cc1k',
        ssl: {
            rejectUnauthorized: false,
          }
    }
});

const app=express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('ok');
})

app.post('/signin',(req,res) =>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res) =>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})

const PORT = process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`app is running on part ${PORT}`);
})
