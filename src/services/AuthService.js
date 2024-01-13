const apiClient = require("@/utils/apiClientWithoutValidation");

class AuthService {
    login = async (user) => {
        return await apiClient.post("/login", {
            userName: user.userName,
            password: user.password,
        });
    };
}

module.exports = new AuthService();
