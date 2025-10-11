interface WebPageConfig {
    title: string;
    backgroundColor: string;
    textColor: string;
    glowEffect: boolean;
}
declare class PitchBlackWebPage {
    private config;
    private container;
    constructor(config: WebPageConfig);
    private init;
    private setupPage;
    private addInteractiveEffects;
    private createRippleEffect;
    private handleKeyPress;
    private toggleGlowEffect;
    private resetEffects;
    private logWelcomeMessage;
    updateConfig(newConfig: Partial<WebPageConfig>): void;
    getConfig(): WebPageConfig;
}
export { PitchBlackWebPage, WebPageConfig };
//# sourceMappingURL=index.d.ts.map