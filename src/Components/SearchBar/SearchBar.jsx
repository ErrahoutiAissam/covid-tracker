import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import TextField from "@mui/material/node/TextField/TextField"
import styles from "./SearchBar.module.css"
import { X } from "react-feather"

const SearchBar = ({ onSearchInput }) => {
  const [inputValue, setInputValue] = useState("")

  const handleClick = (e) => {
    setInputValue("")
    onSearchInput("")
    e.preventDefault()
  }

  const handleSearch = (e) => {
    setInputValue(e.target.value)
    onSearchInput(e.target.value)
  }

  return (
    <form className={styles.container}>
      <TextField
        value={inputValue}
        id='search-bar'
        label='Enter a country name'
        variant='outlined'
        placeholder='Search...'
        size='small'
        className={styles.textField}
        onChange={handleSearch}
      />

      <IconButton
        type='submit'
        aria-label='search'
        style={{ margin: "0 20px 0 20px" }}
        onClick={handleClick}
      >
        {/* <FontAwesomeIcon icon={faSearch} /> */}
        <X className={styles.textField} />
      </IconButton>
    </form>
  )
}

export default SearchBar
