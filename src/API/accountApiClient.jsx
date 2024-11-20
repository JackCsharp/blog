import apiClient from "./apiClient";

const authApiClient = {
  /**
   * Log in a user.
   * @param {Object} values - Login credentials (username and password).
   * @returns {Promise<string>} - The JWT token if login is successful.
   */
  login: async (values) => {
    try {
      const { username, password } = values;

      const response = await apiClient.post("/Auth/login", {
        username,
        password,
      });

      const token = response.data;

      if (token) {
        localStorage.setItem("jwtToken", token);
        return token;
      }

      throw new Error("Token not received");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Log out the user by removing the JWT token from localStorage.
   */
  logout: () => {
    localStorage.removeItem("jwtToken");
  },
};

export default authApiClient;
