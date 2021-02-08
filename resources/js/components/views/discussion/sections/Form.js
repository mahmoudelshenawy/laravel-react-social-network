import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Alert from "../../../layouts/Alert";
import { setAlert } from "../../../actions/alert";
const Form = ({ addNewPostToCollection, setAlert }) => {
    const { handleSubmit, register, errors } = useForm();
    const [formData, setFormData] = useState({
        tags: "",
        text: ""
    });
    const [passer, setPasser] = useState(false);
    const { tags, text } = formData;

    // if (passer == false) {
    //     setAlert("only strings delimmed by comma is allower", "danger");
    // }

    const onChange = e => {
        const name = e.target.name;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validate = e => {
        const regex = "[a-z]+(,[a-z]+)*";
        const value = e.target.value;

        const isMatched = value.match(/^(([a-zA-Z](,)?)*)+$/);
        if (isMatched) {
            setPasser(true);
        } else {
            setPasser(false);
        }
    };
    const addNewPost = async (text, tags) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const formData = JSON.stringify(text, tags);

        try {
            const result = await axios.post("/api/posts", formData, config);
            const data = await result.data;
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (passer == true) {
            const result = await addNewPost({ text, tags });

            await addNewPostToCollection(result.data);
            setAlert("your post has been added successfully", "success");
            setFormData({
                tags: "",
                text: ""
            });
        } else {
            setAlert("only strings delimmed by comma is allower", "danger");
        }
    };
    return (
        <div className="container">
            <div className="row">
                <div
                    className="col-sm-10 mx-auto hack-form"
                    style={{ boxShadow: "2px 3px 6px 0px rgba(0,0,0,0.75)" }}
                >
                    <Alert />
                    <form onSubmit={e => onSubmit(e)}>
                        <input
                            type="text"
                            required
                            name="tags"
                            value={tags}
                            onChange={e => {
                                onChange(e);
                                validate(e);
                            }}
                            placeholder="specify your topic each word separated by comma "
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                        {errors.tags && errors.tags.message}
                        <textarea
                            name="text"
                            className="form-control"
                            placeholder="add your advice..."
                            value={text}
                            onChange={e => onChange(e)}
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

export default connect(null, { setAlert })(Form);
