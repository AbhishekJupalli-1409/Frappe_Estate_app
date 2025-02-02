import frappe

def sendmail(doc, recipients, msg, title, attachment=None):
    email_args = {
        "recipients": recipients,
        "message": msg,
        "subject": title,
        "reference_doctype": doc.doctype,
        "reference_name": doc.name,
    }
    if attachment:
        email_args["attachments"] = attachment
    frappe.enqueue(method=frappe.sendmail, queue='short', timeout=300, **email_args)
    