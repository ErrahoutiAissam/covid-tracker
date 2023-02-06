import React from "react"
import { fetchCountries } from "../../api"
import SearchBar from "../SearchBar/SearchBar"
import { useEffect, useState } from "react"
import styles from "./SideBarCountry.module.css"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { ListItemButton } from "@mui/material"
import LoadingSpinner from "../Loader/Loader"

const SideBar = ({ handleSelectedCountry, handleError, handleLoading }) => {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearchInput = (inputValue) => {
    setSearchInput(inputValue)
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(inputValue.toLowerCase())
      )
    )
  }

  useEffect(() => {
    const fetchedCountries = async () => {
      try {
        handleLoading(true)
        setLoading(true)
        const allCountries = await fetchCountries()
        handleLoading(false)
        setLoading(false)
        setCountries(allCountries)
      } catch (error) {
        setError(error)
        handleError(error, error.message)
      }
    }

    fetchedCountries()
  }, [])

  return (
    <div className={styles.container}>
      <SearchBar onSearchInput={handleSearchInput} />

      <List component='nav' className={styles.sideBar}>
        {loading && <LoadingSpinner />}
        {!searchInput
          ? countries.map((country, index) => (
              <ListItem
                alignItems='center'
                key={index}
                button={true}
                className={styles.sidebarList}
              >
                <ListItemText
                  onClick={() => handleSelectedCountry(country)}
                  primary={country}
                  className={styles.sidebarListItem}
                />
              </ListItem>
            ))
          : filteredCountries.map((country, index) => (
              <ListItem
                key={index}
                button={true}
                className={styles.sidebarList}
              >
                <ListItemText
                  onClick={() => handleSelectedCountry(country)}
                  primary={country}
                  className={styles.sidebarListItem}
                />
              </ListItem>
            ))}
      </List>
    </div>
  )
}

export default SideBar
