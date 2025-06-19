/**
 * Cross-platform clipboard copy utility
 * Handles web browsers, mobile webviews, and various edge cases
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof text !== 'string') return false;

  text = text.trim();
  let success = false;

  try {
    // Method 1: Modern Clipboard API (works in secure contexts)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      success = true;
      return success;
    }
  } catch (error) {
    console.warn('Clipboard API failed:', error);
  }

  if (!success) {
    try {
      // Method 2: User agent specific methods for mobile
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // iOS specific method
        const range = document.createRange();
        const span = document.createElement('span');
        span.textContent = text;
        span.style.position = 'fixed';
        span.style.top = '0';
        span.style.left = '0';
        span.style.fontSize = '16px';
        
        document.body.appendChild(span);
        range.selectNodeContents(span);
        
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        
        success = document.execCommand('copy');
        
        selection?.removeAllRanges();
        document.body.removeChild(span);
      } else if (userAgent.includes('android')) {
        // Android WebView specific
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        input.style.position = 'fixed';
        input.style.top = '0';
        input.style.left = '0';
        input.style.opacity = '0';
        input.style.fontSize = '16px';
        
        document.body.appendChild(input);
        input.focus();
        input.select();
        input.setSelectionRange(0, 99999);
        
        success = document.execCommand('copy');
        document.body.removeChild(input);
      }
    } catch (error) {
      console.warn('Mobile-specific copy failed:', error);
    }
  }

  return success;
}
