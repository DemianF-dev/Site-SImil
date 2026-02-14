const fs = require('fs');
const https = require('https');
const path = require('path');

const DOMAIN = 'www.simil.com.br';
const WORK_DIR = path.join(__dirname, '..', '_work');

// Ensure work dir exists
if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR, { recursive: true });

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.error('Error parsing JSON from:', url, data.substring(0, 100));
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

function getOutputFilename() {
    return path.join(WORK_DIR, 'snapshots_cdx.json');
}

async function run() {
    console.log(`🔍 Checking snapshots for ${DOMAIN}...`);

    // 2. Query CDX for 200 OK snapshots (HTML)
    // fl=timestamp,original,statuscode,mimetype,length
    // We encode the filter parameters to avoid 400 Bad Request

    // Construct URL with proper encoding
    const baseUrl = 'https://web.archive.org/cdx/search/cdx';
    const params = [
        `url=${DOMAIN}/*`, // Match subdomains/paths
        'output=json',
        'fl=timestamp,original,statuscode,mimetype,length',
        'filter=statuscode:200',
        'filter=mimetype:text/html',
        'collapse=timestamp:6' // Group by month
    ];

    const cdxUrl = `${baseUrl}?${params.join('&')}`;

    console.log(`🔍 Querying CDX API: ${cdxUrl}`);

    try {
        const snapshots = await fetchJSON(cdxUrl);

        if (snapshots && snapshots.length > 0) {
            console.log(`✅ Found ${snapshots.length - 1} unique HTML snapshots (monthly collapsed).`);
            fs.writeFileSync(getOutputFilename(), JSON.stringify(snapshots, null, 2));

            if (snapshots.length > 1) {
                // snapshots[0] is header
                const lastSnapshot = snapshots[snapshots.length - 1];
                console.log('📅 Most recent snapshot:', lastSnapshot);
            }
        } else {
            console.log('⚠️ No snapshots found or API error.');
        }
    } catch (e) {
        console.error('❌ Error executing request:', e);
    }
}

run();
