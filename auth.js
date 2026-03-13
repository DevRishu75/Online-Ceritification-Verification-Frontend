function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://online-ceritification-verification.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(async res => {
    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Server did not return JSON");
    }

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      window.location.href = "admin.html";
    }
  })
  .catch(err => {
    console.error(err);
    alert("Error connecting to server");
  });
}

function Register() {
  // ... (previous code) ...

  fetch("https://online-ceritification-verification.onrender.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(async res => {
    // Check if the response has content before trying to parse JSON
    if (res.status === 200) { // Or specifically check res.ok
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            // Only try to parse JSON if content type says it's JSON
            try {
                return await res.json();
            } catch (err) {
                // If parsing fails for a non-empty JSON response, it's an invalid response
                throw new Error("Invalid JSON response from server.");
            }
        } else {
            // If it's 200 OK but no JSON, assume success and return a default success object
            // This caters to your current server behavior (200 OK, empty body)
            return { message: "Registered successfully!" };
        }
    } else {
        // Handle non-200 responses (e.g., 400, 401, 500)
        let errorData = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            try {
                errorData = await res.json();
            } catch (err) {
                // Failed to parse error JSON
                throw new Error(`Server error (${res.status}): No valid error message.`);
            }
        }
        throw new Error(errorData.message || `Server error: Status ${res.status}`);
    }
  })
  .then(data => {
    alert(data.message || "Registered successfully!");
    window.location.href = "index.html"; // redirect to login
  })
  .catch(err => {
    console.error(err);
    alert(err.message);
  });
}

