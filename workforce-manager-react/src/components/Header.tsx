import { Link } from "react-router-dom";
import IdentityHeader from "./IdentityHeader";

const Header = () =>
{
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
                <div className="container">
                    <Link to="/" className="navbar-brand text-bold">App |</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link to="assignments" className="nav-link text-white">Assignments</Link>
                            </li>
                        </ul>
                    </div>

                    <ul className="navbar-nav">
                        <IdentityHeader />
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;