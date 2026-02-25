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
  const { username, password } = await c.req.json()
  
  // Buscar usuário no banco
  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE username = ? AND password = ?'
  ).bind(username, password).first()
  
  if (user) {
    return c.json({ success: true, user: { id: user.id, username: user.username } })
  }
  return c.json({ success: false, message: 'Usuário ou senha incorretos' }, 401)
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
      aceita_mostruario, aceita_contrato, mes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.nome_completo || '', 
    data.endereco || '', 
    data.bairro || '', 
    data.cep || '', 
    data.cidade || '',
    data.cpf || '', 
    data.telefone || '', 
    data.nome_pai || '', 
    data.nome_mae || '', 
    data.telefone_referencia || '',
    data.nome_representante || '', 
    data.aceita_mostruario || 'nao', 
    data.aceita_contrato || 'nao', 
    data.mes || '01'
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
      nome_representante = ?, aceita_mostruario = ?, aceita_contrato = ?, mes = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    data.nome_completo, data.endereco, data.bairro, data.cep, data.cidade,
    data.cpf, data.telefone, data.nome_pai, data.nome_mae, data.telefone_referencia,
    data.nome_representante, data.aceita_mostruario, data.aceita_contrato, data.mes, id
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
    data.nome_completo || '', 
    data.endereco || '', 
    data.bairro || '', 
    data.cep || '', 
    data.cidade || '',
    data.cpf || '', 
    data.telefone || '', 
    data.veiculo || ''
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

// ================== USUÁRIOS ==================
app.get('/api/usuarios', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM users ORDER BY created_at DESC'
  ).all()
  return c.json(result.results)
})

app.get('/api/usuarios/:id', async (c) => {
  const id = c.req.param('id')
  const result = await c.env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(id).first()
  return c.json(result)
})

app.post('/api/usuarios', async (c) => {
  const data = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO users (username, password) VALUES (?, ?)
  `).bind(data.username, data.password).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.put('/api/usuarios/:id', async (c) => {
  const id = c.req.param('id')
  const data = await c.req.json()
  
  await c.env.DB.prepare(`
    UPDATE users SET
      username = ?, password = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(data.username, data.password, id).run()
  
  return c.json({ success: true })
})

app.delete('/api/usuarios/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// ================== ROTAS ALIAS PARA COMPATIBILIDADE ==================
// Alias /api/clientes -> /api/consultoras
app.get('/api/clientes', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM consultoras ORDER BY created_at DESC'
  ).all()
  return c.json({ total: result.results.length, clientes: result.results })
})

