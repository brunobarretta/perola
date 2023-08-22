import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CartContextProvider } from './contexts/CartContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { UserProvider } from './contexts/UserContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <UserProvider>
          <CartContextProvider>
            <Router />
          </CartContextProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
