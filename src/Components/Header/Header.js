import logo from "./../../images/logo.png";
import "./Header.css";

const Header = () => {
    return (
        <div className="header"> 
            <img src={logo} alt=""/>      
            <nav className='nav'>
                <a href="/shop">Shop</a>
                <a href="/review">Order-Review</a>
                <a href="/inventory">Manage Inventory</a>

            </nav>      
        </div>
    );
};

export default Header;