const express = require('express');
const models = require('./backend/models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./backend/services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./backend/schema/schema');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
port = process.env.PORT || 4000;

const MONGO_URI = 'mongodb://chan:111100@ds245755.mlab.com:45755/users';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(port, () => {
  console.log('Listening');
});
