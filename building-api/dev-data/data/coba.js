const Sequelize = require('sequelize');
const fs = require('fs');

const { Op, DataTypes } = Sequelize;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const sequelize = new Sequelize('coba', 'postgres', 'rahasia', {
  host: '172.25.1.55',
  dialect: 'postgres',
  operatorsAliases: operatorsAliases,
});

const Tours = sequelize.define('Tours', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    notNull: true,
    unique: true,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    notNull: true,
  },
  duration: DataTypes.INTEGER,
  maxGroupSize: DataTypes.INTEGER,
  difficulty: {
    type: DataTypes.STRING,
  },
  ratingsAverage: DataTypes.FLOAT,
  ratingsQuantity: DataTypes.INTEGER,
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  summary: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  imageCover: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  startDates: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    notNull: true,
  },
});

// try {
//   sequelize.authenticate().then(() => {
//     console.log('Database authenticated');
//     Tours.sync({ force: true }).then(() => {
//       Tours.bulkCreate(tours);
//       //   console.log('Tours synced');
//     });
//   });
// } catch (err) {
//   console.log.error(err.message);
// }

Tours.findAll({
  where: {
    duration: {
      $gt: 200,
    },
  },
})
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err.message);
  });
