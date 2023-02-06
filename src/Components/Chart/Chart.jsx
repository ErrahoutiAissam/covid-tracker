import React, { useEffect, useState } from "react"
import { fetchDailyData } from "../../api"
import { Line, Bar } from "react-chartjs-2"
import "chart.js/auto"
import LoadingSpinner from "../Loader/Loader"
import styles from "./Chart.module.css"

const colors = {
  main: "#4c9aed",
  green: "#56cd82",
  red: "#ef6960",
}

const Chart = ({
  data: { cases, deaths, recovered, active },
  country,
  handleError,
  handleLoading,
}) => {
  const [dailyData, setDailyData] = useState({})
  const [date, setDate] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [deathValueArray, setDeathValueArray] = useState([])
  const [casesValueArray, setCasesValueArray] = useState([])

  useEffect(() => {
    const fetchDailyApi = async () => {
      try {
        handleLoading(true)
        setLoading(true)
        const initialDailyData = await fetchDailyData()
        handleLoading(false)
        setLoading(true)
        setDailyData(initialDailyData.fluidDailyData)
        setError(initialDailyData.error)
        setErrorMsg(initialDailyData.errorMsg)
        handleError(initialDailyData.error, initialDailyData.errorMsg)
        setDate(
          initialDailyData.fluidDailyData
            ? Object.keys(initialDailyData.fluidDailyData.cases)
            : 0
        )
        setDeathValueArray(Object.values(initialDailyData.fluidDailyData.cases))
        setCasesValueArray(
          Object.values(initialDailyData.fluidDailyData.deaths)
        )
      } catch (e) {
        //handleError(e, e.message)
        setError(e)
        setErrorMsg(e.message)
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

  //console.log(country)
  //console.log(date.map((date) => new Date(date).toLocaleDateString()))

  return (
    <div className={styles.container}>
      {loading && <LoadingSpinner />}
      {!country ? lineChart : barChart}
    </div>
  )
}

export default Chart
