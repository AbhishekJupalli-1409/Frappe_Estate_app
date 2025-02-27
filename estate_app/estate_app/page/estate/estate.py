import frappe

@frappe.whitelist()
def get_total_price():
    total= frappe.db.sql("""SELECT SUM(grand_total) as total FROM `tabProperty`""",as_dict= True)[0].total
    return total
    

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
