import frappe


@frappe.whitelist(allow_guest=True)
def order():
    try:
    # Get request data (handle both JSON and form data)
        if frappe.request.method == "POST":
            data = frappe.form_dict  # For form-urlencoded requests
            item = data.form_dict.get("item")
            name = data.form_dict.get("name")
            email = data.form_dict.get("email")
            number = data.form_dict.get("number")
            address = data.form_dict.get("address")

            if not name or not email:
                frappe.local.response.http_status_code = 400
                return {"message": "Name and email are required!", "status": "error"}

            # Optional: Store in a Doctype (create "Contact Agent" manually if needed)
            frappe.get_doc({
                "doctype": "Orders",
                "item":item,
                "name1": name,  # 'name1' to avoid conflicts with DocType 'name'
                "email": email,
                "number":number,
                "address":address,
            }).insert(ignore_permissions=True)

        return {"message": f"Thank you, {name}. Your message has been received!", "status": "success"}
    except Exception as e:
        frappe.local.response.http_status_code = 500
        return {"message": f"Server Error: {str(e)}", "status": "error"}