app.post('/api/clientes', async (c) => {
  const data = await c.req.json()
  const result = await c.env.DB.prepare(`
    INSERT INTO consultoras (
      nome_completo, endereco, bairro, cep, cidade, cpf, telefone,
      nome_pai, nome_mae, telefone_referencia, nome_representante,
      aceita_mostruario, aceita_contrato, mes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.nome_completo || '', 
    data.endereco || '', 
    data.bairro || '', 
    data.cep || '', 
    data.cidade || '',
    data.cpf || '', 
    data.telefone || '', 
    data.nome_pai || '', 
    data.nome_mae || '', 
    data.telefone_referencia || '',
    data.nome_representante || '', 
    data.aceita_mostruario || 'nao', 
    data.aceita_contrato || 'nao', 
    data.mes || '01'
  ).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Alias /api/galeria -> /api/fotos
app.get('/api/galeria', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM fotos ORDER BY created_at DESC'
  ).all()
  return c.json({ total: result.results.length, images: result.results })
})

app.post('/api/galeria', async (c) => {
  const { imagem_base64 } = await c.req.json()
  const result = await c.env.DB.prepare(
    'INSERT INTO fotos (imagem_base64) VALUES (?)'
  ).bind(imagem_base64).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.delete('/api/galeria/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM fotos WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// ================== EXPLICAÇÕES ==================
app.get('/api/explicacoes', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM explicacoes ORDER BY created_at DESC LIMIT 1'
  ).first()
  return c.json(result)
})

app.post('/api/explicacoes', async (c) => {
  const { texto } = await c.req.json()
  
  // Deletar todas as explicações existentes
  await c.env.DB.prepare('DELETE FROM explicacoes').run()
  
  // Inserir nova explicação
  const result = await c.env.DB.prepare(
    'INSERT INTO explicacoes (texto) VALUES (?)'
  ).bind(texto).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// ================== LOGOS ==================
app.get('/api/logo', async (c) => {
  const chave = c.req.query('chave')
  const result = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind(chave).first()
  return c.json(result)
})

app.post('/api/logo', async (c) => {
  const { chave, valor } = await c.req.json()
  
  // Verificar se já existe
  const existing = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind(chave).first()
  
  if (existing) {
    // Atualizar
    await c.env.DB.prepare(
      'UPDATE configuracoes SET valor = ?, updated_at = CURRENT_TIMESTAMP WHERE chave = ?'
    ).bind(valor, chave).run()
  } else {
    // Inserir
    await c.env.DB.prepare(
      'INSERT INTO configuracoes (chave, valor) VALUES (?, ?)'
    ).bind(chave, valor).run()
  }
  
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
</head>
<body>
    <div class="app-container">
        <div id="home-screen" class="p-6"></div>
        <div id="admin-login" class="hidden p-6"></div>
        <div id="admin-panel" class="hidden p-6"></div>
        <div id="config-screen" class="hidden p-6"></div>
        <div id="consultoras-list" class="hidden p-6"></div>
        <div id="consultora-form" class="hidden p-6"></div>
        <div id="representantes-list" class="hidden p-6"></div>
        <div id="representante-form" class="hidden p-6"></div>
        <div id="usuarios-list" class="hidden p-6"></div>
        <div id="usuario-form" class="hidden p-6"></div>
        <div id="explicacoes-screen" class="hidden p-6"></div>
        <div id="fotos-screen" class="hidden p-6"></div>
        <div id="fotos-admin" class="hidden p-6"></div>
        <div id="quem-somos-screen" class="hidden p-6"></div>
    </div>

    <footer>
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
    <script src="/static/app-part2.js"></script>
</body>
</html>
  `)
})

// ================== LINKS SOCIAIS E PIX ==================
// WhatsApp
app.get('/api/whatsapp', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind('whatsapp_link').first()
  return c.json(result)
})

app.post('/api/whatsapp', async (c) => {
  const { link } = await c.req.json()
  
  const existing = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind('whatsapp_link').first()
  
  if (existing) {
    await c.env.DB.prepare(
      'UPDATE configuracoes SET valor = ?, updated_at = CURRENT_TIMESTAMP WHERE chave = ?'
    ).bind(link, 'whatsapp_link').run()
  } else {
    await c.env.DB.prepare(
      'INSERT INTO configuracoes (chave, valor) VALUES (?, ?)'
    ).bind('whatsapp_link', link).run()
  }
  
  return c.json({ success: true })
})

// Instagram
app.get('/api/instagram', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind('instagram_link').first()
  return c.json(result)
})

app.post('/api/instagram', async (c) => {
  const { link } = await c.req.json()
  
  const existing = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind('instagram_link').first()
  
  if (existing) {
    await c.env.DB.prepare(
      'UPDATE configuracoes SET valor = ?, updated_at = CURRENT_TIMESTAMP WHERE chave = ?'
    ).bind(link, 'instagram_link').run()
  } else {
    await c.env.DB.prepare(
      'INSERT INTO configuracoes (chave, valor) VALUES (?, ?)'
    ).bind('instagram_link', link).run()
  }
  
  return c.json({ success: true })
})

// Pix - Chave e QR Code
app.get('/api/pix', async (c) => {
  const chavePix = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind('pix_chave').first()
  
  const qrcode = await c.env.DB.prepare(
    'SELECT * FROM configuracoes WHERE chave = ?'
  ).bind('pix_qrcode').first()
  
  return c.json({ 
    chave: chavePix?.valor || '', 
    qrcode: qrcode?.valor || '' 
  })
})

