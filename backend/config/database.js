const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});
function cleanText(text) {
  return String(text)
    .replace(/[\u2010-\u2015]/g, "-") // hyphens
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, "") // remove bad chars
    .trim();
}
module.exports = sequelize;