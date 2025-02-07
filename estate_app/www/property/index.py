import frappe
from estate_app.utils import paginate

no_cache = 1 # used to stop the caching of the page in pagination


def get_context(context):
    # Check if the 'page' parameter is passed in the URL
    page = frappe.form_dict.page
    # check if search request
    conditions=" "
    type,status,city= frappe.form_dict.type,frappe.form_dict.status,frappe.form_dict.city
    print(f"\n\n\n{type} {status} {city}\n\n\n")
    print(f"{frappe.form_dict}")
    print(f"\n\n\nReceived page: {page}\n\n\n")  # Debug print to check if the page is correctly received

    if(type and status and city):
        conditions= f"""AND property_type='{type}' AND status='{status}' AND city='{city}'"""

    
    paginate_context = paginate(doctype= "Property", page=page, conditions=conditions) # passing conditions to the paginate function
    print("Pagination function call is finished")  # Debug print to track function execution
    context.cities = frappe.db.sql("SELECT name FROM `tabCity`", as_dict=True)
    context.types = frappe.db.sql("SELECT name FROM `tabProperty Type`", as_dict=True)
    context.properties = paginate_context.get('properties')
    context.prev = paginate_context.get('prev')
    context.next = paginate_context.get('next') 
    
    return context