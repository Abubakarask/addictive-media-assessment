const url = "https://addictive-media-assessment.onrender.com/";

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

    try {
      const response = await fetch(`${url}user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          dob: new Date(`${dobYear}-${dobMonth}-${dobDay}`),
          phoneNumber: mobile,
          email,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();

        // store userDetails and Token in localStorage
        window.localStorage.setItem("userData", JSON.stringify(data.user));

        document.getElementById("slide2").style.display = "none";
        document.getElementById("slide3").style.display = "block";

        const userNameTitle = document.getElementById("user-name");
        const userName = firstName + " " + lastName;
        userNameTitle.innerHTML = `Welcome ${userName}!`;
      } else {
        const result = await response.json();
        alert(result.message);
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Unable to add data.");
      return;
    }
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
  .addEventListener("submit", async function (event) {
    event.preventDefault();

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

    try {
      const userData = JSON.parse(window.localStorage.getItem("userData"));

      const response = await fetch(`${url}user/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData._id,
          data: { addresses },
        }),
      });

      if (response.status === 200) {
        const data = await response.json();

        // Resetting the form
        document.getElementById("addressForm").reset();
        document.getElementById("slide3").style.display = "none";
        document.getElementById("main-title").innerHTML =
          "Data Saved Successfully!";
      } else {
        const result = await response.json();
        alert(result.message);
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Unable to add data.");
      return;
    }
  });

async function saveUserInteraction() {
  try {
    const userData = JSON.parse(window.localStorage.getItem("userData"));

    const response = await fetch(`${url}user-interaction`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 200) {
      const result = await response.json();
      alert(result.message);
      return;
    }
  } catch (error) {
    console.error(error);
    alert("Internal Server Error");
    return;
  }
}

(async () => {
  await saveUserInteraction();
})();
