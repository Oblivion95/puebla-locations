const fs = require('fs');
const path = require('path');

const generatePueblaPopulation = () => {
  const pueblaPopulation = fs.readFileSync(path.join(__dirname, '../assets/puebla.csv'), 'utf8');

  const records = pueblaPopulation.split('\n').filter(Boolean).map(item => item.trim());
  const headers = records.shift().split(',').map(item => item.trim());

  return records.map((record) => {
    const values = record.split(',');

    return values.reduce((acc, value, index) => {
      acc[headers[index]] = value.trim().replace(/\./g, ',');

      return acc;
    }, {});
  });
};

module.exports = generatePueblaPopulation;
