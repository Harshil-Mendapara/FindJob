const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require('./model');
const routes = require("./routes")
const path = require('path')
const methodOverride = require('method-override');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require("dotenv").config();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cors());


app.use(session({
    secret: process.env.SecretKey,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: db.sequelize,
    }),
    cookie: {
        sameSite: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))


app.use("/", routes);


const port = process.env.PORT;
app.listen(port, async () => {
    try {
        await db.sequelize.sync({ force: false });
        console.log('Model has been synced successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
    console.log(`App listening at port http://localhost:${port}`);
})
