import frappe
from faker import Faker
fake = Faker()
cities= []



def populate_city():
     for c in range(10):
        print(fake.city())
    #     city = frappe.get_doc({"doctype":"City","title":fake.city()})
    #     city.insert(ignore_permissions=True)
    #  frappe.db.commit()
     print("cities has been added using the ORM")


