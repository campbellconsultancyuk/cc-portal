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
