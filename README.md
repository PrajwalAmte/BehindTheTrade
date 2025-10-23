# Behind the Trade

An interactive educational website that visualizes how stock trades are matched, cleared, and settled in the market.

## Overview

"Behind the Trade" helps anyone understand what happens behind the scenes in a stock market after clicking "Buy" or "Sell." This simulator demonstrates the complete journey of a trade from order placement through the T+2 settlement cycle.

## Features

- **Interactive Simulation**: Place buy and sell orders and watch them get matched in real-time
- **Order Book Visualization**: See live bids and asks with price-time priority matching
- **Trade Flow Animation**: Visual representation of the trade journey from trader to settlement
- **Clearing & Settlement**: Experience the T+2 settlement cycle with pending and settled states
- **Educational Content**: Learn about order matching, clearing houses, and settlement processes
- **Gamification**: Track your settled trades and simulation success
- **References**: Curated list of resources to continue learning

## Technology Stack

### Backend
- Node.js with Express
- WebSocket for real-time updates
- In-memory order matching engine with price-time priority
- Automatic settlement simulation (T+2 cycle)

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TailwindCSS for styling
- Lucide React for icons
- Real-time WebSocket connection

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

Start both backend and frontend together:
```bash
npm start
```

This will start:
- Backend server on port 3001
- Frontend development server on port 5173

Or run them separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## How It Works

### Order Matching
- Orders are matched using **price-time priority**
- Best buy price is matched with best sell price
- When prices overlap, a trade is executed
- Orders with same price are matched based on timestamp (first in, first out)

### Clearing Process
- Matched trades enter clearing status as "Pending (T+2)"
- Clearing house guarantees both sides of the transaction
- Eliminates counterparty risk

### Settlement (T+2)
- After 2 seconds (simulating 2 business days), trades settle
- Status changes to "Settled ✅"
- This is when money and shares actually transfer

## API Endpoints

- `POST /api/orders` - Place a new order
- `GET /api/book` - Get current order book
- `GET /api/trades` - Get recent trades
- `GET /api/ledger` - Get clearing/settlement records
- `POST /api/reset` - Reset the simulation
- `GET /api/stats` - Get simulation statistics

## WebSocket

Connect to `ws://localhost:3001` for real-time market updates including:
- Order book changes
- New trades
- Settlement updates
- Statistics

## Deployment

This application is ready to deploy on:
- **Render**: Use the start script
- **Replit**: Works out of the box
- **Railway**: Auto-detects Node.js
- **Heroku**: Add Procfile with `web: npm start`

Make sure to set the PORT environment variable for production deployments.

## Educational Use

This simulator is designed for educational purposes to help understand:
- How stock exchanges match orders
- The role of clearing houses
- T+2 settlement cycles
- Order book dynamics
- Market microstructure

## Disclaimers

- This is a simplified simulation for educational purposes
- Does not represent actual market conditions
- Real markets have additional complexity, regulations, and safeguards
- Stock market investments carry risk - always do your own research

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
