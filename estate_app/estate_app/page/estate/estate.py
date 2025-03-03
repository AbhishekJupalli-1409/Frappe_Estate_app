import frappe



# writing code to get the all total cost of all the properties
@frappe.whitelist()
def get_total_price():
    total= frappe.db.sql("""SELECT SUM(grand_total) as total FROM `tabProperty`""",as_dict= True)[0].total
    return total
    





# writing code for status of each property and grandtotal to show it in the dashboard

@frappe.whitelist()
def get_property_price_by_status():
    price = frappe.db.sql("""select status,SUM(grand_total) FROM `tabProperty` group by status order by status""")
    return price

@frappe.whitelist()
def get_lease():
    lease = esult = frappe.db.sql(
    """SELECT grand_total FROM `tabProperty` WHERE status=%s""",
    ("Lease",),
    as_dict=True
)
    return lease

@frappe.whitelist()
def get_sale():
    sale = esult = frappe.db.sql(
    """SELECT grand_total FROM `tabProperty` WHERE status=%s""",
    ("Sale",),
    as_dict=True
)
    return sale

@frappe.whitelist()
def get_rent():
    rent = esult = frappe.db.sql(
    """SELECT grand_total FROM `tabProperty` WHERE status=%s""",
    ("Rent",),
    as_dict=True
)
    return rent





# writing code for the workflow state

@frappe.whitelist()
def get_work_state():
    work_state = frappe.db.sql(
    """select workflow_state from `tabOrders` group by workflow_state;""",
    as_dict=True
)
    return work_state


@frappe.whitelist()
def get_work_state_Approved():
    Approved = frappe.db.sql(
    """SELECT count(*) as count FROM `tabOrders` WHERE workflow_state=%s""",
    ("Approved",),
    as_dict=True
)
    return Approved

@frappe.whitelist()
def get_work_state_new():
    new =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabOrders` WHERE workflow_state=%s""",
    ("new",),
    as_dict=True
)
    return new

@frappe.whitelist()
def get_work_state_pending_approval():
    pending_approval =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabOrders` WHERE workflow_state=%s""",
    ("pending approval",),
    as_dict=True
)
    return pending_approval



@frappe.whitelist()
def get_work_state_pending_review():
    pending_review =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabOrders` WHERE workflow_state=%s""",
    ("pending review",),
    as_dict=True
)
    return pending_review


@frappe.whitelist()
def get_work_state_rejected():
    rejected =  frappe.db.sql(
    """SELECT count(*) as count FROM `tabOrders` WHERE workflow_state=%s""",
    ("Rejected",),
    as_dict=True
)
    return rejected




    