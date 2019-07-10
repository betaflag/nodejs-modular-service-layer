const knex = require("../../../database");
const Joi = require("@hapi/joi");
const FindBookByIdService = require("./FindBookByIdService");

const schema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .max(255)
    .required(),
  author_id: Joi.number().required()
});

class CreateBookService {
  constructor(props) {
    this.props = props;
    Joi.assert(this.props, schema);
  }

  async perform() {
    const [id] = await knex("books").insert(this.props);
    return await new FindBookByIdService({ id }).perform();
  }
}

module.exports = CreateBookService;
