import React, { useEffect } from "react";
import {
    FaThumbsUp,
    FaThumbsDown,
    FaCommentAlt,
    FaTrashAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { addLikeToPost, addDislikeToPost } from "../../../actions/post";
import { setAlert } from "../../../actions/alert";
const SinglePost = props => {
    const {
        tags,
        comments,
        likes,
        dislikes,
        id,
        text,
        updated_at,
        user,
        showAction
    } = props.post;
    const { changeLikesOfPost, removePostFromState, setAlert } = props;
    const liked_check = likes.filter(like => {
        like.user_id === props.auth.user.id;
    });

    const deletePost = post_id => {
        axios.delete(`/api/posts/${post_id}`).then(result => {
            console.log(result);
            removePostFromState(post_id);

            return dispatch(setAlert(result.data.msg, "success"));
        });
    };
    return (
        <>
            <div className="row mb-2">
                <div className="container">
                    <div className="col-lg-6 col-md-8 col-sm-10 mx-auto hack-container  py-3">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-10 mx-auto d-flex align-items-center">
                                {user.gravatar && (
                                    <img
                                        src={user.gravatar}
                                        className="img-fluid rounded-circle"
                                        width="100px"
                                        height="100px"
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="col-lg-8 col-mg-8 col-sm-10 mx-auto">
                                <h2 className="dev-info py-1">{user.name}</h2>

                                {tags.length > 0 &&
                                    tags.map(tag => (
                                        <Link
                                            to={`/discussions/lists/${tag.name}`}
                                            className="badge badge-primary mr-2 p-1"
                                            key={tag.id}
                                        >
                                            {tag.name}
                                        </Link>
                                    ))}

                                <h6 className="py-1 dev-info mb-1">{text}</h6>
                                <p className="post-date">
                                    Posted on{" "}
                                    <Moment format="YYYY/MM/DD">
                                        {updated_at}
                                    </Moment>
                                </p>
                                {props.showAction && (
                                    <div className="">
                                        <button
                                            className="btn btn-light mr-1 text-blue"
                                            onClick={async () => {
                                                const result = await addLikeToPost(
                                                    id,
                                                    likes,
                                                    dislikes,
                                                    props.auth.user.id
                                                );
                                                await console.log(
                                                    "it is the result",
                                                    result
                                                );
                                                await changeLikesOfPost(
                                                    id,
                                                    result
                                                );
                                            }}
                                        >
                                            <FaThumbsUp />{" "}
                                            {likes && likes.length > 0 && (
                                                <span>{likes.length}</span>
                                            )}
                                        </button>
                                        <button
                                            className="btn btn-light mr-1"
                                            onClick={async () => {
                                                const result = await addDislikeToPost(
                                                    id,
                                                    dislikes,
                                                    likes,
                                                    props.auth.user.id
                                                );

                                                await console.log(
                                                    "the result of dislike",
                                                    result
                                                );
                                                await changeLikesOfPost(
                                                    id,
                                                    result
                                                );
                                            }}
                                        >
                                            <FaThumbsDown />
                                            {dislikes &&
                                                dislikes.length > 0 && (
                                                    <span>
                                                        {dislikes.length}
                                                    </span>
                                                )}
                                        </button>
                                        <Link
                                            to={`discussions/comments/${id}`}
                                            className="btn btn-primary mr-1"
                                        >
                                            <FaCommentAlt /> comments{" "}
                                            {comments.length > 0 && (
                                                <span>{comments.length}</span>
                                            )}{" "}
                                        </Link>
                                        {!props.auth.loading &&
                                            user.id === props.auth.user.id && (
                                                <button
                                                    onClick={() =>
                                                        deletePost(id)
                                                    }
                                                    className="btn btn-danger"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
SinglePost.defaultProps = {
    showAction: true
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { setAlert })(SinglePost);
