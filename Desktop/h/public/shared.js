// Shared utilities and data fetching

// Fetch all protocols
async function fetchProtocols() {
  try {
    const response = await fetch('/api/protocols');
    return await response.json();
  } catch (error) {
    console.error('Error fetching protocols:', error);
    return [];
  }
}

// Fetch a single protocol by ID
async function fetchProtocol(id) {
  try {
    const response = await fetch(`/api/protocols/${id}`);
    if (!response.ok) throw new Error('Protocol not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching protocol:', error);
    return null;
  }
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Format percentage
function formatPercent(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

// Format large numbers
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Get risk level color
function getRiskColor(riskLevel) {
  const colors = {
    'Low': '#10b981',
    'Medium': '#f59e0b',
    'High': '#ef4444'
  };
  return colors[riskLevel] || '#6b7280';
}

// Get category icon
function getCategoryIcon(category) {
  const icons = {
    'Equities': '📈',
    'Cryptocurrency': '₿',
    'Prediction Markets': '🎯',
    'DeFi': '💎'
  };
  return icons[category] || '📊';
}

// Mock user portfolio data
const mockPortfolio = {
  totalValue: 125000,
  allocations: [
    { protocolId: 'ai-infrastructure', protocolName: 'AI Infrastructure Protocol', amount: 50000, performance: 34.5 },
    { protocolId: 'crypto-momentum', protocolName: 'Crypto Momentum Protocol', amount: 40000, performance: 67.3 },
    { protocolId: 'prediction-markets', protocolName: 'Prediction Market Protocol', amount: 35000, performance: 18.7 }
  ]
};

// Mock architect data
const mockArchitectData = {
  name: 'Alex Chen',
  protocols: [
    { id: 'ai-infrastructure', name: 'AI Infrastructure Protocol', totalCapital: 2450000, participants: 127, earnings: 12250 },
    { id: 'tech-momentum', name: 'Tech Momentum Protocol', totalCapital: 3120000, participants: 201, earnings: 12480 }
  ],
  totalEarnings: 24730,
  totalCapital: 5570000
};
