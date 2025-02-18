import frappe
from estate_app.utils import paginate

no_cache = 1  # Enable caching

def get_context(context):
    page = frappe.form_dict.page or 1
    type = frappe.form_dict.type
    status = frappe.form_dict.status
    city = frappe.form_dict.city
    cache_key = f"property_list_{page}_{type}_{status}_{city}"

    # Try to get cached data
    cached_data = frappe.cache().get_value(cache_key)
    if cached_data:
        context.update(cached_data)
        return context

    conditions = ""
    if type and status and city:
        conditions = f"WHERE property_type='{type}' AND status='{status}' AND city='{city}'"

    context.type = type
    context.status = status
    context.city = city

    context.types = frappe.db.sql("SELECT name FROM `tabProperty Type`", as_dict=True)
    context.cities = frappe.db.sql("SELECT name FROM `tabCity`", as_dict=True)

    # Check if the 'page' parameter is passed in the URL
    paginate_context = paginate(doctype="Property", page=page, conditions=conditions)  # pass conditions to the paginate function

    context.properties = paginate_context.get('properties')
    context.search = paginate_context.get('search')
    context.prev = paginate_context.get('prev')
    context.next = paginate_context.get('next')

    # Cache the data
    frappe.cache().set_value(cache_key, context, expires_in_sec=300)  # Cache for 5 minutes

    return context