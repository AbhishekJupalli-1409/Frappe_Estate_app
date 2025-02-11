import requests  # for sending HTTP requests
from faker import Faker  # for generating fake data
import frappe
fake = Faker()

def get_agent_images():
    agent_images = []  # Define inside function to avoid global pollution
    
    for i in range(2):
        agent_image_url = f"https://api.unsplash.com/search/photos?client_id=QbrodlqyegH5cCvmA6AgY4yiWh7c58XfWKubQgecpX4&query=headshot&page={i+1}"
        response = requests.get(agent_image_url)
        
        if response.status_code == 200:  # Ensure the request is successful
            agent_image_data = response.json().get('results', [])
            agent_images.extend([img.get('urls').get('small') for img in agent_image_data])
    
    populate_agents(agent_images,fake)
    
    return len(agent_images)

get_agent_images()



def populate_agents(agent_images,fake):
    for img in agent_images:
        agent=frappe.get_doc({
            "doctype":"Agent",
            "email":fake.profile().get('mail'),
            "agent_name":fake.profile().get('name'), 
            "phone":fake.phone_number(),
            "image":img
            })
        agent.insert(ignore_permissions=True)
    frappe.db.commit()
    print("Agents created successfully")
        

# Call the function to execute the script
if __name__ == "__main__":
    num_images = get_agent_images()
    print(f"{num_images} agent images fetched and agents created.")




# the below command is to directly run in terminal
# python populate_agents.py



# run using the bench console
# the below code


# # Import the module
# import estate_app.estate_app.populate_agents as pa

# # Call the function to execute the script
# num_images = pa.get_agent_images()
# print(f"{num_images} agent images fetched and agents created.")

