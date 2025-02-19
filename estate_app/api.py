import frappe

from estate_app.utils import sendmail

#(doc, recipients, msg, title, attachment=None)



@frappe.whitelist()
def contact_agent(**args):
    print(f"\n\n\n\n{args}\n\n\n")
    doc=frappe.get_doc('Property',args.get('property_code'))
    msg = f"From: {args.get('name')} <br> Email: {args.get('email')} <br>{args.get('message')}"
    attachments = [frappe.attach_print(doc,doc.doctype,file_name=doc.name) ]
    sendmail(doc,[args.get('agent_email')],msg,"Property Inquiry",attachments)
    return "Mesaage Sent Successfully.You will be contacted soon by the agent<br> Thank you for contacting us"
    



@frappe.whitelist(allow_guest=True)
def order_item(**args):
    try:
    # Get request data (handle both JSON and form data)
        if frappe.request.method == "POST":
            print(f"\n\n\n\n{args}\n\n\n")
            data = frappe.form_dict  # For form-urlencoded requests
            item = args.get("item")
            name = args.get("name")
            email = args.get("email")
            number = args.get("number")
            address = args.get("address")
            print(f"\n\n\n\n{data}\n\n\n")
            print(f"\n\n\n\n{item}\n\n\n")
            print(f"\n\n\n\n{name}\n\n\n")
            print(f"\n\n\n\n{email}\n\n\n")
            if not name or not email:
                frappe.local.response.http_status_code = 400
                return {"message": "Name and email are required!", "status": "error"}

            # Optional: Store in a Doctype (create "Contact Agent" manually if needed)
            frappe.get_doc({
                "doctype": "Orders",
                "item":item,
                "name1": name,  
                "email": email,
                "number":number,
                "address":address,
            }).insert(ignore_permissions=True)

        return {"message": f"Thank you, {name}. Your message has been received!", "status": "success"}
    except Exception as e:
        frappe.local.response.http_status_code = 500
        return {"message": f"Server Error: {str(e)}", "status": "error"}