/* ============================================================
   Campbell Consultancy — Client Portal
   Shared layout partials
   ============================================================ */

const LOGO_LIGHT = 'https://campbellconsultancy.co/brand/Campbell_Consultancy_Logo_Pack/02_Horizontal/PNG_WhiteBG/horizontal-gradient-on-white-512px.png';
const LOGO_DARK  = 'https://campbellconsultancy.co/brand/Campbell_Consultancy_Logo_Pack/02_Horizontal/PNG_NavyBG/horizontal-white-on-navy-512px.png';
const SESSION_KEY = 'cc_portal_auth';
const PORTAL_ROOT = '/';

function requireAuth(root) {
  if (sessionStorage.getItem(SESSION_KEY) !== 'true') {
    window.location.href = (root || PORTAL_ROOT) + 'index.html';
  }
}

function injectTopbar({ root = '/', section = '', sectionHref = '', pageTitle = '' } = {}) {
  const el = document.getElementById('topbar');
  if (!el) return;

  let crumbs = `<a href="${root}portal.html">Portal</a>`;
  if (section) {
    crumbs += `<span class="sep">›</span>`;
    if (sectionHref && pageTitle) {
      crumbs += `<a href="${root}${sectionHref}">${section}</a>`;
      crumbs += `<span class="sep">›</span><span class="current">${pageTitle}</span>`;
    } else {
      crumbs += `<span class="current">${section}</span>`;
    }
  }

  el.innerHTML = `
    <a href="${root}portal.html" style="display:flex;align-items:center;">
      <img src="${LOGO_LIGHT}" alt="Campbell Consultancy" class="topbar-logo">
    </a>
    <nav class="topbar-nav">${crumbs}</nav>
  `;
}

function injectFooter() {
  const el = document.getElementById('footer');
  if (!el) return;
  el.innerHTML = `
    <img src="${LOGO_DARK}" alt="Campbell Consultancy" class="footer-logo">
    <span class="footer-meta">Confidential · Campbell Consultancy · campbellconsultancy.co</span>
  `;
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function isThisMonth(d) {
  const date = new Date(d), now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

async function fetchManifest() {
  try {
    const response = await fetch('https://agreements.campbellconsultancy.co/manifest.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch agreements manifest:', error);
    return null;
  }
}

async function renderAgreementsList(containerId, clientId, showDraft = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const manifest = await fetchManifest();
  if (!manifest) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><p>Unable to load agreements.</p></div>';
    return;
  }

  const client = manifest.clients.find(c => c.id === clientId);
  if (!client || !client.documents || client.documents.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">✍️</div><p>No agreements on file yet.</p></div>';
    return;
  }

  const agreements = showDraft
    ? client.documents
    : client.documents.filter(doc => doc.status === 'signed');

  if (agreements.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">✍️</div><p>No agreements on file yet.</p></div>';
    return;
  }

  const html = agreements.map((doc, idx) => `
    <a class="doc-row fade-up" href="${doc.fileUrl}" target="_blank" rel="noopener" style="animation-delay:${0.05 + idx * 0.05}s;">
      <div class="doc-icon">📋</div>
      <div class="doc-info">
        <div class="doc-title">${doc.title}</div>
        <div class="doc-date">${formatDate(doc.dateSigned || doc.dateCreated)}</div>
      </div>
      <span class="doc-tag tag-agreement">Agreement</span>
      <span class="doc-arrow">↗</span>
    </a>
  `).join('');

  container.innerHTML = `<div class="doc-list">${html}</div>`;
}

async function updateAgreementCount(countId, clientId, showDraft = false) {
  const countEl = document.getElementById(countId);
  if (!countEl) return;

  const manifest = await fetchManifest();
  if (!manifest) {
    countEl.textContent = '-';
    return;
  }

  const client = manifest.clients.find(c => c.id === clientId);
  if (!client || !client.documents) {
    countEl.textContent = '0';
    return;
  }

  const count = showDraft
    ? client.documents.length
    : client.documents.filter(doc => doc.status === 'signed').length;

  countEl.textContent = count;
}
