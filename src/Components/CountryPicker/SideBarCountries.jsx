import React from "react"
import { fetchCountries } from "../../api"
import SearchBar from "../SearchBar/SearchBar"
import { useEffect, useState } from "react"
import styles from "./SideBarCountry.module.css"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { ListItemButton } from "@mui/material"

const SideBar = () => {
  const [countries, setCountries] = useState([])

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
      <SearchBar />
      <List component='nav' className={styles.sideBar}>
        {countries.map((country, index) => (
          <ListItem key={index} button={true} className={styles.sidebarList}>
            <ListItemText primary={country} classes={styles.sidebarListItem} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default SideBar
