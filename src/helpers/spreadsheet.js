// import { orderBy } from "lodash";
// import { hash } from "./utils";
// import { get } from "./localStorage";

import config from "../config";

/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A4:T",
        valueRenderOption: "UNFORMATTED_VALUE"
      })
      .then(
        response => {
          const data = response.result.values;
          let cars =
            data.map(car => ({
              year: car[0],
              make: car[1],
              model: car[2],
              name: `${car[0]} ${car[1]} ${car[2]}`,
              wStyling: car[3],
              wAccel: car[4],
              wHandling: car[5],
              wFun: car[6],
              wCool: car[7],
              wTotal: car[8],
              dFeatures: car[9],
              dComfort: car[10],
              dQuality: car[11],
              dPracticality: car[12],
              dValue: car[13],
              dTotal: car[14],
              score: car[15],
              filmCity: car[17],
              filmState: car[18],
              carCountry: car[19]
            })) || [];

          callback({
            cars
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}
