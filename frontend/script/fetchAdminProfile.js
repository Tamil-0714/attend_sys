async function fetchProfile() {
  try {
    const response = await fetch("http://localhost:8050/admin/dashboard", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else if (response.status === 401) {
      window.location.href = "./index.html"; //unauthorized
    } else {
      document.getElementById("profile-info").textContent =
        "Error fetching profile.";
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    document.getElementById("profile-info").textContent =
      "Error fetching profile.";
  }
}

document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:8050/logout", {
      method: "POST",
      credentials: "include", // Include session cookies
    });

    if (response.ok) {
      window.location.href = "./index.html"; // Redirect to login after logout
    } else {
      alert("Error logging out");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
});

// Fetch profile information on page load
fetchProfile();
