import axios from "axios";

export const loadAllPosts = async () => {
    try {
        // let config;
        // if (localStorage.token) {
        //     // setAuthToken(localStorage.token);
        //     config = {
        //         headers: {
        //             Authorization: `Bearer ${localStorage.token}`
        //         }
        //     };
        // }

        const result = await axios.get("/api/posts");
        const data = result.data.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const addNewPost = async (text, tags) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const formData = JSON.stringify(text, tags);

    try {
        const result = await axios.post("/api/posts", formData, config);
        const data = await result.data;
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const addLikeToPost = async (id, likes, dislikes, user_id) => {
    try {
        const response = await axios.get(`api/posts/${id}/like`);
        const result = await response.data;

        const was_liked = likes.filter(like => like.user_id === user_id);

        const was_disliked_before_liked = dislikes.filter(
            dislike => dislike.user_id === user_id
        );
        let dislikes_filtered = [];
        if (was_liked && was_liked.length === 0) {
            if (
                was_disliked_before_liked &&
                was_disliked_before_liked.length > 0
            ) {
                dislikes_filtered = dislikes.filter(
                    dislike => dislike.user_id !== user_id
                );
            }
            likes.push(result);
            return {
                likes,
                dislikes: dislikes_filtered
            };
        } else {
            const filteredLikes = likes.filter(
                like => like.user_id !== user_id
            );
            return {
                likes: filteredLikes,
                dislikes: dislikes
            };
        }
    } catch (error) {
        console.log(error);
    }
};

export const addDislikeToPost = async (id, dislikes, likes, user_id) => {
    // console.log("props", id, likes, user_id);
    try {
        const response = await axios.get(`api/posts/${id}/dislike`);
        const result = await response.data;
        // console.log(result);
        const was_disliked = dislikes.filter(
            dislike => dislike.user_id === user_id
        );
        const was_liked_before = likes.filter(like => like.user_id === user_id);
        // console.log("was liked?", was_liked);
        let likes_filtered = [];
        if (was_disliked && was_disliked.length === 0) {
            if (was_liked_before && was_liked_before.length > 0) {
                likes_filtered = likes.filter(like => like.user_id !== user_id);
            }
            dislikes.push(result);
            return {
                likes: likes_filtered,
                dislikes
            };
        } else {
            const filteredDislikes = dislikes.filter(
                dislike => dislike.user_id !== user_id
            );
            return {
                likes: likes,
                dislikes: filteredDislikes
            };
        }
    } catch (error) {
        console.log(error);
    }
};

// get post by ID

export const getPostById = async id => {
    try {
        const response = await axios.get(`api/posts/${id}`);
        const result = await response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
};

//add Comment

export const addComment = async (text, post_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const formData = JSON.stringify(text);

    try {
        const result = await axios.post(
            `/api/posts/${post_id}/comment`,
            formData,
            config
        );
        const data = await result.data;
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
