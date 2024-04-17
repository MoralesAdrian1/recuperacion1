const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//routes admin
const usersRoutes= require('./routes/users' );
const vacunasRoutes= require('./routes/vacunas');
const razasRoutes= require('./routes/razas');
const mascotasRoutes= require('./routes/mascotas');
const animalesRoutes=require('./routes/animales');
const historialRoutes=require('./routes/historial');
const alimetoRoutes=require('./routes/alimentos');
//settings

app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Agrega morgan para registrar las solicitudes

//inicializar routes
app.use('/api',usersRoutes);
app.use('/api',vacunasRoutes);
app.use('/api',razasRoutes);
app.use('/api',mascotasRoutes);
app.use('/api',animalesRoutes);
app.use('/api',historialRoutes);
app.use('/api',alimetoRoutes);


//static file


//start server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
