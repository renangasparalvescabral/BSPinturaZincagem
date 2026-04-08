/**
 * orcamento.js — BS Pinturas
 * Validação do formulário + envio via WhatsApp e e-mail
 */

document.addEventListener('DOMContentLoaded', () => {

  const form        = document.getElementById('form-orcamento');
  const btnWhatsApp = document.querySelector('[data-action="whatsapp"]');
  const formSuccess = document.getElementById('form-success');
  const formError   = document.getElementById('form-error');

  if (!form) return;

  // =============================================
  // MÁSCARA DE TELEFONE
  // =============================================

  const telefoneInput = document.getElementById('telefone');

  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length <= 10) {
        value = value
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        value = value
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2');
      }
      e.target.value = value;
    });
  }

  // =============================================
  // VALIDAÇÃO DE CAMPOS
  // =============================================

  const validators = {
    nome: {
      validate: (val) => val.trim().length >= 3,
      message: 'Por favor, informe seu nome completo.'
    },
    telefone: {
      validate: (val) => val.replace(/\D/g, '').length >= 10,
      message: 'Informe um telefone válido com DDD.'
    },
    email: {
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      message: 'Informe um e-mail válido.'
    },
    'tipo-servico': {
      validate: (val) => val !== '' && val !== null,
      message: 'Selecione o tipo de serviço desejado.'
    },
    quantidade: {
      validate: (val) => val.trim().length >= 1,
      message: 'Informe a quantidade aproximada.'
    },
    descricao: {
      validate: (val) => val.trim().length >= 10,
      message: 'Descreva as peças com pelo menos 10 caracteres.'
    }
  };

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`error-${fieldId}`);
    if (input)  input.classList.add('input-error');
    if (error)  error.textContent = message;
  }

  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`error-${fieldId}`);
    if (input)  input.classList.remove('input-error');
    if (error)  error.textContent = '';
  }

  function validateField(fieldId) {
    const validator = validators[fieldId];
    if (!validator) return true;

    const input = document.getElementById(fieldId);
    if (!input) return true;

    const value = input.value;
    if (!validator.validate(value)) {
      showError(fieldId, validator.message);
      return false;
    }
    clearError(fieldId);
    return true;
  }

  function validateAll() {
    let valid = true;
    Object.keys(validators).forEach(fieldId => {
      if (!validateField(fieldId)) valid = false;
    });
    return valid;
  }

  // Valida em tempo real ao sair do campo
  Object.keys(validators).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input) {
      input.addEventListener('blur', () => validateField(fieldId));
      input.addEventListener('input', () => {
        if (input.classList.contains('input-error')) validateField(fieldId);
      });
    }
  });

  // =============================================
  // COLETA DOS DADOS DO FORMULÁRIO
  // =============================================

  function getFormData() {
    return {
      nome:       document.getElementById('nome')?.value.trim()        || '',
      empresa:    document.getElementById('empresa')?.value.trim()     || '',
      telefone:   document.getElementById('telefone')?.value.trim()    || '',
      email:      document.getElementById('email')?.value.trim()       || '',
      servico:    document.getElementById('tipo-servico')?.value       || '',
      quantidade: document.getElementById('quantidade')?.value.trim()  || '',
      prazo:      document.getElementById('prazo')?.value              || '',
      descricao:  document.getElementById('descricao')?.value.trim()   || '',
      anexos:     document.querySelector('[name="anexos"]')?.checked   || false,
    };
  }

  function servicoLabel(value) {
    const map = {
      'jateamento':           'Jateamento',
      'pintura-eletrostatica':'Pintura Eletrostática',
      'pintura-liquida':      'Pintura Líquida Epóxi/PU',
      'revestimento-teflon':  'Revestimento em Teflon',
      'combinado':            'Combinação de serviços',
      'outro':                'Outro / Não sei',
    };
    return map[value] || value;
  }

  function prazoLabel(value) {
    const map = { 'normal': 'Normal', 'urgente': 'Urgente', 'flexivel': 'Flexível' };
    return map[value] || 'Não informado';
  }

  // =============================================
  // ENVIO VIA WHATSAPP
  // =============================================

  function buildWhatsAppMessage(data) {
    const lines = [
      '📋 *SOLICITAÇÃO DE ORÇAMENTO — BS PINTURAS*',
      '',
      `👤 *Nome:* ${data.nome}`,
      data.empresa ? `🏭 *Empresa:* ${data.empresa}` : null,
      `📱 *Telefone:* ${data.telefone}`,
      `📧 *E-mail:* ${data.email}`,
      '',
      `⚙️ *Serviço:* ${servicoLabel(data.servico)}`,
      `📦 *Quantidade:* ${data.quantidade}`,
      `⏱️ *Prazo:* ${prazoLabel(data.prazo)}`,
      '',
      `📝 *Descrição das peças:*`,
      data.descricao,
      '',
      data.anexos ? '📷 *Tem fotos para enviar:* Sim' : null,
    ].filter(line => line !== null).join('\n');

    return encodeURIComponent(lines);
  }

  function sendWhatsApp() {
    if (!validateAll()) {
      scrollToFirstError();
      return;
    }
    const data = getFormData();
    const message = buildWhatsAppMessage(data);
    const phone = '551921444096';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  // =============================================
  // ENVIO VIA E-MAIL (mailto fallback)
  // =============================================

  function sendEmail(data) {
    const subject = encodeURIComponent(`Orçamento BS Pinturas — ${data.nome}`);
    const body = encodeURIComponent([
      `Nome: ${data.nome}`,
      data.empresa ? `Empresa: ${data.empresa}` : '',
      `Telefone: ${data.telefone}`,
      `E-mail: ${data.email}`,
      '',
      `Serviço: ${servicoLabel(data.servico)}`,
      `Quantidade: ${data.quantidade}`,
      `Prazo: ${prazoLabel(data.prazo)}`,
      '',
      `Descrição das peças:`,
      data.descricao,
      '',
      data.anexos ? 'Tem fotos para anexar: Sim' : '',
    ].filter(Boolean).join('\n'));

    window.location.href = `mailto:adm@bspinturas.com.br?subject=${subject}&body=${body}`;
  }

  // =============================================
  // SCROLL PARA O PRIMEIRO ERRO
  // =============================================

  function scrollToFirstError() {
    const firstError = form.querySelector('.input-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
  }

  // =============================================
  // SUBMIT DO FORMULÁRIO
  // =============================================

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    formSuccess.hidden = true;
    formError.hidden   = true;

    if (!validateAll()) {
      scrollToFirstError();
      return;
    }

    const data = getFormData();

    // Tenta enviar pelo WhatsApp primeiro
    try {
      const message = buildWhatsAppMessage(data);
      const phone = '551921444096';
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

      // Também abre o mailto como backup
      setTimeout(() => sendEmail(data), 1000);

      // Mostra mensagem de sucesso
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();

    } catch (err) {
      formError.hidden = false;
      formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.error('Erro ao enviar formulário:', err);
    }
  });

  // =============================================
  // BOTÃO WHATSAPP DIRETO
  // =============================================

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', sendWhatsApp);
  }

  // =============================================
  // ESTILOS DE VALIDAÇÃO INJETADOS
  // =============================================

  const style = document.createElement('style');
  style.textContent = `
    .input-error {
      border-color: var(--color-secondary, #B22222) !important;
      box-shadow: 0 0 0 2px rgba(178, 34, 34, 0.2) !important;
    }
    .error-message {
      display: block;
      color: var(--color-secondary, #B22222);
      font-size: 0.8rem;
      margin-top: 0.25rem;
      font-family: 'IBM Plex Sans', sans-serif;
      min-height: 1.1rem;
    }
    .form-success {
      background: rgba(34, 178, 34, 0.1);
      border: 1px solid #22b222;
      border-radius: 6px;
      padding: 1rem 1.5rem;
      margin-top: 1rem;
      color: #22b222;
      font-family: 'IBM Plex Sans', sans-serif;
    }
    .form-error {
      background: rgba(178, 34, 34, 0.1);
      border: 1px solid var(--color-secondary, #B22222);
      border-radius: 6px;
      padding: 1rem 1.5rem;
      margin-top: 1rem;
      color: var(--color-secondary, #B22222);
      font-family: 'IBM Plex Sans', sans-serif;
    }
  `;
  document.head.appendChild(style);

});
