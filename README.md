# TriCode Compiler

TriCode Compiler is a full-stack web-based platform that allows users to write, compile, and execute HTML, CSS, and JavaScript code in real time. Users can securely store, manage, and download their projects, with support for real-time previews and immediate feedback. The project is built on the MERN (MongoDB, Express.js, React.js, Node.js) stack and utilizes modern web technologies such as Tailwind CSS for responsive design, JWT for secure authentication, and REST API for backend communication.

## Features

- **Full-Stack Web-Based Compiler:**  
  Write and execute HTML, CSS, and JavaScript code directly in the browser, with real-time feedback and previews.

- **User Authentication & Authorization:**  
  Secure user registration and login functionality with JWT-based authentication. Users can store their code securely and access it anytime.

- **Responsive Design:**  
  Designed using Tailwind CSS to ensure a seamless and responsive experience across all device sizes.

- **Real-Time Code Execution:**  
  Provides immediate feedback by running the written code in real time and displaying the output in a preview window.

- **Download Projects as ZIP:**  
  Users can download their entire code projects as ZIP files for local development or sharing.

## Technologies Used

- **Frontend:**  
  - React.js: For building the dynamic, interactive user interface.  
  - Tailwind CSS: For responsive, utility-first styling.  

- **Backend:**  
  - Node.js & Express.js: backend-side logic and handling API requests.  
  - MongoDB: NoSQL database for storing user data and project information.  
  - JWT (JSON Web Token): For secure user authentication and session management.  
  - REST API: For efficient communication between the frontend and backend.

## Getting Started

To set up and run the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14.x or above)
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/tricode-compiler.git
   cd tricode-compiler
   ```

2. **Install dependencies:**

   - Install backend-side dependencies:
     ```bash
     cd backend
     npm install
     ```

   - Install client-side dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and provide the necessary configurations:
   
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application:**

   - Start the backend (Express.js backend):
     ```bash
     cd backend
     npm start
     ```

   - Start the frontend (React.js app):
     ```bash
     cd ../frontend
     npm start
     ```

5. **Open the application in your browser:**

   The app should now be running on [http://localhost:3000](http://localhost:3000) (frontend) and [http://localhost:5173](http://localhost:5173) (backend API).

## Usage

1. **User Registration/Login:**
   - New users can register for an account, while returning users can log in using their credentials.
   - Authentication is handled using JWT tokens, ensuring secure access to user data and code.

2. **Real-Time Code Execution:**
   - Users can write HTML, CSS, and JavaScript code in the editor and instantly see the results in the live preview window.

3. **Project Management:**
   - Users can save their projects to the database, edit them later, and even download their entire project as a ZIP file for offline use.

## Future Enhancements

- **Collaboration Features:**  
  Real-time collaboration to allow multiple users to work on the same project simultaneously.

- **Version Control:**  
  Implement version control for users to track changes and revert to previous versions of their projects.

- **Custom Themes:**  
  Allow users to customize the editor interface with different color themes and fonts.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or suggestions, feel free to contact me at [akhilnautiyal5@gmail.com].

---

### Demo

A live demo of the application is available at: [your-demo-link]

---

Enjoy coding with **TriCode Compiler**! 🚀
