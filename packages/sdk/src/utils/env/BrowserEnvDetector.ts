/* =========================================================================
   Web-Environment Detection Helpers – one self-contained class
   ========================================================================= */

/**
 * BrowserEnvDetector: A utility class for detecting browser environments
 * 
 * This class is designed to safely detect browser features even when
 * potentially running in non-browser environments (like Node.js).
 * All methods check for the existence of browser APIs before using them.
 */
export class BrowserEnvDetector {
  /** Aggregate helper – call once and cache if needed. */
  static detectEnvironment() {
    return {
      isBrowser: this.isBrowser(),
      isMobileBrowser: this.isMobileBrowser(),
      isExtApiSupported: this.isExtApiSupported(),
      // isAndroidBrowserThatSupportExt: this.isAndroidBrowserThatSupportExt(),
    };
  }

  /**
   * Check if code is running in a browser environment
   */
  static isBrowser(): boolean {
    return typeof globalThis !== 'undefined' && 
           'window' in globalThis && 
           'document' in globalThis;
  }

  /**
   * Get navigator object safely
   */
  private static getNavigator(): object | null {
    if (!this.isBrowser()) return null;
    return 'navigator' in globalThis ? (globalThis as any).navigator : null;
  }

  /**
   * Get window object safely
   */
  private static getWindow(): object | null {
    if (!this.isBrowser()) return null;
    return 'window' in globalThis ? (globalThis as any).window : null;
  }

  /** Detect whether we're on a mobile browser (handset / small tablet). */
  static isMobileBrowser(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const navigator = this.getNavigator() as any;
      const window = this.getWindow() as any;
      
      if (!navigator || !window) return false;

      // 1. Modern: User-Agent Client Hints (Chromium ≥ 89)
      if (navigator.userAgentData && 
          typeof navigator.userAgentData.mobile !== 'undefined') {
        return Boolean(navigator.userAgentData.mobile);
      }
    
      // 2. Heuristic: coarse pointer + viewport ≤ 820 px
      if (typeof window.matchMedia === 'function' && 
          typeof window.screen !== 'undefined' &&
          window.matchMedia('(pointer: coarse)').matches && 
          window.screen.width <= 820) {
        return true;
      }
    
      // 3. Fallback: classic UA-string sniff
      if (typeof navigator.userAgent === 'string') {
        return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i
          .test(navigator.userAgent);
      }
    } catch (e) {
      // Catch any unexpected errors accessing browser APIs
      console.warn('Error detecting mobile browser:', e);
    }

    return false;
  }
  
  /** Detect whether the Chrome-extension API is exposed to web pages. */
  static isExtApiSupported(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const window = this.getWindow() as any;
      if (!window) return false;
      
      return Boolean(
        window.chrome &&
        window.chrome.runtime &&
        typeof window.chrome.runtime.sendMessage === 'function'
      );
    } catch (e) {
      console.warn('Error detecting extension API:', e);
      return false;
    }
  }
  
  /**
   * Check if a brand info contains a specific keyword
   */
  // private static brandContains(brand: any, keyword: string): boolean {
  //   return typeof brand === 'object' && 
  //          brand !== null && 
  //          typeof brand.brand === 'string' && 
  //          brand.brand.toLowerCase().includes(keyword);
  // }
  
  /**
   * Detect fork-specific tokens in user agent or brand info
   * @param ua User agent string
   * @param brands Array of brand info objects
   * @returns True if a fork-specific token is found
   */
  // private static hasForkSpecificTokens(ua: string, brands: any[]): boolean {
  //   // Define fork identifiers to check
  //   const forkIdentifiers = ['kiwi', 'yandex', 'cromite'];
    
  //   // Check if any identifier exists in either UA string or brand info
  //   return forkIdentifiers.some(id => {
  //     const pattern = new RegExp(`\\b${id}\\b`, 'i');
  //     return pattern.test(ua) || brands.some(brand => this.brandContains(brand, id));
  //   });
  // }
  
  /** Detect Android browsers that allow desktop-style extensions (Kiwi, Yandex, …). */
  // static isAndroidBrowserThatSupportExt(): boolean {
  //   if (!this.isBrowser()) return false;

  //   try {
  //     const navigator = this.getNavigator() as any;
  //     if (!navigator) return false;
      
  //     const ua = typeof navigator.userAgent === 'string' ? navigator.userAgent : '';
      
  //     const brands = (navigator.userAgentData && 
  //       Array.isArray(navigator.userAgentData.brands)) 
  //       ? navigator.userAgentData.brands : [];
    
  //     // Look for fork-specific tokens
  //     const hasForkToken = this.hasForkSpecificTokens(ua, brands);
    
  //     // return this.browserHasExtensionAPI();
  //     return hasForkToken;
  //   } catch (e) {
  //     console.warn('Error detecting Kiwi-like browser:', e);
  //     return false;
  //   }
  // }
}