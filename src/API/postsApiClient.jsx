import apiClient from "./apiClient";

const postsApiClient = {
  /**
   * Fetch all posts.
   * @returns {Promise} - Server response.
   */
  getAllPosts: () => {
    return apiClient.get("/Post/posts");
  },

  /**
   * Fetch a single post by ID.
   * @param {number | string} id - Post ID.
   * @returns {Promise} - Server response.
   */
  getPostById: (id) => {
    return apiClient.get(`/Post/posts/${id}`);
  },

  /**
   * Create a new post.
   * @param {Object} postData - Data for the new post.
   * @returns {Promise} - Server response.
   */
  createPost: (postData) => {
    return apiClient.post("/Post/posts", postData);
  },

  /**
   * Update an existing post by ID.
   * @param {number | string} id - Post ID.
   * @param {Object} postData - Updated post data.
   * @returns {Promise} - Server response.
   */
  updatePost: (id, postData) => {
    return apiClient.put(`/Post/posts/${id}`, postData);
  },

  /**
   * Delete a post by ID.
   * @param {number | string} id - Post ID.
   * @returns {Promise} - Server response.
   */
  deletePost: (id) => {
    return apiClient.delete(`/Post/posts/${id}`);
  },
};

export default postsApiClient;
