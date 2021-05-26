const http =  require('http');      
const app =   require('./app');    

// Optimisation de server.js
// normalizePort renvoi un port valide
const normalizePort = val => {
  const port = parseInt(val, 10); 
  // si la constante "port" n'est pas un Nombre (isNaN) // renvoie de l'argument qui passé à la fonction
    if (isNaN(port)) {    
      return val;         
    }
     // si la valeur de la constante "port" est supérieur à zéro de donc valide: la fonction renvoie la consante port // sinon (port<0) la fonction renvoie alors false
    if (port >= 0) {
      return port;       
    }
    
    return false;       
};
//si process.env.PORT n'est pas disponible alors on se sert du port 8080
const port = normalizePort(process.env.PORT || '3000');   
app.set('port', port);

// management des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
   // EACCES :  permission denied
  switch (error.code) {
    case 'EACCES':              
      console.error(error);
      process.exit(1);
      break;
      //EADDRINUSE: port already in use
    case 'EADDRINUSE':        
      console.error(error);
      process.exit(1);
      break;
    default: 
      throw error;
  }
};

const server = http.createServer(app);

server.on(new Error(), errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening!' + bind);
});

server.listen(port);