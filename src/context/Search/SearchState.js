import React, { useState } from 'react'
import SearchContext from './SearchContext'

const SearchState = (props) => {
    const [searchData, setSearchData] = useState([])

    const findSearch = async (key) => {
        const response = await fetch(`${process.env.REACT_APP_API}/api/search/${key}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await response.json()
        setSearchData(json)
    }
    return (
        <SearchContext.Provider value={{ findSearch, searchData }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchState