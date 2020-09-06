import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "../../../layouts/Alert";
import { setAlert } from "../../../actions/alert";

const isEmpty = obj => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};
const Form = ({ setAlert, addNewTutToCollection, edited, EditTutorial }) => {
    useEffect(() => {
        !isEmpty(edited) &&
            setFormData({
                title: edited.title,
                link: edited.link,
                desc: edited.desc,
                keywords: edited.keywords
            });
        !isEmpty(edited) && setEdit(true);
    }, [edited, edit]);
    // const  = props;
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        desc: "",
        keywords: ""
    });
    const [passer, setPasser] = useState(false);
    const [edit, setEdit] = useState(false);
    const { title, link, desc, keywords } = formData;

    const onChange = e => {
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
    const addNewTut = async (title, link, desc, keywords, orEdit = edit) => {
        const formData = JSON.stringify(title, link, desc, keywords);
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            let result = orEdit
                ? await axios.put(`/api/videos/${edited.id}`, formData, config)
                : await axios.post("/api/videos", formData, config);
            const data = await result.data;

            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (edit == false) {
            if (passer == true) {
                const result = await addNewTut({ title, link, desc, keywords });

                await addNewTutToCollection(result.data);
                setAlert(
                    "your tutorial has been added successfully",
                    "success"
                );
                setFormData({
                    title: "",
                    link: "",
                    desc: "",
                    keywords: ""
                });
            } else {
                setAlert("only strings delimmed by comma is allower", "danger");
            }
        } else {
            const result = await addNewTut({
                title: title,
                link: link,
                desc: desc,
                keywords: keywords
            });

            EditTutorial(edited.id, result.data);
            setAlert("your tutorial has been updated successfully", "success");
            setFormData({
                title: "",
                link: "",
                desc: "",
                keywords: ""
            });
            setEdit(false);
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
                            name="title"
                            value={title}
                            onChange={e => {
                                onChange(e);
                            }}
                            placeholder="title.."
                        />
                        <input
                            type="text"
                            required
                            name="link"
                            value={link}
                            onChange={e => {
                                onChange(e);
                            }}
                            placeholder="link.."
                        />
                        <input
                            type="text"
                            required
                            name="keywords"
                            value={keywords}
                            onChange={e => {
                                onChange(e);
                                validate(e);
                            }}
                            placeholder="specify your keywords each word separated by comma "
                        />
                        <textarea
                            name="desc"
                            className="form-control"
                            placeholder="add your advice..."
                            value={desc}
                            onChange={e => onChange(e)}
                        >
                            {desc}
                        </textarea>

                        <button type="submit" className="submit">
                            {edit === true ? "update" : "submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { setAlert })(Form);
