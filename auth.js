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
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  fetch("https://online-ceritification-verification.onrender.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(async res => {
    // parse JSON safely
    let data;
    try {
      data = await res.json();
    } catch (err) {
      throw new Error("Invalid server response, please try again later.");
    }

    if (!res.ok) {
      // Backend returned an error status
      throw new Error(data.message || "Registration failed");
    }

    return data;
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
