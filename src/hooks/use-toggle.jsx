import { useState } from 'react'

export const useToggle = (init = false) => {
  const [visible, setVisible] = useState(init)

  const toggle = () => {
    setVisible((prev) => !prev)
  }

  const enable = () => {
    setVisible(true)
  }

  const disable = () => {
    setVisible(false)
  }

  return { visible, toggle, enable, disable }
}
