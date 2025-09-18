require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

async function updateHtmlFile(url) {
    const cleanUrl = url.replace(/:443$/, '').replace(/^http:/, 'https:');

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0;url=${cleanUrl}">
    <title>Redirecting to Tailscale URL</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Redirecionando...</h1>
        <p>Você será redirecionado para: <br><strong>${cleanUrl}</strong></p>
    </div>
</body>
</html>`;

    await fs.writeFile(path.join(__dirname, 'docs/index.html'), html);
}

async function main() {
    try {
        const tailscaleUrl = process.env.TAILSCALE_URL; // Ex: http://meuapp.tailnet-xyz.ts.net:8000
        if (!tailscaleUrl) {
            throw new Error('Defina a variável TAILSCALE_URL no .env');
        }
        await updateHtmlFile(tailscaleUrl);
        console.log('HTML atualizado com sucesso!');
    } catch (error) {
        console.error('Erro:', error.message);
        process.exit(1);
    }
}

main();
