# electricwires
To have the display of wire companies and products.

## Project Setup

This project uses Firebase for authentication and database services. To run the project locally or deploy it, you need to configure your Firebase project correctly.

### 1. Firebase Configuration

1.  Create a project in the [Firebase Console](https://console.firebase.google.com/).
2.  In your project, add a new Web App.
3.  You will be given a `firebaseConfig` object. You must use this to create a `firebaseConfig.js` file in the `electricwires` directory of this project.
4.  The content of `electricwires/firebaseConfig.js` should be:

    ```javascript
    import { initializeApp } from "firebase/app";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    export default app;
    ```
    *(Note: This file is gitignored and will not be committed to the repository for security reasons. You must create your own.)*

### 2. Enable Authentication Providers

1.  In the Firebase Console, go to the **Authentication** section.
2.  Select the **Sign-in method** tab.
3.  Enable the **Google** sign-in provider.

### 3. Authorize Domains for Authentication

**This is a crucial step for Google Sign-in to work.** You must add the domains where your app will be running to the list of authorized domains.

1.  In the Firebase Console, go to the **Authentication** section.
2.  Select the **Settings** tab.
3.  Under the **Domains** section, click **Add domain**.
4.  Add the domains your app will be served from. For example:
    *   `localhost` (for local development)
    *   Your Firebase Hosting URL (e.g., `your-project-name.web.app`).

### 4. Running the Project Locally

After configuring Firebase, install the dependencies and run the development server:

```bash
cd electricwires
npm install
npm run dev
```

### 5. Building and Deploying

To create a production build of the application:

```bash
cd electricwires
npm run build
```

You can then deploy the `out` folder to any static hosting service, like Firebase Hosting.
