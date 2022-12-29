const dotenv = require('dotenv');
const { sequelize } = require('./models');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED EXCEPTION!, Shutting down...');

  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// Start the app
const port = process.env.PORT || 3000;

sequelize.authenticate().then(() => console.log('Database Connected!'));
// .catch((err) => console.log(err));

const server = app.listen(port, async () => {
  console.log(`${process.env.NODE_ENV} app running on port ${port}...`);
  // await sequelize
  //   .authenticate()
  //   .then(() => console.log('Database Connected!'))
  //   .catch((err) => console.log(err));
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!, Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
