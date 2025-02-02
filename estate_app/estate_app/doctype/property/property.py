# Copyright (c) 2025, Abhishek Jupalli(abhi) and contributors
# For license information, please see license.txt


import frappe
from frappe.model.document import Document

# class Property(Document):
#     def after_insert(self):
#         # Display a message when a new property is created
#         frappe.msgprint(('Document updated successfully'))

class Property(Document):
    pass
    # def validate(self):
    #     frappe.throw((f'you are not allowed to save <b>{self.name}</b>'))

# Write a condition for if property type = flat and amenities = Outdoor Kitchen then throw error



    # def validate(self):  # self is Document --> property
           # using the default property_type field
        # if self.property_type == "Flat":
    #         for amenity in self.amenities:
    #             if amenity.amenity == "Outdoor Kitchen":
    #                 frappe.throw(f'Property of type <b>flat</b> should not have <b>amenity {amenity.amenity}</b>')
                           



#using the sql query to make the same work done
        #  if self.property_type == "Flat":
        #     amenity=frappe.db.sql(f"""SELECT amenity  from `tabProperty Amenity Detail` WHERE parent='{self.name}' AND amenity='Outdoor Kitchen';""",as_dict=True)
        #     print(f"""\n\n{amenity}""")
        #     if amenity:
        #         frappe.throw(f'Property of type <b>{self.name}</b> should not have <b>{amenity[0].amenity}</b>')
                
