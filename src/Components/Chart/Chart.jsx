import React, { useEffect, useState } from "react"
import { fetchDailyData } from "../../api"
import { Line, Bar } from "react-chartjs-2"
import "chart.js/auto"
import styles from "./Chart.module.css"

const colors = {
  main: "#4c9aed",
  green: "#56cd82",
  red: "#ef6960",
}

const Chart = ({ data: { cases, deaths, recovered, active }, country }) => {
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
        // yAxisID: "y-axis-1",
      },
      {
        data: casesValueArray,
        label: "Cases",
        borderColor: colors.main,
        fill: true,
        //yAxisID: "y-axis-2",
      },
    ],
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Current Covid19 Situation in ${country}`,
        font: { weight: "bold" },
      },
      fullSize: true,
    },
  }

  const lineChart = <Line data={data} />

  const barChart = (
    <Bar
      data={{
        labels: ["Cases", "Deaths", "Recovered", "Active"],
        datasets: [
          {
            label: "Number of People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(255, 0, 0, 0.741)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(249, 241, 10, 0.58)",
            ],
            data: [cases, deaths, recovered, active],
          },
        ],
      }}
      options={options}
    />
  )

  /*
  const options = {
    scales: {
      yAxes: [
        {
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
  */

  console.log(country)
  //console.log(date.map((date) => new Date(date).toLocaleDateString()))

  return (
    <div className={styles.container}>
      {!country ? lineChart : barChart}
      <div></div>
    </div>
  )
}

export default Chart
