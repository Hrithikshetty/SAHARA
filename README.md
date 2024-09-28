# Sahara: Unified Volunteer Management System

Sahara is a comprehensive solution designed to bridge the gap in volunteer coordination during times of crises such as natural disasters, health emergencies, societal unrest, and other threats. Sahara integrates SMS alerts, community engagement initiatives, and supports multi-categorized emergencies, ensuring seamless volunteer mobilization and effective crisis management.


## Features
- **Real-time Communication**: Instant messaging between volunteers and coordinators during emergencies.
- **AI-Driven Analysis**: Leverages machine learning to optimize resource allocation and volunteer assignments.
- **Geospatial Analytics**: Provides real-time mapping of volunteer locations and resource distribution.
- **Unified Management**: Integrates multiple volunteer organizations into a single system.
- **Emergency Alerts**: Sends notifications and updates to volunteers based on their location.
- **Volunteer Tracking**: Monitor volunteer activities and track their contribution to ongoing projects.

## Technologies Used
- **Frontend**: Next.js, TailWind CSS
- **Backend**: Flask, Express
- **Database**: MongoDB
- **AI/ML**: Python (Scikit-learn, TensorFlow), OpenAI, 
- **Geospatial Analysis**: Google Maps API, OpenStreetMap, Folium, Streamlit
- **Deployment**: Docker
- **Download the pre-trained** `GoogleNews-vectors-negative300.bin` from (https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz), install `gensim` using `pip install gensim`, and load the model using `gensim.models.KeyedVectors.load_word2vec_format`.


## Architecture Overview
The architecture of Sahara is composed of the following layers:
1. **Frontend (Next.js)**: The user interface that connects volunteers, coordinators, and organizations.
2. **Backend (Flask + Express)**: Handles authentication, API requests, and manages data from the frontend to the database.
3. **Database (MongoDB)**: Stores user data, volunteer information, and emergency updates.
4. **AI & Analytics Layer (Python)**: Provides predictive models and geospatial analysis for resource allocation and emergency mapping.

## Getting Started
To get started with Sahara, follow the steps below.

### Prerequisites
Ensure that you have the following software installed:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)

### Installation

### Frontend Setup

1. Clone the repository:
   - `git clone https://github.com/yourusername/sahara.git`
   - `cd sahara`

2. Install dependencies for the frontend:
   - `cd frontend`
   - `npm install`

3. Run the frontend:
   - `npm run dev`

### Backend Setup

1. Set up the backend:
   - `cd backend`

2. Run the backend:
   - `npm start`

### AI and Geospatial Analytics Setup

1. Set up AI and analytics components:
   - `cd analytics`
   - `python main.py`

   - `cd analytics/Test`
   - `python app.py`

## Additional Information

- OpenAI API key is Required
- Check the respective directories for any additional setup requirements specific to the frontend, backend, or analytics components..
