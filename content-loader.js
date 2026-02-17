/**
 * SIMIL Content Loader
 * Carrega textos editáveis do JSON e atualiza o DOM
 */

(function() {
    'use strict';

    const CONTENT_FILE = '/data/content.json';
    let contentData = null;

    async function loadContent() {
        try {
            const response = await fetch(CONTENT_FILE);
            if (!response.ok) throw new Error('Content file not found');
            contentData = await response.json();
            updatePageContent();
            console.log('[SIMIL CMS] Conteúdo carregado com sucesso');
        } catch (error) {
            console.warn('[SIMIL CMS] Usando conteúdo padrão do HTML');
        }
    }

    function updatePageContent() {
        if (!contentData) return;

        updateSiteMeta();
        updateHero();
        updateNavigation();
        updateMethod();
        updateProperties();
        updateCalculator();
        updateAbout();
        updateTestimonials();
        updateContact();
        updateFooter();
    }

    function updateSiteMeta() {
        const site = contentData.site;
        if (!site) return;

        document.title = site.title;
        updateMeta('description', site.description);
        updateMeta('keywords', site.keywords);
        updateMeta('author', site.author);
    }

    function updateMeta(name, content) {
        if (!content) return;
        const meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) meta.setAttribute('content', content);
    }

    function updateHero() {
        const hero = contentData.hero;
        if (!hero) return;

        setText('[data-content="hero-label"]', hero.label);
        setText('[data-content="hero-title-1"]', hero.title_line1);
        setText('[data-content="hero-title-2"]', hero.title_line2);
        setText('[data-content="hero-title-3"]', hero.title_line3);
        setText('[data-content="hero-description"]', hero.description);
        setText('[data-content="hero-cta-primary"]', hero.cta_primary);
        setText('[data-content="hero-cta-secondary"]', hero.cta_secondary);

        if (hero.stats) {
            setCounter('[data-content="stat-experience"]', hero.stats.experience?.number);
            setText('[data-content="stat-experience-label"]', hero.stats.experience?.label);
            setCounter('[data-content="stat-developments"]', hero.stats.developments?.number);
            setText('[data-content="stat-developments-label"]', hero.stats.developments?.label);
            setCounter('[data-content="stat-success"]', hero.stats.success_rate?.number);
            setText('[data-content="stat-success-label"]', hero.stats.success_rate?.label);
        }

        if (hero.floating_cards) {
            setText('[data-content="card-1-value"]', hero.floating_cards.card1?.value);
            setText('[data-content="card-1-label"]', hero.floating_cards.card1?.label);
            setText('[data-content="card-2-value"]', hero.floating_cards.card2?.value);
            setText('[data-content="card-2-label"]', hero.floating_cards.card2?.label);
        }
    }

    function updateNavigation() {
        const nav = contentData.navigation;
        if (!nav) return;

        setText('[data-content="nav-home"]', nav.home);
        setText('[data-content="nav-method"]', nav.method);
        setText('[data-content="nav-developments"]', nav.developments);
        setText('[data-content="nav-about"]', nav.about);
        setText('[data-content="nav-contact"]', nav.contact);
        setText('[data-content="nav-cta"]', nav.cta_button);
    }

    function updateMethod() {
        const method = contentData.method;
        if (!method) return;

        setText('[data-content="method-tag"]', method.tag);
        setText('[data-content="method-title"]', method.title);
        setText('[data-content="method-highlight"]', method.highlight);

        const steps = method.steps;
        if (steps && steps.length >= 3) {
            steps.forEach((step, index) => {
                const stepNum = index + 1;
                setText(`[data-content="step-${stepNum}-title"]`, step.title);
                setText(`[data-content="step-${stepNum}-description"]`, step.description);
                
                const featuresEl = document.querySelector(`[data-content="step-${stepNum}-features"]`);
                if (featuresEl && step.features) {
                    featuresEl.innerHTML = step.features.map(f => `<li>${f}</li>`).join('');
                }
            });
        }

        if (method.badge) {
            setText('[data-content="badge-number"]', method.badge.number);
            setText('[data-content="badge-text"]', method.badge.text);
        }
    }

    function updateProperties() {
        const props = contentData.properties;
        if (!props) return;

        setText('[data-content="properties-tag"]', props.tag);
        setText('[data-content="properties-title"]', props.title);
        setText('[data-content="properties-highlight"]', props.highlight);
        setText('[data-content="properties-description"]', props.description);
        setText('[data-content="properties-cta"]', props.cta);

        const items = props.items;
        if (items && items.length >= 3) {
            items.forEach((item, index) => {
                const propNum = index + 1;
                setText(`[data-content="property-${propNum}-name"]`, item.name);
                setText(`[data-content="property-${propNum}-status"]`, item.status);
                setText(`[data-content="property-${propNum}-type"]`, item.type);
                setText(`[data-content="property-${propNum}-location"]`, item.location);
                setText(`[data-content="property-${propNum}-description"]`, item.description);
                
                if (item.features) {
                    setText(`[data-content="property-${propNum}-area"]`, item.features.area);
                    setText(`[data-content="property-${propNum}-rooms"]`, item.features.rooms);
                    setText(`[data-content="property-${propNum}-delivery"]`, item.features.delivery);
                }
            });
        }
    }

    function updateCalculator() {
        const calc = contentData.calculator;
        if (!calc) return;

        setText('[data-content="calc-tag"]', calc.tag);
        setText('[data-content="calc-title"]', calc.title);
        setText('[data-content="calc-highlight"]', calc.highlight);
        setText('[data-content="calc-description"]', calc.description);

        if (calc.labels) {
            setText('[data-content="calc-label-investment"]', calc.labels.investment);
            setText('[data-content="calc-label-time"]', calc.labels.time);
            setText('[data-content="calc-label-rate"]', calc.labels.rate);
            setText('[data-content="calc-button"]', calc.labels.button);
        }

        if (calc.results) {
            setText('[data-content="calc-result-future"]', calc.results.future_value);
            setText('[data-content="calc-result-appreciation"]', calc.results.appreciation);
            setText('[data-content="calc-result-roi"]', calc.results.roi);
        }

        setText('[data-content="calc-disclaimer"]', calc.disclaimer);
    }

    function updateAbout() {
        const about = contentData.about;
        if (!about) return;

        setText('[data-content="about-tag"]', about.tag);
        setText('[data-content="about-title"]', about.title);
        setText('[data-content="about-highlight"]', about.highlight);
        setText('[data-content="about-lead"]', about.lead);
        setText('[data-content="about-cta"]', about.cta);

        if (about.paragraphs && about.paragraphs.length >= 2) {
            const paragraphsContainer = document.querySelector('[data-content="about-paragraphs"]');
            if (paragraphsContainer) {
                const paragraphs = paragraphsContainer.querySelectorAll('p');
                if (paragraphs[0]) paragraphs[0].textContent = about.paragraphs[0];
                if (paragraphs[1]) paragraphs[1].textContent = about.paragraphs[1];
            }
        }

        if (about.floating_info) {
            setText('[data-content="about-info-title"]', about.floating_info.title);
            setText('[data-content="about-info-address"]', about.floating_info.address);
        }
    }

    function updateTestimonials() {
        const test = contentData.testimonials;
        if (!test) return;

        setText('[data-content="testimonials-tag"]', test.tag);
        setText('[data-content="testimonials-title"]', test.title);
        setText('[data-content="testimonials-highlight"]', test.highlight);

        const items = test.items;
        if (items && items.length >= 3) {
            items.forEach((item, index) => {
                const testNum = index + 1;
                setText(`[data-content="testimonial-${testNum}-text"]`, item.text);
                setText(`[data-content="testimonial-${testNum}-author"]`, item.author);
                setText(`[data-content="testimonial-${testNum}-role"]`, item.role);
            });
        }
    }

    function updateContact() {
        const contact = contentData.contact;
        if (!contact) return;

        setText('[data-content="contact-tag"]', contact.tag);
        setText('[data-content="contact-title"]', contact.title);
        setText('[data-content="contact-highlight"]', contact.highlight);
        setText('[data-content="contact-description"]', contact.description);

        if (contact.info) {
            if (contact.info.address) {
                setText('[data-content="contact-address-title"]', contact.info.address.title);
                setText('[data-content="contact-address-street"]', contact.info.address.street);
                setText('[data-content="contact-address-neighborhood"]', contact.info.address.neighborhood);
                setText('[data-content="contact-address-city"]', contact.info.address.city);
                setText('[data-content="contact-address-cep"]', contact.info.address.cep);
            }
            if (contact.info.phone) {
                setText('[data-content="contact-phone-title"]', contact.info.phone.title);
                setText('[data-content="contact-phone-number"]', contact.info.phone.number);
            }
            if (contact.info.email) {
                setText('[data-content="contact-email-title"]', contact.info.email.title);
                setText('[data-content="contact-email-address"]', contact.info.email.address);
            }
        }

        if (contact.form) {
            setText('[data-content="form-submit"]', contact.form.submit);
        }
    }

    function updateFooter() {
        const footer = contentData.footer;
        if (!footer) return;

        setText('[data-content="footer-tagline"]', footer.tagline);
        setText('[data-content="footer-creci"]', footer.creci);
        setText('[data-content="footer-copyright"]', footer.copyright);
    }

    function setText(selector, text) {
        if (!text) return;
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el) el.textContent = text;
        });
    }

    function setCounter(selector, value) {
        if (value === undefined || value === null) return;
        const el = document.querySelector(selector);
        if (el) {
            el.setAttribute('data-count', value);
            el.textContent = value;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadContent);
    } else {
        loadContent();
    }

    window.SIMILContent = {
        reload: loadContent,
        getData: () => contentData
    };

})();
