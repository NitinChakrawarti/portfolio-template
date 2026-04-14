// Portfolio Application - Main JavaScript File

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const mobileNavLinks = document.getElementById('mobileNavLinks');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  // Render navigation links
  portfolioData.navLinks.forEach(link => {
    // Desktop nav
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    li.appendChild(a);
    navLinks.appendChild(li);

    // Mobile nav
    const mobileA = document.createElement('a');
    mobileA.href = link.href;
    mobileA.innerHTML = `<span></span>${link.label}`;
    mobileA.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
    mobileNavLinks.appendChild(mobileA);
  });

  // Mobile toggle
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active section highlighting
  const sections = portfolioData.navLinks.map(l => l.href.replace('#', ''));
  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
}

// ============================================
// HERO SECTION
// ============================================

function initHero() {
  const { profile } = portfolioData;
  
  document.getElementById('heroName').textContent = profile.name;
  document.getElementById('heroRole').textContent = profile.title;
  document.getElementById('heroBio').textContent = profile.bio;

  // Social links
  const heroSocials = document.getElementById('heroSocials');
  const socialLinks = [
    { icon: 'github', href: profile.github, label: 'GitHub' },
    { icon: 'linkedin', href: profile.linkedin, label: 'LinkedIn' },
    { icon: 'mail', href: `mailto:${profile.email}`, label: 'Email' }
  ];

  socialLinks.forEach(social => {
    const a = document.createElement('a');
    a.href = social.href;
    a.className = 'social-link';
    a.setAttribute('aria-label', social.label);
    if (social.href.startsWith('http')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    a.innerHTML = `<i data-lucide="${social.icon}" class="icon"></i>`;
    heroSocials.appendChild(a);
  });
}

// ============================================
// ABOUT SECTION
// ============================================

function initAbout() {
  const { profile, education, certifications } = portfolioData;
  const aboutContent = document.getElementById('aboutContent');

  const highlights = [
    { icon: 'cloud', label: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD' },
    { icon: 'users', label: 'Community Leader', desc: 'AWS Cloud Club Captain' },
    { icon: 'star', label: 'Open Source', desc: 'GSSoC \'24 Contributor' }
  ];

  aboutContent.innerHTML = `
    <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: 0.1s; margin-bottom: 1.5rem;">
      <p style="color: hsl(var(--foreground) / 0.9); line-height: 1.6; margin-bottom: 0.75rem;">${profile.bio}</p>
      <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6;">${profile.bioExtended}</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid hsl(var(--border) / 0.4);">
        ${highlights.map(h => `
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 2rem; height: 2rem; border-radius: 0.5rem; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary)); flex-shrink: 0;">
              <i data-lucide="${h.icon}" style="width: 0.875rem; height: 0.875rem;"></i>
            </div>
            <div>
              <p style="font-size: 0.75rem; font-weight: 600; color: hsl(var(--foreground));">${h.label}</p>
              <p style="font-size: 0.6875rem; color: hsl(var(--muted-foreground));">${h.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="grid-2">
      <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: 0.2s;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.12); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary));">
            <i data-lucide="graduation-cap" style="width: 1.125rem; height: 1.125rem;"></i>
          </div>
          <h3 style="font-size: 1rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground));">Education</h3>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <p style="color: hsl(var(--foreground)); font-weight: 500; line-height: 1.4;">${education.degree}</p>
          <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${education.institution}</p>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding-top: 0.25rem;">
            <span style="display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.7);">
              <i data-lucide="calendar" style="width: 0.6875rem; height: 0.6875rem;"></i>
              ${education.period}
            </span>
            <span style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.625rem; border-radius: 9999px; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); font-size: 0.75rem; color: hsl(var(--primary)); font-weight: 600;">
              <i data-lucide="star" style="width: 0.625rem; height: 0.625rem;"></i>
              CGPA ${education.cgpa}
            </span>
          </div>
        </div>
      </div>

      <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: 0.3s;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.12); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary));">
            <i data-lucide="award" style="width: 1.125rem; height: 1.125rem;"></i>
          </div>
          <h3 style="font-size: 1rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground));">Certifications</h3>
        </div>
        
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
          ${certifications.map((cert, i) => `
            <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: hsl(var(--muted-foreground)); opacity: 0; animation: fadeIn 0.3s ease forwards; animation-delay: ${0.3 + i * 0.08}s;">
              <span style="width: 1.25rem; height: 1.25rem; border-radius: 50%; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="width: 0.375rem; height: 0.375rem; border-radius: 50%; background: hsl(var(--primary));"></span>
              </span>
              ${cert}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

// ============================================
// SKILLS SECTION
// ============================================

function initSkills() {
  const { skills } = portfolioData;
  const categories = Object.keys(skills);
  let activeFilter = 'All';

  const categoryMeta = {
    'Languages': { icon: 'code-2', color: 'hsl(45 93% 58%)', dot: 'hsl(45 93% 58%)' },
    'Frameworks': { icon: 'layers', color: 'hsl(217 91% 60%)', dot: 'hsl(217 91% 60%)' },
    'Databases': { icon: 'database', color: 'hsl(142 71% 45%)', dot: 'hsl(142 71% 45%)' },
    'Tools': { icon: 'wrench', color: 'hsl(271 76% 53%)', dot: 'hsl(271 76% 53%)' },
    'Cloud / DevOps': { icon: 'cloud', color: 'hsl(199 89% 48%)', dot: 'hsl(199 89% 48%)' },
    'Soft Skills': { icon: 'users', color: 'hsl(346 77% 50%)', dot: 'hsl(346 77% 50%)' }
  };

  function renderSkills() {
    const visibleCategories = activeFilter === 'All' ? categories : categories.filter(c => c === activeFilter);
    
    const skillsContent = document.getElementById('skillsContent');
    skillsContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${visibleCategories.map(category => {
          const items = skills[category];
          const meta = categoryMeta[category];
          
          return `
            <div>
              <div style="display: flex; align-items: center; gap: 0.625rem; margin-bottom: 1rem;">
                <div style="width: 1.5rem; height: 1.5rem; border-radius: 0.375rem; background: hsl(var(--secondary) / 0.6); border: 1px solid hsl(var(--border) / 0.6); display: flex; align-items: center; justify-content: center; color: ${meta.color};">
                  <i data-lucide="${meta.icon}" style="width: 0.75rem; height: 0.75rem;"></i>
                </div>
                <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: ${meta.color};">
                  ${category}
                </span>
                <div style="flex: 1; height: 1px; background: hsl(var(--border) / 0.4);"></div>
                <span style="font-size: 0.625rem; color: hsl(var(--muted-foreground) / 0.4);">${items.length}</span>
              </div>
              
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${items.map(skill => `
                  <span style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border) / 0.6); background: hsl(var(--secondary) / 0.3); font-size: 0.75rem; font-weight: 500; color: hsl(var(--secondary-foreground)); transition: all 0.2s ease; cursor: default;">
                    <span style="width: 0.375rem; height: 0.375rem; border-radius: 50%; background: ${meta.dot}; opacity: 0.6;"></span>
                    ${skill}
                  </span>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    
    lucide.createIcons();
  }

  // Render filter tabs
  const skillsFilter = document.getElementById('skillsFilter');
  const tabs = ['All', ...categories];
  
  skillsFilter.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem;">
      ${tabs.map(tab => {
        const meta = tab !== 'All' ? categoryMeta[tab] : null;
        return `
          <button 
            class="skill-filter-btn ${tab === activeFilter ? 'active' : ''}" 
            data-filter="${tab}"
            style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; border: 1px solid; transition: all 0.25s ease; cursor: pointer; ${
              tab === activeFilter 
                ? 'background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-color: hsl(var(--primary)); box-shadow: 0 0 14px hsl(38 95% 58% / 0.3);'
                : 'background: hsl(var(--secondary) / 0.3); color: hsl(var(--muted-foreground)); border-color: hsl(var(--border) / 0.6);'
            }"
          >
            ${meta ? `<i data-lucide="${meta.icon}" style="width: 0.6875rem; height: 0.6875rem;"></i>` : ''}
            ${tab}
          </button>
        `;
      }).join('')}
    </div>
  `;

  // Add event listeners
  document.querySelectorAll('.skill-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeFilter = e.currentTarget.dataset.filter;
      
      // Update button styles
      document.querySelectorAll('.skill-filter-btn').forEach(b => {
        if (b.dataset.filter === activeFilter) {
          b.style.background = 'hsl(var(--primary))';
          b.style.color = 'hsl(var(--primary-foreground))';
          b.style.borderColor = 'hsl(var(--primary))';
          b.style.boxShadow = '0 0 14px hsl(38 95% 58% / 0.3)';
        } else {
          b.style.background = 'hsl(var(--secondary) / 0.3)';
          b.style.color = 'hsl(var(--muted-foreground))';
          b.style.borderColor = 'hsl(var(--border) / 0.6)';
          b.style.boxShadow = 'none';
        }
      });
      
      renderSkills();
    });
  });

  renderSkills();
  lucide.createIcons();
}


