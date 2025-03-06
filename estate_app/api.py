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
    




#code to send the orders data to the backend db n save it 
# allows everyone to send the data

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

        return {"message": f"Thank you, {name}. Your order has been placed!", "status": "success"}
    except Exception as e:
        frappe.local.response.http_status_code = 500
        return {"message": f"Server Error: {str(e)}", "status": "error"}
    










# code to send the indent data to the backend db n save it 
# only allows the users who are logged in

from frappe import _

@frappe.whitelist(allow_guest=False)  # Only logged-in users can access
def create_agency():
    try:
        # Get JSON data from the request body
        data = frappe.request.get_json()
        
        # Extract fields
        indentor = data.get("indentor")
        inspection_agency = data.get("inspection_agency")
        agency_code = data.get("agency_code")
        agency_name = data.get("agency_name")
        address = data.get("address")
        state = data.get("state")

        # Validate input (Optional)
        if not all([indentor, inspection_agency, agency_code, agency_name, address, state]):
            frappe.throw(_("Missing required fields"), frappe.ValidationError)

        # Create Agency_master document
        agency = frappe.get_doc({
            "doctype": "Agency_master",
            "indentor": indentor,
            "inspection_agency": inspection_agency,
            "agency_code": agency_code,
            "agency_name": agency_name,
            "address": address,
            "state": state
        })
        agency.insert(ignore_permissions=True)  # Bypass permission restrictions if needed
        frappe.db.commit()  # Commit the transaction

        return {"message": "Agency created successfully!", "name": agency.name}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Create Agency Error")  # Log the error
        return {"error": str(e)}




# code for the Jc agency master POST Api

@frappe.whitelist(allow_guest=False)  # Only logged-in users can access
def create_jc_agency():
    try:
        # Get JSON data from the request body
        data = frappe.request.get_json()
        
        # Extract fields
        indentor_first_name= data.get("indentor_first_name"),
        indentor_last_name= data.get("indentor_last_name"),
        agency_code= data.get("agency_code"),
        agency_name= data.get("agency_name"),
        pan_no= data.get("pan_no"),
        tan_no= data.get("tan_no"),
        gst= data.get("gst"),
        tds_gst= data.get("tds_gst"),
        address_1= data.get("address_1"),
        address_2= data.get("address_2"),
        city= data.get("city"),
        state= data.get("state"),
        pin= data.get("pin"),
        branding_req= data.get("branding_req"),
        email= data.get("email"),
        phone= data.get("phone"),
        mobile= data.get("mobile"),
        fax= data.get("fax"),
        contact_person= data.get("contact_person"),
        contact_person_phone= data.get("contact_person_phone"),
        gst_contact_person= data.get("gst_contact_person"),
        gst_contact_person_no= data.get("gst_contact_person_no"),

        # Validate input (Optional)
        if not all([indentor_first_name,indentor_last_name, agency_code, agency_name,pan_no,tan_no,gst,tds_gst,address_1,address_2,city, state,pin,branding_req,email,phone,mobile,fax,contact_person,contact_person_phone,gst_contact_person,gst_contact_person_no]):
            frappe.throw(_("Missing required fields"), frappe.ValidationError)

        # Create Agency_master document
        agency = frappe.get_doc({
            "doctype": "JC Agency Master",
            "indentor_first_name": indentor_first_name,
            "indentor_last_name": indentor_last_name,
            "agency_code": agency_code,
            "agency_name": agency_name,
            "pan_no": pan_no,
            "tan_no": tan_no,
            "gst": gst,
            "tds_gst": tds_gst,
            "address_1": address_1,
            "address_2": address_2,
            "city": city,
            "state": state,
            "pin": pin,
            "branding_req": branding_req,
            "email": email,
            "phone": phone,
            "mobile": mobile,
            "fax": fax,
            "contact_person": contact_person,
            "contact_person_phone": contact_person_phone,
            "gst_contact_person": gst_contact_person,
            "gst_contact_person_no": gst_contact_person_no,
        })
        agency.insert(ignore_permissions=True)  # Bypass permission restrictions if needed
        frappe.db.commit()  # Commit the transaction

        return {"message": " JC Agency created successfully!", "name": agency.name}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Create Agency Error")  # Log the error
        return {"error": str(e)}


