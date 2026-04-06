// ==================== MENU INTERATIVO COM JAVASCRIPT ====================

// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const menuLinks = document.querySelectorAll('.menu-link');
const activeItemSpan = document.getElementById('activeItem');
const contentTitle = document.getElementById('contentTitle');
const contentText = document.getElementById('contentText');
const clickCountSpan = document.getElementById('clickCount');
const hoverCountSpan = document.getElementById('hoverCount');
const menuList = document.getElementById('menuList');
const animatedText = document.getElementById('animatedText');

// ==================== DADOS DO CONTEÚDO ====================
const pageContent = {
    home: {
        title: '🏠 Página Inicial',
        text: 'Bem-vindo à página inicial! Aqui você encontra as últimas novidades e atualizações do nosso site.',
        icon: 'fa-home'
    },
    about: {
        title: '📖 Sobre Nós',
        text: 'Somos uma empresa dedicada a criar soluções inovadoras com tecnologia de ponta. Nossa missão é transformar ideias em realidade.',
        icon: 'fa-info-circle'
    },
    services: {
        title: '⚙️ Nossos Serviços',
        text: 'Oferecemos desenvolvimento web, design responsivo, consultoria em TI e muito mais. Tudo para atender sua necessidade!',
        icon: 'fa-cogs'
    },
    contact: {
        title: '📞 Contato',
        text: 'Entre em contato conosco: email@empresa.com | (11) 99999-9999 | Segunda a Sexta, 9h às 18h',
        icon: 'fa-envelope'
    },
    blog: {
        title: '📝 Blog',
        text: 'Fique por dentro das últimas tendências em tecnologia, dicas de programação e cases de sucesso.',
        icon: 'fa-blog'
    },
    profile: {
        title: '👤 Perfil',
        text: 'Gerencie suas informações pessoais, preferências e configurações da sua conta.',
        icon: 'fa-user'
    }
};

// ==================== VARIÁVEIS DE ESTADO ====================
let clickCount = 0;
let hoverCount = 0;
let currentPage = 'home';
let hoverTimeout = null;

// ==================== FUNÇÕES UTILITÁRIAS ====================

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Cores diferentes para cada tipo
    const colors = {
        success: '#4caf50',
        info: '#764ba2',
        warning: '#ff9800',
        error: '#f44336'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.style.color = 'white';
    
    document.body.appendChild(notification);
    
    // Remover após 2.5 segundos
    setTimeout(() => {
        notification.remove();
    }, 2500);
}

// Função para criar tooltip
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - 30 + window.scrollY}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 1000);
}

// Função para atualizar o conteúdo
function updateContent(pageId) {
    const content = pageContent[pageId];
    if (content) {
        // Animação de fade out/in
        contentTitle.style.opacity = '0';
        contentText.style.opacity = '0';
        
        setTimeout(() => {
            contentTitle.textContent = content.title;
            contentText.textContent = content.text;
            contentTitle.style.opacity = '1';
            contentText.style.opacity = '1';
        }, 200);
        
        currentPage = pageId;
    }
}

// Função para atualizar estatísticas
function updateStats() {
    clickCountSpan.textContent = clickCount;
    hoverCountSpan.textContent = hoverCount;
    
    // Animação de pulsar nos números
    clickCountSpan.style.animation = 'pulse 0.3s ease';
    hoverCountSpan.style.animation = 'pulse 0.3s ease';
    
    setTimeout(() => {
        clickCountSpan.style.animation = '';
        hoverCountSpan.style.animation = '';
    }, 300);
}

// Função para remover classe active de todos os itens
function removeActiveClass() {
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
}

// Função para adicionar classe active ao item selecionado
function setActiveItem(itemElement) {
    removeActiveClass();
    itemElement.classList.add('active');
    
    const itemName = itemElement.querySelector('.link-text').textContent;
    activeItemSpan.textContent = itemName;
    
    // Animação no indicador
    activeItemSpan.style.animation = 'pulse 0.3s ease';
    setTimeout(() => {
        activeItemSpan.style.animation = '';
    }, 300);
}

