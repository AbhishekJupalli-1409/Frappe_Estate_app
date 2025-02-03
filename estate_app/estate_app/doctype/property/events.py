import frappe
from estate_app.utils import sendmail

# def validate(doc, event):
#     # Send email to the owner of the property
#     #frappe.throw("Property validated")

def on_update(doc, event):
    print(f"\n\n\n{doc.name} Property updated by {doc.owner}\n\n\n")
    frappe.msgprint(f"{doc.name} Property updated by {doc.owner}")

 
def after_insert(doc, event): # if it is already in db this wont activate/ Only when inserted in db triggers
    #create a note on property insert
    note = frappe.get_doc({
        'doctype': 'Note',
        'title': f"{doc.name} Added",
        'public': True,
        'content': doc.description,
    })
        
    note.insert()
    print(f"\n\n\n{doc.name} Property updated by {doc.owner}\n\n\n")
    frappe.db.commit()
    frappe.msgprint(f"{note.title} has been created")
    

    #send email
    #doc,recipients,msg,title,attachment=None
    #SELECT P.name,P.agent, A.email FROM `tabProperty` P,`tabAgent`A  WHERE P.name='000002' and A.name='AG-PR-25-01-0001';  --> {doc.name} and {doc.agent}


    # Send email
    agent = frappe.get_doc('Agent', doc.agent)
    if not agent.email:
        frappe.throw(f"Agent email for {doc.agent} not found.")
    msg = f"Hello, <b> {agent.agent_name} </b> the property <b> {doc.name} </b> has been assigned to You."
    print(f"\n\n\n{doc.name} Property updated by {doc.owner} and {msg}\n\n\n")
    attachments = [frappe.attach_print(doc.doctype, doc.name, file_name=doc.name)]
    sendmail(doc, [agent.email, 'jupalliabhishek1409@gmail.com'], msg, 'New Property Added', attachments)

