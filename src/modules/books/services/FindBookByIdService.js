const knex = require("../../../database");
const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  id: Joi.number().required()
});

class FindBookByIdService {
  constructor(props) {
    this.props = props;
    Joi.assert(this.props, schema);
  }

  async perform() {
    return await knex("books")
      .where(this.props)
      .first();
  }
}

module.exports = FindBookByIdService;
