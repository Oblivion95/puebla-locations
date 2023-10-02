const cheerio = require("cheerio");

const getZipCodes = async (county) => {
  const fetch = (await import("node-fetch")).default;

  const getRawData = (URL) =>
    fetch(URL)
      .then((response) => response.text())
      .then((data) => {
        return data;
      });

  // URL for data
  const URL =
    `https://micodigopostal.org/buscar.php?buscar=${county}`;

  // start of the program
  const cricketWorldCupRawData = await getRawData(URL);

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

exports.getZipCodes = getZipCodes;
