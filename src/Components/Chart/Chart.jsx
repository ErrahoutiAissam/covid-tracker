import React, { useEffect, useState } from "react"
import { fetchDailyData } from "../../api"
import { Line, Bar } from "react-chartjs-2"

const Chart = () => {
  const [dailyData, setDailyData] = useState({})
  const [date, setDate] = useState([])
  const [loading, setLoading] = useState(true)
  const [erorr, setError] = useState("")

  useEffect(() => {
    const fetchDailyApi = async () => {
      try {
        const initialDailyData = await fetchDailyData()
        setDailyData(initialDailyData)
        setDate(initialDailyData ? Object.keys(initialDailyData.cases) : 0)
      } catch (error) {
        setError(error)
      }
    }

    fetchDailyApi().then(setLoading(false))
  }, [])

  console.log(date)
  console.log(loading)

  //

  return <div> chart</div>
}

export default Chart
