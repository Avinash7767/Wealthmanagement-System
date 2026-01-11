# Wealth Management System

A comprehensive wealth management platform with separated frontend, backend, and database layers.

## Project Structure

```
wealthmanagementsystem/
├── frontend/          # React + TypeScript frontend application
├── backend/           # Node.js/Express backend API server
├── database/          # Database schemas and migrations
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or bun
- MongoDB (for development)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
The backend will run on `http://localhost:5000`

### Database Setup
- MongoDB: Update the connection string in `.env` files
- Run migrations in the `database/` folder

## Features
- User authentication and profile management
- Dashboard with financial overview
- Transaction tracking
- Portfolio management
- Budget planning
- Investment tracking
- Financial goals management

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB/PostgreSQL
- **UI Components**: Radix UI, shadcn/ui

## Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled JavaScript

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wealth-management
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

## API Endpoints
- `GET /api/health` - Health check

## Contributing
Feel free to submit issues and pull requests.

## License
ISC
