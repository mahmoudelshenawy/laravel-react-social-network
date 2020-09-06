import React, { useState, useEffect } from "react";
import { FaChartLine, FaCheck } from "react-icons/fa";
import { connect } from "react-redux";
import { loadAllTuts } from "../../actions/tutorials";
import Form from "./sections/Form";
import TutBlog from "./sections/TutBlog";
const TutorialPage = () => {
    const [Tuts, setTuts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Edited, setEdited] = useState({});
    useEffect(() => {
        async function fetchData() {
            const result = await loadAllTuts();
            await setTuts(result);
            setLoading(false);
        }
        fetchData();
    }, []);
    const addNewTutToCollection = newTut => {
        setTuts([newTut, ...Tuts]);
    };
    const selectTheTutToEdit = id => {
        const edited = Tuts.find(item => item.id === id);
        setEdited(edited);
    };
    const arraymove = (arr, fromIndex, toIndex) => {
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        return arr;
    };
    const EditTutorial = (id, theEditItem) => {
        const takeTutsOut = [...Tuts];
        //cut the one we want to change
        const filtered = takeTutsOut.filter(tut => tut.id !== id);
        //change the tut
        let manipulate = takeTutsOut.find(tut => tut.id == id);
        const Position = takeTutsOut.indexOf(manipulate);

        manipulate = { ...theEditItem };
        //combine them
        const finalTutsArr = [theEditItem, ...filtered];
        const finalTuts = arraymove(finalTutsArr, 0, Position);
        console.log(finalTuts);
        setTuts(finalTuts);
    };
    const removeTut = id => {
        const filtered = Tuts.filter(item => item.id !== id);
        setTuts(filtered);
    };
    return (
        <>
            <div className="hacks-section">
                <div className="container">
                    <h1 className="py-1 text-white">
                        Tutorials sections
                        <FaChartLine />
                    </h1>
                    <p className="lead">
                        please help our community with videos you see them
                        useful
                    </p>
                    <p className="dev-info">
                        <FaCheck /> the videos should be from youtube only{" "}
                    </p>
                    <p className="dev-info">
                        <FaCheck /> follow the video by good explained
                        describtion{" "}
                    </p>
                    <br />
                    <Form
                        addNewTutToCollection={addNewTutToCollection}
                        EditTutorial={EditTutorial}
                        edited={Edited !== undefined ? Edited : null}
                    />
                    <br />
                    <div className="row my-4">
                        {!loading && Tuts.length > 0 ? (
                            Tuts.map(tut => (
                                <div key={tut.id} className="col-6 offset-3">
                                    {" "}
                                    <TutBlog
                                        tut={tut}
                                        selectTheTutToEdit={selectTheTutToEdit}
                                        removeTut={removeTut}
                                    />{" "}
                                </div>
                            ))
                        ) : (
                            <h3 className="text-center">
                                no post has been found yet...
                            </h3>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TutorialPage;
