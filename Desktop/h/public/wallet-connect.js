// Simple wallet connection using ethers.js for hackathon demo
// This will work with MetaMask and other injected wallets

let walletConnected = false;
let walletAddress = null;

// Check if wallet is already connected
async function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                walletConnected = true;
                walletAddress = accounts[0];
                updateWalletButton();
                return true;
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }
    return false;
}

// Connect wallet function
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask or another Web3 wallet to continue.');
        window.open('https://metamask.io/download/', '_blank');
        return false;
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts.length > 0) {
            walletConnected = true;
            walletAddress = accounts[0];
            
            updateWalletButton();
            
            // Show success message
            showWalletSuccess();
            
            // Auto-proceed to next step after a short delay
            setTimeout(() => {
                window.location.href = '/onboarding-2';
            }, 1500);
            
            return true;
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        if (error.code === 4001) {
            alert('Please connect your wallet to continue.');
        } else {
            alert('Error connecting wallet. Please try again.');
        }
        return false;
    }
}

// Update wallet button UI
function updateWalletButton() {
    const button = document.getElementById('connect-wallet-btn');
    if (button) {
        if (walletConnected && walletAddress) {
            const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
            button.innerHTML = `✓ Connected: ${shortAddress}`;
            button.classList.add('connected');
            button.disabled = true;
        } else {
            button.innerHTML = 'Connect your wallet';
            button.classList.remove('connected');
            button.disabled = false;
        }
    }
}

// Show wallet connection success
function showWalletSuccess() {
    const button = document.getElementById('connect-wallet-btn');
    if (button) {
        button.style.background = '#10b981';
        button.innerHTML = '✓ Wallet Connected!';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await checkWalletConnection();
    
    const button = document.getElementById('connect-wallet-btn');
    if (button) {
        button.addEventListener('click', connectWallet);
    }
});

// Listen for account changes
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            walletConnected = false;
            walletAddress = null;
            updateWalletButton();
        } else {
            walletAddress = accounts[0];
            updateWalletButton();
        }
    });
}