// ==================== EVENTOS DO MENU ====================

// Evento de clique nos itens do menu
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const menuItem = link.closest('.menu-item');
        const pageId = link.getAttribute('data-page');
        const itemName = menuItem.querySelector('.link-text').textContent;
        
        // Incrementa contador de cliques
        clickCount++;
        updateStats();
        
        // Atualiza conteúdo
        updateContent(pageId);
        
        // Define item ativo
        setActiveItem(menuItem);
        
        // Mostra notificação
        showNotification(`Você clicou em: ${itemName} 🎯`, 'success');
        
        // Efeito de clique
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 200);
    });
});

// Evento de mouseover (hover) nos itens do menu
menuItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        // Incrementa contador de hovers
        hoverCount++;
        updateStats();
        
        const itemName = item.querySelector('.link-text').textContent;
        
        // Mostra tooltip
        createTooltip(item, `✨ ${itemName}`);
        
        // Efeito de sombra adicional
        item.style.filter = 'drop-shadow(0 0 5px rgba(255,255,255,0.5))';
        
        // Log no console (opcional)
        console.log(`Hover no item: ${itemName}`);
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.filter = '';
    });
});

// ==================== EVENTOS ADICIONAIS ====================

// Animação do texto animado
setInterval(() => {
    const emojis = ['✨', '⭐', '🌟', '💫', '⚡'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    animatedText.textContent = randomEmoji;
}, 2000);

// Efeito de digitação no título
function typeWriterEffect() {
    const originalText = 'Menu Interativo';
    let i = 0;
    const h1 = document.querySelector('h1');
    const span = animatedText;
    
    // Remove o span temporariamente
    span.style.display = 'none';
    h1.textContent = '';
    
    function type() {
        if (i < originalText.length) {
            h1.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            span.style.display = 'inline-block';
            h1.appendChild(span);
        }
    }
    
    type();
}

// Descomente para ativar o efeito de digitação
// typeWriterEffect();

// Evento de teclado (atalhos)
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const shortcuts = {
        '1': 'home',
        '2': 'about',
        '3': 'services',
        '4': 'contact',
        '5': 'blog',
        '6': 'profile'
    };
    
    if (shortcuts[key]) {
        const targetPage = shortcuts[key];
        const targetLink = document.querySelector(`[data-page="${targetPage}"]`);
        if (targetLink) {
            targetLink.click();
            showNotification(`Atalho usado: Tecla ${key} → ${pageContent[targetPage].title}`, 'info');
        }
    }
});

// Efeito de parallax no fundo (opcional)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.body.style.background = `linear-gradient(135deg, 
        rgba(102, 126, 234, ${0.8 + mouseX * 0.2}) 0%, 
        rgba(118, 75, 162, ${0.8 + mouseY * 0.2}) 100%)`;
});

// Salvar estatísticas no localStorage
function saveStats() {
    localStorage.setItem('menuClickCount', clickCount);
    localStorage.setItem('menuHoverCount', hoverCount);
}

function loadStats() {
    const savedClicks = localStorage.getItem('menuClickCount');
    const savedHovers = localStorage.getItem('menuHoverCount');
    
    if (savedClicks) clickCount = parseInt(savedClicks);
    if (savedHovers) hoverCount = parseInt(savedHovers);
    
    updateStats();
}

// Salvar estatísticas ao sair
window.addEventListener('beforeunload', saveStats);
loadStats();

// ==================== EFEITO DE ONDA (RIPPLE) ====================
function createRipple(event, element) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.4)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s linear';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Adicionar efeito ripple aos links do menu
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        createRipple(e, link);
    });
});

// CSS para o efeito ripple (adicionar ao style.css)
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== INICIALIZAÇÃO ====================
console.log('🚀 Menu interativo inicializado!');
console.log('📊 Estatísticas carregadas:', { clickCount, hoverCount });
showNotification('✨ Menu carregado com sucesso! Passe o mouse e clique nos itens.', 'success');
