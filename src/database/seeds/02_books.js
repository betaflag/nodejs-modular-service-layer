exports.seed = function(knex) {
  return knex("books")
    .del()
    .then(function() {
      return knex("books").insert([
        { id: 1, title: "I, Robot", author_id: 1 },
        { id: 2, title: "Foundation", author_id: 1 },
        { id: 3, title: "Dune", author_id: 2 },
        { id: 4, title: "Dune Messiah", author_id: 2 },
        { id: 5, title: "Snow Crash", author_id: 3 },
        { id: 6, title: "Cryptonomicon", author_id: 3 }
      ]);
    });
};
