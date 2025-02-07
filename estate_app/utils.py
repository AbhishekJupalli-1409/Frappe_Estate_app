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

def paginate(doctype, page=0,conditions="",paginate_by=6):
    prev, next = 0, 0
    conditions = ""
    query = f"""SELECT creation, name, property_name, status, address, grand_total, image 
                FROM `tab{doctype}` {conditions} ORDER BY creation DESC"""
    
    if page:
        try:
            page = int(page)
        except ValueError:
            #fall back
            page = 1
        properties = frappe.db.sql(query + f" LIMIT {(page*paginate_by)-paginate_by}, {paginate_by}", as_dict=True)
        next_set = frappe.db.sql(query + f" LIMIT {(page*paginate_by)}, {paginate_by}", as_dict=True)  # to find if new set values exist or page next exists
        # print(f"Next set: {page},{properties},{next_set}")
        if next_set:
            
            prev, next = page-1, page+1
        else:
            prev, next = page-1, 0
    else:
        count = frappe.db.sql(f"SELECT COUNT(name) as count FROM `tab{doctype}`", as_dict=True)[0].count
        if count > 4:
            prev, next = 0, 2
        properties = frappe.db.sql(query + " LIMIT 4", as_dict=True)
    
    return {
        "properties": properties,
        "prev": prev,
        "next": next
    }
