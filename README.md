# Web based code editor 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `cd backend`

### `npm start`

Runs the api in the development mode.\
using [http://localhost:3001](http://localhost:3001)

### `cd ..`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Web-Based Code Editor System

## System Components

### Frontend (Client-Side):

#### Code Editor Interface:
- Allows users to write and edit code.
- Supports syntax highlighting for different programming languages.
- Provides a text area for input and output display.

#### Tabs Manager:
- Manages multiple code tabs concurrently.
- Allows users to open, close, and switch between tabs seamlessly.

#### File Naming and Extension:
- Enables users to add new file names and extensions for each code tab.

#### Styling:
- Enhances the user interface with styling for better code view.

#### Communication with Backend:
- Sends code and language information to the backend for execution.
- Retrieves and displays the output received from the backend.

#### Auto-Saving:
- Saves code state in local storage to retain it when the webpage is refreshed or closed.

### Backend (Server-Side):

#### RESTful API (Express.js):
- Provides endpoints for code execution, e.g., `/api/execute`.
- Receives code and language information from the frontend.

#### Code Execution:
- Executes Python, TypeScript, and JavaScript code based on the specified language.
- Uses temporary files for code execution.

#### File Handling:
- Manages temporary files for each code execution.
- Writes code to a temporary file before execution.

#### Error Handling:
- Catches errors during code execution and returns appropriate responses.

## System Flow

1. **User Interaction:**
   - Users interact with the frontend, writing and editing code, managing tabs, and initiating code execution.

2. **Frontend Communication:**
   - Frontend sends requests to the backend API, providing code, language, and other relevant information.

3. **Backend Processing:**
   - Backend receives the requests and processes them.
   - It executes the code using the appropriate language runtime (Python, TypeScript, or Node.js).

4. **Code Execution:**
   - Temporary files are created to store the user's code.
   - The backend executes the code and captures the output.

5. **Backend Response:**
   - The backend sends the output or error information back to the frontend.

6. **Frontend Display:**
   - The frontend displays the output or error to the user in the code editor interface.

7. **Auto-Saving:**
   - Code state is auto-saved to local storage, allowing users to resume their work after refreshing or closing the webpage.

## Data Flow

- Data flows from the frontend to the backend through API requests.
- Temporary files are used for handling code during execution.
- Output from code execution flows back from the backend to the frontend.

## Technologies

### Frontend:

- React.js for building the user interface.
- Local storage for auto-saving code state.
- RESTful API for communication with the backend.

### Backend:

- Node.js with Express.js for building the server.
- Child process module for executing code in different languages.

## Considerations (<code>With proper planning and time</code>)

### Security:

- Implement proper input validation and sanitization to prevent code injection.
- Secure the communication between the frontend and backend.

### Scalability:

- Consider horizontal scaling for handling increased traffic.
- Load balancing strategies to distribute requests.

### Persistence:

- Consider using databases for more persistent storage if needed (e.g., user accounts, file history).

### Error Handling:

- Implement robust error handling mechanisms for both frontend and backend.
- Log errors for debugging and monitoring.

### User Experience:

- Optimize the code editor interface for a smooth and responsive user experience.

