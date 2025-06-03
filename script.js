<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Info Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 400px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        input[type="text"] {
            width: 100%;
            padding: 8px;
            margin: 10px 0 20px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        h2 {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container" id="formContainer">
        <h2>Sign Up</h2>
        <label for="nameInput">Name:</label>
        <input type="text" id="nameInput" placeholder="Enter your name">
        <label for="phoneInput">Phone Number:</label>
        <input type="text" id="phoneInput" placeholder="Enter your phone number">
        <button id="submitBtn">Submit</button>
    </div>

    <div class="container" id="infoContainer" style="display: none;">
        <h2>Welcome, <span id="displayName"></span>!</h2>
        <p>Your phone number is: <strong><span id="displayPhone"></span></strong></p>
        <button id="logoutBtn">Logout</button>
    </div>

    <script>
        // Global object to store user data for this session
        window.globalData = {
            userName: '',
            userPhone: ''
        };

        document.addEventListener('DOMContentLoaded', function() {
            const nameInput = document.getElementById('nameInput');
            const phoneInput = document.getElementById('phoneInput');
            const displayName = document.getElementById('displayName');
            const displayPhone = document.getElementById('displayPhone');
            const infoContainer = document.getElementById('infoContainer');
            const formContainer = document.getElementById('formContainer');
            const submitBtn = document.getElementById('submitBtn');
            const logoutBtn = document.getElementById('logoutBtn');

            function updateView() {
                if (window.globalData.userName && window.globalData.userPhone) {
                    displayName.textContent = window.globalData.userName;
                    displayPhone.textContent = window.globalData.userPhone;
                    infoContainer.style.display = 'block';
                    formContainer.style.display = 'none';
                } else {
                    infoContainer.style.display = 'none';
                    formContainer.style.display = 'block';
                }
            }

            submitBtn.addEventListener('click', function() {
                const name = nameInput.value.trim();
                const phone = phoneInput.value.trim();
                if (name && phone) {
                    window.globalData.userName = name;
                    window.globalData.userPhone = phone;
                    updateView();
                } else {
                    alert("Please enter both name and phone number.");
                }
            });

            logoutBtn.addEventListener('click', function() {
                window.globalData.userName = '';
                window.globalData.userPhone = '';
                nameInput.value = '';
                phoneInput.value = '';
                updateView();
            });

            // Initialize the view on page load
            updateView();
        });
    </script>
</body>
</html>
