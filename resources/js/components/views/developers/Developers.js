import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaConnectdevelop } from "react-icons/fa";
import DeveloperCard from "./DeveloperCard";
const Developers = () => {
    const [developers, setDevelopers] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        getAllDevelopers();
    }, []);

    const getAllDevelopers = async () => {
        const res = await axios.get("/api/profiles");
        if (res.data.data && res.data.data.length > 0) {
            setloading(false);
            setDevelopers(res.data.data);
            console.log(res.data.data);
        }
    };
    return (
        <>
            <div className="developer-section">
                <div className="container">
                    <h1 className="py-1 text-white">
                        Developers
                        <FaConnectdevelop />
                    </h1>
                    <p className="lead dev-info">
                        share your profile all over the world and connect with
                        other developers as well
                    </p>
                    <br />
                    <div className="profiles row">
                        {!loading && developers.length > 0 ? (
                            developers.map(dev => (
                                <DeveloperCard key={dev.id} data={dev} />
                                // <h1>d</h1>
                            ))
                        ) : (
                            <h4>No Profile is Found Yet...</h4>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Developers;
