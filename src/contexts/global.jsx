import { useToggle } from 'hooks'

const { createContext, useContext } = require('react')

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const {
    visible: inventoryVisible,
    enable: openInventory,
    disable: closeInventory
  } = useToggle(false)
  return (
    <GlobalContext.Provider
      value={{
        inventory: {
          visible: inventoryVisible,
          open: openInventory,
          close: closeInventory
        }
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
