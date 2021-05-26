 // utilisation de mongoose. ODM (Object Data Modeling) demandé par la note de cadrage.
const mongoose = require('mongoose');
// plugin demandé
const uniqueValidator = require('mongoose-unique-validator');

// Modèle user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});

// Plugin qui restreint à une création de user par adresse mail 
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);