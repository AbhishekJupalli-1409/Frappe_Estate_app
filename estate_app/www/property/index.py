import frappe
from estate_app.utils import paginate

def get_context(context):
    # Check if the 'page' parameter is passed in the URL
    page = frappe.form_dict.page
    print(f"{frappe.form_dict}")
    print(f"Received page: {page}")  # Debug print to check if the page is correctly received

    paginate_context = paginate("Property", page)
    print("Pagination function call is finished")  # Debug print to track function execution

    context.properties = paginate_context.get('properties')
    context.prev = paginate_context.get('prev')
    context.next = paginate_context.get('next') 
    
    return context