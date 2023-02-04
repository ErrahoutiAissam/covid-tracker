import axios from "axios"

const globalURL = "https://disease.sh/v3/covid-19/all"
const dailyUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=100"
const countriesUrl = "https://disease.sh/v3/covid-19/countries"

export const fetchData = async (country) => {
  let modifedURL = globalURL

  if (country) {
    modifedURL = `${countriesUrl}/${country}`
  }

  try {
    const {
      data: { cases, deaths, recovered, active },
    } = await axios.get(modifedURL)

    const fluidData = {
      cases,
      deaths,
      recovered,
      active,
    }
    return fluidData
  } catch (error) {}
}

export const fetchDailyData = async () => {
  try {
    const {
      data: { cases, deaths },
    } = await axios.get(dailyUrl)
    const fluidDailyData = {
      cases,
      deaths,
    }
    return fluidDailyData
  } catch (error) {}
}

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(countriesUrl)
    const arrayData = data.map((e) => e.country)
    return arrayData
  } catch (error) {}
}

export const fetchCountryData = async (country) => {
  const {
    data: { cases, deaths, recovered, active },
  } = await axios.get(`${countriesUrl}/${country}`)

  const fluidCountryData = {
    cases,
    deaths,
    recovered,
    active,
  }
  return fluidCountryData
}
