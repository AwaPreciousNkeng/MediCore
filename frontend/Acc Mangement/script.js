const users = [];
const userList = document.getElementById("users");
const form = document.getElementById("createUserForm");

// Mock logged-in user role
const currentUserRole = "admin"; // Change this to "doctor" or "patient" to test

// Show/hide nav items based on role
document.querySelectorAll(".admin-only").forEach(el => {
  el.style.display = currentUserRole === "admin" ? "block" : "none";
});
document.querySelectorAll(".doctor-only").forEach(el => {
  el.style.display = currentUserRole === "doctor" ? "block" : "none";
});
document.querySelectorAll(".patient-only").forEach(el => {
  el.style.display = currentUserRole === "patient" ? "block" : "none";
});

// Handle user creation
form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const user = {
    name: data.get("name"),
    email: data.get("email"),
    role: data.get("role"),
  };
  users.push(user);
  renderUsers();
  form.reset();
});

// Render user list
function renderUsers() {
  userList.innerHTML = "";
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (${user.role})`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      users.splice(index, 1);
      renderUsers();
    };
    li.appendChild(delBtn);
    userList.appendChild(li);
  });
}
