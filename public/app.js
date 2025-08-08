document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tabs');
  M.Tabs.init(tabs);

  const loginForm = document.getElementById('loginForm');
  const loginResult = document.getElementById('loginResult');

  const resetForm = document.getElementById('resetForm');
  const resetResult = document.getElementById('resetResult');

  const apiBase = '';

  const handleError = async (response) => {
    try {
      const data = await response.json();
      return data && data.message ? data.message : `Erro ${response.status}`;
    } catch (_) {
      return `Erro ${response.status}`;
    }
  };

  const renderMessage = (container, message, isSuccess) => {
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = `card ${isSuccess ? 'teal lighten-5' : 'red lighten-5'}`;
    const content = document.createElement('div');
    content.className = 'card-content';
    const span = document.createElement('span');
    span.className = 'card-title';
    span.textContent = isSuccess ? 'Sucesso' : 'Atenção';
    const p = document.createElement('p');
    p.textContent = message;
    content.appendChild(span);
    content.appendChild(p);
    card.appendChild(content);
    container.appendChild(card);
  };

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    renderMessage(loginResult, 'Processando...', true);
    const formData = new FormData(loginForm);
    const payload = {
      usuario: formData.get('usuario'),
      senha: formData.get('senha'),
    };

    try {
      const resp = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const msg = await handleError(resp);
        renderMessage(loginResult, msg, false);
        return;
      }

      const data = await resp.json();
      renderMessage(loginResult, data.message || 'Login realizado', true);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      renderMessage(loginResult, 'Falha na conexão com o servidor', false);
    }
  });

  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    renderMessage(resetResult, 'Processando...', true);
    const formData = new FormData(resetForm);
    const payload = {
      usuario: formData.get('usuario'),
      novaSenha: formData.get('novaSenha'),
    };

    try {
      const resp = await fetch(`${apiBase}/resetar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const msg = await handleError(resp);
        renderMessage(resetResult, msg, false);
        return;
      }

      const data = await resp.json();
      renderMessage(resetResult, data.message || 'Senha resetada', true);
      // opcional: apagar token ao resetar senha
      localStorage.removeItem('token');
    } catch (err) {
      renderMessage(resetResult, 'Falha na conexão com o servidor', false);
    }
  });
});

