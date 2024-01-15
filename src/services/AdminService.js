const apiAdmin= require("@/utils/apiAdminWithoutValidation");

class AdminService {
    login = async (admin) => {
        console.log(admin.username);
        return await apiAdmin.post("/admin_login", {
            userName: admin.userName,
            password: admin.password,
        });
    };
}

module.exports = new AdminService();