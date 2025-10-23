import { useEffect, useState, useRef } from 'react';
import { MarketData } from '../types';

// const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
const WS_URL =
  import.meta.env.VITE_WS_URL ||
  (window.location.protocol === 'https:'
    ? `wss://${window.location.host}`
    : `ws://${window.location.host}`);

export function useWebSocket() {
  const [data, setData] = useState<MarketData>({
    orderBook: { bids: [], asks: [] },
    trades: [],
    ledger: [],
    settledCount: 0
  });
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const marketData = JSON.parse(event.data);
        setData(marketData);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return { data, isConnected };
}
