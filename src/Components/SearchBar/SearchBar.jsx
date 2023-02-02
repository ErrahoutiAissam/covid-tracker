import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import TextField from "@mui/material/node/TextField/TextField"
import styles from "./SearchBar.module.css"
import { X } from "react-feather"

const SearchBar = ({ onSearchInput, countryArray }) => {
  const [value, setValue] = useState("")

  const handleClick = (e) => {
    e.preventDefault()
    onSearchInput(value)
  }

  const handleSearch = (e) => {
    setValue(e.target.value)
    onSearchInput(value)
  }

  return (
    <form className={styles.container}>
      <TextField
        id='search-bar'
        label='Enter a country name'
        variant='outlined'
        placeholder='Search...'
        size='small'
        className={styles.TextField}
        onChange={handleSearch}
      />

      <IconButton
        type='submit'
        aria-label='search'
        style={{ margin: "0 20px 0 20px" }}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faSearch} />
      </IconButton>
    </form>
  )
}

export default SearchBar
