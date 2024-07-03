import { Github } from "./Icons"


const FooterContent = function () {
  return (
    <div className='footer-content'>
      <div className='footer-author'>
        <p>Copyright&copy; 2024 - Fred Mark Baldeviso</p>
        <a className="github-link" href="https://github.com/makieldeviso" target="_blank" >
          <Github/>
          makieldeviso
        </a>
      </div>

      <div>
        <p>Data resources received from &nbsp;
          <a href="https://pokeapi.co/" target="_blank" >
          PokeAPI.co
          </a>
        </p>
      </div>
      
    </div>
  )
}

export default FooterContent