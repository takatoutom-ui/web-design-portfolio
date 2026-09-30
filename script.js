(() => {
  'use strict';

  /* ==========================================================================
     Header: scroll style + mobile nav
     ========================================================================== */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeNav = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'メニューを開く');
    navList.classList.remove('is-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
    navList.classList.toggle('is-open', !isOpen);
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  /* ==========================================================================
     Works data
     ========================================================================== */
  const works = [
    {
      id: 1,
      category: 'ホームページ',
      title: '美容サロン（マツエクサロン）のWebサイト・SNS投稿',
      scope: 'デザイン・コーディング・レスポンシブ対応',
      summary: '美容サロン（マツエクサロン）のWebサイト・SNS投稿のデザイン・コーディング・レスポンシブ対応を担当しました。',
      problem: '準備中',
      tags: ['WordPress', 'レスポンシブ'],
      image: 'img/project01.png',
      link: '#'
    },
    {
      id: 2,
      category: 'ホームページ',
      title: 'マーケティング会社のホームページ',
      scope: 'コーディング・レスポンシブ対応',
      summary: 'マーケティング会社のホームページのコーディング・レスポンシブ対応を担当しました。',
      problem: '準備中',
      tags: ['WordPress', 'レスポンシブ'],
      image: 'img/project02.png',
      link: '#'
    },
    {
      id: 3,
      category: 'ホームページ',
      title: '建築会社のホームページ',
      scope: 'デザイン・コーディング・レスポンシブ対応',
      summary: '建築会社のホームページのデザイン・コーディング・レスポンシブ対応を担当しました。',
      problem: '準備中',
      tags: ['WordPress', 'レスポンシブ'],
      image: 'img/project03.png',
      link: '#'
    },
    {
      id: 4,
      category: 'ロゴ',
      title: 'サロンのロゴ',
      scope: 'デザイン',
      summary: 'サロンのロゴのデザインを担当しました。',
      problem: '準備中',
      tags: ['Illustrator'],
      image: 'img/project04.png',
      link: '#'
    },
    {
      id: 5,
      category: 'チラシ',
      title: '相談会のチラシ',
      scope: 'デザイン',
      summary: '相談会のチラシのデザインを担当しました。',
      problem: '準備中',
      tags: ['Illustrator'],
      image: 'img/project05.png',
      link: '#'
    },
    {
      id: 6,
      category: 'バナー',
      title: 'クーポンバナー',
      scope: 'デザイン',
      summary: 'クーポンバナーのデザインを担当しました。',
      problem: '準備中',
      tags: ['Illustrator', 'Photoshop'],
      image: 'img/project06.png',
      link: '#'
    }
  ];

  const worksGrid = document.getElementById('worksGrid');

  const renderWorks = () => {
    const fragment = document.createDocumentFragment();

    works.forEach((work) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'work-card reveal';
      card.setAttribute('aria-haspopup', 'dialog');
      card.dataset.id = String(work.id);

      card.innerHTML = `
        <span class="work-card__thumb">
          <img src="${work.image}" alt="${work.title}" loading="lazy">
        </span>
        <span class="work-card__body">
          <span class="work-card__category">${work.category}</span>
          <span class="work-card__title">${work.title}</span>
          <span class="work-card__desc">${work.summary}</span>
          <span class="work-card__tags">
            ${work.tags.map((tag) => `<span class="work-card__tag">${tag}</span>`).join('')}
          </span>
        </span>
      `;

      card.addEventListener('click', () => openModal(work.id));
      fragment.appendChild(card);
    });

    worksGrid.appendChild(fragment);
  };

  /* ==========================================================================
     Modal
     ========================================================================== */
  const modal = document.getElementById('workModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalScope = document.getElementById('modalScope');
  const modalProblem = document.getElementById('modalProblem');
  const modalTags = document.getElementById('modalTags');
  const modalLink = document.getElementById('modalLink');

  let lastFocusedEl = null;

  const openModal = (id) => {
    const work = works.find((w) => w.id === id);
    if (!work) return;

    modalImg.src = work.image;
    modalImg.alt = work.title;
    modalCategory.textContent = work.category;
    modalTitle.textContent = work.title;
    modalScope.textContent = work.scope;
    modalProblem.textContent = work.problem;
    modalTags.textContent = work.tags.join(' / ');
    modalLink.href = work.link;

    lastFocusedEl = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalClose.focus();

    document.addEventListener('keydown', onModalKeydown);
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onModalKeydown);
    if (lastFocusedEl) lastFocusedEl.focus();
  };

  const onModalKeydown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);

  /* ==========================================================================
     FAQ accordion
     ========================================================================== */
  const faqQuestions = Array.from(document.querySelectorAll('.faq__question'));

  const closeFaqItem = (btn) => {
    const answer = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = null;
  };

  const openFaqItem = (btn) => {
    const answer = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', 'true');
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  };

  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      faqQuestions.forEach((other) => {
        if (other !== btn) closeFaqItem(other);
      });
      if (isOpen) {
        closeFaqItem(btn);
      } else {
        openFaqItem(btn);
      }
    });
  });

  /* ==========================================================================
     Page top button
     ========================================================================== */
  document.getElementById('pageTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================================
     Scroll reveal (IntersectionObserver)
     ========================================================================== */
  const initReveal = () => {
    const targets = document.querySelectorAll(
      '.about__content, .skill-card, .work-card, .faq__item, .contact__lead, .contact .btn'
    );
    targets.forEach((el) => el.classList.add('reveal'));

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  };

  /* ==========================================================================
     Init
     ========================================================================== */
  renderWorks();
  initReveal();
})();
