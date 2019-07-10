const CreateAuthorService = require("../../../../../src/modules/authors/services/CreateAuthorService");
const knex = require("../../../../../src/database");
const assert = require("assert");

describe("authors", function() {
  describe("services", function() {
    describe("CreateAuthorService", function() {
      before(function() {
        if (!knex.client.pool) return knex.initialize();
      });

      beforeEach(function() {
        return knex.seed.run();
      });

      it("creates a new author", async function() {
        const created = await new CreateAuthorService({
          name: "Douglas Adams"
        }).perform();

        const found = await knex("authors")
          .where({ name: "Douglas Adams" })
          .first();

        assert.deepEqual(created, found);
      });

      it("throws if the name is not defined", async function() {
        try {
          await new CreateAuthorService({}).perform();
        } catch (error) {
          assert.equal(error.name, "ValidationError");
          assert.equal(error.details.length, 1);
          assert.equal(error.details[0].message, '"name" is required');
        }
      });

      after(function() {
        return knex.destroy();
      });
    });
  });
});
