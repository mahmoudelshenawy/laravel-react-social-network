import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { DiCodeigniter, DiCode } from "react-icons/di";
import {
    FaRegUser,
    FaUserCheck,
    FaSignOutAlt,
    FaGlassCheers,
    FaCodeBranch
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = ({ isAuth, logout, user }) => {
    const authLinks = (
        <ul className="nav-links d-flex justify-content-center align-items-center">
            <Link to="/discussions" className="nav-link">
                <FaGlassCheers style={{ fontSize: "27px" }} className="" />{" "}
                Discussions
            </Link>
            <Link to="/videos" className="nav-link">
                <DiCode style={{ fontSize: "33px" }} className="" /> Videos
            </Link>
            <a href="#!" className="nav-link" onClick={logout}>
                <FaSignOutAlt style={{ fontSize: "20px" }} className="" />{" "}
                Logout
            </a>
        </ul>
    );
    const guestLinks = (
        <ul className="nav-links d-flex justify-content-center align-items-center">
            <Link to="/developers" className="nav-link">
                <DiCode style={{ fontSize: "33px" }} className="" /> Developers
            </Link>
            <Link to="/register" className="nav-link">
                <FaRegUser /> Sign up
            </Link>
            <Link to="/login" className="nav-link">
                <FaUserCheck /> login
            </Link>
        </ul>
    );
    return (
        <nav className="navbar bg-dark text-white">
            <Link to="/" className="navbar-brand">
                <DiCodeigniter className="mb-2 mr-1" />
                Stack underflow
                {user && isAuth && (
                    <img
                        src={user.gravatar}
                        className="img-fluid rounded-circle ml-3 p-0"
                        style={{ width: "30px" }}
                        alt=""
                    />
                )}
            </Link>
            {isAuth ? authLinks : guestLinks}
        </nav>
    );
};
const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
});
export default connect(mapStateToProps, { logout })(Navbar);
