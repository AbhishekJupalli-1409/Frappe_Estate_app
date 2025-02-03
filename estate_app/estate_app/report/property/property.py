# Copyright (c) 2025, Abhishek Jupalli(abhi) and contributors
# For license information, please see license.txt

# import frappe

from __future__ import unicode_literals
import frappe
from frappe import _  # translate internal strings for translation
 # for python 2 compatibility

def execute(filters=None):
	return get_columns(), get_data(filters)


def get_data(filters):
	print(f"\n\n\nFilters: {filters}\n\n\n")
	#date range
	_from,to= filters.get("from"),filters.get("to")  # from is a reserved keyword in python so we use _from
	#conditions
	conditions = "1=1"
	if filters.get("property_name"):conditions += f" AND  property_name LIKE '%{filters.get('property_name')}%'"
	if filters.get("agent"):conditions += f" AND agent = '{filters.get('agent')}'"
	if filters.get("status"):conditions += f" AND status = '{filters.get('status')}'"

	print(f"\n\n\nConditions: {conditions}\n\n\n")

	data = frappe.db.sql(f"""SELECT name, property_name, address, property_type, status, property_price, discount, grand_total, agent, agent_name 
		FROM `tabProperty` 
		WHERE (creation BETWEEN '{_from}' AND '{to}') AND {conditions};""", as_dict=True)
	return data


def get_columns():
	return [
		"Name:Link/Property:70",  # label, fieldtype, width
		"Property Name:Data:150",
		"Address:Data:250",
		"Property Type:Data:120",
		"Status:Data:70",
		"Property Price:Currency:150",
		"Discount:Percentage:90",
		"Grand Total:Currency:150",
		"Agent:Data:170",
		"Agent Name:Data:170",
	]
