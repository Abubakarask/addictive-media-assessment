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
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const mobile = document.getElementById("signupMobile").value;

    // API request n all

    console.log("Sign Up:", name, email, mobile);
  });
