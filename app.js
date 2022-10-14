// Elements
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}

function getData(e) {
    let username = nameInput.value.trim();

    if (username === "") {
        ui.showError("Lütfen bir kullanıcı ismi giriniz.")
    } else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showError("Kullanıcı bulunamadı.")
                } else {

                    ui.addSearchedUserToUI(username); //Önce arayüze sonra Storage a ekliyoruz. Önce Storage a eklersek orada olduğu için arayüze eklemeyecektir.
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err))
    }



    ui.clearInput(); //Input temizleme.
    e.preventDefault();
}
function clearAllSearched() {
    // Tüm Arananları Temizle
    if (confirm("Emin misiniz?")) {
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }

}

function getAllSearched() {
    // Arananları Storage dan alma
    let users = Storage.getSearchedUsersFromStorage();

    users.forEach(user => {
        ui.addAllSearchedUsersToUI(user);
    })
}
