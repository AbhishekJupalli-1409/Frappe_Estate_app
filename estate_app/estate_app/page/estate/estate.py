import frappe

@frappe.whitelist()
def get_total_price():
    total= frappe.db.sql("""SELECT SUM(grand_total) as total FROM `tabProperty`""",as_dict= True)[0].total
    return total
    

@frappe.whitelist()
def get_property_price_by_status():
    price = frappe.db.sql("""select status,SUM(grand_total) FROM `tabProperty` group by status order by status""")
    return price