const express = require("express");
require("dotenv").config();
const methodOverride = require('method-override');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const database = require("./config/database.js");
const adminRoute = require("./routes/admin/index.route.js");
const systemConfig = require("./config/system.js");
const bodyParser = require('body-parser');
const path = require('path');
const moment = require("moment");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(cookieParser('vuvangem'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


app.use(express.static(`${__dirname}/public`));
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

database.connect();

adminRoute(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});