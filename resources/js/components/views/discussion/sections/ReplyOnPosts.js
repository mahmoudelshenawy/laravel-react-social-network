import React, { useState, useEffect } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import { FaChartLine, FaCheck } from "react-icons/fa";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import Alert from "../../../layouts/Alert";
const ReplyOnPosts = props => {
    const [Comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const id = props.match.params.postId;
    useEffect(() => {
        axios
            .get(`/api/posts/${id}`)
            .then(result => {
                setPost(result.data.data);
            })
            .catch(err => console.log("err"));

        axios.get(`/api/posts/${id}/comments`).then(result => {
            setComments(result.data);
        });
    }, []);

    const addNewCommentToState = data => {
        setComments([data, ...Comments]);
    };

    const deleteCommentFromState = id => {
        let comments = [...Comments];
        comments = comments.filter(commnet => commnet.id !== id);

        setComments(comments);
    };
    return (
        <div className="hacks-section">
            <div className="container">
                <h1 className="py-3 text-white text-center">
                    All Replies <FaChartLine />
                </h1>
                <Alert />
                {post.id && <SinglePost showAction={false} post={post} />}
                <hr />
                {Comments.length > 0 && (
                    <p className="lead dev-info text-white">
                        it has {Comments.length} comments
                    </p>
                )}
                <br />
                <CommentForm
                    post_id={id}
                    addNewCommentToState={addNewCommentToState}
                />
                <br />
                <br />
                {Comments.length > 0 ? (
                    Comments.map(comment => (
                        <CommentItem
                            comment={comment}
                            key={comment.id}
                            deleteCommentFromState={deleteCommentFromState}
                        />
                    ))
                ) : (
                    <h1>this post has no comment yet</h1>
                )}
            </div>
        </div>
    );
};

export default ReplyOnPosts;
