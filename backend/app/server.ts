// import everything from express and assign it to the express variable
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {JobListingController, SkillController, CompanyController, JobPensumController,
    SectorController, UserController, AuthController} from './controllers';
import {Sequelize} from 'sequelize-typescript';
import {JobListing} from './models/joblisting.model';
import {Skill} from './models/skill.model';
import {Company} from './models/company.model';
import {JobPensum} from './models/jobPensum.model';
import {Sector} from './models/sector.model';
import {User} from './models/user.model';

const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([JobListing, Skill, Company, JobPensum, Sector, User]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

// define the port the express app will listen on
var port: number = 3000;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/joblisting', JobListingController);
app.use('/skill', SkillController);
app.use('/company', CompanyController);
app.use('/jobPensum', JobPensumController);
app.use('/sector', SectorController);
app.use('/user', UserController);
app.use('/auth', AuthController);

sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
