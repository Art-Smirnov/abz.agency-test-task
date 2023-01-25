import logo from "./images/Logo.svg"
import Button from "../UI/Button";
import './Header.sass'
const Header = () => {
  return (
    <header className="header container">
      <img className="header-image" src={logo} alt="logo"/>
      <div className="header-buttons">
        <Button>Users</Button>
        <Button>Sign up</Button>
      </div>
    </header>
  )
}

export default Header