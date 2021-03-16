import React, { useState, useContext, useEffect } from "react"
import { useCallback } from "react"

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true),
    [searchTerm, setSearchTerm] = useState("a"),
    [cocktails, setCocktails] = useState([]),
    fetchDrinks = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${url}${searchTerm}`),
          data = await response.json(),
          { drinks } = data

        if (drinks) {
          const newCocktails = drinks.map((item) => {
            const {
              idDrink,
              strDrink,
              strDrinkThumb,
              strAlcoholic,
              strGlass,
            } = item
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
            }
          })
          setCocktails(newCocktails)
          setLoading(false)
        } else {
          setLoading(false)
          setCocktails([])
        }
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm])

  return (
    <AppContext.Provider
      value={{
        loading,
        setSearchTerm,
        cocktails,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
