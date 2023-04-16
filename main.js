document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-community-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const link = document.getElementById("link").value.trim();
        const status = document.getElementById("status").value.trim();
        const city = document.getElementById("city").value.trim();

        if (name === "" || link === "" || status === "" || city === "") {
            alert("Please fill out all fields before submitting.");
        } else {
            fetch("https://thehousinglist.uw.r.appspot.com/submit_community", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, link, status, city }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert("New intentional community has been added and gets validated by maintainer.");
                        // Reset the form after a successful submission
                        form.reset();
                    } else {
                        alert("There was an error submitting the form. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                });
        }
    });
});
