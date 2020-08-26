import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

export default class QuillEditor extends Component {
    // onEditorChange;
    // placeholder;
    constructor(props) {
        super(props);
        this.state = { editorHtml: "", theme: "snow" };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        console.log(html);
        if (html.h1) console.log(true);
        this.setState({ editorHtml: html }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    }

    // handleThemeChange(newTheme) {
    //     if (newTheme === "core") newTheme = null;
    //     this.setState({ theme: newTheme });
    // }

    render() {
        return (
            <div>
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={QuillEditor.modules}
                    formats={QuillEditor.formats}
                    bounds={".editor"}
                    placeholder={this.props.placeholder}
                />
                {/* <div className="themeSwitcher">
                    <label>Theme </label>
                    <select
                        onChange={e => this.handleThemeChange(e.target.value)}
                    >
                        <option value="snow">Snow</option>
                        <option value="bubble">Bubble</option>
                        <option value="core">Core</option>
                    </select>
                </div> */}
            </div>
        );
    }
}
QuillEditor.modules = {
    toolbar: [
        [
            { header: "1" },
            { header: "2" },
            {
                font: [
                    "https://fonts.googleapis.com/css?family=Archivo+Narrow|Lobster|Nunito+Sans|Pacifico&display=swap"
                ]
            }
        ],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image", "video"],
        ["clean"]
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: true
    }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillEditor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
];
