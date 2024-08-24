# Cashier-App

![Website Preview](/KasirApp-React/public/preview.png)

Cashier-App is a web-based cashier application built using React and other technologies such as API and JSONPlaceholder. The application is designed to help manage sales transactions easily and efficiently.

## Feature

- **ReactJS**: Built with React for a responsive and interactive UI.
- **API Integration**: Uses APIs to fetch and manage product and transaction data.
- **JSONPlaceholder**: Provides dummy data for testing and development.
 -**Dynamic UI**: A dynamically updatable interface based on data retrieved from the API.

## Installation

Make sure you have installed [Node.js](https://nodejs.org/) dan [npm](https://www.npmjs.com/) on your system.

1. **Clone this Repository:**

```bash
git clone https://github.com/ProjectRavel/Cashier-App.git
```

2. **Navigate to the frontend directory:**

```bash
cd KasirApp-react
```

3. **Install dependencies:**

```bash
npm install
```

4. **Run the application:**

```bash
npm run dev
```

The application will run on `http://localhost:5173` or another port specified by Vite.

5. **Run JSONPlaceholder (Backend): Open a new terminal and navigate to the backend directory:**
6. 
```bash
cd ../kasirapp-backend
```

Then, run the placeholder:

```bash
json-server --watch db.json --port 5000
```

JSONPlaceholder will run on `http://localhost:5000`.

## Usage

1. **Access the Application:**
    Open a browser and go to http://localhost:5173 to access the cashier application.

2. **Interact with the Backend:**
   All product and transaction data will be fetched from the API provided by JSONPlaceholder at `http://localhost:5000`.

## Project Structure

- **KasirApp-react**: Directory for frontend code (React).
- **kasirapp-backend**: Directory for the JSONPlaceholder backend.

## Kontribusi

Contributions are very welcome! Please fork this repository and create a pull request for any improvements or feature additions.
