import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
const ProfileCard = props => {
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
    } = props.profile;
    const { userId } = props;
    const removeProfile = props.removeProfile;
    const skillsArr = experience_language.split(",");
    const techsArr = experience_technology.split(",");
    const deleteProfileOnClick = (e, id) => {
        e.preventDefault();
        axios.delete(`/api/profiles/${id}`).then(data => {
            if (data.data.success === true) removeProfile();
        });
    };
    return (
        <>
            <div className="row">
                <div className="container ">
                    <div className="d-flex justify-content-center align-items-center align-self-center">
                        <div className="profile-card row">
                            <div className="left-container col-md-8 px-0">
                                <ul
                                    className="nav nav-tabs d-flex justify-content-center tabs-container"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="personal-tab"
                                            data-toggle="tab"
                                            href="#personal"
                                            role="tab"
                                            aria-controls="personal"
                                            aria-selected="true"
                                        >
                                            personal
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="study-tab"
                                            data-toggle="tab"
                                            href="#study"
                                            role="tab"
                                            aria-controls="study"
                                            aria-selected="false"
                                        >
                                            study
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="career-tab"
                                            data-toggle="tab"
                                            href="#career"
                                            role="tab"
                                            aria-controls="career"
                                            aria-selected="false"
                                        >
                                            career
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="skills-tab"
                                            data-toggle="tab"
                                            href="#skills"
                                            role="tab"
                                            aria-controls="skills"
                                            aria-selected="false"
                                        >
                                            skills
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="contacts-tab"
                                            data-toggle="tab"
                                            href="#contacts"
                                            role="tab"
                                            aria-controls="contacts"
                                            aria-selected="false"
                                        >
                                            contacts
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="actions-tab"
                                            data-toggle="tab"
                                            href="#actions"
                                            role="tab"
                                            aria-controls="actions"
                                            aria-selected="false"
                                        >
                                            actions
                                        </a>
                                    </li>
                                </ul>

                                <div
                                    className="tab-content p-3"
                                    id="myTabContent"
                                >
                                    <div
                                        className="tab-pane fade show active"
                                        id="personal"
                                        role="tabpanel"
                                        aria-labelledby="personal-tab"
                                    >
                                        {/* full_name, age, contact_number, */}
                                        <h3>full Name : {full_name}</h3>
                                        <h3>age : {age}</h3>
                                        <h3>location : </h3>
                                        <h3>
                                            contact_number : {contact_number}
                                        </h3>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="study"
                                        role="tabpanel"
                                        aria-labelledby="study-tab"
                                    >
                                        {/* study, graduation_year, */}
                                        <h3>university : </h3>
                                        <h3>study :{study} </h3>
                                        <h3>
                                            graduation year : {graduation_year}
                                        </h3>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="career"
                                        role="tabpanel"
                                        aria-labelledby="career-tab"
                                    >
                                        {/* experience_language,
        experience_technology, */}
                                        <h3>Current job : {current_job}</h3>
                                        <h3>previous job : {previous_job}</h3>
                                        <h3>current company :</h3>
                                        <h3>previous company :</h3>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="skills"
                                        role="tabpanel"
                                        aria-labelledby="skills-tab"
                                    >
                                        <div>
                                            <h3>
                                                programming language :{" "}
                                                {skillsArr.map(item => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </h3>

                                            <h3>
                                                other technologies :{" "}
                                                {techsArr.map(item => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </h3>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="contacts"
                                        role="tabpanel"
                                        aria-labelledby="contacts-tab"
                                    ></div>
                                    <div
                                        className="tab-pane fade d-flex align-items-center justify-content-center"
                                        id="actions"
                                        role="tabpanel"
                                        aria-labelledby="actions-tab"
                                    >
                                        <div
                                            style={{
                                                marginTop: "10%",
                                                marginRight: "15px"
                                            }}
                                        >
                                            <Link
                                                to={`/${userId}/profiles/edit_profile&edit=true`}
                                                className="edit-action"
                                            >
                                                Edit Profile
                                            </Link>
                                        </div>
                                        <div style={{ marginTop: "10%" }}>
                                            <Link
                                                to="#"
                                                className="delete-action"
                                                onClick={e =>
                                                    deleteProfileOnClick(e, id)
                                                }
                                            >
                                                Delete Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right-container col-md-4 d-flex align-self-center justify-content-center">
                                <div style={{ marginTop: "22%" }}>
                                    <img
                                        src={
                                            avatar === null
                                                ? props.user.gravatar
                                                : avatar
                                        }
                                        className="rounded-circle"
                                    />
                                    <h3 className="my-2">{full_name}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps)(ProfileCard);
