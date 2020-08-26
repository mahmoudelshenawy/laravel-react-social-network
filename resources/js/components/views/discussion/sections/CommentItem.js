import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const CommentItem = ({
    comment: { id, text, user, created_at, user_id, post_id },
    auth,
    deleteCommentFromState
}) => {
    const deleteComment = (post_id, id) => {
        axios.delete(`/api/posts/${post_id}/comments/${id}`).then(result => {
            console.log(result);
            deleteCommentFromState(id);
        });
    };
    return (
        <div className="row mb-2">
            <div className="container">
                <div className="col-lg-6 col-md-8 col-sm-10 mx-auto comment-container  py-3">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-10 mx-auto d-flex align-items-center">
                            <img
                                src={user.gravatar}
                                className="img-fluid rounded-circle hack-img"
                                style={{ width: "100px", height: "100px" }}
                                alt=""
                            />
                        </div>
                        <div className="col-lg-8 col-mg-8 col-sm-10 mx-auto">
                            <h2 className="dev-info py-1">{user.name}</h2>
                            <h4 className="dev-info py-1">{text}</h4>
                            <p className="post-date">
                                Posted on{" "}
                                <Moment format="YYYY/MM/DD">
                                    {created_at}
                                </Moment>
                            </p>
                        </div>
                        {!auth.loading && auth.user.id === user.id && (
                            <button
                                style={{
                                    position: "absolute",
                                    top: "-1px",
                                    right: "-1px"
                                }}
                                className="btn btn-danger"
                                onClick={() => deleteComment(post_id, id)}
                            >
                                X{/* <FaTrashAlt /> */}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(CommentItem);
