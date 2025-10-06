# Exhibition Curator

## Overview
The Exhibition Curator application is designed to manage and display exhibitions. It provides a user-friendly interface for adding, editing, and viewing exhibitions.

## Project Structure
```
exhibition-curator
├── public
│   └── favicon.ico
├── src
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   └── exhibitions.tsx
│   ├── components
│   │   ├── ExhibitionList.tsx
│   │   ├── ExhibitionForm.tsx
│   │   └── Navbar.tsx
│   ├── styles
│   │   └── globals.css
│   └── types
│       └── index.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 12 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd exhibition-curator
   ```
3. Install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
or
```
yarn dev
```
The application will be available at `http://localhost:3000`.

### Building for Production
To build the application for production, run:
```
npm run build
```
or
```
yarn build
```

### Usage
- Navigate to the homepage to view the main content.
- Use the navigation bar to access different sections of the application.
- Add or edit exhibitions using the provided form.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.