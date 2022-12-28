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

    // console.log(queryStr);

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

    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 100;
    const skip = Math.max(page - 1, 0) * limit;

    const filter = {
      limit: limit,
      offset: skip,
      attributes,
    };
    if (this.queryString.sort) {
      filter.order = [[this.queryString.sort, this.queryString.order || 'asc']];
    }
    return filter;
  }
}

module.exports = APIFeature;
