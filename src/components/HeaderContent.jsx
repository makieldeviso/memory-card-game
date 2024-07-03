import { useRef } from 'react'

import Logo from '../assets/icon.png'
import { InfoButtonPlusModal } from './Modals'

const HeaderContent = function () {

  return (
    <div className='header-cont'>
      <div className='page-banner'>
        <img src={Logo} alt="Page logo" className='page-logo' />
        <h1 className='page-name'>
          Memory Card Game
        </h1>
        <p className="sub-name">Pokemon Theme</p>
      </div>
      
      <div className='menu-btns'>
        <InfoButtonPlusModal/>
      </div>

    </div>
  )
}

export default HeaderContent