app.post('/api/pix', async (c) => {
  const { chave, qrcode } = await c.req.json()
  
  // Salvar chave PIX
  if (chave !== undefined) {
    const existingChave = await c.env.DB.prepare(
      'SELECT * FROM configuracoes WHERE chave = ?'
    ).bind('pix_chave').first()
    
    if (existingChave) {
      await c.env.DB.prepare(
        'UPDATE configuracoes SET valor = ?, updated_at = CURRENT_TIMESTAMP WHERE chave = ?'
      ).bind(chave, 'pix_chave').run()
    } else {
      await c.env.DB.prepare(
        'INSERT INTO configuracoes (chave, valor) VALUES (?, ?)'
      ).bind('pix_chave', chave).run()
    }
  }
  
  // Salvar QR Code PIX
  if (qrcode !== undefined) {
    const existingQR = await c.env.DB.prepare(
      'SELECT * FROM configuracoes WHERE chave = ?'
    ).bind('pix_qrcode').first()
    
    if (existingQR) {
      await c.env.DB.prepare(
        'UPDATE configuracoes SET valor = ?, updated_at = CURRENT_TIMESTAMP WHERE chave = ?'
      ).bind(qrcode, 'pix_qrcode').run()
    } else {
      await c.env.DB.prepare(
        'INSERT INTO configuracoes (chave, valor) VALUES (?, ?)'
      ).bind('pix_qrcode', qrcode).run()
    }
  }
  
  return c.json({ success: true })
})

// ================== ROTAS SPA ==================
app.get('/admin', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin - Semi Jóias App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <div id="home-screen" class="hidden p-6"></div>
        <div id="admin-login" class="hidden p-6"></div>
        <div id="admin-panel" class="p-6"></div>
        <div id="config-screen" class="hidden p-6"></div>
        <div id="consultoras-list" class="hidden p-6"></div>
        <div id="consultora-form" class="hidden p-6"></div>
        <div id="representantes-list" class="hidden p-6"></div>
        <div id="representante-form" class="hidden p-6"></div>
        <div id="usuarios-list" class="hidden p-6"></div>
        <div id="usuario-form" class="hidden p-6"></div>
        <div id="explicacoes-screen" class="hidden p-6"></div>
        <div id="fotos-screen" class="hidden p-6"></div>
        <div id="fotos-admin" class="hidden p-6"></div>
        <div id="quem-somos-screen" class="hidden p-6"></div>
    </div>

    <footer>
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
    <script src="/static/app-part2.js"></script>
    <script>
      // Inicializar painel admin
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof mostrarAdminPanel === 'function') {
          mostrarAdminPanel();
        }
      });
    </script>
</body>
</html>
  `)
})

app.get('/consultoras', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Consultoras - Semi Jóias App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <div id="home-screen" class="hidden p-6"></div>
        <div id="admin-login" class="hidden p-6"></div>
        <div id="admin-panel" class="hidden p-6"></div>
        <div id="config-screen" class="hidden p-6"></div>
        <div id="consultoras-list" class="p-6"></div>
        <div id="consultora-form" class="hidden p-6"></div>
        <div id="representantes-list" class="hidden p-6"></div>
        <div id="representante-form" class="hidden p-6"></div>
        <div id="usuarios-list" class="hidden p-6"></div>
        <div id="usuario-form" class="hidden p-6"></div>
        <div id="explicacoes-screen" class="hidden p-6"></div>
        <div id="fotos-screen" class="hidden p-6"></div>
        <div id="fotos-admin" class="hidden p-6"></div>
        <div id="quem-somos-screen" class="hidden p-6"></div>
    </div>

    <footer>
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
    <script src="/static/app-part2.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof listarConsultoras === 'function') {
          listarConsultoras();
        }
      });
    </script>
</body>
</html>
  `)
})

app.get('/representantes', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Representantes - Semi Jóias App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <div id="home-screen" class="hidden p-6"></div>
        <div id="admin-login" class="hidden p-6"></div>
        <div id="admin-panel" class="hidden p-6"></div>
        <div id="config-screen" class="hidden p-6"></div>
        <div id="consultoras-list" class="hidden p-6"></div>
        <div id="consultora-form" class="hidden p-6"></div>
        <div id="representantes-list" class="p-6"></div>
        <div id="representante-form" class="hidden p-6"></div>
        <div id="usuarios-list" class="hidden p-6"></div>
        <div id="usuario-form" class="hidden p-6"></div>
        <div id="explicacoes-screen" class="hidden p-6"></div>
        <div id="fotos-screen" class="hidden p-6"></div>
        <div id="fotos-admin" class="hidden p-6"></div>
        <div id="quem-somos-screen" class="hidden p-6"></div>
    </div>

    <footer>
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
    <script src="/static/app-part2.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof listarRepresentantes === 'function') {
          listarRepresentantes();
        }
      });
    </script>
