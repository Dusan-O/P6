const Sauce =     require('../models/Sauce');
const fs =        require('fs');                

// CREATE ONE SAUCE
exports.createOneSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
  .then( () => {
});
thing.save()
  .then(() => res.status(201).json({ message: 'Sauce crée !'}))
  .catch(error => res.status(400).json({ error }));
};
  
// MODIFY ONE SAUCE 
exports.modifyOneSauce = (req, res, next) => {
  const sauceObject = req.file ? 
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({error}));
    };
  
  // DELETE ONE SAUCE
exports.deleteThing = (req, res, next) => {
    Thing.findSauce({ _id: req.params.id })
    .then(sauce => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
  
  
// ACCESS TO ONE SAUCE
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

// ACCESS TO ALL SAUCES
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
};

// RATE ONE SAUCE
exports.rateOneSauce = (req, res, next) => {
  switch (req.body.like) {
    case 0:                                                   
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find( user => user === req.body.userId)) {  
            Sauce.updateOne({ _id: req.params.id }, {         
              $inc: { likes: -1 },                            
              $pull: { usersLiked: req.body.userId }         
            })
              .then(() => { res.status(201).json({ message: "Like enregistré !"}); }) 
              .catch((error) => { res.status(400).json({error}); });

          } 
          if (sauce.usersDisliked.find(user => user === req.body.userId)) {  
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId }
            })
              .then(() => { res.status(201).json({ message: "Like enregistré !" }); })
              .catch((error) => { res.status(400).json({error}); });
          }
        })
        .catch((error) => { res.status(404).json({error}); });
      break;
    
    case 1:                                                 
      Sauce.updateOne({ _id: req.params.id }, {            
        $inc: { likes: 1 },                                 
        $push: { usersLiked: req.body.userId }              
      })
        .then(() => { res.status(201).json({ message: "Like enregistré !" }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
      break;
    
    case -1:                                                  
      Sauce.updateOne({ _id: req.params.id }, {               
        $inc: { dislikes: 1 },                               
        $push: { usersDisliked: req.body.userId }             
      })
        .then(() => { res.status(201).json({ message: "Dislike enregistré !" }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
      break;
    default:
      console.error("bad request");
  }
};