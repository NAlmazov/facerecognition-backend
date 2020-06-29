const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const app = express();


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, knex, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})

app.put('/image', (req, res) => {image.handleImagePut(req, res, knex)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => 
{
    console.log(`app is running on port ${process.env.PORT}`)
})

