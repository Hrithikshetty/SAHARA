import streamlit as st
import pandas as pd
import folium
from IPython.display import display
from streamlit_folium import st_folium
import pymongo
from pymongo import MongoClient



cData = pd.read_csv("C:\\Users\\aloky\\OneDrive\\Desktop\\SAHARA\\Analytics\\001.csv")
fData = pd.read_csv("C:\\Users\\aloky\\OneDrive\\Desktop\\SAHARA\\Analytics\\002.csv")


cData_colors = {
    'Road Accidents': 'blue',
    'Robbery': 'orange',
    'Assistance in Finding Missing Persons': 'green',
    'Assault': 'red',
    'Reporting and Addressing Fraud Cases': 'purple',
    'Road Accident': 'red',
    'Blood Donation Request': 'red',
    'Organ Donation Request': 'red',
    'Support for Orphanages and Elderly Homes': 'pink',
    'Medicine Procurement': 'brown'
}

fData_colors = {
    'Natural Disaster': 'darkred',
    'Lost and Found Assistance': 'darkgreen',
    'Man-Made Disaster': 'darkorange',
    'Infrastructure Failure': 'darkblue',
    'Refugee Crisis': 'darkcyan',
    'Famine Security': 'darkmagenta',
    'Food Security': 'darkyellow',
    'Pandemic/Epidemic': 'darkviolet',
    'Water Logging': 'lightblue',
    'Noise Complaint': 'lightgreen',
    'Road Blocks': 'lightcoral',
    'Fresh Food Accessibility Issues': 'lightpink',
    'Healthcare Accessibility Challenges': 'lightgray',
    'Waste Disposal Problems': 'lightgrey',
    'Property Vandalism': 'darkslategray',
    'Animal Rescue': 'darkolivegreen',
    'Wildlife Habitat Displacement': 'darkslateblue'
}
cData_cleaned = cData.dropna(subset=['Latitude', 'Longitude'])
fData_cleaned = fData.dropna(subset=['Latitude', 'Longitude'])
combined_data = pd.concat([cData_cleaned, fData_cleaned])
mymap = folium.Map(location=[combined_data['Latitude'].iloc[0], combined_data['Longitude'].iloc[0]], zoom_start=10)
    
def add_markers_from_mongodb():
    client = pymongo.MongoClient("mongodb+srv://hrit:9980030603@cluster0.pxklwg8.mongodb.net")
    db = client["unoff"]
    collection = db["volunteers"]

    documents = collection.find()

    for document in documents:
        attribute1 = document["latitude"]
        attribute2 = document["longitude"]
        volunteer_name = document.get("firstname", "Unknown")
        popup_content = f"Volunteer Name: {volunteer_name}<br>Location: {attribute1}, {attribute2}"
        folium.Marker(
            location=[attribute1, attribute2],
            popup=popup_content,
            icon=folium.Icon(color='green', icon='star') 
        ).add_to(mymap)


for index, row in combined_data.iterrows():
    category = row['Case Category']
    color = cData_colors.get(category, fData_colors.get(category, 'gray'))
    popup_content = f"{row['Case Category']}"
    folium.Marker(
        location=[row['Latitude'], row['Longitude']],
        popup=popup_content,
        icon=folium.Icon(color=color)
    ).add_to(mymap)

add_markers_from_mongodb()

st_data = st_folium(mymap, width=725)
