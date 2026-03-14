# HOLD - Autonomous Investment Protocols

A marketplace for autonomous investment protocols. Instead of investing in individual assets, users allocate capital into rule-based investment systems that automatically manage portfolio allocation and rebalancing.

## Overview

HOLD changes the traditional investing model:
- **Participants** allocate capital to investment logic, not assets
- **Architects** design and publish protocols, earning management fees
- Protocols automatically execute allocation, rebalancing, and risk management

## Features

### Core Pages

1. **Landing Page** (`/`) - Explains HOLD and the protocol investing model
2. **Explore Marketplace** (`/explore`) - Browse available investment protocols
3. **Protocol Detail** (`/protocol/:id`) - Inspect protocol logic, assets, and performance
4. **Design Protocol** (`/design`) - Create and publish new investment protocols
5. **Portfolio** (`/portfolio`) - View your capital allocations across protocols
6. **Architect Dashboard** (`/dashboard`) - Manage protocols and track earnings

### Key Concepts

- **Protocols**: Rule-based investment systems that define assets, allocation logic, rebalance frequency, and risk constraints
- **Automatic Execution**: The platform handles all trading, rebalancing, and position management
- **Transparency**: All protocols show underlying assets, logic, and performance metrics
- **Two-Sided Marketplace**: Participants invest, Architects earn fees

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Project

Start the development server:
```bash
npm start
```

Or use nodemon for auto-reload during development:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Project Structure

```
.
├── server.js              # Express server with API routes
├── package.json           # Project dependencies
├── data/
│   └── protocols.json     # Mock protocol data
├── public/                # Static files and pages
│   ├── index.html         # Landing page
│   ├── explore.html       # Marketplace
│   ├── protocol-detail.html # Protocol details
│   ├── design.html        # Protocol designer
│   ├── portfolio.html     # User portfolio
│   ├── dashboard.html     # Architect dashboard
│   ├── styles.css         # Global styles
│   ├── script.js          # Landing page scripts
│   └── shared.js          # Shared utilities and data fetching
└── README.md              # This file
```

## Example Protocols

The demo includes several example protocols:

- **AI Infrastructure Protocol** - Allocates across NVDA, AMD, TSM with monthly rebalance
- **Crypto Momentum Protocol** - Rotates into top-performing tokens weekly
- **Prediction Market Protocol** - Diversifies across Polymarket events
- **DeFi Yield Protocol** - Optimizes yield across DeFi protocols
- **Tech Momentum Protocol** - Tracks momentum across major tech stocks

## Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Vanilla JavaScript** - Client-side logic
- **CSS3** - Styling with modern features

## API Endpoints

- `GET /api/protocols` - Get all protocols
- `GET /api/protocols/:id` - Get a specific protocol

## Demo Data

The application uses mock data stored in `data/protocols.json`. In a production environment, this would be replaced with a database.
