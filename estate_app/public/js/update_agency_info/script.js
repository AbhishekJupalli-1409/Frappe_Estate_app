console.log("Form submitted");


document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    console.log("Form submitted");
    const requestData = JSON.stringify({
        indentor_first_name: document.getElementById("indentor_first_name").value,
        indentor_last_name: document.getElementById("indentor_last_name").value,
        agency_code: document.getElementById("agency_code").value,
        agency_name: document.getElementById("agency_name").value,
        pan_no: document.getElementById("pan_no").value,
        tan_no: document.getElementById("tan_no").value,
        gst: document.getElementById("gst").value,
        tds_gst: document.getElementById("tds_gst").value,
        address_1: document.getElementById("address_1").value,
        address_2: document.getElementById("address_2").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        pin: document.getElementById("pin").value,
        branding_req: document.getElementById("branding_req").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        mobile: document.getElementById("mobile").value,
        fax: document.getElementById("fax").value,
        contact_person: document.getElementById("contact_person").value,
        contact_person_phone: document.getElementById("contact_person_phone").value,
        gst_contact_person: document.getElementById("gst_contact_person").value,
        gst_contact_person_no: document.getElementById("gst_contact_person_no").value,
        
    });

    fetch('/api/method/estate_app.api.create_jc_agency', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Frappe-CSRF-Token': csrfToken,
            'Authorization': 'token 74d98a9ac4c69e6:5c6d7ab3936c1f0' // Replace with actual token
        },
        body: requestData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log(data);
            alert(" Hello " + data.message.message + ": " + data.message.name);
            window.location.href = "/update-agency-info";
        } else {
            alert("Error: " + JSON.stringify(data));
        }
    })
    .catch(error => console.error("Error:", error));
});
