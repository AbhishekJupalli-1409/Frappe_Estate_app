# writing code for the workflow state
import frappe
@frappe.whitelist()
def get_work_state():
    work_state = frappe.db.sql(
    """select workflow_state from `tabAgency Master` group by workflow_state;""",
    as_dict=True
)
    return work_state
 
 
@frappe.whitelist()
def get_work_state_Approved():
    Approved = frappe.db.sql(
    """SELECT count(*) as count FROM `tabAgency Master` WHERE workflow_state=%s""",
    ("Approved",),
    as_dict=True
)
    return Approved
 
@frappe.whitelist()
def get_work_state_new():
    new =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabAgency Master` WHERE workflow_state=%s""",
    ("new",),
    as_dict=True
)
    return new
 
@frappe.whitelist()
def get_work_state_pending_approval():
    pending_approval =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabAgency Master` WHERE workflow_state=%s""",
    ("pending approval",),
    as_dict=True
)
    return pending_approval
 
 
 
@frappe.whitelist()
def get_work_state_pending_review():
    pending_review =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabAgency Master` WHERE workflow_state=%s""",
    ("pending review",),
    as_dict=True
)
    return pending_review
 
 
@frappe.whitelist()
def get_work_state_rejected():
    rejected =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabAgency Master` WHERE workflow_state=%s""",
    ("Rejected",),
    as_dict=True
)
    return rejected
 