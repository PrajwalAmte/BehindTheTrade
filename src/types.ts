export interface Order {
  id: number;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  timestamp: number;
}

export interface Trade {
  id: number;
  price: number;
  quantity: number;
  buyOrderId: number;
  sellOrderId: number;
  timestamp: number;
  status: 'matched' | 'settled';
}

export interface LedgerEntry {
  tradeId: number;
  status: string;
  clearedAt: number;
  settledAt: number | null;
  settlementDate: string;
}

export interface OrderBook {
  bids: Order[];
  asks: Order[];
}

export interface MarketData {
  orderBook: OrderBook;
  trades: Trade[];
  ledger: LedgerEntry[];
  settledCount: number;
}

export interface Stats {
  totalTrades: number;
  settledCount: number;
  pendingCount: number;
}
