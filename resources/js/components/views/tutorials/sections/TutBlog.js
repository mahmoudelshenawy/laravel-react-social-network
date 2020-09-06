import React from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { FaEllipsisV } from "react-icons/fa";
import {
    FaThumbsUp,
    FaThumbsDown,
    FaCommentAlt,
    FaTrashAlt,
    FaEdit
} from "react-icons/fa";
const TutBlog = props => {
    const { title, link, desc, keywords, user } = props.tut;
    const {
        isAuth,
        user: { gravatar, id, name, is_admin }
    } = props.auth;
    const { selectTheTutToEdit, removeTut, setAlert } = props;
    const youtube_parser = url => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    };
    if (link) {
        const code = youtube_parser(link);
    }
    const keywordsArr = keywords.split(",");

    const deleteTutRequest = async id => {
        alert("Are you Sure about that?");
        const result = await axios.delete(`/api/videos/${id}`);
        removeTut(id);
        setAlert("the tutorial has been deleted", "success");
    };
    return (
        <div className="card my-3">
            <div className="card-header header-container">
                <h3>{title}</h3>
                {isAuth && id == user.id ? (
                    // <button className="btn btn-danger btn-sm">
                    //     <FaTrashAlt />
                    // </button>
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Button group with nested dropdown"
                    >
                        <div className="btn-group" role="group">
                            <div
                                id="btnGroupDrop1"
                                type="button"
                                className="px-2 py-1"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <FaEllipsisV />
                            </div>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="btnGroupDrop1"
                            >
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() =>
                                        selectTheTutToEdit(props.tut.id)
                                    }
                                >
                                    <FaEdit />
                                    Edit
                                </a>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() =>
                                        deleteTutRequest(props.tut.id)
                                    }
                                >
                                    <FaTrashAlt />
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="card-body">
                <div className="iframe-container">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${youtube_parser(
                            link
                        )}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="user_info d-flex justify-content-start my-3">
                    <img
                        src={gravatar}
                        width="60"
                        height="60"
                        className="img-fluid rounded-circle mr-4"
                    />
                    <h3 className="align-self-center dev-info">{name}</h3>
                </div>
                <div className="desc my-2">
                    <h3>Description :</h3>
                    {desc}
                </div>
            </div>
            <div className="card-footer text-center">
                {keywordsArr.length > 0 &&
                    keywordsArr.map((item, index) => (
                        <span key={index} className="mr-3 btn btn-info">
                            {item}
                        </span>
                    ))}
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { setAlert })(TutBlog);
