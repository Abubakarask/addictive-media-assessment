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

    document.getElementById("slide2").style.display = "none";
    document.getElementById("slide3").style.display = "block";
  });

let addressCount = 1; // Counter for tracking number of addresses

document.getElementById("addAddressBtn").addEventListener("click", function () {
  addressCount++;
  const newAddressHtml = `
      <div class="previous-address">
          <p>Previous Address ${addressCount}</p>
          <input type="text" class="addressInput" placeholder="Address Line 1" required>
          <input type="text" class="addressInput" placeholder="Address Line 2">
          <input type="text" class="addressInput" placeholder="Address Line 3">
      </div>`;
  document
    .getElementById("newAddresses")
    .insertAdjacentHTML("beforeend", newAddressHtml);
  document.getElementById("removeAddressBtn").style.display = "flex";
});

document
  .getElementById("removeAddressBtn")
  .addEventListener("click", function () {
    if (addressCount > 1) {
      const lastAddress = document.querySelector(
        "#newAddresses .previous-address:last-child"
      );
      lastAddress.parentNode.removeChild(lastAddress);
      addressCount--;
      if (addressCount === 1) {
        document.getElementById("removeAddressBtn").style.display = "none";
      }
    }
  });

document
  .getElementById("addressForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collecting first name from the first slide
    const firstName = document.getElementById("signupFirstName").value;

    // Collecting addresses
    const addresses = [];
    document
      .querySelectorAll(".previous-address")
      .forEach(function (addressContainer) {
        const address = {
          addressLine1: addressContainer.querySelector(
            ".addressInput:nth-of-type(1)"
          ).value,
          addressLine2: addressContainer.querySelector(
            ".addressInput:nth-of-type(2)"
          ).value,
          addressLine3: addressContainer.querySelector(
            ".addressInput:nth-of-type(3)"
          ).value,
        };
        addresses.push(address);
      });

    console.log("First Name:", firstName);
    console.log("Addresses:", addresses);

    // Resetting the form
    document.getElementById("addressForm").reset();
    document.getElementById("slide3").style.display = "none";
    document.getElementById("main-title").innerHTML =
      "Data Saved Successfully!";
    // You can add further logic here, such as making an API call to submit the data
  });
