// import everything from express and assign it to the express variable
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {JobListingController, CompanyController, UserController, AuthController} from './controllers';
import {Sequelize} from 'sequelize-typescript';
import {JobListing} from './models/joblisting.model';
import {Company} from './models/company.model';
import {User} from './models/user.model';

const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([JobListing, Company, User]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

// define the port the express app will listen on
let port = 3000;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
    const allowedOrigins: string[] = ['http://localhost:4200', 'https://morning-peak-96987.herokuapp.com'];
    if (req.header('host') != null) {
        // @ts-ignore
        const origin: string = req.header('host');
        if ( allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    }
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/joblisting', JobListingController);
app.use('/company', CompanyController);
app.use('/user', UserController);
app.use('/auth', AuthController);

sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
