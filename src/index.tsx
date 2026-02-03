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
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .app-container { flex: 1; }
        .btn-mobile {
            width: 100%;
            padding: 1.5rem;
            font-size: 1.25rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        .btn-mobile:active {
            transform: scale(0.98);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
        }
        .form-input:focus {
            outline: none;
            border-color: var(--color-primary);
        }
        .logo-container {
            max-width: 200px;
            max-height: 200px;
            margin: 0 auto;
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
    </style>
</head>
<body>
    <div class="app-container">
        <!-- TELA INICIAL -->
        <div id="home-screen" class="p-6">
            <div class="logo-container mb-6">
                <img id="home-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%238B4513' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='%23FFD700' text-anchor='middle' dy='.3em'%3E💎%3C/text%3E%3C/svg%3E" alt="Logo">
            </div>
            <h1 id="home-title" class="text-3xl font-bold text-center mb-8">Semi Jóias</h1>
            
            <div class="space-y-4">
                <button onclick="showConsultoraForm()" class="btn-mobile text-white" style="background-color: var(--color-primary)">
                    <i class="fas fa-user-plus mr-2"></i> Consultoras
                </button>
                <button onclick="showRepresentanteForm()" class="btn-mobile text-white" style="background-color: var(--color-secondary)">
                    <i class="fas fa-id-card mr-2"></i> Representante
                </button>
                <button onclick="showExplicacoes()" class="btn-mobile text-white" style="background-color: var(--color-tertiary)">
                    <i class="fas fa-info-circle mr-2"></i> Explicações
                </button>
                <button onclick="showFotos()" class="btn-mobile bg-purple-600 text-white">
                    <i class="fas fa-images mr-2"></i> Fotos
                </button>
                <button onclick="showAdminLogin()" class="btn-mobile bg-gray-700 text-white">
                    <i class="fas fa-lock mr-2"></i> Área Administrativa
                </button>
            </div>
        </div>

        <!-- TELA DE LOGIN ADMIN -->
        <div id="admin-login" class="hidden p-6">
            <button onclick="showHome()" class="mb-4 text-blue-600">
                <i class="fas fa-arrow-left mr-2"></i> Voltar
            </button>
            <h2 class="text-2xl font-bold mb-6">Área Administrativa</h2>
            <div class="space-y-4">
                <input type="password" id="admin-password" placeholder="Digite a senha" class="form-input">
                <button onclick="login()" class="btn-mobile bg-green-600 text-white">
                    <i class="fas fa-sign-in-alt mr-2"></i> Entrar
                </button>
            </div>
        </div>

        <!-- PAINEL ADMIN -->
        <div id="admin-panel" class="hidden p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Painel Administrativo</h2>
                <button onclick="logout()" class="text-red-600">
                    <i class="fas fa-sign-out-alt mr-2"></i> Sair
                </button>
            </div>
            
            <div class="space-y-4">
                <button onclick="showConfigScreen()" class="btn-mobile bg-blue-600 text-white">
                    <i class="fas fa-cog mr-2"></i> Configurações
                </button>
                <button onclick="showConsultorasList()" class="btn-mobile bg-green-600 text-white">
                    <i class="fas fa-users mr-2"></i> Gerenciar Consultoras
                </button>
                <button onclick="showRepresentantesList()" class="btn-mobile bg-purple-600 text-white">
                    <i class="fas fa-id-badge mr-2"></i> Gerenciar Representantes
                </button>
                <button onclick="showFotosAdmin()" class="btn-mobile bg-orange-600 text-white">
                    <i class="fas fa-camera mr-2"></i> Gerenciar Fotos
                </button>
            </div>
        </div>

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
    <footer class="bg-gray-800 text-white p-4 mt-8">
        <div class="flex items-center justify-between">
            <div>
                <img id="footer-logo" src="" alt="" class="footer-logo hidden">
            </div>
            <div class="text-center flex-1">
                <p class="font-semibold">Vsual Consultoria em Marketing</p>
                <p class="text-sm">18 99667-6409</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app
