import requests
from faker import Faker
import frappe
import random
fake = Faker()




def populate_property():
    house_image_url = f"https://api.unsplash.com/search/photos?client_id=QbrodlqyegH5cCvmA6AgY4yiWh7c58XfWKubQgecpX4&query=house@page=3"
    # change the page number to get more images 
    image_api = requests.get(house_image_url)
    house_image_data = image_api.json().get('results')


    # get agents from db
    agents = [agent.name for agent in frappe.db.sql("""SELECT name FROM `tabAgent`""",as_dict=True)]  # name is the primary key of the agent

    # get property types from db
    property_types = [property_type.name for property_type in frappe.db.sql("""SELECT name  FROM `tabProperty Type`""",as_dict=True)]

    # get city name from db
    city_names = [city.name for city in frappe.db.sql("""SELECT name FROM `tabCity`""",as_dict=True)]

    # get amenities from db
    amenities= frappe.db.sql("""select amenity,amenity_price from `tabProperty Amenity Detail`""",as_dict=True)

    # and also write  a validation for this in the server side before inserting into db
    # validate the grand_total will be equal to the sum of all the amenities price
    # House images extraction on condition
    house_images = []
    for i in range(1):     # to get 100 photos more data
        for img in house_image_data:
            height_img = img.get('height')
            width_img = img.get('width')
            if height_img < width_img + 700:   # putting condition so that width is more .. image look good
                house_images += [
                    {   
                        'doctype':'Property',
                        'image':img.get('urls').get('regular'),
                        'property_name':img.get('alt_description'),
                        'address':fake.address().replace("\n",", "),
                        'agent':random.choice(agents),
                        'status':random.choice(['Sale','Rent','Lease']),
                        'property_type':random.choice(property_types), 
                        'city':random.choice(city_names),
                        'property_price': random.randint(40000,40000000),
                        'discount':random.randint(0,10),
                        'description':fake.paragraph(nb_sentences=5, variable_nb_sentences=False),
                        'amenities':[amenities[random.randint(0,len(amenities)-1)]]




                        }
                    ]
    for p in house_images:
        try:
            pr = frappe.get_doc(p)
            pr.insert(ignore_permissions=True)
            print(f"Property {pr.name} inserted successfully")
        except Exception as e:
            print(f"Error in inserting property {p.get('property_name')}")
            print(f"Error is {e}")

        

    frappe.db.commit()

                
    print(house_images)
    return len(house_images)


if __name__ == "__main__":
    num_properties = populate_property()
    print(f"{num_properties} agent images fetched and agents created.")