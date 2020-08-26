import React from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from "./plugins/addLinkPlugin";
import BlockStyleToolbar from "./BlockStyles/BlockStyleToolbar";
const highlightPlugin = createHighlightPlugin();

class DraftContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.plugins = [highlightPlugin, addLinkPlugin];
    }

    onChange = editorState => {
        this.setState({
            editorState
        });
    };

    toggleBlockType = blockType => {
        this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType)
        );
    };

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    onUnderlineClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        );
    };

    onBoldClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
        );
    };

    onItalicClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        );
    };
    onStrikeThroughClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
        );
    };

    onHighlight = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
        );
    };
    onAddLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt("Paste the link -");
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return "handled";
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
            url: link
        });
        const newEditorState = EditorState.push(
            editorState,
            contentWithEntity,
            "create-entity"
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(
            RichUtils.toggleLink(newEditorState, selection, entityKey)
        );
    };
    render() {
        return (
            <div className="editorContainer">
                <button onClick={this.onUnderlineClick}>U</button>
                <button onClick={this.onBoldClick}>
                    <b>B</b>
                </button>
                <button onClick={this.onItalicClick}>
                    <em>I</em>
                </button>{" "}
                <button
                    className="strikethrough"
                    onClick={this.onStrikeThroughClick}
                >
                    abc
                </button>
                <button className="highlight" onClick={this.onHighlight}>
                    <span style={{ background: "yellow", padding: "0.3em" }}>
                        H
                    </span>
                </button>
                <button
                    id="link_url"
                    onClick={this.onAddLink}
                    className="add-link"
                >
                    <i class="fa fa-paperclip"></i>
                </button>
                <BlockStyleToolbar
                    editorState={this.state.editorState}
                    onToggle={this.toggleBlockType}
                />
                <div className="editors">
                    <Editor
                        editorState={this.state.editorState}
                        plugins={this.plugins}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}

export default DraftContainer;