// ============================================
// EXPERIENCE SECTION
// ============================================

function initExperience() {
  const { experience } = portfolioData;
  const experienceContent = document.getElementById('experienceContent');

  const typeConfig = {
    'internship': { label: 'Internship', icon: 'briefcase', color: 'hsl(45 93% 58%)', bg: 'hsl(45 93% 58% / 0.1)', border: 'hsl(45 93% 58% / 0.25)' },
    'leadership': { label: 'Leadership', icon: 'star', color: 'hsl(271 76% 53%)', bg: 'hsl(271 76% 53% / 0.1)', border: 'hsl(271 76% 53% / 0.25)' },
    'work': { label: 'Work', icon: 'code-2', color: 'hsl(217 91% 60%)', bg: 'hsl(217 91% 60% / 0.1)', border: 'hsl(217 91% 60% / 0.25)' },
    'opensource': { label: 'Open Source', icon: 'git-merge', color: 'hsl(142 71% 45%)', bg: 'hsl(142 71% 45% / 0.1)', border: 'hsl(142 71% 45% / 0.25)' }
  };

  experienceContent.innerHTML = `
    <div style="position: relative;">
      <div style="position: absolute; left: 1.25rem; top: 0.5rem; bottom: 0.5rem; width: 1px; background: linear-gradient(to bottom, hsl(38 95% 58% / 0.5), hsl(var(--border) / 0.4), transparent); display: none;" class="timeline-line"></div>
      
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${experience.map((exp, i) => {
          const type = exp.type || 'work';
          const config = typeConfig[type];
          
          return `
            <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: ${i * 0.08}s; position: relative; padding-left: 0;">
              <div style="position: absolute; left: 0.875rem; top: 1.25rem; display: none;" class="timeline-dot">
                <div style="width: 0.75rem; height: 0.75rem; border-radius: 50%; background: hsl(38 95% 58% / 0.7); border: 2px solid hsl(var(--background)); transition: all 0.3s ease;"></div>
              </div>
              
              <div style="padding: 1rem 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                      <h3 style="font-size: 1rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground)); line-height: 1.3;">
                        ${exp.role}
                      </h3>
                      <span style="display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.125rem 0.5rem; border-radius: 0.375rem; border: 1px solid ${config.border}; background: ${config.bg}; font-size: 0.625rem; font-weight: 600; letter-spacing: 0.05em; color: ${config.color};">
                        <i data-lucide="${config.icon}" style="width: 0.5625rem; height: 0.5625rem;"></i>
                        ${config.label}
                      </span>
                    </div>
                    <p style="color: hsl(var(--primary)); font-weight: 500; font-size: 0.875rem;">${exp.company}</p>
                  </div>
                  <span style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; border-radius: 9999px; background: hsl(var(--secondary) / 0.6); border: 1px solid hsl(var(--border) / 0.6); font-size: 0.75rem; color: hsl(var(--muted-foreground)); align-self: flex-start;">
                    <i data-lucide="calendar" style="width: 0.625rem; height: 0.625rem;"></i>
                    ${exp.period}
                  </span>
                </div>
                
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                  ${exp.highlights.map((item, j) => `
                    <li style="display: flex; align-items: start; gap: 0.75rem; font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6; opacity: 0; animation: fadeIn 0.3s ease forwards; animation-delay: ${i * 0.08 + j * 0.05 + 0.25}s;">
                      <span style="width: 0.375rem; height: 0.375rem; border-radius: 50%; background: hsl(38 95% 58% / 0.5); margin-top: 0.375rem; flex-shrink: 0;"></span>
                      ${item}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Show timeline on desktop
  if (window.innerWidth >= 768) {
    document.querySelectorAll('.timeline-line, .timeline-dot').forEach(el => {
      el.style.display = 'block';
    });
    experienceContent.querySelector('div > div').style.paddingLeft = '4rem';
  }
}

// ============================================
// PROJECTS SECTION
// ============================================

function initProjects() {
  const { projects } = portfolioData;
  const projectsContent = document.getElementById('projectsContent');

  projectsContent.innerHTML = projects.map((project, i) => `
    <div class="glass-hover card-shine card-lg animate-fade-up" style="animation-delay: ${i * 0.15}s; display: flex; flex-direction: column;">
      <div style="display: flex; align-items: start; justify-content: space-between; gap: 0.5rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: start; gap: 0.75rem; min-width: 0;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary)); flex-shrink: 0; margin-top: 0.125rem; transition: all 0.3s ease;">
            <i data-lucide="layers" style="width: 0.9375rem; height: 0.9375rem;"></i>
          </div>
          <div style="min-width: 0;">
            <h3 style="font-size: 1.125rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground)); line-height: 1.3; transition: color 0.3s ease;">
              ${project.title}
            </h3>
            <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.7); margin-top: 0.125rem;">${project.subtitle}</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 0.25rem; flex-shrink: 0;">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="Source code" style="display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 0.5rem; color: hsl(var(--muted-foreground)); border: 1px solid transparent; transition: all 0.2s ease; text-decoration: none;">
            <i data-lucide="github" style="width: 0.9375rem; height: 0.9375rem;"></i>
          </a>
          <a href="${project.live}" target="_blank" rel="noopener noreferrer" aria-label="Live demo" style="display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 0.5rem; color: hsl(var(--muted-foreground)); border: 1px solid transparent; transition: all 0.2s ease; text-decoration: none;">
            <i data-lucide="external-link" style="width: 0.9375rem; height: 0.9375rem;"></i>
          </a>
        </div>
      </div>
      
      <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-bottom: 1.25rem; line-height: 1.6;">${project.description}</p>
      
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; flex: 1;">
        ${project.highlights.map(h => `
          <li style="display: flex; align-items: start; gap: 0.625rem; font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.8);">
            <span style="width: 0.25rem; height: 0.25rem; border-radius: 50%; background: hsl(38 95% 58% / 0.7); margin-top: 0.375rem; flex-shrink: 0;"></span>
            ${h}
          </li>
        `).join('')}
      </ul>
      
      <div style="display: flex; flex-wrap: wrap; gap: 0.375rem; padding-top: 1rem; border-top: 1px solid hsl(var(--border) / 0.4);">
        ${project.tech.map(t => `
          <span style="padding: 0.125rem 0.5rem; font-size: 0.625rem; font-weight: 500; border-radius: 0.375rem; background: hsl(var(--secondary) / 0.5); border: 1px solid hsl(var(--border) / 0.5); color: hsl(var(--muted-foreground) / 0.8); transition: all 0.2s ease;">
            ${t}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================
// CONTACT SECTION
// ============================================

function initContact() {
  const { profile, codingProfiles } = portfolioData;
  const contactContent = document.getElementById('contactContent');

  const contactLinks = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    { icon: 'github', label: 'GitHub', value: 'NitinChakrawarti', href: profile.github },
    { icon: 'linkedin', label: 'LinkedIn', value: 'nitinchakrawarti', href: profile.linkedin }
  ];

  contactContent.innerHTML = `
    <div class="animate-fade-up" style="animation-delay: 0.1s; position: relative; border-radius: 1rem; border: 1px solid hsl(38 95% 58% / 0.2); background: linear-gradient(135deg, hsl(38 95% 58% / 0.08), hsl(38 95% 58% / 0.04), transparent); padding: 2rem; margin-bottom: 2rem; overflow: hidden;">
      <div style="position: absolute; top: 0; right: 0; width: 12rem; height: 12rem; background: hsl(38 95% 58% / 0.06); border-radius: 50%; filter: blur(60px); pointer-events: none;"></div>
      
      <div style="position: relative; z-index: 10; display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <i data-lucide="sparkles" style="width: 0.875rem; height: 0.875rem; color: hsl(var(--primary));"></i>
            <span style="font-size: 0.75rem; color: hsl(var(--primary)); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">Open to work</span>
          </div>
          <p style="color: hsl(var(--foreground)); font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 1.125rem; margin-bottom: 0.25rem;">Looking for internships & full-time roles</p>
          <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Full-Stack Development · React · Node.js · Next.js</p>
        </div>
        <a href="mailto:${profile.email}" class="btn-primary" style="align-self: flex-start;">
          Send email
          <i data-lucide="arrow-up-right" style="width: 0.875rem; height: 0.875rem;"></i>
        </a>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom: 4rem;">
      ${contactLinks.map((link, i) => `
        <a href="${link.href}" ${link.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="glass-hover card-shine animate-fade-up" style="animation-delay: ${i * 0.08}s; display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border-radius: 1rem; text-decoration: none; transition: all 0.3s ease;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary)); flex-shrink: 0; transition: all 0.3s ease;">
            <i data-lucide="${link.icon}" style="width: 1.0625rem; height: 1.0625rem;"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <p style="font-size: 0.625rem; color: hsl(var(--muted-foreground) / 0.6); text-transform: uppercase; letter-spacing: 0.12em; font-weight: 500;">${link.label}</p>
            <p style="font-size: 0.875rem; color: hsl(var(--foreground)); margin-top: 0.125rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${link.value}</p>
          </div>
          <i data-lucide="arrow-up-right" style="width: 0.9375rem; height: 0.9375rem; color: hsl(var(--muted-foreground) / 0.4); flex-shrink: 0; transition: all 0.3s ease;"></i>
        </a>
      `).join('')}
    </div>

    <div style="padding-top: 2rem; border-top: 1px solid hsl(var(--border) / 0.4); display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem;">
      <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.5); text-align: center;">
        © ${new Date().getFullYear()} ${profile.name} · Built with HTML, CSS & JavaScript
      </p>
      <div style="display: flex; align-items: center; gap: 1.25rem;">
        ${codingProfiles.map(link => `
          <a href="${link.href}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.5); text-decoration: none; transition: color 0.3s ease;">
            ${link.label}
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHero();
  initAbout();
  initSkills();
  initExperience();
  initProjects();
  initContact();
  
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Initialize scroll animations
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
});

// Handle window resize for responsive features
window.addEventListener('resize', () => {
  const experienceContent = document.getElementById('experienceContent');
  if (experienceContent) {
    if (window.innerWidth >= 768) {
      document.querySelectorAll('.timeline-line, .timeline-dot').forEach(el => {
        el.style.display = 'block';
      });
      experienceContent.querySelector('div > div').style.paddingLeft = '4rem';
    } else {
      document.querySelectorAll('.timeline-line, .timeline-dot').forEach(el => {
        el.style.display = 'none';
      });
      experienceContent.querySelector('div > div').style.paddingLeft = '0';
    }
  }
});
