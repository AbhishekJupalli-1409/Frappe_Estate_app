console.log("detail.js loaded");
document.querySelector('#contact-agent').addEventListener('click',
    (e)=>{
        
        let agent_email = document.querySelector('#email').value;
        let property_code = document.querySelector('#property-name').textContent;
        console.log(agent_email);
        let d = new frappe.ui.Dialog({
            title: 'Enter details',
            fields: [
                {
                    label: 'Your Name',
                    fieldname: 'name',
                    fieldtype: 'Data'
                },
                {
                    label: 'Your Email',
                    fieldname: 'email',
                    fieldtype: 'Data'
                },
                {
                    label: 'Message',
                    fieldname: 'message',
                    fieldtype: 'Small Text'
                }
            ],
            size: 'small', // small, large, extra-large 
            primary_action_label: 'Submit',
            primary_action(values) {
                console.log(values);
                values.agent_email = agent_email;
                values.property_code = property_code;
                console.log(values);
                
                // API CALL
                frappe.call({
                    method: "estate_app.api.contact_agent", //dotted path to server method
                    args: values,
                    freeze_message: "Message Sent Successfully.You will be contacted soon by the agent<br> Thank you for contacting us",     

                    callback: function(r) {
                    // code snippet
                        console.log(r);
                        frappe.msgprint(r.message);

                    }
                    });
                    
                d.hide();
            }
        });
        console.log('contact agent clicked');
        d.show();
        console.log('dialog shown');
    })