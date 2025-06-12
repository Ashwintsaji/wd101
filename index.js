let userForm = document.getElementById("userForm");

const retrieveEntries = () => {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.acceptTerms}</td>`; // true/false
        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");
    const table = `<table border="1"><tr>
<th>Name</th>
<th>Email</th>
<th>Password</th>
<th>Dob</th>
<th>Accepted terms?</th>
</tr>${tableEntries}</table>`;
    let details = document.getElementById("userEntries");
    details.innerHTML = table;
};

const isValidEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    // Email validation
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!dob) {
        alert("Please select your date of birth.");
        return;
    }

    // Date of Birth validation for age between 18 and 55
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptTerms: acceptTerms
    };

    // Always retrieve the latest entries before pushing
    let userEntries = retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
