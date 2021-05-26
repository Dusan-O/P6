const bcrypt = require('bcrypt');    // HASH THE PASSWORD
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ENCODAGE FUNCTION FOR THE EMAIL
function maskator(sentence) {
    if (typeof sentence === "string") {
        let headMail = sentence.slice(0,1);
        let bodyMail = sentence.slice(1, sentence.length-4);
        let bottomMail = sentence.slice(sentence.length-4, sentence.length);
        let final = [];
        var masked = bodyMail.split('');
        var maskedMail = [];
        for(let i in masked) {
            masked[i] = '*';
            maskedMail += masked[i];  
        }
        final += headMail + maskedMail + bottomMail
            return final;
    }
    console.log(sentence + " is not a mail");
        return false
}
// SING IN
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)    // on hashe le mot de passe avec un salt de 10 
    .then(hash => {
        const user = new User({                                                         
            email: maskator(req.body.email),  // on sauve un mail encodé
            password: hash                  // et on assigne le hash obtenu comme valeur de la propriété password de l'objet user 
        });
      user.save()       // et on sauve tout ça dans la base de données   
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// LOGIN
exports.login = (req, res, next) => {
    User.findOne({ email : maskator(req.body.email)}) // on recherche l'équivalent du mail encodé
    .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
            .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};






