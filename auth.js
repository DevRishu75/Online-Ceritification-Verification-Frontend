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
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      window.location.href = "admin.html"
    } else {
      alert(data.message || "Login failed");
    }
  })
  .catch(err => alert("Error connecting to server"));
}
function Register(){
      const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
    fetch("https://online-ceritification-verification.onrender.com//api/auth/register",{
        method : "POST",
        headers: {
            "content-type": "application/json"
        },
        body : JSON.stringify({name,email,password})
        
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message||"register successfully");
        window.location.href = "index.html";
    });
}
