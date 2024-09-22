# ProfSpective

Welcome to **ProfSpective** – an application designed to provide feedback about professors based on ratings from students who have taken their classes. With our app, you can get recommendations for classes and find out how professors are rated by their students.

[Live Demo](https://profspective.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-007ACC?style=for-the-badge&logo=data:image/svg+xml;base64,YOUR_BASE64_ENCODED_LOGO)
![Llama 3.1-8B](https://img.shields.io/badge/Llama%203.1--8B-AI%20Model-brightgreen?style=for-the-badge)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## Features

- **Professor Ratings**: View feedback and ratings for professors based on student reviews from the last semester.
- **Class Recommendations**: Utilize a Retrieval-Augmented Generation (RAG) system to get personalized class recommendations.
- **Authentication**: Securely sign in using Clerk for account management and authentication.
- **Data Storage**: Store and manage class information with Firebase.
- **RAG Integration**: Implemented with Milvus for enhanced recommendation capabilities.

## Future Plans

- **Personal Class Recommendations**: Enhance the recommendation system to provide personalized class suggestions based on user preferences.
- **Database Integration**: Work towards integrating with an established database for more reliable and scalable data management.
- **Navigation Improvements**: Refine the app's navigation to enhance user experience and streamline interactions.

## Important Notice

We're currently using Firebase's test version for authentication and data management. This setup might not be usable in the future unless we receive sufficient interest and support from users. If you enjoy using ProfSpective, please let us know!

## Getting Started

To install and run ProfSpective locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Git](https://git-scm.com/) installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/profspective.git

2. **Navigate to the project directory:**
   
   ```bash
   cd profspective

4. **Install dependencies:**

   ```bash
   npm install
   
6. **Create a .env.local file to store your api keys**
   
7. **Run the development server:**

   ```bash
   npm run dev
