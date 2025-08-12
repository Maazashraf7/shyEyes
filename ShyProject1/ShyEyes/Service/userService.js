// userService.js
// const API_BASE_URL = "http://localhost:5000/api/auth";
const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api/auth"
  : "https://yourdomain.com/api/auth";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// REGISTER USER
async function registerUser(formData) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    body: formData
  });
  if (!res.ok) throw new Error(`Registration failed: ${res.statusText}`);
  return res.json();
}

// LOGIN USER
// LOGIN USER
async function loginUser(email, password) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);

  const data = await res.json();

  // Save token
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  // Save user details
  if (data.user) {
    // Extract name correctly from the nested object
    const firstName = data.user.Name?.firstName || "";
    const lastName = data.user.Name?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    // Handle profile picture
    let profilePic = "/uploads/default.png"; // default stored in uploads folder
    if (data.user.photos?.length) {
      profilePic = data.user.photos[0].startsWith("http")
        ? data.user.photos[0]
        : `/uploads/${data.user.photos[0]}`;
    }

    // Store in localStorage
    localStorage.setItem("userName", fullName);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("userProfilePic", profilePic);
  }

  return data;
}



// GET PROFILE
async function getProfile() {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error(`Profile fetch failed: ${res.statusText}`);
  return res.json();
}

// UPDATE PROFILE
async function updateProfile(formData) {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: formData
  });
  if (!res.ok) throw new Error(`Profile update failed: ${res.statusText}`);
  return res.json();
}

// GET USER COUNT
async function getUserCountAndStatus() {
  const res = await fetch(`${API_BASE_URL}/user-count`, {
    method: "GET",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error(`User count fetch failed: ${res.statusText}`);
  return res.json();
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getUserCountAndStatus
};
