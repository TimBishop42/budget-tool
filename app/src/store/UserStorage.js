class UserStorage {
    USER_STORAGE_KEY = "USER_KEY";

    getUserId() {
        let user = localStorage.getItem(this.USER_STORAGE_KEY);

        if (user == null)
            return null;

        return JSON.parse(user).userId;
    }

    getToken() {
        let user = localStorage.getItem(this.USER_STORAGE_KEY);

        if (user == null)
            return null;

        return JSON.parse(user).token;
    }

    getUser() {
        let user = localStorage.getItem(this.USER_STORAGE_KEY);

        if (user == null)
            return null;

        return JSON.parse(user);
    }

    setIsLoggedIn(isLoggedIn) {
        if (isLoggedIn)
            localStorage.setItem("isLoggedIn", "true");
        else
            localStorage.setItem("isLoggedIn", "false");
    }

    storeUser(user) {
        localStorage.setItem(this.USER_STORAGE_KEY,
            JSON.stringify(user)
        );

        localStorage.setItem("isLoggedIn", "true");
    }

    clearUser() {
        localStorage.removeItem(this.USER_STORAGE_KEY);
    }

    isLoggedIn() {
        return localStorage.getItem("isLoggedIn") === "true";
    }
}

export default new UserStorage();