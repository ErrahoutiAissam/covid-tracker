import React from "react"
import styles from "./App.module.css"
import Cards from "./Components/Card/Cards"
import { fetchData } from "./api"
import Chart from "./Components/Chart/Chart"
import SideBar from "./Components/CountryBar/SideBarCountries"

class App extends React.Component {
  state = {
    data: {},
    selectedCountry: "",
    // dailyData: {},
  }

  async componentDidMount() {
    const fetchedData = await fetchData()
    this.setState({ data: fetchedData })
  }

  handleSelectedCountry = async (country) => {
    const countryApi = await fetchData(country)
    console.log(countryApi)
    this.setState({ data: countryApi, selectedCountry: country })
  }

  render() {
    const { data, selectedCountry } = this.state
    //console.log(selectedCountry)
    //const { dailyData } = this.state

    return (
      <div>
        <div className={styles.container}>
          <Cards data={data} />
          <div className={styles.display}>
            <SideBar handleSelectedCountry={this.handleSelectedCountry} />
            <Chart
              className={styles.chart}
              data={data}
              country={selectedCountry}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
