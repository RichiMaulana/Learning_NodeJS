const { toursModel } = require('../models');

class APIFeature {
  constructor(queryString) {
    this.queryString = queryString;
    // this.query = query;
  }

  query() {
    const queryObj = { ...this.queryString };
    const excludedQueryObj = [
      'page',
      'sort',
      'limit',
      'fields',
      'order',
      'size',
    ];
    excludedQueryObj.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    console.log(queryStr);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.queryString.where = JSON.parse(queryStr);

    this.queryString.where = JSON.parse(queryStr);

    const query = {
      where: JSON.parse(queryStr),
    };

    return query;
  }

  filter() {
    let attributes;
    if (this.queryString.fields) {
      attributes = this.queryString.fields.split(',');
    }

    const { page } = this.queryString || 1;
    const { limit } = this.queryString || 100;
    const skip = Math.max(page - 1, 0) * limit;

    const filter = {
      limit: limit,
      offset: skip,
      order: [[this.queryString.sort, this.queryString.order || 'DESC']],
      attributes,
    };

    return filter;
  }
}

const queryParams = {
  sort: 'price',
  limit: '1',
  page: '1',
  order: 'desc',
  fields: 'name,duration,difficulty,ratingsAverage',
  price: {
    gte: 500,
  },
};

const query = new APIFeature(queryParams).query();
const filter = new APIFeature(queryParams).filter();

(async () => {
  const data = await toursModel.findAll({ ...query, ...filter });
  console.log(data);
})();

// console.log({ where: myCar.query() });
// console.log(toursModel);

// console.log({ ...query, ...filter });
