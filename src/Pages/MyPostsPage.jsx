import { useEffect, useState } from "react";
import postsApiClient from "../API/postsApiClient";
import PostsList from "../Components/Posts/PostsList/PostsList";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts =  async() => {
        const response = await postsApiClient.getMyPosts();
        setPosts(response.data);
    }
    useEffect(()=>{
        fetchPosts();
    },[])

    return (
        <div>
            <PostsList posts={posts}></PostsList>
        </div>
    )
}
export default MyPosts;