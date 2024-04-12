document.getElementById("nextBtn").addEventListener("click", function () {
  document.getElementById("slide1").style.display = "none";
  document.getElementById("slide2").style.display = "block";
});

document.getElementById("prevBtn").addEventListener("click", function () {
  document.getElementById("slide2").style.display = "none";
  document.getElementById("slide1").style.display = "block";
});

document
  .getElementById("signupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("signupFirstName").value;
    const lastName = document.getElementById("signupLastName").value;
    const dobDay = document.getElementById("dobDay").value;
    const dobMonth = document.getElementById("dobMonth").value;
    const dobYear = document.getElementById("dobYear").value;
    const email = document.getElementById("signupEmail").value;
    const mobile = document.getElementById("signupMobile").value;

    // API request n all

    console.log(
      "Sign Up:",
      firstName,
      lastName,
      dobDay,
      dobMonth,
      dobYear,
      email,
      mobile
    );
  });
