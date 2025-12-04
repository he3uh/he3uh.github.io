document.addEventListener('DOMContentLoaded', () => { init(); secure(); });

function init() {
    const navs = document.querySelectorAll('.nav-item');
    navs.forEach(n => {
        n.addEventListener('click', (e) => {
            e.preventDefault();
            const t = e.currentTarget.getAttribute('href').substring(1);
            swPg(t);
        });
    });

    updt();
    setInterval(updt, 1000);

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.matchMedia('(hover: hover)').matches && !rm) {
        const pnls = document.querySelectorAll('.glass-panel');
        pnls.forEach(p => {
            p.addEventListener('mousemove', tilt);
            p.addEventListener('mouseleave', rstT);
        });
    }

    const nxt = document.querySelector('.nav-next');
    if (nxt) {
        nxt.addEventListener('click', (e) => {
            e.preventDefault();
            const ns = Array.from(document.querySelectorAll('.nav-item'));
            const i = ns.findIndex(x => x.classList.contains('active'));
            const j = (i + 1) % ns.length;
            const t = ns[j].getAttribute('href').substring(1);
            swPg(t);
        });
    }
}

function secure() {
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U') ||
            (e.ctrlKey && e.key === 'c') ||
            (e.ctrlKey && e.key === 'p') ||
            e.key === 'PrintScreen'
        ) {
            e.preventDefault();
        }
    });

    document.addEventListener('copy', (e) => { e.preventDefault(); });
    document.addEventListener('cut', (e) => { e.preventDefault(); });
    document.addEventListener('dragstart', (e) => { e.preventDefault(); });
    document.querySelectorAll('img').forEach(i => i.setAttribute('draggable', 'false'));
}

function swPg(id) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[href="#${id}"]`).classList.add('active');

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const tgt = document.getElementById(id);
    if (tgt) tgt.classList.add('active');
}

function updt() {
    const now = new Date();
    const cy = now.getFullYear();
    let bd = new Date(cy, 4, 1);

    if (now > bd) bd = new Date(cy + 1, 4, 1);

    const diff = bd - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    setT('d', d); setT('h', h); setT('m', m);
}

function setT(id, v) {
    const el = document.getElementById(id);
    if (el) el.innerText = v < 10 ? '0' + v : v;
}

function tilt(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rx = (y - cy) / 30;
    const ry = (cx - x) / 30;

    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
}

function rstT(e) { e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'; }
