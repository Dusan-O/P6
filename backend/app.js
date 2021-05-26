const express =         require('express');                 // import express: node.js web framework
const bodyParser =      require('body-parser');             // import body-parser: parse incoming request bodies in a middleware before handlers, available under the req.body property.
const mongoose =        require('mongoose');                // import mongoose: ODM, a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
const helmet =          require('helmet');                  // import helmet: help to secure Express apps by setting various HTTP headers.
const path =            require('path');                    // import path: provides a way of working with directories and file paths. (line 44)
const cors =            require('cors');                    // import cors: manage cross-origin resource sharing
const rateLimit =       require('express-rate-limit');      // comme son nom l'indique: on va fixer un taux limite pour les requêtes.

//constante à utiliser avec le package rateLimit
const limiter = rateLimit({         
  windowMs: 15 * 60 * 1000,       
  max: 100
})

// use express
const app = express();

// application du package
app.use(limiter);

// secure HTTP headers
app.use(helmet());

// sécurisation cors: origin localhost:4200
app.use(cors({ origin: 'http://localhost:4200' }));

// pour se connecter mongoose
mongoose.connect(
    'mongodb+srv://new_user:lalala@cluster0.5kkhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
     
// manage cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  next();
});

// cross-scripting protection (helmet)
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// parsing all incoming requests
app.use(bodyParser.json());

// images management
app.use('/images', express.static(path.join(__dirname, 'images')));

// import the routes for user and sauces from directory "routes"
const saucesRoutes =    require('./routes/sauces');          
const userRoutes =      require('./routes/user');

// routes api
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;