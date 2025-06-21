# dient dazu die Ticket und Customer Liste zu überarbeiten nachdem sie aus Höme exportiert wurde
# Speaker haben z.B. kein Speaker Ticket sonder Regular oder VIP. Das muss angepasst werden. Die Speaker stehen in einer separaten Liste.
# Zusätzlich wird Staff hinzugefügt. Müssen tatsächlich neu angelegt werden und nicht verändert 
# Presse 
# Workshops

import csv
import json


"""
Staff hinzufügen
"""
field_renames_ticket = {
    "Vorname": "firstname",
    "Nachname": "lastname",
    "LinkedIn": "extraFields.linkedin"
}

field_renames_ticket = {
    "Vorname": "firstname",
    "Nachname": "lastname",
    "Affiliation": "company",
}

# load customer json data
with open(r'data\customer.json', 'r', encoding="utf-8") as customer_file:
    try:
        customer_data = json.load(customer_file)
    except json.JSONDecodeError:
        customer_data = []

# load ticket json data
with open(r'data\tickets.json', 'r', encoding="utf-8") as ticket_file:
    try:
        ticket_data = json.load(ticket_file)
    except json.JSONDecodeError:
        ticket_data = []

# load staff csv data
with open(r'data\staff.csv', 'r', newline='', encoding="utf-8") as staff_file:

    reader_to_ticket = csv.DictReader(staff_file)
    for row in reader_to_ticket:
        renamed_row = {field_renames_ticket.get(k, k): v for k, v in row.items()}
        renamed_row['email'] = f'{renamed_row['firstname']}.{renamed_row['lastname']}@ventureclub-muenster.de'
        renamed_row['ticketName'] = 'Staff'
        renamed_row['id'] = f'{renamed_row['firstname']}+{renamed_row['lastname']}'
        ticket_data.append(renamed_row)

with open(r'data\staff.csv', 'r', newline='') as staff_file:
    reader_to_customer = csv.DictReader(staff_file)
    for row in reader_to_customer:
        renamed_row = {field_renames_ticket.get(k, k): v for k, v in row.items()}
        renamed_row['primaryEmail'] = f'{renamed_row['firstname']}.{renamed_row['lastname']}@ventureclub-muenster.de'
        customer_data.append(renamed_row)

"""
Speaker

nimmt aus einer Liste die Name und ändert für diese Personen den ticketNamen

"""
# load speaker csv data
with open(r'data\Speaker Liste Codes.csv', 'r', encoding="utf-8-sig", newline='') as speaker_file:

    reader_to_speaker = csv.DictReader(speaker_file, delimiter=';')
    for row in reader_to_speaker:
        found = False
        for entry in ticket_data:
            # es gibt zwei solcher Einträge
            #if (entry['firstname'] == "Amelie und Leena"):

            if (entry['firstname'] == row['Vorname']) and (entry['lastname'] == row['Nachname']):
                entry['ticketName'] = 'Speaker'
                found = True
        if not found:
            print(f'Person {row["Vorname"]} {row["Nachname"]} nicht gefunden')
            #print(row)

    # sonderfall Amelie und Leena Kaijo sollte sich durch Personalisierung lösen
            
"""
Workshop

in server js?
"""


# Save to JSON
with open(r'data\tickets.json', 'w') as ticket_file:
    json.dump(ticket_data, ticket_file, indent=4)

with open(r'data\customer.json', 'w') as customer_file:
    json.dump(customer_data, customer_file, indent=4)