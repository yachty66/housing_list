document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-community-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const link = document.getElementById("link").value.trim();
      const status = document.getElementById("status").value.trim();
      const city = document.getElementById("city").value.trim();

      // Inside the form event listener, replace the console.log with this code:
      if (name === "" || link === "" || status === "" || city === "") {
        alert("Please fill out all fields before submitting.");
      } else {
        //todo change to real domain
        fetch("http://localhost:3000/submit_community", {
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
            } else {
              alert(
                "There was an error submitting the form. Please try again."
              );
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      }
    });
  });