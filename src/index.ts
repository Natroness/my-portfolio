// Pitch Black Webpage - TypeScript Implementation

interface WebPageConfig {
    title: string;
    backgroundColor: string;
    textColor: string;
    glowEffect: boolean;
}

class PitchBlackWebPage {
    private config: WebPageConfig;
    private container: HTMLElement | null;

    constructor(config: WebPageConfig) {
        this.config = config;
        this.container = null;
        this.init();
    }

    private init(): void {
        this.setupPage();
        this.addInteractiveEffects();
        this.logWelcomeMessage();
    }

    private setupPage(): void {
        // Set page title
        document.title = this.config.title;
        
        // Get container element
        this.container = document.querySelector('.container');
        
        if (this.container) {
            this.container.style.backgroundColor = this.config.backgroundColor;
            this.container.style.color = this.config.textColor;
        }
    }

    private addInteractiveEffects(): void {
        // Add click effect to the container
        if (this.container) {
            this.container.addEventListener('click', () => {
                this.createRippleEffect();
            });
        }

        // Add keyboard interaction
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.handleKeyPress(event);
        });
    }

    private createRippleEffect(): void {
        if (!this.container) return;

        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.1)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';

        // Add ripple animation CSS if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.container.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    private handleKeyPress(event: KeyboardEvent): void {
        switch (event.key) {
            case ' ':
                event.preventDefault();
                this.toggleGlowEffect();
                break;
            case 'Escape':
                this.resetEffects();
                break;
        }
    }

    private toggleGlowEffect(): void {
        const glowElement = document.querySelector('.glow');
        if (glowElement) {
            glowElement.classList.toggle('glow');
        }
    }

    private resetEffects(): void {
        const glowElement = document.querySelector('.glow');
        if (glowElement) {
            glowElement.classList.add('glow');
        }
    }

    private logWelcomeMessage(): void {
        console.log(`
        ╔══════════════════════════════════════╗
        ║        PITCH BLACK WEBPAGE           ║
        ║                                      ║
        ║  Welcome to the darkness...          ║
        ║                                      ║
        ║  Controls:                           ║
        ║  • Click anywhere for ripple effect  ║
        ║  • Press SPACE to toggle glow        ║
        ║  • Press ESC to reset effects        ║
        ║                                      ║
        ╚══════════════════════════════════════╝
        `);
    }

    public updateConfig(newConfig: Partial<WebPageConfig>): void {
        this.config = { ...this.config, ...newConfig };
        this.setupPage();
    }

    public getConfig(): WebPageConfig {
        return { ...this.config };
    }
}

// Initialize the webpage when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const config: WebPageConfig = {
        title: 'Pitch Black Webpage',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        glowEffect: true
    };

    const webpage = new PitchBlackWebPage(config);
    
    // Expose to global scope for debugging
    (window as any).pitchBlackWebPage = webpage;
});

// Export for module usage
export { PitchBlackWebPage, WebPageConfig };
