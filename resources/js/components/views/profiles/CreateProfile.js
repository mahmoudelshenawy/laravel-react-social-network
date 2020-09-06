import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from "../../utils/sweetFunctions";
import {
    FaChartLine,
    FaCheck,
    FaUserAlt,
    FaFacebookSquare,
    FaTwitterSquare,
    FaLinkedin
} from "react-icons/fa";
import axios from "axios";
const CreateProfile = ({ user, match }) => {
    const url = match.url;
    let addSign = url.indexOf("&");
    let editisTrue = addSign !== -1 ? url.substring(addSign) : "";
    let editIsTrue = url.indexOf("edit");
    const userId = match.params.userId;
    const [profile, setProfile] = useState({});
    const [loading, setloading] = useState(true);
    const [display, toggleDisplay] = useState(false);
    const [Image, setImageToSend] = useState("");
    const [Edit, setEdit] = useState(false);
    const [formData, setformData] = useState({
        id: "",
        full_name: "",
        age: "",
        contact_number: "",
        study: "",
        graduation_year: "",
        years_of_experience: "",
        current_job: "",
        previous_job: "",
        avatar: [],
        facebook: "",
        twitter: "",
        linkedin: "",
        experience_language: "",
        experience_technology: "",
        portfolio: ""
    });
    const {
        id,
        full_name,
        age,
        contact_number,
        study,
        graduation_year,
        years_of_experience,
        current_job,
        previous_job,
        avatar,
        facebook,
        twitter,
        linkedin,
        experience_language,
        experience_technology,
        portfolio
    } = formData;

    const getUserProfile = async () => {
        try {
            const result = await axios.get(`/api/profiles/${userId}/view`);

            if (isEmpty(result.data.data) === false) {
                setProfile(result.data.data);
                setformData({ ...formData, ...profile });
                setloading(false);
                setEdit(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (editIsTrue !== -1) {
            getUserProfile();
        }
    }, [loading]);
    const onChange = e =>
        setformData({ ...formData, [e.target.name]: e.target.value });

    const setImage = e => {
        setformData({
            ...formData,
            [e.target.name]: e.target.files
        });
    };

    const uploadProfile = async (formData, history, edit = false) => {
        try {
            const config = {
                // headers: {
                //     "Content-Type": undefined,
                //     "Content-Type": "application/json",
                //     "Content-Type": "multipart/form-data"
                // },
                header: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            };
            if (Edit === false) {
                let res = await axios.post("/api/profiles", formData, config);
                console.log(res);
                history.push(`/${userId}/profiles`);
            } else if (Edit === true) {
                let res = await axios.put(
                    `/api/profiles/${id}`,
                    formData,
                    config
                );
                console.log(res);
                // history.push(`/${userId}/profiles`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        uploadProfile(formData, history);
    };
    return (
        <>
            <div className="hacks-section">
                <div className="container">
                    <h1 className="py-1 text-white">
                        Create amazing professional profile
                        <FaChartLine />
                    </h1>
                    <p className="lead">
                        <FaCheck /> please fill out these fields it helps the
                        community know more about you
                    </p>
                    <small>* = required field</small>
                    <br />

                    <br />
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <form
                                onSubmit={e => onSubmit(e)}
                                encType="multipart/form-data"
                            >
                                <div className="row">
                                    <div className="form-group col-md-4 col-10">
                                        <input
                                            type="text"
                                            placeholder="full name"
                                            name="full_name"
                                            className=" form-control"
                                            value={full_name ?? ""}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="form-group col-md-4 col-10">
                                        <input
                                            type="numeric"
                                            placeholder="age"
                                            name="age"
                                            className=" form-control"
                                            value={age ?? ""}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="form-group col-md-4 col-10">
                                        <input
                                            type="numeric"
                                            placeholder="contact number"
                                            name="contact_number"
                                            className=" form-control"
                                            value={contact_number ?? ""}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group my-2">
                                    <select
                                        name="status"
                                        className="custom-select"
                                    >
                                        <option value="0">
                                            * Select Professional Status
                                        </option>
                                        <option value="Developer">
                                            Developer
                                        </option>
                                        <option value="Junior Developer">
                                            Junior Developer
                                        </option>
                                        <option value="Senior Developer">
                                            Senior Developer
                                        </option>
                                        <option value="Manager">Manager</option>
                                        <option value="Student or Learning">
                                            Student or Learning
                                        </option>
                                        <option value="Instructor">
                                            Instructor or Teacher
                                        </option>
                                        <option value="Intern">Intern</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <small className="form-text">
                                        Give us an idea of where you are at in
                                        your career
                                    </small>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6 col-10">
                                        <input
                                            type="text"
                                            placeholder="Study"
                                            name="study"
                                            className="form-control"
                                            value={study ?? ""}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-10">
                                        <input
                                            type="numeric"
                                            placeholder="graduation year"
                                            name="graduation_year"
                                            value={graduation_year ?? ""}
                                            className="form-control"
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-10 form-group">
                                        <input
                                            type="text"
                                            placeholder="your current work"
                                            name="current_job"
                                            value={current_job ?? ""}
                                            className="form-control"
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="col-md-6 col-10 form-group">
                                        <input
                                            type="text"
                                            placeholder="your previous work"
                                            name="previous_job"
                                            value={previous_job ?? ""}
                                            className="form-control"
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6 col-10">
                                        <input
                                            type="text"
                                            placeholder="years of experience"
                                            name="years_of_experience"
                                            value={years_of_experience ?? ""}
                                            className="form-control"
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-10">
                                        <input
                                            type="text"
                                            placeholder="your website"
                                            name="portfolio"
                                            value={portfolio ?? ""}
                                            onChange={e => onChange(e)}
                                            className="form-control"
                                        />
                                        <small className="form-text">
                                            it could be your business website or
                                            portoflio
                                        </small>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="* experience languages skills"
                                        name="experience_language"
                                        className="form-control"
                                        value={experience_language ?? ""}
                                        onChange={e => onChange(e)}
                                    />
                                    <small className="form-text">
                                        Please use comma separated values (eg.
                                        HTML,CSS,JavaScript,PHP)
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="* experience technologies skills"
                                        name="experience_technology"
                                        className="form-control"
                                        value={experience_technology ?? ""}
                                        onChange={e => onChange(e)}
                                    />
                                    <small className="form-text">
                                        Please use comma separated values (eg.
                                        graphics , photoshop)
                                    </small>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        placeholder="A short bio of yourself"
                                        name="bio"
                                        className="form-control"
                                    ></textarea>
                                    <small className="form-text">
                                        Tell us a little about yourself
                                    </small>
                                </div>
                                <div className="my-2">
                                    <button
                                        type="button"
                                        className="btn btn-secondary my-3"
                                        onClick={() => toggleDisplay(!display)}
                                    >
                                        Add Social Network links
                                    </button>
                                    <span>Optional</span>
                                </div>
                                {display && (
                                    <>
                                        <div className="input-group mb-3 mt-2">
                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    id="basic-addon1"
                                                >
                                                    <FaFacebookSquare />
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="facebook"
                                                aria-label="Username"
                                                name="facebook"
                                                value={facebook ?? ""}
                                                onChange={e => onChange(e)}
                                                aria-describedby="basic-addon1"
                                            />
                                        </div>
                                        <div className="input-group mb-3 mt-2">
                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    id="basic-addon1"
                                                >
                                                    <FaTwitterSquare />
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="twitter"
                                                aria-label="twitter"
                                                name="twitter"
                                                value={twitter ?? ""}
                                                onChange={e => onChange(e)}
                                                aria-describedby="basic-addon1"
                                            />
                                        </div>
                                        <div className="input-group mb-3 mt-2">
                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    id="basic-addon1"
                                                >
                                                    <FaLinkedin />
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="linkedin"
                                                aria-label="Username"
                                                name="linkedin"
                                                value={linkedin ?? ""}
                                                onChange={e => onChange(e)}
                                                aria-describedby="basic-addon1"
                                            />
                                        </div>{" "}
                                    </>
                                )}
                                <div className="avatar-card">
                                    <div className="input-group my-2 py-1 text-center">
                                        <div className="input-group-prepend  ">
                                            <span
                                                className="input-group-text"
                                                id="inputGroupFileAddon01"
                                            >
                                                Add Profile
                                            </span>
                                        </div>
                                    </div>
                                    <div className="add-avatar">
                                        <div className="custom-file py-1 avatar-input">
                                            <input
                                                type="file"
                                                name="avatar"
                                                className="custom-file-input  py-1"
                                                id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon01"
                                                onChange={setImage}
                                            />
                                            <label
                                                className="custom-file-label"
                                                htmlFor="inputGroupFile01"
                                            >
                                                Choose Image
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-3"
                                >
                                    {Edit ? "update" : "submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapstateToProps = state => ({
    user: state.auth.user
});
export default connect(mapstateToProps)(CreateProfile);
