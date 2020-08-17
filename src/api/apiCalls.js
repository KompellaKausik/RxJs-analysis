import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { map, pluck, mergeMap, tap } from "rxjs/operators";
const { default: Axios } = require("axios");

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await Axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  const modifiedData = [];
  fromFetch(`${url}/daily`, {
    selector: (response) => response.json(),
  })
    .pipe(mergeMap((result) => result))
    .subscribe({
      next: (data) =>
        modifiedData.push({
          confirmed: data.confirmed,
          deaths: data.deaths,
          date: data.reportDate,
        }),
      complete: () => console.log("done fetching daily data"),
    });
  return modifiedData;
};

//`${url}/countries`

export const fetchCountries = async () => {
  const countryNames = [];
  fromFetch(`${url}/countries`, {
    selector: (response) => response.json(),
  })
    .pipe(
      map(({ countries }) => countries),
      mergeMap((result) => result)
    )
    .subscribe({
      next: (countries) => countryNames.push(countries.name),
      complete: console.log("countries are here"),
    });

  return countryNames;
};
