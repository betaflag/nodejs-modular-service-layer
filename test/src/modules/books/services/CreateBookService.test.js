const CreateBookService = require("../../../../../src/modules/books/services/CreateBookService");
const knex = require("../../../../../src/database");
const assert = require("assert");

describe("books", function() {
  describe("services", function() {
    describe("CreateBookService", function() {
      before(function() {
        if (!knex.client.pool) return knex.initialize();
      });

      beforeEach(function() {
        return knex.seed.run();
      });

      it("creates a new book", async function() {
        const created = await new CreateBookService({
          title: "Children of Dune",
          author_id: 2
        }).perform();

        const found = await knex("books")
          .where({ title: "Children of Dune" })
          .first();

        assert.deepEqual(created, found);
      });

      it("throws if the name is not defined", async function() {
        try {
          await new CreateBookService({}).perform();
        } catch (error) {
          assert.equal(error.name, "ValidationError");
          assert.equal(error.details.length, 1);
          assert.equal(error.details[0].message, '"title" is required');
        }
      });

      after(function() {
        return knex.destroy();
      });
    });
  });
});
