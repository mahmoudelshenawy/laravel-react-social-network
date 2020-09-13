import React from "react";
import { DiMongodb } from "react-icons/di";
import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaLinkedin,
    FaMedium
} from "react-icons/fa";
import Img from "../../img/2.jpg";
const DeveloperCard = ({
    data: {
        full_name,
        age,
        id,
        study,
        years_of_experience,
        current_job,
        avatar,
        facebook,
        twitter,
        linkedin,
        experience_language,
        experience_technology,
        portfolio,
        user: { gravatar }
    }
}) => {
    const skillsArr = experience_language.split(",");
    const techsArr = experience_technology.split(",");
    return (
        <div className="col-lg-4 col-md-6 col-sm-10 mx-auto mb-3">
            <div className="dev-card card">
                <img
                    src={Img}
                    alt=""
                    height="75px"
                    style={{ height: "160px" }}
                    className="card-img-top img-fluid"
                />
                {/* avatarImg.image */}
                <img
                    src={gravatar}
                    alt=""
                    style={{
                        border: "2px solid #000",
                        borderRadius: "50%",
                        marginTop: "-66px"
                    }}
                    className="rounded-circle mx-auto"
                    width="120px"
                    height="120px"
                />
                <div className="card-body text-center">
                    <h3 className="dev-info py-1 mb-1">{full_name}</h3>
                    <h3 className="py-1 mb-1 dev-info">age : {age}</h3>

                    <h5 className="py-1 mb-1 dev-info">job: {current_job}</h5>
                    <h5 className="py-1 mb-1 dev-info">studied : {study}</h5>
                    <h5 className="py-1 mb-1 dev-info">
                        {years_of_experience} year/s of experience
                    </h5>

                    <ul className="d-flex justify-content-around align-items-center text-center">
                        {skillsArr.slice(0, 4).map((skill, index) => (
                            <li className="text-primary" key={index}>
                                <DiMongodb />
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-footer d-flex justify-content-around align-items-center">
                    {facebook && (
                        <a
                            href={facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebookSquare className="card-icon" />
                        </a>
                    )}
                    {twitter && (
                        <a
                            href={twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTwitterSquare className="card-icon" />
                        </a>
                    )}
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin className="card-icon" />
                        </a>
                    )}
                    <a href="#!" target="_blank" rel="noopener noreferrer">
                        <FaMedium className="card-icon" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeveloperCard;
