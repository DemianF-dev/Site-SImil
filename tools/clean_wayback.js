const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', '_work', 'raw');
const OUT_DIR = path.join(__dirname, '..', 'simil-recovered');

const DOMAIN = 'simil.com.br';

function cleanHead(html) {
    // 1. Remove EVERYTHING between <head> and the first bitrix-related or meta tag if it looks like wayback injection
    // Specifically targeting the bunch of scripts at the start of <head>

    // Remove the archive.org comments
    html = html.replace(/<!--\s*FILE ARCHIVED ON[\s\S]*?-->/g, '');

    // Remove the wayback toolbar block
    html = html.replace(/<!-- BEGIN WAYBACK TOOLBAR INSERT -->[\s\S]*?<!-- END WAYBACK TOOLBAR INSERT -->/g, '');

    // Remove the "End Wayback Rewrite JS Include" block (and everything before it in head)
    html = html.replace(/<head>[\s\S]*?<!-- End Wayback Rewrite JS Include -->/g, '<head>');

    // Remove any leftover __wm init scripts
    html = html.replace(/<script[^>]*>[\s\S]*?__wm\.init[\s\S]*?<\/script>/g, '');

    // Remove archive scripts and links
    html = html.replace(/<script[^>]*src=["']https?:\/\/web\.archive\.org\/.*?>[\s\S]*?<\/script>/g, '');
    html = html.replace(/<link[^>]*href=["']https?:\/\/web\.archive\.org\/.*?>/g, '');
    html = html.replace(/<link[^>]*href=["']https?:\/\/web-static\.archive\.org\/.*?>/g, '');

    return html;
}

function processFile(srcPath, destPath) {
    const ext = path.extname(srcPath).toLowerCase();
    const isText = ['.html', '.css', '.js', '.json', '.xml', '.txt'].includes(ext);

    if (isText) {
        let content = fs.readFileSync(srcPath, 'utf8');

        if (ext === '.html') {
            content = cleanHead(content);
        }

        // Normalize URLs
        content = content.replace(/https?:\/\/web\.archive\.org\/+(https?:\/\/)/g, '$1');
        content = content.replace(/\/web\/\d+([a-z_]+)?\//g, '/');
        content = content.replace(new RegExp(`https?:\/\/(www\.)?${DOMAIN}`, 'g'), '');
        content = content.replace(/([^:])\/\/+/g, '$1/');

        fs.writeFileSync(destPath, content);
    } else {
        fs.copyFileSync(srcPath, destPath);
    }
}

function walkAndProcess(currentDir, relativePath = '') {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
        const srcPath = path.join(currentDir, item);
        const stats = fs.statSync(srcPath);
        if (stats.isDirectory()) {
            if (item.startsWith('#') || item === 'archive.org') continue;
            if (relativePath === '' && item === DOMAIN) {
                walkAndProcess(srcPath, '');
            } else {
                walkAndProcess(srcPath, path.join(relativePath, item));
            }
        } else {
            const destPath = path.join(OUT_DIR, relativePath, item);
            const destDir = path.dirname(destPath);
            if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
            processFile(srcPath, destPath);
        }
    }
}

console.log('🚀 Final Cleanup Pass (Aggressive)...');
walkAndProcess(RAW_DIR);
console.log('✅ Done.');
