console.log('order.js loaded');
const orderButton = document.querySelector('#order-item');
if (orderButton) {
    orderButton.addEventListener('click', (e) => {
        console.log('order-item clicked');
        
        let item = document.querySelector('#item')?.value || "";
        let name = document.querySelector('#name')?.value || "";
        let email = document.querySelector('#email')?.value || "";
        let number = document.querySelector('#number')?.value || "";
        let address = document.querySelector('#address')?.value || "";
        
        console.log(item, name, email, number, address);
        console.log("new code");
        // Check if required fields are filled
        if (!item || !name || !email || !number || !address) {
            frappe.msgprint("Please fill in all required fields.");
            return;
        }

        frappe.call({
            method: "estate_app.api.order_item",  // Full path to the Python function
            type: "POST",
            args: { item, name, email, number, address },
            freeze: true,
            freeze_message: "Placing your order...",
            callback: function(response) {
                if (response.message && response.message.status === "success") {
                    frappe.msgprint(response.message.message);
                } else {
                    console.error(response);
                    frappe.msgprint("Error: " + (response.message?.message || "Unknown error"));
                }
            },
            error: function(err) {
                console.error(err);
                frappe.msgprint("Something went wrong. Please try again.");
            }
        });
    });
} else {
    console.error("#order-item button not found!");
}


