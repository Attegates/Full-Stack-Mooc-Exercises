import React from 'react'

const FilterForm = (props) => {
  return (
    <div>
      filter by name <input onChange={props.onFilterByChange} />
    </div>
  )
}

export default FilterForm
