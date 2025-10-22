// Fonction utilitaire pour formater le texte avec retour à la ligne automatique
export function wrapText(text, maxLength = 100, indent = '   ') {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    });
    
    if (currentLine) lines.push(currentLine);
    
    return lines.map((line, index) => index === 0 ? line : indent + line).join('\n');
}

// Fonction pour récupérer la vraie IP de l'utilisateur
export async function fetchRealIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'IP:', error);
        return 'Unknown';
    }
}

// Détecte l'OS pour l'affichage
export function getSystemInfo() {
    const userAgent = navigator.userAgent || '';
    const platform = navigator.platform || '';
    
    let osName = 'Unknown OS';
    if (navigator.userAgentData && navigator.userAgentData.platform) {
        const platformData = navigator.userAgentData.platform;
        if (platformData.includes('Win')) osName = 'Windows 10';
        else if (platformData.includes('Mac')) osName = 'macOS';
        else if (platformData.includes('Linux')) osName = 'Linux';
        else osName = platformData;
    } else {
        if (platform.indexOf('Win') !== -1 || userAgent.indexOf('Windows') !== -1) {
            if (userAgent.indexOf('Windows NT 10.0') !== -1) osName = 'Windows 10';
            else osName = 'Windows';
        } else if (platform.indexOf('Mac') !== -1) {
            osName = 'macOS';
        } else if (platform.indexOf('Linux') !== -1) {
            osName = 'Linux';
        }
    }
    return osName;
}

// Fonction pour obtenir la couleur du thème
export function getThemeColor() {
    const borderColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--terminal-border').trim();
    return borderColor || '#ffffff';
}

// Convertit hex en RGB
export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

// Applique un thème au terminal
export function applyTheme(terminal, themeName, themes) {
    const theme = themes[themeName];
    if (!theme) return false;
    
    terminal.css('--color', theme.fg);
    terminal.css('--background', theme.bg);
    document.documentElement.style.setProperty('--terminal-bg', theme.bg);
    document.documentElement.style.setProperty('--terminal-fg', theme.fg);
    document.documentElement.style.setProperty('--terminal-border', theme.border);
    
    return true;
}

// Détecte le navigateur
export function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown Browser';
    let browserVersion = '';

    if (navigator.userAgentData && navigator.userAgentData.brands) {
        const brands = navigator.userAgentData.brands;
        const normalize = (s) => (s || '').toString().replace(/[^0-9A-Za-z.\s]/g, ' ').replace(/\s+/g, ' ').trim();
        const isNotABrand = (s) => /^Not\s*A\s*Brand$/i.test(normalize(s));

        const primary = brands.find(b => {
            const nb = normalize(b.brand);
            return nb && nb.toLowerCase() !== 'chromium' && !isNotABrand(b.brand);
        }) || brands[brands.length - 1];

        browserName = normalize(primary.brand) || 'Unknown';
        browserVersion = primary.version || '';
    } else {
        if (/Edg\/([\d.]+)/.test(userAgent)) {
            browserName = 'Microsoft Edge';
            browserVersion = RegExp.$1;
        } else if (/OPR\/([\d.]+)/.test(userAgent)) {
            browserName = 'Opera';
            browserVersion = RegExp.$1;
        } else if (/Chrome\/([\d.]+)/.test(userAgent)) {
            browserName = 'Chrome';
            browserVersion = RegExp.$1;
        } else if (/Firefox\/([\d.]+)/.test(userAgent)) {
            browserName = 'Firefox';
            browserVersion = RegExp.$1;
        } else if (/Version\/([\d.]+).*Safari/.test(userAgent)) {
            browserName = 'Safari';
            browserVersion = RegExp.$1;
        }
    }

    return browserVersion ? `${browserName} ${browserVersion}` : browserName;
}

// Détecte l'OS complet
export function getOSInfo() {
    const userAgent = navigator.userAgent || '';
    const platform = navigator.platform || '';
    
    let osName = 'Unknown OS';
    
    if (navigator.userAgentData && navigator.userAgentData.platform) {
        const platformData = navigator.userAgentData.platform;
        if (platformData.includes('Win')) osName = 'Windows';
        else if (platformData.includes('Mac')) osName = 'macOS';
        else if (platformData.includes('Linux')) osName = 'Linux';
        else osName = platformData;
    } else {
        if (platform.indexOf('Win') !== -1 || userAgent.indexOf('Windows') !== -1) {
            if (userAgent.indexOf('Windows NT 10.0') !== -1) osName = 'Windows 10/11';
            else if (userAgent.indexOf('Windows NT 6.3') !== -1) osName = 'Windows 8.1';
            else if (userAgent.indexOf('Windows NT 6.2') !== -1) osName = 'Windows 8';
            else if (userAgent.indexOf('Windows NT 6.1') !== -1) osName = 'Windows 7';
            else osName = 'Windows';
        } else if (platform.indexOf('Mac') !== -1 || userAgent.indexOf('Mac') !== -1) {
            osName = 'macOS';
        } else if (platform.indexOf('Linux') !== -1 || userAgent.indexOf('Linux') !== -1) {
            if (userAgent.indexOf('Android') !== -1) osName = 'Android';
            else osName = 'Linux';
        } else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
            osName = 'iOS';
        }
    }
    
    return osName;
}
