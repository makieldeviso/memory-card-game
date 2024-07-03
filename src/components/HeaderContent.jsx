import { Logo } from "./Icons"

const HeaderContent = function () {
  return (
    <div className='header-cont'>
      <Logo/>
      <h1 className='page-name'>
        Memory Card Game
      </h1>
      <p className="sub-name">Pokemon Theme</p>
    </div>
    
  )
}

export default HeaderContent