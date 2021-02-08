import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaChartLine, FaCheck } from "react-icons/fa";
import Form from "./sections/Form";
import axios from "axios";
import { loadAllPosts } from "../../actions/post";
import SinglePost from "./sections/SinglePost";
import setAuthToken from '../../utils/setAuth'
const Discussion = () => {
    const [Posts, setPosts] = useState([]);
    const [Loading, setLoading] = useState(true);

   const loadAllPosts = async () => {
        try {
            const result = await axios.get("/api/posts" );
            const data = await result.data.data;
            console.log('data of posts' , data)
            await setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };



    // async function fetchData() {
    //     const result = await loadAllPosts();
    //     await setPosts(result);
    //     setLoading(false);
    // }

    useEffect(() => {
       loadAllPosts();
    },[]);

    const arraymove = (arr, fromIndex, toIndex) => {
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        return arr;
    };

    const addNewPostToCollection = newPost => {
        setPosts([newPost, ...Posts]);
    };
    const changeLikesOfPost = (post_id, { likes, dislikes }) => {
        const takePostsOut = [...Posts];
        //cut the one we want to change
        const filtered = takePostsOut.filter(post => post.id !== post_id);
        //change the post
        const manipulate = takePostsOut.find(post => post.id === post_id);
        const Position = takePostsOut.indexOf(manipulate);
        manipulate.likes = likes;
        manipulate.dislikes = dislikes;
        //combine them
        const finalPostArr = [manipulate, ...filtered];
        const finalPost = arraymove(finalPostArr, 0, Position);
        setPosts(finalPost);
    };
    const removePostFromState = id => {
        let posts = [...Posts];

        posts = posts.filter(post => post.id !== id);

        setPosts(posts);
    };
    return (
        <>
            <div className="hacks-section">
                <div className="container">
                    <h1 className="py-1 text-white">
                        Hacks & Discussions
                        <FaChartLine />
                    </h1>
                    <p className="lead">
                        add any advice that could help others
                    </p>
                    <p className="dev-info">
                        <FaCheck /> specify your topic{" "}
                    </p>
                    <p className="dev-info">
                        <FaCheck /> add your code snippet{" "}
                    </p>
                    <Form addNewPostToCollection={addNewPostToCollection} />
                    <div className="hacks mt-4">
                        {/* {Posts.length} */}

                        {Posts.length > 0 ? (
                            Posts.map((post, index) => (
                                <SinglePost
                                    key={index}
                                    post={post}
                                    changeLikesOfPost={changeLikesOfPost}
                                    removePostFromState={removePostFromState}
                                />
                                
                            ))
                        ) : (
                            <h1>there is no post to show...</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Discussion;
