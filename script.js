document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("Role");

  if (!role && window.location.pathname !== "/index.html") {
      // Redirect to login if no role is found
      window.location.href = "index.html";
  }

  if (role && window.location.pathname === "/index.html") {
      // Redirect to dashboard if logged in
      window.location.href = "dashboard.html";
  }
});

const validUsers = [
  { username: "umidjon", password: "1234umid", role: "Umidjon" },
  { username: "bolakay", password: "1234bola", role: "Bolakay" },
  { username: "iroda", password: "1234Iroda", role: "Iroda" }
];

function login() {
  const username = document.getElementById("username").value.toLowerCase();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");
  error.textContent = "";

  const user = validUsers.find((u) => u.username === username);
  if (!user) {
      error.textContent = "User not found.";
      return;
  }

  if (user.password !== password) {
      error.textContent = "Incorrect password.";
      return;
  }

  // Store role in localStorage and redirect to dashboard
  localStorage.setItem("Role", user.role);
  window.location.href = "dashboard.html";
}

function checkAccess(...allowedRoles) {
  const role = localStorage.getItem("Role");
  if (!allowedRoles.includes(role)) {
      alert("You do not have access to this page.");
      window.location.href = "dashboard.html";
  } else {
      document.getElementById("content").textContent = `Welcome to the ${document.title.split(" - ")[0]} section, ${role}!`;
  }
}

function logout() {
  localStorage.removeItem("Role");
  window.location.href = "index.html";
}

// Typewriter effect for welcome message
if (window.location.pathname === "/dashboard.html") {
  const role = localStorage.getItem("Role");
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.textContent = `Xush kelibsiz, ${role}`;
}
