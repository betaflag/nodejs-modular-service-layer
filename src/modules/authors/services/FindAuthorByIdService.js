const knex = require("../../../database");
const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  id: Joi.number().required()
});

class FindAuthorByIdService {
  constructor(props) {
    this.props = props;
    Joi.assert(this.props, schema);
  }

  async perform() {
    return await knex("authors")
      .where(this.props)
      .first();
  }
}

module.exports = FindAuthorByIdService;
