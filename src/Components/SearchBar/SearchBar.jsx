import React from "react"
import IconButton from "@mui/material/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import TextField from "@mui/material/node/TextField/TextField"
import { X } from "react-feather"

const SearchBar = () => {
  return (
    <form>
      <TextField
        id='search-bar'
        className='text'
        label='Enter a country name'
        variant='outlined'
        placeholder='Search...'
        size='small'
      />

      <IconButton type='submit' aria-label='search'>
        <FontAwesomeIcon icon={faSearch} />
      </IconButton>
    </form>
  )
}

export default SearchBar
