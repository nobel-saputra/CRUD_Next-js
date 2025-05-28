
````markdown
# Simple CRUD Application with Next.js and Supabase

![Homepage Screenshot](public/screenshots/homepage.png)
*A clean interface for managing your items effortlessly.*

This project showcases a fundamental Create, Read, Update, and Delete (CRUD) application for "items." It leverages the power of **Next.js** for both the frontend user interface and its API Routes, with **Supabase** serving as the robust Backend-as-a-Service (BaaS) that provides a PostgreSQL database, real-time capabilities, and an auto-generated API.

---

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Prerequisites](#prerequisites)
-   [Getting Started (Local Setup)](#getting-started-local-setup)
    -   [1. Clone the Repository](#1-clone-the-repository)
    -   [2. Supabase Configuration](#2-supabase-configuration)
    -   [3. Environment Variables Setup](#3-environment-variables-setup)
    -   [4. Install Dependencies](#4-install-dependencies)
    -   [5. Run the Application](#5-run-the-application)
-   [How to Use the Application](#how-to-use-the-application)
    -   [View Items (Read)](#view-items-read)
    -   [Add New Item (Create)](#add-new-item-create)
    -   [Edit Existing Item (Update)](#edit-existing-item-update)
    -   [Delete an Item (Delete)](#delete-an-item-delete)
-   [Project Structure](#project-structure)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)

---

## Features

This application supports the four core operations of data management:

* **Create (Add):** Easily add new items with a name and optional description to the database.
* **Read (View):** Displays a real-time list of all items stored in your Supabase database.
* **Update (Edit):** Modify the details (name and/or description) of existing items.
* **Delete (Remove):** Permanently remove items from the database.

---

## Tech Stack

* **Frontend & API Routes:** [Next.js](https://nextjs.org/) (React Framework)
* **Programming Language:** [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* **Database & BaaS:** [Supabase](https://supabase.com/) (PostgreSQL Database, Authentication, Storage, Auto-generated APIs)
* **Database Client:** `@supabase/supabase-js` (Supabase JavaScript Client Library)
* **Styling:** Pure CSS (or your chosen styling solution)
* **Package Manager:** [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

* [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
* A Git client

---

## Getting Started (Local Setup)

Follow these steps to get the application up and running on your local machine.

### 1. Clone the Repository

Open your terminal and clone this repository:

```bash
git clone https://github.com/nobel-saputra/CRUD_Next-js
cd frontend
# Navigate into the Next.js project directory (adjust if your folder name is different)
````

*(Replace `<YOUR_REPOSITORY_URL>` with the actual URL of your Git repository.)*

### 2\. Supabase Configuration

This application uses Supabase as its primary database and backend. If you don't already have a Supabase project, follow these steps:

  * Visit [Supabase.com](https://supabase.com/) and sign up/log in.

  * Click **"New project"** or select an existing one.

  * Once your project is created, navigate to the **"SQL Editor"** or **"Table Editor."**

  * Create a new table named `items` with the following schema. You can run this SQL query directly in the SQL Editor:

    ```sql
    CREATE TABLE items (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      description TEXT
    );
    ```

    *(Ensure the `uuid-ossp` extension is enabled under "Database" -\> "Extensions" in your Supabase dashboard if `uuid_generate_v4()` doesn't work. It's usually enabled by default.)*

  * In your Supabase dashboard, navigate to **"Project Settings"** (the gear icon in the bottom left) -\> **"API."**

  * Make a note of your `Project URL` (e.g., `https://xyzabcdef.supabase.co`) and your `anon public key` (e.g., `eyJhbGciOiJIUzI1Ni...`). These will be used in the next step.

### 3\. Environment Variables Setup

The application requires Supabase credentials to connect to your database securely. These are stored in environment variables.

  * In the `frontend` directory (the root of your Next.js project), create a new file named `.env.local`:

    ```dotenv
    # frontend/.env.local

    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    # If your API Routes require elevated privileges, you might also use:
    # SUPABASE_SERVICE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
    ```

  * Replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY` with the values you noted from your Supabase dashboard.

  * **CRITICAL:** Add `.env.local` to your `.gitignore` file within the `frontend` directory to ensure these sensitive credentials are not committed to your Git repository.

    ```
    # frontend/.gitignore
    .env.local
    ```

### 4\. Install Dependencies

Inside the `frontend` directory, run the following command to install all project dependencies:

```bash
npm install
# or
yarn install
```

### 5\. Run the Application

Once all dependencies are installed, start the Next.js application in development mode:

```bash
npm run dev
# or
yarn dev
```

The application will now be running at `http://localhost:3000` (or another port if 3000 is occupied). Open your web browser and navigate to this address.

-----

## How to Use the Application

Once the application is running at `http://localhost:3000`, you can start interacting with it.

### View Items (Read)

  * Upon opening the application, you will see a list of all items currently present in your Supabase database. If the database is empty, the list will be blank.
  * Each item displays its **Name** and **Description**, followed by "Edit" and "Delete" buttons.

*All existing items are displayed here.*

### Add New Item (Create)

1.  At the top of the page, you'll find a form with input fields for **Item Name** and **Description**.
2.  Fill in the **Item Name** field (this is required).
3.  Fill in the **Description** field (this is optional).
4.  Click the **"Add Item"** button.
5.  The new item will be added to the database and will appear in the list automatically.

*Easily add new items to your inventory.*

### Edit Existing Item (Update)

1.  Locate the item you wish to edit in the list.
2.  Click the **"Edit"** button corresponding to that item.
3.  The form at the top of the page will automatically populate with the selected item's data.
4.  Modify the **Item Name** or **Description** as needed.
5.  Click the **"Update Item"** button.
6.  The item's data will be updated in the database, and the list will refresh automatically.

*Update item details with ease.*

### Delete an Item (Delete)

1.  Find the item you wish to delete in the list.
2.  Click the **"Delete"** button corresponding to that item.
3.  The item will be permanently removed from the database and will disappear from the list.

*Remove unwanted items from your list.*

-----

## Project Structure

Here's an overview of the main folders and files within this Next.js project:

```
/frontend
├── .env.local             # Local environment variables (sensitive, ignored by Git)
├── .gitignore             # Files/folders ignored by Git
├── package.json           # Project dependencies and scripts
├── next.config.js         # Next.js specific configurations
├── public/                # Static assets (images, icons, etc.)
│   └── screenshots/       # Folder for your screenshots
│       ├── homepage.png
│       ├── item-list.png
│       ├── add-item-form.png
│       ├── edit-item-form.png
│       └── delete-button.png
├── pages/
│   ├── _app.js            # Base Next.js application component
│   ├── index.js           # Main application page (the CRUD UI)
│   └── api/               # Next.js API Routes (Server-side logic)
│       ├── items.js       # API for GETting all items, POSTing new items
│       └── items/         # Folder for dynamic API routes
│           └── [id].js    # Dynamic API for GET (by ID), PUT (update by ID), DELETE (by ID)
├── components/            # Folder for reusable React components (if any)
│   └── ...
└── ...                    # Other Next.js files and folders
```

-----

## Deployment

This application is designed for easy deployment to platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

### General Steps:

1.  Ensure your code is pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  Connect your repository to your chosen hosting platform (Vercel/Netlify).
3.  **Crucially:** Configure your **Environment Variables** (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your hosting platform's dashboard. These will be used by your API Routes in the production environment.
4.  Ensure the "Root Directory" in your deployment configuration points to the `frontend` folder if your repository is a monorepo or if your Next.js project is not at the repository's root.

-----

## Contributing

Contributions are welcome\! If you'd like to contribute to this project, please fork the repository, create a new branch for your features or fixes, and submit a pull request.

-----

## License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).


```
https://github.com/nobel-saputra
```
