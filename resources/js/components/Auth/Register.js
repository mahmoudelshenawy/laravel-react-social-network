import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
// import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import { connect } from "react-redux";
// import Alert from "../layouts/Alert";

const Register = ({ register, isAuth }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const { name, email, password, password2 } = formData;
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log("passwords do not match", "danger");
        } else {
            register({ name, email, password });
            setFormData({
                name: "",
                email: "",
                password: "",
                password2: ""
            });
        }
    };
    // redirect if registered
    if (isAuth) {
        return <Redirect to="/login" />;
    }
    return (
        <section className="signup-section">
            <div className="signup-overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="signup-inner">
                                <h1 className="py-1  text-center lobster">
                                    {" "}
                                    sign up{" "}
                                </h1>{" "}
                                <form onSubmit={e => onSubmit(e)}>
                                    <input
                                        type="text"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={e => onChange(e)}
                                        placeholder="username..."
                                    />
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        placeholder="email..."
                                    />
                                    <input
                                        type="password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={e => onChange(e)}
                                        placeholder="password..."
                                    />
                                    <input
                                        type="password"
                                        required
                                        name="password2"
                                        placeholder="confirm password..."
                                        value={password2}
                                        onChange={e => onChange(e)}
                                    />
                                    <button type="submit" className="submit">
                                        submit{" "}
                                    </button>{" "}
                                </form>{" "}
                                <p className="my-1 text-center">
                                    Already have an account ?{" "}
                                    <Link to="/login"> Sign In </Link>{" "}
                                </p>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </section>
    );
};
const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, { register })(Register);
