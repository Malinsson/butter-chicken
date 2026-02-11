//From https://restcountries.com/
//Get capital cities by region with coordinates and country

import { FatalError } from "../exceptions/Fatalerror.js";

export async function getCapitalCities(region) {
  const url = `https://restcountries.com/v3.1/region/${region}?fields=name,capital,capitalInfo`;

  let response;
  try {
    response = await fetch(url);
  } catch (error){
    throw new FatalError(`No connection to restcountry api`);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.status}`);
  }

  const data = await response.json();

  const capitalCities = data
    .filter(c => 
      c.capital && 
      c.capitalInfo?.latlng
    )
    .map(country => ({
      city: country.capital[0],
      country: country.name.common,
      lat: country.capitalInfo.latlng[0],
      lon: country.capitalInfo.latlng[1]
    }));

  return capitalCities;
}