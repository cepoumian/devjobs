import logo from "@/assets/desktop/logo.svg";
import ThemeToggle from "./ThemeToggle";
import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Devjobs logo" />
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;
