const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');

//Rutas
const tiquete = require('./routes/RutaTiquete');
const vehiculo = require('./routes/RutaVehiculo');
const suscripcion = require('./routes/RutaSuscripcion');

//Conexion a BD
const BD = require('./config/BD');
const Tiquete = require('./models/Tiquete');
const Vehiculo = require('./models/Vehiculo');
const Suscripcion = require('./models/Suscripcion');

//Inicializar importaciones
const app = express();
BD();


//Middlewares
app.use(cors());
app.use(express.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended : false }))

//Configuraciones 
app.get('/', function(req, res){
    res.send("Hello World!!")
})


//Usar rutas
app.use('/api', tiquete);
app.use('/api', vehiculo);
app.use('/api', suscripcion);

//Setup 
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Application stated in port: ', PORT);
})