const FindAllBooksService = require("../../../../../src/modules/books/services/FindAllBooksService");
const knex = require("../../../../../src/database");
const assert = require("assert");

describe("books", function() {
  describe("services", function() {
    describe("FindAllBooksService", function() {
      before(function() {
        if (!knex.client.pool) return knex.initialize();
      });

      beforeEach(function() {
        return knex.seed.run();
      });

      it("finds all books", async function() {
        const found = await new FindAllBooksService().perform();
        const existing = await knex("books").select();
        assert.deepEqual(found, existing);
      });

      it("finds all books with a filter", async function() {
        const found = await new FindAllBooksService({
          title: "Dune"
        }).perform();

        const existing = await knex("books").where({ title: "Dune" });

        assert.deepEqual(found, existing);
      });

      after(function() {
        return knex.destroy();
      });
    });
  });
});
