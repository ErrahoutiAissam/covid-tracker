import axios from "axios"

const globalURL = "https://disease.sh/v3/covid-19/all"
const dailyUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=200"
const countriesUrl = "https://disease.sh/v3/covid-19/countries"

export const fetchData = async (country) => {
  let modifedURL = globalURL
  let error = null
  let errorMsg = ""

  if (country) {
    modifedURL = `${countriesUrl}/${country}`
  }

  try {
    const {
      data: { cases, deaths, recovered, active },
    } = await axios.get(modifedURL)

    var fluidData = {
      cases,
      deaths,
      recovered,
      active,
    }
  } catch (e) {
    error = e
    errorMsg = e.message
  }
  return { fluidData, error, errorMsg }
}

export const fetchDailyData = async () => {
  let error = null
  let errorMsg = ""
  try {
    const {
      data: { cases, deaths },
    } = await axios.get(dailyUrl)
    var fluidDailyData = {
      cases,
      deaths,
    }
  } catch (e) {
    error = e
    errorMsg = e.message
  }
  return { fluidDailyData, error, errorMsg }
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
