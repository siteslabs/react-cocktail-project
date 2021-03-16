import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useGlobalContext } from "../context"

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext(),
    cocktailValue = React.useRef(),
    searchCocktail = () => {
      setSearchTerm(cocktailValue.current.value)
    },
    submitHandle = (e) => {
      e.preventDefault()
    }

  useEffect(() => {
    cocktailValue.current.focus()
  }, [])

  return (
    <section className="section search">
      <form className="search-form" onSubmit={submitHandle}>
        <div className="form-control">
          <label htmlFor="name">Search your favorite cocktail</label>
          <input
            type="text"
            name="name"
            ref={cocktailValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
