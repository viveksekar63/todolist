/**
 * Module Dependencies
 */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

/**
 * Load variables from .env file. This will provide db config, server port, host and so on.
 */
dotenv.config({ path: '.env' });

/**
 * Controllers
 */
const apiController = require('./controllers/api');
const activityController = require('./controllers/activity');

/**
 * middleware Validators
 */
const validationMiddleware = require('./src/middleware/validation');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express Configuration
 */
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/**
 * API routes.
 */
app.post('/activity/add', validationMiddleware.activityValidation ,activityController.createActivity);
app.get('/activity/:activityId', [activityController.getById]);
app.get('/activities', activityController.list);
app.delete('/activity/:activityId', activityController.removeById);
app.delete('/activities', activityController.removeAllActivities);
app.delete('/activities/completed', activityController.removeCompletedActivities);
app.patch('/activity/:activityId', [activityController.patchActivity]);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});