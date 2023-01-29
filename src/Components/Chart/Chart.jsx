import React, { useEffect, useState } from "react"
import { fetchDailyData } from "../../api"
import { Line, Bar, Pie } from "react-chartjs-2"
import "chart.js/auto"

const colors = {
  main: "#4c9aed",
  green: "#56cd82",
  red: "#ef6960",
}

const Chart = () => {
  const [dailyData, setDailyData] = useState({})
  const [date, setDate] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deathValueArray, setDeathValueArray] = useState([])
  const [casesValueArray, setCasesValueArray] = useState([])

  useEffect(() => {
    const fetchDailyApi = async () => {
      try {
        const initialDailyData = await fetchDailyData()
        setDailyData(initialDailyData)
        setDate(initialDailyData ? Object.keys(initialDailyData.cases) : 0)
        setDeathValueArray(Object.values(initialDailyData.cases))
        setCasesValueArray(Object.values(initialDailyData.deaths))
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDailyApi()
  }, [])

  const data = {
    labels: date.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        data: deathValueArray,
        label: "Deaths",
        borderColor: colors.red,
        fill: true,
        yAxisID: "y-axis-1",
      },
      {
        data: casesValueArray,
        label: "Cases",
        borderColor: colors.main,
        fill: true,
        yAxisID: "y-axis-2",
      },
    ],
  }
  const options = {
    scales: {
      yAxes: [
        {
          id: "y-axis-1",
          type: "linear",
          position: "left",
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return value
            },
          },
        },
        {
          id: "y-axis-2",
          type: "linear",
          position: "right",
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return value / 1000000 + "M"
            },
          },
        },
      ],
    },
  }

  //console.log(valueArray)

  //console.log(date.map((date) => new Date(date).toLocaleDateString()))

  return (
    <div className='container'>
      <Line
        style={{ width: "100%", height: "500px" }}
        data={data}
        options={options}
      />
    </div>
  )
}

export default Chart
