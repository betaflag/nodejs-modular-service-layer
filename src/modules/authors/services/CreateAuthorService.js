const knex = require("../../../database");
const Joi = require("@hapi/joi");
const FindAuthorByIdService = require("./FindAuthorByIdService");

const schema = Joi.object().keys({
  name: Joi.string()
    .min(1)
    .max(255)
    .required()
});

class CreateAuthorService {
  constructor(props) {
    this.props = props;
    Joi.assert(this.props, schema);
  }

  async perform() {
    const [id] = await knex("authors").insert(this.props);
    return await new FindAuthorByIdService({ id }).perform();
  }
}

module.exports = CreateAuthorService;
