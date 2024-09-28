# Sahara: Unified Volunteer Management System

Sahara is a comprehensive solution designed to bridge the gap in volunteer coordination during times of crises such as natural disasters, health emergencies, societal unrest, and other threats. Sahara integrates SMS alerts, community engagement initiatives, and supports multi-categorized emergencies, ensuring seamless volunteer mobilization and effective crisis management.

---

## Key Features
- **Real-time Communication**: Facilitates instant messaging between volunteers and coordinators during emergencies.
- **AI-Driven Analysis**: Utilizes machine learning to optimize resource allocation and volunteer assignments.
- **Geospatial Analytics**: Provides real-time mapping of volunteer locations and resource distribution.
- **Unified Management**: Integrates multiple volunteer organizations into a single system.
- **Emergency Alerts**: Sends notifications and updates to volunteers based on their location.
- **Volunteer Tracking**: Monitors volunteer activities and tracks their contribution to ongoing projects.

---

## Setup Instructions

### 1. Generate an OpenAI API Key
1. **Log in to OpenAI Platform:**
   - Go to [OpenAI](https://platform.openai.com) and sign in with your account.

2. **Create a New API Key:**
   - Navigate to the "API Keys" section.
   - Click on "Create new secret key".
   - Copy the generated API key immediately as it will not be shown again.

### 2. Download Word2Vec Embedding
1. **Download the Embedding File:**
   - Visit [this Google Drive link](https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit?resourcekey=0-wjGZdNAUop6WykTtMip30g).
   - Click on the download button to save the file to your local machine.

2. **Move the File to Your Project Directory:**
   - Place the downloaded embedding file in a suitable directory within your project (e.g., `data` or `embeddings`).

### 3. Update `CONSTANTS.py`
1. **Open `CONSTANTS.py`:**
   - Open the `CONSTANTS.py` file in your preferred code editor.

2. **Add the API Key and Embedding Path:**
   - Update the file with the API key and the path to the downloaded embedding file. For example:

```python
CONSTANTS.py

# OpenAI API Key
api_key = "YOUR_GENERATED_API_KEY_HERE"

# Path to Word2Vec Embedding
word2vec = "path/to/your/downloaded/embedding/file.bin"
```

---

## How to Use Our Application?

### Web Application

Navigate to the Application Directory and install the dependencies:

```sh
cd sahara/frontend
npm install
npm run dev
```

### Flask Application

Run the Flask backend service:

```sh
cd sahara/backend
npm start
```

### AI and Geospatial Analytics Setup

Run the AI analytics components:

```sh
cd sahara/analytics
python main.py
```

You can also run the test component separately:

```sh
cd sahara/analytics/Test
python app.py
```

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white" alt="Twilio"/>
  <img src="https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white" alt="Google Maps"/>
</p>

---

## Contributors
<a href="https://github.com/alokillur/Secret-Pixels/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hrithikshetty/Sahara" />
</a>

For more information, visit the [GitHub repository](https://github.com/Hrithikshetty/Sahara).
```
