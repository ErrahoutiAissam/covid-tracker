import React from "react"
import styles from "./App.module.css"
import Cards from "./Components/Card/Cards"
import { fetchData } from "./api"
import Chart from "./Components/Chart/Chart"
import SideBar from "./Components/CountryBar/SideBarCountries"
import ErrorDisplay from "./Components/ErrorDisplay/ErrorComponent"
import LoadingSpinner from "./Components/Loader/Loader"

class App extends React.Component {
  state = {
    data: {},
    selectedCountry: "",
    error: null,
    errorMsg: "",
    isLoading: false,
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true })
      const fetchedData = await fetchData()
      this.setState({
        data: fetchedData.fluidData,
        error: fetchedData.error,
        errorMsg: fetchedData.errorMsg,
        isLoading: false,
      })
    } catch (e) {
      this.setState({ error: e })
    }
  }

  handleSelectedCountry = async (country) => {
    try {
      const countryApi = await fetchData(country)
      this.setState({
        data: countryApi.fluidData,
        selectedCountry: country,
        error: countryApi.error,
        errorMsg: countryApi.errorMsg,
      })
    } catch (e) {
      this.setState({ error: e })
    }
  }

  handleErrorComponent = (e, msg) => {
    this.setState({ error: e, errorMsg: msg })
  }

  handleLoadingComponent = (e) => {
    this.setState({ isLoading: e })
  }

  render() {
    const { data, selectedCountry, error, errorMsg, isLoading } = this.state

    console.log(isLoading)

    if (error) {
      return <ErrorDisplay msg={errorMsg} />
    }

    return (
      <div className={styles.container}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.container}>
            <Cards data={data} />
            <div className={styles.display}>
              <SideBar
                handleSelectedCountry={this.handleSelectedCountry}
                handleError={this.handleErrorComponent}
                handleLoading={this.handleLoadingComponent}
              />
              <Chart
                className={styles.chart}
                data={data}
                country={selectedCountry}
                handleError={this.handleErrorComponent}
                handleLoading={this.handleLoadingComponent}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
