import React from "react"
import styles from "./App.module.css"
import Cards from "./Components/Card/Cards"
import { fetchData, fetchDailyData } from "./api"
import Chart from "./Components/Chart/Chart"

class App extends React.Component {
  state = {
    data: {},
    // dailyData: {},
  }

  async componentDidMount() {
    const fetchedData = await fetchData()
    //const fetchedDailyData = await fetchDailyData()

    this.setState({ data: fetchedData })
  }

  render() {
    const { data } = this.state
    //const { dailyData } = this.state

    return (
      <div className={styles.container}>
        <Cards data={data} />
        <Chart />
      </div>
    )
  }
}

export default App
