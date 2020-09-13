import React, { useState } from "react";
import { FaConnectdevelop } from "react-icons/fa";
import { BsArrow90DegDown, BsArrow90DegUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import discussion from "../../img/discussion.jpg";
import tutorial from "../../img/tutorial.jpg";
import profile from "../../img/profile.jpg";
import developers from "../../img/developers.jpg";
const Dashboard = () => {
    const [readmore, toggleRead] = useState({
        toggle: false,
        id: 0
    });
    const { toggle, id } = readmore;

    const toggleReadMore = id => {
        toggleRead({
            toggle: !toggle,
            id: id
        });
    };
    return (
        <>
            <div className="developer-section">
                <div className="container">
                    <h1 className="py-1 text-white">
                        Dashboard
                        <FaConnectdevelop />
                    </h1>
                    <p className="lead dev-info">
                        here is a little demo of this app
                    </p>
                    <br />
                    <br />
                    <div className="row pb-4">
                        <div className="col-md-6 col-lg-4  col-sm-6">
                            <div className="card">
                                <img
                                    src={discussion}
                                    className="card-img-top"
                                    style={{ width: "100%", height: "180" }}
                                />

                                <div className="card-body">
                                    <div
                                        className="card-description"
                                        style={{ minHeight: "230px" }}
                                    >
                                        <h3 className="card-title">
                                            Discussion Section
                                        </h3>
                                        <p className="card-text">
                                            what you will see here:
                                            <li>
                                                you can specify a topic in a
                                                name of tag to talk about
                                            </li>
                                            <li>
                                                it can be more that one each one
                                                separated by comma
                                            </li>
                                            <li>
                                                you can give any advice or ask
                                                any question{" "}
                                            </li>
                                            {toggle && id == 1 && (
                                                <>
                                                    <li>
                                                        you can like and dislike
                                                        a post
                                                    </li>
                                                    <li>
                                                        you can comment as well
                                                    </li>
                                                    <li>
                                                        you can filter posts by
                                                        tags
                                                    </li>
                                                    <li>
                                                        you can delete it
                                                        anytime you want
                                                    </li>
                                                </>
                                            )}
                                            {!toggle ? (
                                                <BsArrow90DegDown
                                                    fontSize="22"
                                                    className="text-primary"
                                                    onClick={() =>
                                                        toggleReadMore(1)
                                                    }
                                                />
                                            ) : (
                                                <BsArrow90DegUp
                                                    fontSize="22"
                                                    className="text-primary"
                                                    onClick={() =>
                                                        toggleReadMore(1)
                                                    }
                                                />
                                            )}
                                        </p>
                                        <br />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link
                                            to="/discussions"
                                            className="view-action"
                                        >
                                            Check it out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4  col-sm-6">
                            <div className="card">
                                <img
                                    src={tutorial}
                                    className="card-img-top"
                                    style={{ width: "100%", height: "180" }}
                                />

                                <div className="card-body">
                                    <div
                                        className="card-description"
                                        style={{ minHeight: "230px" }}
                                    >
                                        <h3 className="card-title">
                                            Tutorials Section
                                        </h3>
                                        <p className="card-text">
                                            what you will see here:
                                            <li>
                                                you can specify a tutorial in
                                                from youtube
                                            </li>
                                            <li>
                                                copy the link from youtube and
                                                drop it here
                                            </li>
                                            <li>
                                                follow the video with a good
                                                discription about the content
                                            </li>
                                            {toggle && id == 2 && (
                                                <li>
                                                    only if you see it useful
                                                    and will help the community
                                                </li>
                                            )}
                                            {!toggle ? (
                                                <BsArrow90DegDown
                                                    fontSize="22"
                                                    className="text-primary"
                                                    onClick={() =>
                                                        toggleReadMore(2)
                                                    }
                                                />
                                            ) : (
                                                <BsArrow90DegUp
                                                    fontSize="22"
                                                    className="text-primary"
                                                    onClick={() =>
                                                        toggleReadMore(2)
                                                    }
                                                />
                                            )}
                                        </p>
                                        <br />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link
                                            to="/tutorials"
                                            className="view-action"
                                        >
                                            Check it out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4  col-sm-6">
                            <div className="card">
                                <img
                                    src={developers}
                                    className="card-img-top"
                                    style={{ width: "100%", height: "180" }}
                                />

                                <div className="card-body">
                                    <div
                                        className="card-description"
                                        style={{ minHeight: "230px" }}
                                    >
                                        <h3 className="card-title">
                                            commuinty Section
                                        </h3>
                                        <p className="card-text">
                                            what you will see here:
                                            <li>
                                                first you can create a profile
                                            </li>
                                            <li>
                                                you view other people profile as
                                                well
                                            </li>
                                            <li>you can share with others</li>
                                            <li>
                                                you can view how the community
                                                grow
                                            </li>
                                        </p>
                                        <br />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link
                                            to="/developers"
                                            className="view-action"
                                        >
                                            Check it out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4  col-sm-6"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
