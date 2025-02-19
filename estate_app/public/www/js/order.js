console.log('order.js loaded');
document.querySelector('#order-item').addEventListener('click', (e)=> {
    console.log('order-item clicked');
    
    let item = document.querySelector('#order-item').value;
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let number = document.querySelector('#number').value;
    let address = document.querySelector('#address').value;
    console.log(item, name, email, number, address);





    frappe.call({
        method: "estate_app.api.order_item",  // Full path to the Python function
        type: "POST",
        args: { item,name, email,number,address },
        callback: function(response) {
            if (response.message.status === "success") {
                alert(response.message.message);
            } else {
                console.log(response)
                alert("Error: " + response.message.message);
            }
        }
    });
    // Using Fetch API to send a POST request
    // fetch('/property/orders', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     body: new URLSearchParams({ item,name, email,number,address })
    // })
    // .then(response => response.json())
    // .then(data => alert(data.message))
    // .catch(error => console.error('Error:', error));
});
