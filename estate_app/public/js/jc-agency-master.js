document.getElementById("agent").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const requestData = JSON.stringify({
        indentor: document.getElementById("indentor").value,
        inspection_agency: document.getElementById("inspection_agency").value,
        agency_code: document.getElementById("agency_code").value,
        agency_name: document.getElementById("agency_name").value,
        address: document.getElementById("address").value,
        state: document.getElementById("state").value
    });

    fetch('/api/method/estate_app.api.create_agency', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Frappe-CSRF-Token': csrfToken,
            'Authorization': 'token 74d98a9ac4c69e6:c4d60a9587c4e19' // Replace with actual token
        },
        body: requestData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log(data);
            alert(" Hello " + data.message.message + ": " + data.message.name);
        } else {
            alert("Error: " + JSON.stringify(data));
        }
    })
    .catch(error => console.error("Error:", error));
});
