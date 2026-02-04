import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// ================== AUTENTICAÇÃO ==================
app.post('/api/login', async (c) => {
  const { password } = await c.req.json()
  const result = await c.env.DB.prepare(
    'SELECT value FROM config WHERE key = ?'
  ).bind('admin_password').first()
  
  if (result && result.value === password) {
    return c.json({ success: true })
  }
  return c.json({ success: false, message: 'Senha incorreta' }, 401)
})

// ================== CONFIGURAÇÕES ==================
app.get('/api/config', async (c) => {
  const configs = await c.env.DB.prepare('SELECT * FROM config').all()
  const configObj: any = {}
  configs.results.forEach((row: any) => {
    configObj[row.key] = row.value
  })
  return c.json(configObj)
})

app.put('/api/config/:key', async (c) => {
  const key = c.req.param('key')
  const { value } = await c.req.json()
  
  await c.env.DB.prepare(
    'UPDATE config SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?'
  ).bind(value, key).run()
  
  return c.json({ success: true })
})

// ================== CONSULTORAS ==================
app.get('/api/consultoras', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM consultoras ORDER BY created_at DESC'
  ).all()
  return c.json(result.results)
})

app.get('/api/consultoras/:id', async (c) => {
  const id = c.req.param('id')
  const result = await c.env.DB.prepare(
    'SELECT * FROM consultoras WHERE id = ?'
  ).bind(id).first()
  return c.json(result)
})

app.post('/api/consultoras', async (c) => {
  const data = await c.req.json()
  const result = await c.env.DB.prepare(`
    INSERT INTO consultoras (
      nome_completo, endereco, bairro, cep, cidade, cpf, telefone,
      nome_pai, nome_mae, telefone_referencia, nome_representante,
      aceita_mostruario, aceita_contrato
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.nome_completo, data.endereco, data.bairro, data.cep, data.cidade,
    data.cpf, data.telefone, data.nome_pai, data.nome_mae, data.telefone_referencia,
    data.nome_representante, data.aceita_mostruario, data.aceita_contrato
  ).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.put('/api/consultoras/:id', async (c) => {
  const id = c.req.param('id')
  const data = await c.req.json()
  
  await c.env.DB.prepare(`
    UPDATE consultoras SET
      nome_completo = ?, endereco = ?, bairro = ?, cep = ?, cidade = ?,
      cpf = ?, telefone = ?, nome_pai = ?, nome_mae = ?, telefone_referencia = ?,
      nome_representante = ?, aceita_mostruario = ?, aceita_contrato = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    data.nome_completo, data.endereco, data.bairro, data.cep, data.cidade,
    data.cpf, data.telefone, data.nome_pai, data.nome_mae, data.telefone_referencia,
    data.nome_representante, data.aceita_mostruario, data.aceita_contrato, id
  ).run()
  
  return c.json({ success: true })
})

app.delete('/api/consultoras/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM consultoras WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// ================== REPRESENTANTES ==================
app.get('/api/representantes', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM representantes ORDER BY created_at DESC'
  ).all()
  return c.json(result.results)
})

app.get('/api/representantes/:id', async (c) => {
  const id = c.req.param('id')
  const result = await c.env.DB.prepare(
    'SELECT * FROM representantes WHERE id = ?'
  ).bind(id).first()
  return c.json(result)
})

app.post('/api/representantes', async (c) => {
  const data = await c.req.json()
  const result = await c.env.DB.prepare(`
    INSERT INTO representantes (
      nome_completo, endereco, bairro, cep, cidade, cpf, telefone, veiculo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.nome_completo, data.endereco, data.bairro, data.cep, data.cidade,
    data.cpf, data.telefone, data.veiculo
  ).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.put('/api/representantes/:id', async (c) => {
  const id = c.req.param('id')
  const data = await c.req.json()
  
  await c.env.DB.prepare(`
    UPDATE representantes SET
      nome_completo = ?, endereco = ?, bairro = ?, cep = ?, cidade = ?,
      cpf = ?, telefone = ?, veiculo = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    data.nome_completo, data.endereco, data.bairro, data.cep, data.cidade,
    data.cpf, data.telefone, data.veiculo, id
  ).run()
  
  return c.json({ success: true })
})

app.delete('/api/representantes/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM representantes WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// ================== FOTOS ==================
app.get('/api/fotos', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM fotos ORDER BY created_at DESC'
  ).all()
  return c.json(result.results)
})

