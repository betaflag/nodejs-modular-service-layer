const knex = require("../../../database");
const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  title: Joi.string().optional()
});

class FindAllBooksService {
  constructor(props = {}) {
    this.props = props;
    Joi.assert(this.props, schema);
  }

  perform() {
    return knex("books").where(this.props);
  }
}

module.exports = FindAllBooksService;
