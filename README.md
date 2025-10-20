# UKZN Marking and Grading System

## Overview
The UKZN Marking and Grading System is a web application designed to facilitate the marking and grading process for students and tutors at the University of KwaZulu-Natal (UKZN). The system features a user-friendly interface, integration with the UKZN API, and offline capabilities to ensure seamless access to marking tools.

## Features
- **User Authentication**: Secure login interface for both students and tutors.
- **Script Marking**: Tutors can upload marks and retrieve marked scripts efficiently.
- **AI-Generated Answers**: Integration with AI services to assist in generating answers for questions.
- **Offline Access**: Users can access the application without an internet connection, with data synchronization capabilities.
- **Data Synchronization**: Automatic synchronization of offline data with the server when connectivity is restored.

## Project Structure
```
ukzn-marking-system
├── src
│   ├── backend
│   ├── frontend
│   └── shared
├── scripts
├── configs
├── tests
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ukzn-marking-system.git
   ```
2. Navigate to the project directory:
   ```
   cd ukzn-marking-system
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
- Start the backend server:
  ```
  npm run start:backend
  ```
- Start the frontend application:
  ```
  npm run start:frontend
  ```

## Testing

Unit tests (Jest + ts-jest):

1. Install dependencies:
   ```powershell
   npm install
   ```

2. Run unit tests:
   ```powershell
   npm test
   ```

End-to-end tests (Playwright):

1. Install Playwright (includes browsers):
   ```powershell
   npm install -D @playwright/test && npx playwright install --with-deps
   ```

2. Run e2e tests:
   ```powershell
   npm run test:e2e
   ```

Note: Playwright expects the application to be running at http://localhost:3000 when tests use relative paths such as `/login`.
Start the frontend (build + serve) before running e2e:

```powershell
# build your frontend to `dist` then serve it (example using `serve`)
npm run build:frontend # if you have a build script
npm run start:frontend
```

3. Open the Playwright HTML report:
   ```powershell
   npm run test:e2e:report
   ```

## API Integration
The application integrates with the UKZN API to handle user authentication and data retrieval. Ensure you have the necessary API keys and configurations set in the `.env` file.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.