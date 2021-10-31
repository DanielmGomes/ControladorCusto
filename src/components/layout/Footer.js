import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {

  return(

    <footer>
      <ul>
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaLinkedin />
        </li>
      </ul>
      
      <p>Controlador de Custos | <span>Daniel &copy; 2021</span></p>

    </footer>

  )

}

export default Footer