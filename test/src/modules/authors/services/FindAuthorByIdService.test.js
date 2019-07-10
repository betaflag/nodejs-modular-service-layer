const FindAuthorByIdService = require("../../../../../src/modules/authors/services/FindAuthorByIdService");
const knex = require("../../../../../src/database");
const assert = require("assert");

describe("authors", function() {
  describe("services", function() {
    describe("FindAuthorByIdService", function() {
      before(function() {
        if (!knex.client.pool) return knex.initialize();
      });

      beforeEach(function() {
        return knex.seed.run();
      });

      it("finds an author by id", async function() {
        const found = await new FindAuthorByIdService({ id: 1 }).perform();

        const existing = await knex("authors")
          .where({ id: 1 })
          .first();

        assert.deepEqual(found, existing);
      });

      it("throws if the id is not defined", async function() {
        try {
          await new FindAuthorByIdService({}).perform();
        } catch (error) {
          assert.equal(error.name, "ValidationError");
          assert.equal(error.details.length, 1);
          assert.equal(error.details[0].message, '"id" is required');
        }
      });

      after(function() {
        return knex.destroy();
      });
    });
  });
});
