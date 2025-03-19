import logo from "@/assets/desktop/logo.svg";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="" />
      <ThemeToggle />
    </header>
  );
};

export default Header;
