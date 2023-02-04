import React from "react"
import { fetchCountries } from "../../api"
import SearchBar from "../SearchBar/SearchBar"
import { useEffect, useState } from "react"
import styles from "./SideBarCountry.module.css"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { ListItemButton } from "@mui/material"

const SideBar = ({ handleSelectedCountry }) => {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filteredCountries, setFilteredCountries] = useState(countries)

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
        const allCountries = await fetchCountries()
        setCountries(allCountries)
      } catch (error) {
        console.log(error)
      }
    }

    fetchedCountries()
  }, [])

  return (
    <div className={styles.container}>
      <SearchBar onSearchInput={handleSearchInput} />
      <List component='nav' className={styles.sideBar}>
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
