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
    