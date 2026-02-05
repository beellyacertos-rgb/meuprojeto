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

// Relatório por cidade
app.get('/api/consultoras/relatorio/cidade', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM consultoras ORDER BY cidade, nome_completo'
  ).all()
  return c.json(result.results)
})

// Buscar por nome
app.get('/api/consultoras/buscar/:nome', async (c) => {
  const nome = c.req.param('nome')
  const result = await c.env.DB.prepare(
    'SELECT * FROM consultoras WHERE nome_completo LIKE ? ORDER BY nome_completo'
  ).bind(`%${nome}%`).all()
  return c.json(result.results)
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

// Relatório por cidade
app.get('/api/representantes/relatorio/cidade', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM representantes ORDER BY cidade, nome_completo'
  ).all()
  return c.json(result.results)
})

// Buscar por nome
app.get('/api/representantes/buscar/:nome', async (c) => {
  const nome = c.req.param('nome')
  const result = await c.env.DB.prepare(
    'SELECT * FROM representantes WHERE nome_completo LIKE ? ORDER BY nome_completo'
  ).bind(`%${nome}%`).all()
  return c.json(result.results)
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
    <link href="/static/style.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
</head>
<body id="app-body">
    <!-- Bandeiras de Idioma -->
    <div class="language-flags">
        <button onclick="changeLanguage('pt')" class="flag-btn" title="Português">
            🇧🇷
        </button>
        <button onclick="changeLanguage('es')" class="flag-btn" title="Español">
            🇪🇸
        </button>
    </div>

    <div class="app-container">
        <!-- TELA INICIAL -->
        <div id="home-screen" class="p-6">
            <div class="logo-container mb-6">
                <img id="home-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%238B4513' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='60' fill='%23FFD700' text-anchor='middle' dy='.3em'%3E💎%3C/text%3E%3C/svg%3E" alt="Logo">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <button onclick="showConsultoraForm()" class="btn-grid">
                    <i class="fas fa-user-plus text-4xl mb-2"></i>
                    <i class="fas fa-gem text-2xl mb-2"></i>
                    <span data-i18n="consultoras"></span>
                </button>
                <button onclick="showRepresentanteForm()" class="btn-grid">
                    <i class="fas fa-id-card text-4xl mb-2"></i>
                    <i class="fas fa-briefcase text-2xl mb-2"></i>
                    <span data-i18n="representante"></span>
                </button>
                <button onclick="showExplicacoes()" class="btn-grid">
                    <i class="fas fa-info-circle text-4xl mb-2"></i>
                    <i class="fas fa-book text-2xl mb-2"></i>
                    <span data-i18n="explicacoes"></span>
                </button>
                <button onclick="showFotos()" class="btn-grid">
                    <i class="fas fa-images text-4xl mb-2"></i>
                    <i class="fas fa-camera text-2xl mb-2"></i>
                    <span data-i18n="fotos"></span>
                </button>
                <button onclick="showQuemSomos()" class="btn-grid">
                    <i class="fas fa-building text-4xl mb-2"></i>
                    <i class="fas fa-users text-2xl mb-2"></i>
                    <span data-i18n="quemSomos"></span>
                </button>
                <button onclick="showAdminLogin()" class="btn-grid">
                    <i class="fas fa-lock text-4xl mb-2"></i>
                    <i class="fas fa-cog text-2xl mb-2"></i>
                    <span data-i18n="areaAdmin"></span>
                </button>
            </div>
        </div>

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

        <!-- TELA QUEM SOMOS -->
        <div id="quem-somos-screen" class="hidden p-6"></div>
    </div>

    <!-- RODAPÉ -->
    <footer id="app-footer" class="p-4 mt-8">
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

    <!-- Modal de Confirmação -->
    <div id="confirm-modal" class="modal-overlay hidden">
        <div class="modal-content">
            <h3 class="text-xl font-bold mb-4" data-i18n="desejaSair"></h3>
            <div class="flex gap-4">
                <button onclick="confirmExit(true)" class="flex-1 btn-confirm-yes">
                    <span data-i18n="sim"></span>
                </button>
                <button onclick="confirmExit(false)" class="flex-1 btn-confirm-no">
                    <span data-i18n="nao"></span>
                </button>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/translations.js"></script>
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app
