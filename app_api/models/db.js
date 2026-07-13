const mongoose = require('mongoose');
//const dbURI = 'mongodb://localhost/e8trainer'; hello there again
//const dbURI = 'mongodb://102.209.119.232:27019/e8trainer';
const dbURI = 'mongodb://localhost/e8trainer';
//const dbURI = "mongodb+srv://katlego:katlegogagoopane@cluster0.fwpzmvn.mongodb.net/";
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


/*const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};


process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.id, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});*/
