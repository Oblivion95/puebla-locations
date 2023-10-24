const cheerio = require("cheerio");

const getZipCodes = async (county) => {
  const fetch = (await import("node-fetch")).default;

  const getRawData = (URL) =>
    fetch(URL)
      .then((response) => response.text())
      .then((data) => data);

  // URL for data
  const url =
    new URL(`https://micodigopostal.org/buscar.php?buscar=${county}`);

  // start of the program
  const cricketWorldCupRawData = await getRawData(url);

  const $ = cheerio.load(cricketWorldCupRawData);

  const regex = /(\d{1,5})/g;
  const zipCodes = $('span[itemprop="postalCode"]');
  const array = [];
  let result;

  while ((result = regex.exec(zipCodes)) !== null) {
    array.push(result[0]);
  }

  return array;
};

module.exports = getZipCodes;
