// Interactive allocation bar editor
// Allows users to drag and adjust allocation percentages
// Constrains total to always equal 100%

let isDragging = false;
let currentBar = null;
let startX = 0;
let startWidth = 0;
let otherBars = [];

function getAllocationItems() {
    return Array.from(document.querySelectorAll('.allocation-item[data-category]'));
}

function getAllocationPercent(item) {
    const bar = item.querySelector('.allocation-bar');
    return parseFloat(bar.getAttribute('data-percent') || 0);
}

function setAllocationPercent(item, percent) {
    const percentElement = item.querySelector('.allocation-percent');
    const bar = item.querySelector('.allocation-bar');
    
    percent = Math.max(0, Math.min(100, percent)); // Clamp between 0-100
    const roundedPercent = Math.round(percent * 100) / 100; // Round to 2 decimals
    
    percentElement.textContent = Math.round(roundedPercent) + '%';
    bar.style.width = roundedPercent + '%';
    bar.setAttribute('data-percent', roundedPercent);
}

function updateAllocationPercent(item, newPercent) {
    const items = getAllocationItems();
    const currentPercent = getAllocationPercent(item);
    const delta = newPercent - currentPercent;
    
    // Get all other items (excluding the one being adjusted)
    const otherItems = items.filter(i => i !== item);
    
    // Calculate total of other items
    const otherTotal = otherItems.reduce((sum, i) => sum + getAllocationPercent(i), 0);
    
    // If increasing this item, decrease others proportionally
    if (delta > 0) {
        if (otherTotal > 0) {
            // Proportionally reduce other items
            otherItems.forEach(otherItem => {
                const otherPercent = getAllocationPercent(otherItem);
                const proportion = otherPercent / otherTotal;
                const reduction = delta * proportion;
                const newOtherPercent = Math.max(0, otherPercent - reduction);
                setAllocationPercent(otherItem, newOtherPercent);
            });
        } else {
            // If all others are 0, just set this one
            setAllocationPercent(item, Math.min(100, newPercent));
        }
    } else {
        // If decreasing this item, increase others proportionally
        const availableSpace = 100 - (newPercent + otherTotal);
        if (availableSpace > 0 && otherItems.length > 0) {
            // Distribute the freed space proportionally
            const totalOther = otherItems.reduce((sum, i) => sum + getAllocationPercent(i), 0);
            if (totalOther > 0) {
                otherItems.forEach(otherItem => {
                    const otherPercent = getAllocationPercent(otherItem);
                    const proportion = otherPercent / totalOther;
                    const increase = Math.abs(delta) * proportion;
                    const newOtherPercent = otherPercent + increase;
                    setAllocationPercent(otherItem, newOtherPercent);
                });
            } else {
                // If all others are 0, distribute equally
                const equalShare = Math.abs(delta) / otherItems.length;
                otherItems.forEach(otherItem => {
                    setAllocationPercent(otherItem, equalShare);
                });
            }
        }
    }
    
    // Set the target item's percent
    setAllocationPercent(item, newPercent);
    
    // Normalize to ensure exactly 100%
    normalizeTo100();
}

function normalizeTo100() {
    const items = getAllocationItems();
    const currentTotal = items.reduce((sum, item) => sum + getAllocationPercent(item), 0);
    
    if (Math.abs(currentTotal - 100) > 0.01) {
        // Adjust proportionally to reach exactly 100%
        const factor = 100 / currentTotal;
        items.forEach(item => {
            const currentPercent = getAllocationPercent(item);
            const normalized = currentPercent * factor;
            setAllocationPercent(item, normalized);
        });
    }
    
    updateTotal();
}

function updateTotal() {
    const items = getAllocationItems();
    let total = 0;
    
    items.forEach(item => {
        total += getAllocationPercent(item);
    });
    
    const totalElement = document.getElementById('totalAllocation');
    if (totalElement) {
        const roundedTotal = Math.round(total);
        totalElement.textContent = roundedTotal + '%';
        
        // Should always be 100%, but show red if there's a rounding issue
        if (roundedTotal !== 100) {
            totalElement.style.color = '#ef4444';
        } else {
            totalElement.style.color = '#10b981';
        }
    }
}

function getPercentFromX(container, x) {
    const rect = container.getBoundingClientRect();
    const percent = ((x - rect.left) / rect.width) * 100;
    return Math.max(0, Math.min(100, percent));
}

function handleMouseDown(e) {
    const handle = e.target.closest('.allocation-handle');
    const bar = e.target.closest('.allocation-bar');
    
    if (handle || bar) {
        isDragging = true;
        currentBar = bar;
        const container = bar.parentElement;
        const item = bar.closest('.allocation-item');
        
        startX = e.clientX;
        startWidth = getAllocationPercent(item);
        
        const percent = getPercentFromX(container, e.clientX);
        updateAllocationPercent(item, percent);
        
        e.preventDefault();
    }
}

function handleMouseMove(e) {
    if (!isDragging || !currentBar) return;
    
    const container = currentBar.parentElement;
    const item = currentBar.closest('.allocation-item');
    const percent = getPercentFromX(container, e.clientX);
    
    updateAllocationPercent(item, percent);
    e.preventDefault();
}

function handleMouseUp(e) {
    if (isDragging) {
        isDragging = false;
        currentBar = null;
        normalizeTo100();
    }
}

// Initialize allocation bars
document.addEventListener('DOMContentLoaded', function() {
    const allocationContainers = document.querySelectorAll('.allocation-bar-container');
    
    allocationContainers.forEach(container => {
        container.addEventListener('mousedown', handleMouseDown);
        container.style.cursor = 'pointer';
        
        // Add click handler for quick adjustment
        container.addEventListener('click', function(e) {
            if (!isDragging) {
                const bar = container.querySelector('.allocation-bar');
                const item = bar.closest('.allocation-item');
                const percent = getPercentFromX(container, e.clientX);
                updateAllocationPercent(item, percent);
            }
        });
    });
    
    // Add global mouse event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Initialize to 100% total (normalize initial values)
    normalizeTo100();
});

// Touch support for mobile
document.addEventListener('touchstart', function(e) {
    const handle = e.target.closest('.allocation-handle');
    const bar = e.target.closest('.allocation-bar');
    
    if (handle || bar) {
        isDragging = true;
        currentBar = bar;
        const container = bar.parentElement;
        const item = bar.closest('.allocation-item');
        
        touchStartX = e.touches[0].clientX;
        touchStartPercent = getAllocationPercent(item);
        
        const percent = getPercentFromX(container, e.touches[0].clientX);
        updateAllocationPercent(item, percent);
        
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (!isDragging || !currentBar) return;
    
    const container = currentBar.parentElement;
    const item = currentBar.closest('.allocation-item');
    const percent = getPercentFromX(container, e.touches[0].clientX);
    
    updateAllocationPercent(item, percent);
    e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', function(e) {
    if (isDragging) {
        isDragging = false;
        currentBar = null;
        normalizeTo100();
    }
});
