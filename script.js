document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var fullname = document.getElementById("fullname").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  var users = JSON.parse(sessionStorage.getItem("users")) || [];
  var newUser = {
    id: users.length + 1,
    fullname: fullname,
    username: username,
    email: email,
    phone: phone,
    password: password 
  };
  users.push(newUser);
  sessionStorage.setItem("users", JSON.stringify(users));

  document.getElementById("registrationContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;

  var users = JSON.parse(sessionStorage.getItem("users")) || [];
  var authenticatedUser = users.find(function(user) {
    return user.username === username && user.password === password;
  });

  if (authenticatedUser) {
    sessionStorage.setItem("loggedInUser", JSON.stringify(authenticatedUser));
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("dashboardContainer").style.display = "block";
    populateUserTable();
  } else {
    alert("User does not exist or incorrect password!");
  }
});

function populateUserTable() {
  var users = JSON.parse(sessionStorage.getItem("users")) || [];
  var userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = "";
  users.forEach(function(user) {
    var row = "<tr id='user-" + user.id + "'><td>" + user.id + "</td><td>" + user.fullname + "</td><td>" + user.username + "</td><td>" + user.email + "</td><td>" + user.phone + "</td><td><button onclick='updateUser(" + user.id + ")'>Update</button><button onclick='deleteUser(" + user.id + ")'>Delete</button></td></tr>";
    userTableBody.innerHTML += row;
  });
}

function deleteUser(id) {
  var users = JSON.parse(sessionStorage.getItem("users")) || [];
  var updatedUsers = users.filter(function(user) {
    return user.id !== id;
  });
  sessionStorage.setItem("users", JSON.stringify(updatedUsers));
  populateUserTable();
}

function updateUser(id) {
  var userRow = document.getElementById("user-" + id);
  var userCells = userRow.getElementsByTagName("td");
  var fullname = userCells[1].textContent;
  var username = userCells[2].textContent;
  var email = userCells[3].textContent;
  var phone = userCells[4].textContent;

  var updateForm = "<td><input type='text' id='updateFullname' value='" + fullname + "' required></td>" +
                   "<td><input type='text' id='updateUsername' value='" + username + "' required></td>" +
                   "<td><input type='email' id='updateEmail' value='" + email + "' required></td>" +
                   "<td><input type='tel' id='updatePhone' value='" + phone + "' required></td>" +
                   "<td><button onclick='saveUpdate(" + id + ")'>Save</button></td>";

  userRow.innerHTML = updateForm;
}

function saveUpdate(id) {
  var userRow = document.getElementById("user-" + id);
  var fullname = document.getElementById("updateFullname").value;
  var username = document.getElementById("updateUsername").value;
  var email = document.getElementById("updateEmail").value;
  var phone = document.getElementById("updatePhone").value;

  var users = JSON.parse(sessionStorage.getItem("users")) || [];
  var updatedUserIndex = users.findIndex(function(user) {
    return user.id === id;
  });

  if (updatedUserIndex !== -1) {
    users[updatedUserIndex].fullname = fullname;
    users[updatedUserIndex].username = username;
    users[updatedUserIndex].email = email;
    users[updatedUserIndex].phone = phone;
    sessionStorage.setItem("users", JSON.stringify(users));
    populateUserTable();
  }
}


var loggedInUser = sessionStorage.getItem("loggedInUser");
if (loggedInUser) {
  document.getElementById("registrationContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("dashboardContainer").style.display = "block";
  populateUserTable();
}
document.getElementById("registerLink").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("dashboardContainer").style.display = "none";
  document.getElementById("registrationContainer").style.display = "block";
});
document.getElementById("loginRedirect").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("registrationContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
});
