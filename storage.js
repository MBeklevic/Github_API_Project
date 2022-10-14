class Storage {

    static getSearchedUsersFromStorage() {
        // Tüm kullanıcılar

        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }

    static addSearchedUserToStorage(username) {
        // Kullanıcı ekle


        let users = this.getSearchedUsersFromStorage();
        if (users.indexOf(username) === -1) {
            users.push(username);
        }
        localStorage.setItem(`searched`, JSON.stringify(users));

    }

    static clearAllSearchedUsersFromStorage() {
        // Tüm kullanıcılar sil

        localStorage.removeItem("searched");
    }

}
