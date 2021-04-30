const fs = require('fs');

exports.seed = function(knex) {

  const contents = fs.readFileSync('./data/showseed.json');
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
   // Use batch insert to insert mulitple shows at the same time
  return knex('Show')
    .del()
    .then(() => knex.batchInsert('Show', data, 100));
};
