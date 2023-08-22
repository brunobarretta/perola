import { HeaderButton, HeaderButtonsContainer, HeaderContainer } from './styles'

import { MapPin, Power, ShoppingCart, User } from 'phosphor-react'

import coffeLogoImage from '../../assets/coffe-delivery-logo.svg'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useUser } from '../../hooks/useUser'

export function Header() {
  const { cartQuantity } = useCart()
  const { user, logOutUser } = useUser()

  return (
    <HeaderContainer>
      <div className="container">
        <NavLink to="/">
          <img src={coffeLogoImage} alt="" />
        </NavLink>

        <HeaderButtonsContainer>
          <HeaderButton variant="purple">
            <MapPin size={20} weight="fill" />
            Indaiatuba, SP
          </HeaderButton>
          <NavLink to="/completeOrder">
            <HeaderButton variant="yellow">
              {cartQuantity >= 1 && <span>{cartQuantity}</span>}
              <ShoppingCart size={20} weight="fill" />
            </HeaderButton>
          </NavLink>
          <NavLink to="/login">
            <HeaderButton variant="purple">
              <User size={20} weight="fill" />
            </HeaderButton>
          </NavLink>
          {user ?<HeaderButton style={{cursor: "pointer"}} variant="purple">
            <Power size={20} weight="fill" onClick={() => logOutUser()}/>
          </HeaderButton> : null}
        </HeaderButtonsContainer>
      </div>
    </HeaderContainer>
  )
}
