import axios from "axios"

const globalURL = "https://disease.sh/v3/covid-19/all"
const dailyUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=100"

export const fetchData = async () => {
  try {
    const {
      data: { cases, deaths, recovered, active },
    } = await axios.get(globalURL)

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
