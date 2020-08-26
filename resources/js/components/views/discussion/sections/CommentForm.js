import React, { useState } from "react";
import { setAlert } from "../../../actions/alert";
import axios from "axios";
import { connect } from "react-redux";
const CommentForm = ({ post_id, addNewCommentToState, setAlert }) => {
    const [text, setText] = useState("");

    const addComment = (text, post_id) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const formData = JSON.stringify(text);

        axios
            .post(`/api/posts/${post_id}/comment`, formData, config)
            .then(result => {
                console.log(result.data.data);
                addNewCommentToState(result.data.data);

                setAlert("your comment has been added successfully", "success");
            })
            .catch(err => console.log(err));
    };
    const onSubmit = e => {
        e.preventDefault();
        addComment({ text }, post_id);
        setText("");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-10 mx-auto comment-form">
                    <form onSubmit={e => onSubmit(e)}>
                        <textarea
                            name="text"
                            className="form-control"
                            placeholder="add your comment"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        ></textarea>

                        <button type="submit" className="submit">
                            submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { setAlert })(CommentForm);
