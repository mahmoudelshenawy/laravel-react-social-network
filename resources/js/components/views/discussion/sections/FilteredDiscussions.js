import React, { useState, useEffect } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import { FaChartLine, FaCheck } from "react-icons/fa";
const FilteredDiscussions = props => {
    const [Posts, setPosts] = useState([]);
    const tag = props.match.params.tag;
    const fetchPosts = () => {
        axios.get(`/api/posts/filter/${tag}`).then(data => {
            if (data.data.length > 0) {
                setPosts(data.data);
            }
        });
    };
    useEffect(() => {
        fetchPosts();
    }, [tag]);

    return (
        <div className="hacks-section">
            <div className="container">
                <h1 className="py-3 text-white text-center">
                    All discussions about{" "}
                    <span className="text-blue">{tag}</span>
                    <FaChartLine />
                </h1>
                {Posts.length > 0 ? (
                    Posts.map(post => (
                        <SinglePost
                            showAction={false}
                            key={post.id}
                            post={post}
                        />
                    ))
                ) : (
                    <h1>there is no item to show...</h1>
                )}
            </div>
        </div>
    );
};

export default FilteredDiscussions;
