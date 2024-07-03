import Logo from '../assets/icon.png'

const HeaderContent = function () {
  return (
    <div className='header-cont'>
      <img src={Logo} alt="Page logo" className='page-logo' />

      <h1 className='page-name'>
        Memory Card Game
      </h1>
      <p className="sub-name">Pokemon Theme</p>
    </div>
  )
}

export default HeaderContent