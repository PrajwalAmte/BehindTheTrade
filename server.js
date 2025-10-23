import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Resolve file paths (for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// In-Memory State
const orderBook = { bids: [], asks: [] };
const trades = [];
const clearingLedger = [];
let orderIdCounter = 1;
let tradeIdCounter = 1;
let settledCount = 0;

// Matching Logic 
function matchOrders() {
  const matches = [];

  orderBook.bids.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
  orderBook.asks.sort((a, b) => a.price - b.price || a.timestamp - b.timestamp);

  while (orderBook.bids.length > 0 && orderBook.asks.length > 0) {
    const bestBid = orderBook.bids[0];
    const bestAsk = orderBook.asks[0];

    if (bestBid.price >= bestAsk.price) {
      const matchPrice = bestAsk.price;
      const matchQuantity = Math.min(bestBid.quantity, bestAsk.quantity);

      const trade = {
        id: String(tradeIdCounter++),
        price: matchPrice,
        quantity: matchQuantity,
        buyOrderId: bestBid.id,
        sellOrderId: bestAsk.id,
        timestamp: Date.now(),
        status: 'matched'
      };

      trades.push(trade);
      matches.push(trade);

      clearingLedger.push({
        tradeId: trade.id,
        status: 'Pending (T+2)',
        clearedAt: trade.timestamp,
        settledAt: null,
        settlementDate: new Date(trade.timestamp + 2000).toISOString()
      });

      bestBid.quantity -= matchQuantity;
      bestAsk.quantity -= matchQuantity;

      if (bestBid.quantity === 0) orderBook.bids.shift();
      if (bestAsk.quantity === 0) orderBook.asks.shift();
    } else {
      break;
    }
  }

  return matches;
}

// Settlement Logic
function settleTrades() {
  const now = Date.now();
  clearingLedger.forEach(entry => {
    if (entry.status === 'Pending (T+2)' && now - entry.clearedAt >= 2000) {
      entry.status = 'Settled ✅';
      entry.settledAt = now;
      settledCount++;

      const trade = trades.find(t => t.id === entry.tradeId);
      if (trade) trade.status = 'settled';
    }
  });
}

// Broadcast Updates to Clients 
function broadcastUpdate() {
  const data = JSON.stringify({
    orderBook,
    trades: trades.slice(-10),
    ledger: clearingLedger.slice(-10),
    settledCount
  });

  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(data);
  });
}

setInterval(() => {
  settleTrades();
  broadcastUpdate();
}, 1000);

// API Routes
app.post('/api/orders', (req, res) => {
  const { side, price, quantity } = req.body;
  const order = {
    id: orderIdCounter++,
    side,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    timestamp: Date.now()
  };

  if (side === 'buy') orderBook.bids.push(order);
  else orderBook.asks.push(order);

  const matches = matchOrders();
  broadcastUpdate();

  res.json({ success: true, order, matches });
});

app.get('/api/book', (req, res) => res.json(orderBook));
app.get('/api/trades', (req, res) => res.json(trades.slice(-20)));
app.get('/api/ledger', (req, res) => res.json(clearingLedger.slice(-20)));

app.post('/api/reset', (req, res) => {
  orderBook.bids = [];
  orderBook.asks = [];
  trades.length = 0;
  clearingLedger.length = 0;
  orderIdCounter = 1;
  tradeIdCounter = 1;
  settledCount = 0;
  broadcastUpdate();
  res.json({ success: true });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalTrades: trades.length,
    settledCount,
    pendingCount: clearingLedger.filter(e => e.status.includes('Pending')).length
  });
});

// WebSocket Handling 
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    orderBook,
    trades: trades.slice(-10),
    ledger: clearingLedger.slice(-10),
    settledCount
  }));
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
}

// Start Server 
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
