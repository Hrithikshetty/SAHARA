from flask import Flask, request, jsonify
import pymongo
import numpy as np
from gensim.models import KeyedVectors
from collections import defaultdict
from geopy.distance import geodesic

app = Flask(__name__)



MONGO_CONNECTION_STRING = "mongodb+srv://hrit:9980030603@cluster0.pxklwg8.mongodb.net"
DB_NAME = "unoff"
COLLECTION_NAME = "volunteers"


word2vec_model_path = "C:\\Users\\aloky\\OneDrive\\Desktop\\Hackathon\\Hacksphere\\White-Hats\\Analytics\\Test 1\\GoogleNews-vectors-negative300.bin"
word2vec_model = KeyedVectors.load_word2vec_format(word2vec_model_path, binary=True, limit=200000)


categories = [
    "Assistance for Road Accident Victims",
    "Response to Robbery Incidents",
    "Blood Donation Requests",
    "Organ Donation Requests",
    "Support for Orphanages and Elderly Homes",
    "Assistance for Road Accident Victims",
    "Response to Robbery Incidents",
    "Assistance in Finding Missing Persons",
    "Reporting and Addressing Fraud Cases",
    "Lost and Found Item Assistance",
    "Medicine Procurement Support",
    "Water Flooding Reports",
    "Noise Disturbance Complaints",
    "Road Obstructions",
    "Fresh Food Accessibility Issues",
    "Healthcare Accessibility Challenges",
    "Waste Disposal Problems",
    "Safety Hazards",
    "Property Vandalism",
    "Animal Rescue Operations",
    "Wildlife Habitat Displacement"
]

@app.route('/find-volunteers', methods=['POST'])
def find_volunteers():
    print("Hello")
    data = request.get_json()
    input_latitude = float(data.get('latitude'))
    input_longitude = float(data.get('longitude'))
    message = data.get('message')

    matched_category = get_category(message)
    matched_volunteers = get_volunteers(matched_category)

    volunteer_distances = []

    for volunteer in matched_volunteers:
        volunteer_latitude = float(volunteer['latitude'])
        volunteer_longitude = float(volunteer['longitude'])
        volunteer_distance = geodesic((input_latitude, input_longitude), (volunteer_latitude, volunteer_longitude)).meters
        volunteer_distances.append((volunteer_distance, volunteer['phonenumber']))

    volunteer_distances.sort()

    phone_numbers = [volunteer[1] for volunteer in volunteer_distances[:2]]

    if len(phone_numbers) == 1:
        buddy = phone_numbers[0]
    else:
        buddy = phone_numbers[1]
    

    return jsonify({"matched_category": matched_category, "phone_numbers": phone_numbers, "buddy": buddy})


def get_category(input_text):
    category_scores = defaultdict(float)
    input_vector = np.mean([word2vec_model[word] for word in input_text.split() if word in word2vec_model], axis=0)
    for category in categories:
        category_vector = np.mean([word2vec_model[word] for word in category.split() if word in word2vec_model], axis=0)
        similarity = np.dot(input_vector, category_vector) / (np.linalg.norm(input_vector) * np.linalg.norm(category_vector))
        category_scores[category] = similarity
    return max(category_scores, key=category_scores.get)

def get_volunteers(interests):
    client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    matched_volunteers = collection.find({"interests": interests})
    return list(matched_volunteers)

if __name__ == "__main__":
    print("Server running")
    app.run(debug=True)
