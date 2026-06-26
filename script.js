const API_BASE = '/api';

async function requestJson(url, options = {}) {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
        throw new Error(data.message || 'Request failed');
    }

    return data;
}

function renderProjects(projects) {
    const container = document.querySelector('.projects-grid');
    if (!container) return;

    const items = projects.length ? projects : [
        {
            title: 'AuraPay SaaS Platform',
            description: 'A modern billing analytics and subscription platform featuring live Stripe webhook feeds, automatic license distribution, and dynamic SVG data visualizations.',
            category: 'saas',
            tags: ['Stripe API', 'Chart.js'],
            link: '#',
        },
        {
            title: 'Nova UI Design System',
            description: 'A modern, highly accessible component library optimized for fast SaaS landing pages. Includes glassmorphism widgets, micro-animations, and variable layout templates.',
            category: 'ui-ux',
            tags: ['CSS Variables', 'Figma UI'],
            link: '#',
        },
    ];

    container.innerHTML = items.map((project) => `
        <div class="project-card glass-card scroll-reveal fade-up" data-category="${project.category || 'other'}">
            <div class="project-img-container">
                <div class="project-overlay-glow"></div>
                <div class="project-tech-badges">
                    ${(project.tags || []).slice(0, 2).map((tag) => `<span class="badge">${tag}</span>`).join('')}
                </div>
                <div class="project-graphic p-saas-billing">
                    <i class="fa-solid fa-circle-nodes project-main-icon"></i>
                </div>
            </div>
            <div class="project-details">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-footer">
                    <span class="project-type"><i class="fa-solid fa-arrows-spin"></i> ${project.category === 'ui-ux' ? 'UI/UX Design' : 'SaaS Integration'}</span>
                    <a href="${project.link || '#'}" class="project-link" aria-label="View ${project.title} details"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSkills(skills) {
    const container = document.querySelector('.about-skills');
    if (!container) return;

    const items = skills.length ? skills : [
        { name: 'UI/UX Development & Aesthetics', description: 'Designing interactive elements, creating flexible grid systems, structuring clean visual grids, and crafting smooth user paths.', tags: ['Figma', 'Grid / Flexbox', 'Typography'] },
        { name: 'Modern SaaS Integration', description: 'Connecting payment gateways, authentication providers, webhooks, and cloud databases to automate operational tasks.', tags: ['Stripe API', 'Firebase', 'RESTful APIs'] },
    ];

    container.innerHTML = items.map((skill) => `
        <div class="skill-box glass-card">
            <div class="skill-icon-header">
                <div class="skill-icon-wrap icon-red"><i class="fa-solid fa-compass-drafting"></i></div>
                <h4>${skill.name}</h4>
            </div>
            <p>${skill.description}</p>
            <div class="skill-tags">
                ${(skill.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderCertificates(certificates) {
    const container = document.querySelector('.certifications-grid');
    if (!container) return;

    const items = certificates.length ? certificates : [
        {
            title: 'Google UX Design Professional',
            issuer: 'Google & Coursera',
            date: 'Oct 2025',
            description: 'In-depth certification spanning user research, Figma prototyping, responsive design practices, and accessibility testing protocols.',
        },
        {
            title: 'SaaS API Integration Architect',
            issuer: 'TechAcademy International',
            date: 'Feb 2026',
            description: 'Specialized training focusing on secure token handshakes, Stripe billing automation, webhook error-retry queues, and database mapping.',
        },
    ];

    container.innerHTML = items.map((certificate) => `
        <div class="cert-card glass-card scroll-reveal fade-up">
            <div class="cert-glow"></div>
            <div class="cert-header">
                <div class="cert-badge icon-red"><i class="fa-solid fa-award"></i></div>
                <span class="cert-issuer">${certificate.issuer}</span>
            </div>
            <h3>${certificate.title}</h3>
            <p>${certificate.description}</p>
            <div class="cert-footer">
                <span class="cert-date"><i class="fa-regular fa-calendar-days"></i> ${certificate.date}</span>
                <span class="cert-status"><i class="fa-solid fa-circle-check"></i> Verified</span>
            </div>
        </div>
    `).join('');
}

async function loadPortfolioContent() {
    try {
        const [projectsResponse, skillsResponse, certificatesResponse] = await Promise.all([
            requestJson(`${API_BASE}/projects`).catch(() => ({ success: true, data: [] })),
            requestJson(`${API_BASE}/skills`).catch(() => ({ success: true, data: [] })),
            requestJson(`${API_BASE}/certificates`).catch(() => ({ success: true, data: [] })),
        ]);

        renderProjects(projectsResponse.data || []);
        renderSkills(skillsResponse.data || []);
        renderCertificates(certificatesResponse.data || []);
    } catch (error) {
        console.error('Portfolio content loading failed:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Navbar Background & Scroll Events
       ========================================================================== */
    const header = document.querySelector('.navbar-header');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (backToTop) {
            if (window.scrollY > 800) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        }
    });

    /* ==========================================================================
       2. Mobile Navbar Menu Toggle
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       3. Project Grid Filtering
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active filter button class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Reset card reveal animation delay
                card.style.transitionDelay = '0s';
                
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow/animation refresh
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    // Delay physical display removal to allow fade out
                    setTimeout(() => {
                        card.style.display ='none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       4. Intersection Observers (Scroll-Reveal & Nav Highlights)
       ========================================================================== */
    // Scroll reveal observe
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing after reveal to keep visible
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Nav active link tracking observe
    const sections = document.querySelectorAll('section, footer');
    const navMenuLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));

    /* ==========================================================================
       5. Portfolio Content Loading & Contact Form Submission
       ========================================================================== */
    loadPortfolioContent();

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.disabled = true;
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all fields.';
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok || !result.success) {
                    throw new Error(result.message || 'Unable to send message.');
                }

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent! I will contact you shortly.';
                contactForm.reset();
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                formStatus.className = 'form-status error';
                formStatus.textContent = error.message || 'Unable to send message.';
            }
        });
    }
});
