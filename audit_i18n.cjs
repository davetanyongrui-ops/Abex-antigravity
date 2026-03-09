
const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'messages/en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(__dirname, 'messages/zh.json'), 'utf8'));

function compare(obj1, obj2, prefix = '') {
    const missing = [];
    for (const key in obj1) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (!(key in obj2)) {
            missing.push(fullKey);
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            missing.push(...compare(obj1[key], obj2[key], fullKey));
        } else if (obj1[key] === obj2[key] && localeAwareKeys.includes(key)) {
            // Maybe check if values are same? Not always a problem.
        }
    }
    return missing;
}

const localeAwareKeys = []; // Add keys that MUST be translated if needed

const missingKeys = compare(en, zh);
console.log('Missing keys in zh.json:', JSON.stringify(missingKeys, null, 2));

// Also check for English strings in zh.json (values that contain English characters but are supposed to be Chinese)
// This is harder but we can look for " [A-Za-z]" in values.
function findEnglishInZh(obj, prefix = '') {
    const englishInZh = [];
    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            englishInZh.push(...findEnglishInZh(obj[key], fullKey));
        } else if (typeof obj[key] === 'string') {
            // Check if it's purely English (no Chinese characters) but should be translated
            // This is a rough heuristic
            if (/^[A-Za-z0-9\s.,!?-]+$/.test(obj[key]) && obj[key].length > 4) {
                // Exclude brands like "ABEX", "ISO 9001", "Paragon"
                const excluded = ["ABEX", "ISO 9001", "SGBC", "Setsco", "CP Series", "SP Series", "PA Series", "VT Series", "PIL Series", "PAZ Series", "PM Series", "PV Series", "PS Series", "4PBS Series", "PEM Series", "MD Series", "SPT-SPU Series", "PBS Series", "ABEX Pumps"];
                if (!excluded.some(ex => obj[key].includes(ex)) && !/^[0-9+ ]+$/.test(obj[key])) {
                    englishInZh.push(fullKey + ": " + obj[key]);
                }
            }
        }
    }
    return englishInZh;
}

console.log('Suspicious English values in zh.json:', JSON.stringify(findEnglishInZh(zh), null, 2));
