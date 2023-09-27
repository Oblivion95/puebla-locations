const fs = require("fs");
const path = require("path");

const COLORS = [
  "#2c699a",
  "#048ba8",
  "#0db39e",
  "#16db93",
  "#83e377",
  "#b9e769",
  "#f1c453",
  "#f29e4c",
  "#efea5a",
  "#54478c",
  "#606c38",
  "#aaf683",
  "#b98b73",
  "#f9c74f",



  "#560bad",
  "#480ca8",
  "#3a0ca3",

  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#ff9b85",
  "#60d394",
  "#ffd97d",
  "#264653",
  "#e76f51",
  "#606c38",
  "#bc6c25",
  "#ee6055",
  "#aaf683",
  "#07beb8",
  "#3dccc7",
  "#68d8d6",
  "#9ceaef",
  "#c4fff9",

  "#b98b73",
  "#cb997e",
  "#ddbea9",
  "#ffe8d6",
  "#d4c7b0",
  "#b7b7a4",
  "#a5a58d",
  "#6b705c",
  "#3f4238",
  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#6c757d",
  "#495057",
  "#343a40",
  "#212529",
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  "#4cc9f0",
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#f9844a",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#4d908e",
  "#577590",
  " #277da1",
  "#d9ed92",
  "#b5e48c",
  "#99d98c",
  "#76c893",
  "#52b69a",
  "#34a0a4",
  "#168aad",
  "#1a759f",
  "#1e6091",
  "#184e77"
];

(() => {
  // const locations = require("./puebla.json");
  // const { features } = locations;
  // const zonesLength = 9;

  // const zones = Array.from({ length: zonesLength }, (_, i) => i + 1).map(
  //   (zone) => `zona-${zone}`
  // );
  // const pages = 10;

  // let municipalities = features
  //   .slice(0, zonesLength * pages)
  //   .map((feature) => ({
  //     zipCode: feature.properties.d_cp,
  //     coordinates: feature.geometry.coordinates,
  //     ...feature,
  //   }))
  //   .filter(({ coordinates, zipCode, ...rest }) => {
  //     return Array.isArray(coordinates);
  //   })
  //   .map(({ zipCode, coordinates }) => ({
  //     zipCode,
  //     coordinates: coordinates[0].map(([longitude, latitude]) => [
  //       latitude,
  //       longitude,
  //     ]),
  //   }));

  // municipalities = zones.reduce((prev, zone, index) => {
  //   const municipalitiesSlice = municipalities.slice(
  //     index * zonesLength,
  //     index * zonesLength + zonesLength
  //   );

  //   const v = prev.concat(
  //     municipalitiesSlice.map((municipality) => ({
  //       ...municipality,
  //       zone,
  //     }))
  //   );

  //   return v;
  // }, []);

  // let puebla_boundary =
  //   require("./puebla-boundary.json").features[0].geometry.coordinates[0][0].map(
  //     ([longitude, latitude]) => [latitude, longitude]
  //   );

  // let counties = require("./puebla-counties.json").features.map(
  //   ({ geometry: { coordinates }, properties: { nomgeo } }) => {
  //     const boundary = coordinates[0][0].map(([longitude, latitude]) => [
  //       latitude,
  //       longitude,
  //     ]);

  //     return {
  //       boundary,
  //       name: nomgeo,
  //       coordinates: boundary[boundary.length / 2],
  //       color: COLORS[Math.floor(Math.random() * COLORS.length)],
  //     };
  //   }
  // );

  const db = {
    // municipalities,
    // puebla: [{ coordinates: puebla_boundary }],
    // counties,
  };

  fs.writeFileSync(
    path.join(__dirname, "./model/db.json"),
    JSON.stringify(db, null, 2)
  );
})();
