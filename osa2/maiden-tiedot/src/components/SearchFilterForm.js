import React from 'react'

const SearchFilterForm = ({ handleFilterChange }) => {
  return (
    <div>
      find countries <input onChange={handleFilterChange} />
    </div>
  )
}

export default SearchFilterForm
