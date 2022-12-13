const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config({ path: './config.env' });

const app = require('./app');

// Start the app
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`App running on port ${port}...`);
  await sequelize.authenticate({});
  console.log('Database Connected!');
});
