export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rootUrl = 'https://github.com/login/oauth/authorize';
  const redirectUri = process.env.GITHUB_REDIRECT_URI || 'https://www.simil.com.br/api/auth/callback';
  
  const options = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state: req.query.state || Math.random().toString(36).substring(7),
  };

  const qs = new URLSearchParams(options).toString();
  res.redirect(`${rootUrl}?${qs}`);
}
