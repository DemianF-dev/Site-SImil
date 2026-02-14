/**
 * SIMIL - Pagina de Empreendimentos
 * Interactions and functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollProgress();
    initThemeToggle();
    initGallery();
    initFilterTabs();
    initModal();
    initToastSystem();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('simil-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('simil-theme', newTheme);
        showToast('info', 'Tema Alterado', 'Modo ' + (newTheme === 'dark' ? 'escuro' : 'claro') + ' ativado');
    });
}

function initGallery() {
    const galleries = document.querySelectorAll('.card-gallery');
    
    galleries.forEach(gallery => {
        const thumbs = gallery.querySelectorAll('.thumb');
        const images = gallery.querySelectorAll('.gallery-image');
        
        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                thumbs.forEach(t => t.classList.remove('active'));
                images.forEach(img => img.classList.remove('active'));
                thumb.classList.add('active');
                if (images[index]) {
                    images[index].classList.add('active');
                }
            });
        });
    });
}

function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card-large');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            propertyCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.includes(filter)) {
                        card.style.display = 'grid';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

function initModal() {
    const modal = document.getElementById('interestModal');
    const modalClose = document.getElementById('modalClose');
    const interestForm = document.getElementById('interestForm');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    if (interestForm) {
        interestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('success', 'Sucesso!', 'Seu interesse foi registrado. Entraremos em contato em breve.');
            closeModal();
            interestForm.reset();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function showInterestModal(propertyName) {
    const modal = document.getElementById('interestModal');
    const propertyNameEl = document.getElementById('modalPropertyName');
    
    if (modal && propertyNameEl) {
        propertyNameEl.textContent = 'No empreendimento: ' + propertyName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('interestModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showToast(type, title, message, duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const colors = {
        success: '#25D366',
        error: '#ff4757',
        info: '#e74422'
    };
    
    const toast = document.createElement('div');
    toast.style.cssText = `
        background: var(--dark-100);
        border: 1px solid var(--dark-300);
        border-left: 4px solid ${colors[type]};
        border-radius: 12px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: translateX(120%);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    toast.innerHTML = `
        <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${colors[type]}20; color: ${colors[type]};">
            ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </div>
        <div style="flex: 1;">
            <div style="font-weight: 600; color: var(--white); margin-bottom: 0.25rem;">${title}</div>
            <div style="font-size: 0.875rem; color: var(--gray-400);">${message}</div>
        </div>
        <button style="background: none; border: none; color: var(--gray-500); cursor: pointer;">✕</button>
    `;
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    });
    
    toast.querySelector('button').addEventListener('click', () => {
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    });
    
    setTimeout(() => {
        if (toast.parentNode) {
 
