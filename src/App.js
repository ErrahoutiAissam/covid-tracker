import React from "react"
import styles from "./App.module.css"
import Cards from "./Components/Card/Cards"
import { fetchData } from "./api"
import Chart from "./Components/Chart/Chart"
import SideBar from "./Components/CountryPicker/SideBarCountries"

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
      <div>
        <div className={styles.container}>
          <Cards data={data} />
          <div className={styles.display}>
            <SideBar />
            <Chart className={styles.chart} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
