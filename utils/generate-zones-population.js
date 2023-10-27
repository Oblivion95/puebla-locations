const db = require("../model/puebla-population.json");
const { zones: zonesDB } = require("../constants/zones.json");
const { faker } = require("@faker-js/faker");

const generateZonesPopulation = () => {
  const [total] = db.population.filter(
    (item) => item["Grupo de edad"] === "Total"
  );
  const { db: dbZones } = zonesDB;
  const totalZones = dbZones.length;

  const zones = dbZones.map(({ name }) => name);

  const ageGroups = db.population
    .filter((item) => item["Grupo de edad"] !== "Total")
    .map((item) => item["Grupo de edad"]);

  return zones.reduce((prev, zone) => {
    const maxTotal = total.Total / totalZones | 0;
    const maxMen = total.Hombres / totalZones | 0;
    const maxWomen = total.Mujeres / totalZones | 0;

    console.table({ maxTotal, maxMen, maxWomen });

    const groupsByAge = ageGroups.map((ageGroup) => ({
      "Grupo de edad": ageGroup,
      Total: faker.number.int({ min: 100, max: maxTotal }),
      Hombres: faker.number.int({ min: 100, max: maxMen }),
      Mujeres: faker.number.int({ min: 100, max: maxWomen }),
    }));

    const data = {
      ...prev,
      [zone]: {
        population: groupsByAge,
        total: {
          "Grupo de edad": "Total",
          Total: maxTotal,
          Hombres: maxMen,
          Mujeres: maxWomen,
        },
      },
    };

    return data;
  }, {});
};

module.exports = generateZonesPopulation;
