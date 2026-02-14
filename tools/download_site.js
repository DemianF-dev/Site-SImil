const fs = require('fs');
const https = require('https');
const path = require('path');
const url = require('url');

// --- CONFIG ---
const DOMAIN = 'www.simil.com.br';
const TIMESTAMP = '20250614041023'; // Chosen based on "closest" availability
const BASE_WB_URL = `https://web.archive.org/web/${TIMESTAMP}/`;
const ORIGIN_URL = `https://${DOMAIN}`;
const ENTRY_POINT = `${BASE_WB_URL}${ORIGIN_URL}/`;

const WORK_DIR = path.join(__dirname, '..', '_work');
const RAW_DIR = path.join(WORK_DIR, 'raw');

// Ensure directories
if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

// State
const visited = new Set();
const queue = [ENTRY_POINT];
const ASSET_EXTENSIONS = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf'];

// Helper: Fetch URL content
function fetchContent(targetUrl, isBinary = false) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': isBinary ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        };

        https.get(targetUrl, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Follow redirect (simple handling)
                let redirectUrl = res.headers.location;
                if (redirectUrl.startsWith('/')) {
                    redirectUrl = 'https://web.archive.org' + redirectUrl;
                }
                console.log(`↪️ Redirecting to: ${redirectUrl}`);
                resolve({ content: null, redirect: redirectUrl });
                return;
            }

            if (res.statusCode !== 200) {
                console.warn(`⚠️ Failed ${targetUrl} - Status: ${res.statusCode}`);
                res.resume(); // Consume body
                resolve(null);
                return;
            }

            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve({ content: isBinary ? buffer : buffer.toString(), redirect: null });
            });
        }).on('error', (err) => {
            console.error(`❌ Error fetching ${targetUrl}:`, err.message);
            resolve(null);
        });
    });
}

// Helper: Convert Wayback URL to Local Path
function getLocalPath(wbUrl) {
    // Remove the Wayback prefix
    let cleanUrl = wbUrl.replace(new RegExp(`^https?://web\.archive\.org/web/\\d+([a-z_]+)?/`), '');

    // Remove protocol from the remaining part if present (http://simil.com.br/...)
    cleanUrl = cleanUrl.replace(/^https?:\/\//, '');

    // Remove domain if present at start
    if (cleanUrl.startsWith(DOMAIN)) {
        cleanUrl = cleanUrl.substring(DOMAIN.length);
    }

    // Handle root /
    if (cleanUrl === '' || cleanUrl === '/') return 'index.html';

    // If no extension and not ending in /, assume it's a page -> add .html? 
    // Or if it ends in /, add index.html
    if (cleanUrl.endsWith('/')) return path.join(cleanUrl, 'index.html');

    // If it looks like a file (has extension), keep it. 
    // If it looks like a path without extension, treat as directory -> index.html?
    // Let's rely on checking extension.
    if (!path.extname(cleanUrl)) {
        return path.join(cleanUrl, 'index.html');
    }

    // Sanitize path to prevent ENOENT on weird chars
    cleanUrl = cleanUrl.split('?')[0]; // Remove query params from filename

    return cleanUrl;
}

// Helper: Extract valid links from HTML 
function extractLinks(html, currentUrl) {
    const linkRegex = /(?:href|src)=["']([^"']+)["']/g;
    const links = [];
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
        let rawLink = match[1];

        // Filter out obviously non-crawlable things
        if (rawLink.startsWith('#') || rawLink.startsWith('mailto:') || rawLink.startsWith('javascript:')) continue;

        // Handle Wayback absolute links
        if (rawLink.startsWith('/web/') || rawLink.includes('web.archive.org/web/')) {
            // Ensure full URL
            if (rawLink.startsWith('/')) rawLink = 'https://web.archive.org' + rawLink;
            links.push(rawLink);
        } else {
            // Relative Link Handling
            if (rawLink.startsWith('/')) {
                // Root relative (e.g. /css/style.css) -> Append to BASE_WB_URL + Original Domain
                links.push(`https://web.archive.org/web/${TIMESTAMP}/https://${DOMAIN}${rawLink}`);
            } else if (!rawLink.startsWith('http') && !rawLink.startsWith('//') && !rawLink.includes(':')) {
                // Relative to current directory (e.g. style.css or ../style.css)
                // Get current "directory" from the Wayback URL context
                let currentBase = currentUrl.split('?')[0];
                if (!currentBase.endsWith('/')) {
                    currentBase = currentBase.substring(0, currentBase.lastIndexOf('/') + 1);
                }
                // Simple concatenation (Node's URL module would be better but keeping it dependency-free-ish)
                // Actually let's use URL module for safety if possible, but manual is fine for this scope
                links.push(currentBase + rawLink);
            }
        }
    }
    return links;
}

function shouldCrawl(url) {
    // Only crawl links that belong to our target domain's archival history
    return url.includes(`/${DOMAIN}`) || url.includes(`/${DOMAIN.replace('www.', '')}`);
}

async function processQueue() {
    let count = 0;
    while (queue.length > 0) {
        const currentUrl = queue.shift();

        if (visited.has(currentUrl)) continue;
        visited.add(currentUrl);

        console.log(`🕷️ [${++count}] Crawling: ${currentUrl}`);

        const isAsset = ASSET_EXTENSIONS.some(ext => currentUrl.split('?')[0].endsWith(ext));
        const result = await fetchContent(currentUrl, isAsset);

        if (!result) continue;

        // Handle redirect
        if (result.redirect) {
            if (!visited.has(result.redirect)) queue.push(result.redirect);
            continue;
        }

        // Save File
        const localRelPath = getLocalPath(currentUrl);

        // Safety check for empty path
        if (!localRelPath || localRelPath.trim() === '') continue;

        const fullSavePath = path.join(RAW_DIR, localRelPath);
        const saveDir = path.dirname(fullSavePath);

        try {
            if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

            if (isAsset) {
                fs.writeFileSync(fullSavePath, result.content);
                console.log(`   💾 Saved asset: ${localRelPath}`);
            } else {
                // It's likely HTML
                const htmlContent = result.content.toString();
                fs.writeFileSync(fullSavePath, htmlContent);
                console.log(`   💾 Saved page: ${localRelPath}`);

                // Extract more links
                const newLinks = extractLinks(htmlContent, currentUrl);
                for (const link of newLinks) {
                    if (!visited.has(link) && shouldCrawl(link)) {
                        queue.push(link);
                    }
                }
            }
        } catch (e) {
            console.error(`   ❌ Write Error (${localRelPath}):`, e.message);
        }

        // Courtesy delay
        await new Promise(r => setTimeout(r, 100));
    }
    console.log('✅ Crawl finished.');
}

processQueue();