</body>
</html>
  `)
})

app.get('/galeria', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Galeria - Semi Jóias App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <div id="home-screen" class="hidden p-6"></div>
        <div id="admin-login" class="hidden p-6"></div>
        <div id="admin-panel" class="hidden p-6"></div>
        <div id="config-screen" class="hidden p-6"></div>
        <div id="consultoras-list" class="hidden p-6"></div>
        <div id="consultora-form" class="hidden p-6"></div>
        <div id="representantes-list" class="hidden p-6"></div>
        <div id="representante-form" class="hidden p-6"></div>
        <div id="usuarios-list" class="hidden p-6"></div>
        <div id="usuario-form" class="hidden p-6"></div>
        <div id="explicacoes-screen" class="hidden p-6"></div>
        <div id="fotos-screen" class="p-6"></div>
        <div id="fotos-admin" class="hidden p-6"></div>
        <div id="quem-somos-screen" class="hidden p-6"></div>
    </div>

    <footer>
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
    <script src="/static/app-part2.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof mostrarFotos === 'function') {
          mostrarFotos();
        }
      });
    </script>
</body>
</html>
  `)
})

app.get('/explicacoes', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Explicações - Semi Jóias App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <div id="home-screen" class="hidden p-6"></div>
        <div id="admin-login" class="hidden p-6"></div>
        <div id="admin-panel" class="hidden p-6"></div>
        <div id="config-screen" class="hidden p-6"></div>
        <div id="consultoras-list" class="hidden p-6"></div>
        <div id="consultora-form" class="hidden p-6"></div>
        <div id="representantes-list" class="hidden p-6"></div>
        <div id="representante-form" class="hidden p-6"></div>
        <div id="usuarios-list" class="hidden p-6"></div>
        <div id="usuario-form" class="hidden p-6"></div>
        <div id="explicacoes-screen" class="p-6"></div>
        <div id="fotos-screen" class="hidden p-6"></div>
        <div id="fotos-admin" class="hidden p-6"></div>
        <div id="quem-somos-screen" class="hidden p-6"></div>
    </div>

    <footer>
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
    <script src="/static/app-part2.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof mostrarExplicacoes === 'function') {
          mostrarExplicacoes();
        }
      });
    </script>
</body>
</html>
  `)
})

// ================== USUÁRIOS ==================
app.get('/api/users', async (c) => {
  const result = await c.env.DB.prepare(
    'SELECT id, username, password, created_at FROM users ORDER BY username'
  ).all()
  return c.json(result.results)
})

app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id')
  const result = await c.env.DB.prepare(
    'SELECT id, username, password FROM users WHERE id = ?'
  ).bind(id).first()
  return c.json(result)
})

app.post('/api/users', async (c) => {
  const data = await c.req.json()
  
  // Verificar se username já existe
  const existing = await c.env.DB.prepare(
    'SELECT id FROM users WHERE username = ?'
  ).bind(data.username).first()
  
  if (existing) {
    return c.json({ success: false, message: 'Usuário já existe' }, 400)
  }
  
  const result = await c.env.DB.prepare(
    'INSERT INTO users (username, password) VALUES (?, ?)'
  ).bind(data.username, data.password).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.put('/api/users/:id', async (c) => {
  const id = c.req.param('id')
  const data = await c.req.json()
  
  await c.env.DB.prepare(
    'UPDATE users SET username = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(data.username, data.password, id).run()
  
  return c.json({ success: true })
})

app.delete('/api/users/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// Login com usuários da tabela
app.post('/api/user-login', async (c) => {
  const { username, password } = await c.req.json()
  const user = await c.env.DB.prepare(
    'SELECT id, username FROM users WHERE username = ? AND password = ?'
  ).bind(username, password).first()
  
  if (user) {
    return c.json({ success: true, user })
  }
  return c.json({ success: false, message: 'Usuário ou senha incorretos' }, 401)
})

export default app
