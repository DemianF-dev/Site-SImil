const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, '..', 'simil-recovered');
const DOMAIN = 'simil.com.br';

function getAllFiles(dirPath, arrayOfFiles) {
    try {
        const files = fs.readdirSync(dirPath);
        arrayOfFiles = arrayOfFiles || [];

        files.forEach(function (file) {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            } else {
                if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
                    arrayOfFiles.push(fullPath);
                }
            }
        });
    } catch (e) {
        console.warn(`Skipping directory ${dirPath}: ${e.message}`);
    }
    return arrayOfFiles;
}

console.log(`🔍 Scanning ${SITE_DIR}...`);
const files = getAllFiles(SITE_DIR);
let issues = 0;

console.log(`Found ${files.length} files to check.`);

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const relPath = path.relative(SITE_DIR, file);

        let fileIssues = 0;

        // Check for remaining Wayback links
        if (content.includes('web.archive.org')) {
            console.warn(`⚠️ [Wayback Artifact] ${relPath}`);
            fileIssues++;
        }

        // Check for absolute domain links (which should be relative)
        if (content.includes(`://${DOMAIN}`) || content.includes(`://www.${DOMAIN}`)) {
            console.warn(`⚠️ [Absolute Link] ${relPath}`);
            fileIssues++;
        }

        if (fileIssues > 0) issues += fileIssues;
    } catch (e) {
        console.error(`Error reading ${file}: ${e.message}`);
    }
});

if (issues === 0) {
    console.log('✅ No obvious issues found!');
} else {
    console.log(`❌ Found ${issues} potential issues.`);
}
