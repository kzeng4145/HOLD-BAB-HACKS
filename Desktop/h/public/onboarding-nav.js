// Keyboard navigation for onboarding flow
// Left arrow: Previous step, Right arrow: Next step

const onboardingRoutes = {
    1: { prev: '/', next: '/onboarding-2' },
    2: { prev: '/onboarding-1', next: '/onboarding-3' },
    3: { prev: '/onboarding-2', next: '/onboarding-4' },
    4: { prev: '/onboarding-3', next: '/onboarding-5' },
    5: { prev: '/onboarding-4', next: '/portfolio' }
};

function getCurrentStep() {
    const path = window.location.pathname;
    if (path.includes('onboarding-1')) return 1;
    if (path.includes('onboarding-2')) return 2;
    if (path.includes('onboarding-3')) return 3;
    if (path.includes('onboarding-4')) return 4;
    if (path.includes('onboarding-5')) return 5;
    return null;
}

function navigateOnboarding(direction) {
    const currentStep = getCurrentStep();
    if (!currentStep) return;

    const route = onboardingRoutes[currentStep];
    if (!route) return;

    if (direction === 'next' && route.next) {
        window.location.href = route.next;
    } else if (direction === 'prev' && route.prev) {
        window.location.href = route.prev;
    }
}

// Add keyboard event listener
document.addEventListener('keydown', function(e) {
    // Don't navigate if user is typing in an input field
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return;
    }

    // Left arrow: Previous step
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateOnboarding('prev');
    }
    
    // Right arrow: Next step
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateOnboarding('next');
    }
});
