const http =  require('http');      
const app =   require('./app');     
const normalizePort = val => {
  const port = parseInt(val, 10);  

  if (isNaN(port)) {    
    return val;         
  }
  if (port >= 0) {
    return port;       
  }
  return false;       
};
const port = normalizePort(process.env.PORT || '3000');   
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':              
      console.error(error);
      process.exit(1);
      break;
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