# Crazy Coffee Tales : A React & Appwrite Blogging Platform

This project is a modern blogging website built using React.js for the frontend and Appwrite as the backend-as-a-service (BaaS). It features a clean interface, user authentication, and full CRUD (Create, Read, Update, Delete) functionality for blog posts.

## Features

- **User Authentication**: Secure user sign-up and login functionality provided by Appwrite.
- **Create Posts**: Logged-in users can create new blog posts using a rich text editor (TinyMCE).
- **View Posts**: A public "all posts" feed and dedicated pages for viewing single posts.
- **Update & Delete Posts**: Users can edit or delete their own posts.
- **Rich Text Editing**: Integrated TinyMCE allows for formatted text, links, and images within posts.
- **State Management**: Uses Redux Toolkit for efficient global state management (e.g., user auth status).
- **Form Handling**: Utilizes react-hook-form for robust and performant forms.
- **Client-Side Routing**: Seamless navigation handled by react-router-dom.

## Tech Stack

### Frontend
- **Framework**: React (v19)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router (v7)
- **State Management**: Redux Toolkit
- **Form Management**: React Hook Form
- **Rich Text Editor**: TinyMCE for React
- **HTML Parsing**: html-react-parser (for rendering post content)

### Backend
- **Backend-as-a-Service**: Appwrite
- **Appwrite Auth**: For user authentication.
- **Appwrite Databases**: For storing post data.
- **Appwrite Storage**: For uploading featured images.

##  Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- **Node.js**: Ensure you have Node.js (v18 or higher) installed.
- **npm (or yarn/pnpm)**: This guide uses npm.
- **Appwrite Account**: You need an Appwrite project.

### Set Up Appwrite Project

1. Set up a new project in your Appwrite console.
2. Enable Auth (e.g., Email/Password provider).
3. Create a Database.
4. Inside the database, create a Collection (e.g., `posts`).
5. Define the Attributes for your collection (e.g., `title (string)`, `content (string)`, `featuredImage (string, to store the file ID)`, `status (string)`, `userId (string)`).
6. Create a Storage Bucket (e.g., `post-images`) to store featured images.
7. Set the Permissions for your collection and bucket appropriately.

### Installation

1. **Clone the repo**:

    ```bash
    git clone https://github.com/your-username/mega.git
    cd mega
    ```

2. **Install NPM packages**:

    ```bash
    npm install
    ```

3. **Create Environment Variables**: Create a `.env` file in the root of your project and add the following variables. You can get these values from your Appwrite project's "Settings" page.

    ```env
    VITE_APPWRITE_URL="https://cloud.appwrite.io/v1" # Or your self-hosted URL
    VITE_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
    VITE_APPWRITE_COLLECTION_ID="YOUR_POSTS_COLLECTION_ID"
    VITE_APPWRITE_BUCKET_ID="YOUR_IMAGES_BUCKET_ID"

    # You also need a TinyMCE API key for the rich text editor
    VITE_TINYMCE_API_KEY="YOUR_TINYMCE_API_KEY"
    ```

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Starts the development server. Open [http://localhost:5173](http://localhost:5173) (or as indicated) to view it in your browser.
- **`npm run build`**: Builds the app for production to the `dist` folder.
- **`npm run lint`**: Runs ESLint to find and fix problems in your code.
- **`npm run preview`**: Serves the production build locally to preview before deploying.

---

Feel free to adjust any URLs or specific configuration details as needed. This should cover everything required for your project setup and usage.
