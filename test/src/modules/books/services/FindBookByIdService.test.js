const FindBookByIdService = require("../../../../../src/modules/books/services/FindBookByIdService");
const knex = require("../../../../../src/database");
const assert = require("assert");

describe("books", function() {
  describe("services", function() {
    describe("FindBookByIdService", function() {
      before(function() {
        if (!knex.client.pool) return knex.initialize();
      });

      beforeEach(function() {
        return knex.seed.run();
      });

      it("finds a book by id", async function() {
        const found = await new FindBookByIdService({ id: 1 }).perform();

        const existing = await knex("books")
          .where({ id: 1 })
          .first();

        assert.deepEqual(found, existing);
      });

      it("throws if the id is not defined", async function() {
        try {
          await new FindBookByIdService({}).perform();
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
