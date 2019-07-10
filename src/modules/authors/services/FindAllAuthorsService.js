const knex = require("../../../database");
const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  name: Joi.string().optional()
});

class FindAllAuthorsService {
  constructor(props = {}) {
    this.props = props;
    Joi.assert(this.props, schema);
  }

  perform() {
    return knex("authors").where(this.props);
  }
}

module.exports = FindAllAuthorsService;
