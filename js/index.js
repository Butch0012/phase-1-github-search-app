document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;
        if (searchTerm) {
            // Perform a GitHub user search
            const users = await searchGitHubUsers(searchTerm);
            displayUsers(users);
        }
    });

    async function searchGitHubUsers(query) {
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                },
            });
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    }

    function displayUsers(users) {
        userList.innerHTML = ""; // Clear previous results
        users.forEach((user) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" width="100">
                <p>Username: <a href="${user.html_url}" target="_blank">${user.login}</a></p>
            `;
            userList.appendChild(listItem);
        });
    }
});
