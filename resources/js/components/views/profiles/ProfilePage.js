import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaCheck } from "react-icons/fa";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import Alert from "../../layouts/Alert";

const isEmpty = obj => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};
const ProfilePage = ({ match }) => {
    const [profile, setProfile] = useState({});
    const [loading, setloading] = useState(true);
    const userId = match.params.userId;
    const getUserProfile = async () => {
        try {
            const result = await axios.get(`/api/profiles/${userId}/view`);
            !isEmpty(result.data.data) && setProfile(result.data.data);
            !isEmpty(result.data.data) && setloading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const removeProfile = () => {
        setloading(true);
        setProfile({});
    };
    useEffect(() => {
        getUserProfile();
    }, [loading, profile]);
    return (
        <>
            <div className="hacks-section">
                <div className="container">
                    <h1 className="py-1 text-white">
                        Create amazing professional profile
                        <FaChartLine />
                    </h1>
                    <p className="lead">
                        show your skill set for recruiters to hire you
                    </p>
                    <br />
                    <Alert />
                    <br />
                    <div className="row my-4">
                        {loading === false && isEmpty(profile) === false ? (
                            <>
                                <ProfileCard
                                    profile={profile}
                                    userId={userId}
                                    removeProfile={removeProfile}
                                />
                            </>
                        ) : (
                            <div className="col-6 offset-3">
                                <h3 className="text-center">
                                    you have not create a profile yet here you
                                    can create one
                                    <br />
                                    <Link
                                        to={`/${userId}/profiles/create_profile`}
                                        className="delete-action"
                                    >
                                        Create A Profile
                                    </Link>
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
