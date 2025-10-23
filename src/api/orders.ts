// Detect backend URL dynamically
const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.origin.includes('localhost')
    ? 'http://localhost:3001'
    : window.location.origin);

export async function placeOrder(side: 'buy' | 'sell', price: number, quantity: number) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ side, price, quantity }),
  });

  if (!response.ok) {
    throw new Error(`Failed to place order: ${response.statusText}`);
  }

  return response.json();
}

export async function resetSimulation() {
  const response = await fetch(`${API_URL}/api/reset`, { method: 'POST' });

  if (!response.ok) {
    throw new Error(`Failed to reset simulation: ${response.statusText}`);
  }

  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API_URL}/api/stats`);

  if (!response.ok) {
    throw new Error(`Failed to get stats: ${response.statusText}`);
  }

  return response.json();
}
