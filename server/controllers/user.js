const User = require("../model/user");

async function createUser(req, res) {
  try {
    // Validate fields
    const { firstName, lastName, phoneNumber, email, dob } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !dob) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    // Type validation for Phone Number & Email Address
    // You can use regular expressions for validation

    // Duplicate checking for Phone Number & Email Address
    const existingUser = await User.findOne({
      $or: [{ phoneNumber }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Phone number or email already exists",
      });
    }

    // Save user details
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      dob: new Date(dob),
    });
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "User details saved successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    console.log(req.body);

    const { id } = req.body;
    const { firstName, lastName, phoneNumber, email, dob, addresses } =
      req.body.data;

    const user_record = await User.findById(id);

    if (!user_record) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }

    if (firstName !== null && typeof firstName !== undefined) {
      user_record.firstName = firstName;
    }

    if (lastName !== null && typeof lastName !== undefined) {
      user_record.lastName = lastName;
    }

    if (dob !== null && typeof dob !== undefined) {
      user_record.dob = new Date(dob);
    }

    if (phoneNumber !== null && typeof phoneNumber !== undefined) {
      user_record.phoneNumber = phoneNumber;
    }

    if (email !== null && typeof email !== undefined) {
      user_record.email = email;
    }

    if (addresses !== null && typeof addresses !== undefined) {
      const duplicateAddresses = addresses.filter((address, index) => {
        const firstIndex = addresses.findIndex((a) => a === address);
        return firstIndex !== index;
      });

      if (duplicateAddresses.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Duplicate addresses found",
        });
      }

      user_record.addresses = addresses;
    }

    res
      .status(200)
      .json({ success: true, message: "User details saved successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = {
  createUser,
  updateUser,
};