app.post('/api/fotos', async (c) => {
  const { imagem_base64 } = await c.req.json()
  const result = await c.env.DB.prepare(
    'INSERT INTO fotos (imagem_base64) VALUES (?)'
  ).bind(imagem_base64).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.delete('/api/fotos/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM fotos WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// ================== PÁGINA PRINCIPAL ==================
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Semi Jóias App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --color-primary: #8B4513;
            --color-secondary: #DAA520;
            --color-tertiary: #FFD700;
        }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: var(--color-primary);
        }
        .app-container { flex: 1; }
        
        /* Bandeiras de idioma */
        .language-switcher {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        }
        .flag-btn {
            width: 40px;
            height: 30px;
            cursor: pointer;
            border: 2px solid transparent;
            border-radius: 4px;
            transition: all 0.3s;
            background-size: cover;
            background-position: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .flag-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        }
        .flag-btn.active-flag {
            border-color: #FFD700;
            box-shadow: 0 0 10px rgba(255,215,0,0.8);
        }
        .flag-br {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTQwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzAwOTczOSIvPjxwYXRoIGZpbGw9IiNGRkRGMDAiIGQ9Ik0xMCAzMGwxODAgNDBMMTAgMTEweiIvPjxwYXRoIGZpbGw9IiNGRkRGMDAiIGQ9Ik0xOTAgMzBMMTAgNzBsMTgwIDQweiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSIyNSIgZmlsbD0iIzAwMkY4NyIvPjwvc3ZnPg==');
        }
        .flag-py {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTIwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRDAyODJEIi8+PHJlY3QgeT0iNDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkYiLz48cmVjdCB5PSI4MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzAxMTNCMCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjE1IiBmaWxsPSIjRkZEODAwIi8+PC9zdmc+');
        }
        
        /* Botões mobile */
        .btn-mobile {
            width: 100%;
            padding: 1.5rem;
            font-size: 1.25rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-weight: 600;
            text-align: center;
        }
        .btn-mobile:active {
            transform: scale(0.98);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .btn-mobile-home {
            width: 100%;
            padding: 2rem 1.5rem;
            font-size: 1.25rem;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-weight: 600;
            text-align: center;
            background-color: white;
            color: var(--color-primary);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 140px;
        }
        .btn-mobile-home:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        }
        .btn-mobile-admin {
            width: 100%;
            padding: 2rem 1.5rem;
            font-size: 1.25rem;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
            transition: all 0.3s;
            border: 3px solid #FFD700;
            cursor: pointer;
            font-weight: 700;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 120px;
        }
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            background: white;
        }
        .form-input:focus {
            outline: none;
            border-color: var(--color-tertiary);
        }
        .logo-container {
            max-width: 200px;
            max-height: 200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .logo-container img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
        .footer-logo {
            width: 60px;
            height: 40px;
            object-fit: cover;
            border-radius: 4px;
        }
        textarea {
            resize: vertical;
            min-height: 100px;
        }
        .table-container {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
        table {
            min-width: 100%;
            font-size: 0.9rem;
        }
        .hidden { display: none !important; }
        .color-picker-container {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .color-preview {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
        }
        .foto-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
        }
        .foto-item {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            background: white;
        }
        .foto-item img {
            width: 100%;
            height: 225px;
            object-fit: cover;
        }
        .foto-item button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .btn-mobile {
                font-size: 1.1rem;
                padding: 1.25rem;
            }
            .form-input {
                font-size: 16px;
            }
            h1 {
                font-size: 2rem;
            }
            h2 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Seletor de Idioma -->
    <div class="language-switcher">
        <div class="flag-btn flag-br active-flag" data-lang="pt-BR" onclick="setLanguage('pt-BR')" title="Português (Brasil)"></div>
        <div class="flag-btn flag-py" data-lang="es" onclick="setLanguage('es')" title="Español (Paraguay)"></div>
    </div>

    <div class="app-container">
        <!-- TELA INICIAL -->
        <div id="home-screen" class="p-6"></div>

        <!-- TELA DE LOGIN ADMIN -->
        <div id="admin-login" class="hidden p-6"></div>

        <!-- PAINEL ADMIN -->
        <div id="admin-panel" class="hidden p-6"></div>

        <!-- TELA DE CONFIGURAÇÕES -->
        <div id="config-screen" class="hidden p-6"></div>

        <!-- TELA LISTA CONSULTORAS -->
        <div id="consultoras-list" class="hidden p-6"></div>

        <!-- TELA FORM CONSULTORA -->
        <div id="consultora-form" class="hidden p-6"></div>

        <!-- TELA LISTA REPRESENTANTES -->
        <div id="representantes-list" class="hidden p-6"></div>

        <!-- TELA FORM REPRESENTANTE -->
        <div id="representante-form" class="hidden p-6"></div>

        <!-- TELA EXPLICAÇÕES -->
        <div id="explicacoes-screen" class="hidden p-6"></div>

        <!-- TELA FOTOS -->
        <div id="fotos-screen" class="hidden p-6"></div>

        <!-- TELA ADMIN FOTOS -->
        <div id="fotos-admin" class="hidden p-6"></div>
    </div>

    <!-- RODAPÉ -->
    <footer class="p-4 mt-8" style="background-color: var(--color-secondary)">
        <div class="flex items-center justify-between">
            <div>
                <img id="footer-logo" src="" alt="" class="footer-logo hidden">
            </div>
            <div class="text-center flex-1">
                <p class="font-semibold text-white">Vsual Consultoria em Marketing</p>
                <p class="text-sm text-white">18 99667-6409</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="/static/app.js"></script>
    <script src="/static/app-extras.js"></script>
    <script src="/static/app-pdf.js"></script>
</body>
</html>
  `)
})

export default app
