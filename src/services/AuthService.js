const apiClient = require("@/utils/apiClient");

class AuthService {
    login = async (user) => {
        return await apiClient.post("/login", {
            userName: user.userName,
            password: user.password,
        });
    };
}

module.exports = new AuthService();
