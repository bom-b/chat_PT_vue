const apiAdmin= require("@/utils/apiAdmin");

class AdminService {
    login = async (user) => {
        console.log(user.username);
        return await apiAdmin.post("/admin_login", {
            userName: user.userName,
            password: user.password,
        });
    };
}

module.exports = new AdminService();