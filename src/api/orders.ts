const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function placeOrder(side: 'buy' | 'sell', price: number, quantity: number) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ side, price, quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  return response.json();
}

export async function resetSimulation() {
  const response = await fetch(`${API_URL}/api/reset`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to reset simulation');
  }

  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API_URL}/api/stats`);

  if (!response.ok) {
    throw new Error('Failed to get stats');
  }

  return response.json();
}
