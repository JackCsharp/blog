import apiClient from "./apiClient";

const postsApiClient = {
  /**
   * Fetch all posts.
   * @returns {Promise} - Server response.
   */
  getAllPosts: () => {
    return apiClient.post("/posts/filter", "{}");
  },

  /**
   * Fetch a single post by ID.
   * @param {number | string} id - Post ID.
   * @returns {Promise} - Server response.
   */
  getPostById: (id) => {
    return apiClient.get(`/posts/${id}`);
  },

  /**
   * Create a new post.
   * @param {Object} postData - Data for the new post.
   * @returns {Promise} - Server response.
   */
  createPost: (postData) => {
    return apiClient.post("/posts", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }});
  },

  /**
   * Update an existing post by ID.
   * @param {number | string} id - Post ID.
   * @param {Object} postData - Updated post data.
   * @returns {Promise} - Server response.
   */
  updatePost: (id, postData) => {
    return apiClient.put(`/posts/${id}`, postData);
  },

  /**
   * Delete a post by ID.
   * @param {number | string} id - Post ID.
   * @returns {Promise} - Server response.
   */
  deletePost: (id) => {
    return apiClient.delete(`/posts/${id}`);
  },

  getComments: (postId) => {
    return apiClient.get(`/comments/${postId}`)
  },
  addComment: (postId, comment) => {
    return apiClient.post(`/comments/${postId}`, comment);
  },

  getCategories: () => {
    return apiClient.get(`/categories`);
  },
  getHashTags: () => {
    return apiClient.get(`/hashtags`);
  },

};

export default postsApiClient;
