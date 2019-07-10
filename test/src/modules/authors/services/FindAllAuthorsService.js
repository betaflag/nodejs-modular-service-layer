const FindAllAuthorsService = require("../../../../../src/modules/authors/services/FindAllAuthorsService");
const knex = require("../../../../../src/database");
const assert = require("assert");

describe("authors", function() {
  describe("services", function() {
    describe("FindAllAuthorsService", function() {
      before(function() {
        if (!knex.client.pool) return knex.initialize();
      });

      beforeEach(function() {
        return knex.seed.run();
      });

      it("finds all authors", async function() {
        const found = await new FindAllAuthorsService().perform();
        const existing = await knex("authors").select();
        assert.deepEqual(found, existing);
      });

      it("finds all authors with a filter", async function() {
        const found = await new FindAllAuthorsService({
          name: "Isaac Asimov"
        }).perform();

        const existing = await knex("authors").where({ name: "Isaac Asimov" });

        assert.deepEqual(found, existing);
      });

      after(function() {
        return knex.destroy();
      });
    });
  });
});
