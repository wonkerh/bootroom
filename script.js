/* ---------------- BOOT SVG RENDERER (fallback) ---------------- */
let bootUid = 0;
function shade(hex, amt){
  const n = parseInt(hex.replace('#',''), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 0xff) + amt, b = (n & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + (r.toString(16).padStart(2,'0')) + (g.toString(16).padStart(2,'0')) + (b.toString(16).padStart(2,'0'));
}
function bootSVG(color){
  const uid = 'b' + (bootUid++);
  const light = shade(color, 40), dark = shade(color, -50), sole = shade(color, -70);
  const isPale = (()=>{ const n=parseInt(color.replace('#',''),16); const r=(n>>16)&255,g=(n>>8)&255,b=n&255; return (0.299*r+0.587*g+0.114*b)>170; })();
  const stitch = isPale ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.28)';
  return `
  <svg viewBox="0 0 300 220" width="100%">
    <defs>
      <linearGradient id="${uid}-upper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${light}"/><stop offset="55%" stop-color="${color}"/><stop offset="100%" stop-color="${dark}"/>
      </linearGradient>
      <linearGradient id="${uid}-sole" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${shade(sole,20)}"/><stop offset="100%" stop-color="${sole}"/>
      </linearGradient>
      <radialGradient id="${uid}-sheen" cx="35%" cy="20%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/><stop offset="45%" stop-color="#ffffff" stop-opacity="0.08"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="150" cy="196" rx="112" ry="9" fill="#000" opacity="0.12"/>
    <path d="M42 176 C42 168 48 163 58 162 L226 150 C238 149 246 154 248 163 C250 172 244 180 232 182 L58 190 C48 191 42 184 42 176 Z" fill="url(#${uid}-sole)"/>
    <g fill="${shade(sole,-15)}">
      <circle cx="66" cy="177" r="3.4"/><circle cx="92" cy="174" r="3.4"/><circle cx="120" cy="170" r="3.4"/>
      <circle cx="150" cy="167" r="3.4"/><circle cx="180" cy="163" r="3.4"/><circle cx="208" cy="160" r="3.4"/><circle cx="230" cy="158" r="3"/>
    </g>
    <path d="M44 168 C44 160 50 155 60 154 L222 143 C233 142 240 147 242 155" fill="none" stroke="${shade(sole,25)}" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
    <path d="M44 168 C40 148 46 126 62 113 C56 128 56 148 62 164 Z" fill="${dark}"/>
    <path d="M62 164 C56 122 84 82 132 68 C168 58 202 66 222 88 C236 104 240 126 230 142 C224 151 200 156 150 160 C112 163 78 165 62 164 Z" fill="url(#${uid}-upper)"/>
    <path d="M62 164 C56 122 84 82 132 68 C168 58 202 66 222 88 C236 104 240 126 230 142 C224 151 200 156 150 160 C112 163 78 165 62 164 Z" fill="url(#${uid}-sheen)"/>
    <path d="M62 164 C58 138 66 112 90 94 C82 116 80 140 86 160 Z" fill="${dark}" opacity="0.55"/>
    <path d="M66 108 C82 96 104 90 122 89" fill="none" stroke="${stitch}" stroke-width="1.6" stroke-dasharray="3 3" stroke-linecap="round"/>
    <path d="M118 92 C150 82 184 86 206 100 C188 96 158 96 132 104 C122 107 116 100 118 92 Z" fill="${shade(color,14)}" opacity="0.9"/>
    <g stroke="${isPale ? '#2a2a2a' : '#ffffff'}" stroke-width="2.4" stroke-linecap="round" opacity="0.85">
      <line x1="126" y1="93" x2="148" y2="103"/><line x1="140" y1="90" x2="162" y2="100"/><line x1="154" y1="88" x2="176" y2="98"/><line x1="168" y1="88" x2="190" y2="97"/><line x1="182" y1="90" x2="200" y2="99"/>
    </g>
    <g fill="${shade(sole,10)}">
      <circle cx="126" cy="93" r="2"/><circle cx="140" cy="90" r="2"/><circle cx="154" cy="88" r="2"/><circle cx="168" cy="88" r="2"/><circle cx="182" cy="90" r="2"/>
    </g>
    <path d="M218 90 C232 96 238 112 232 128 C238 116 236 100 222 88 Z" fill="${shade(color,-10)}" opacity="0.8"/>
    <path d="M96 138 C130 128 168 126 206 132" fill="none" stroke="${shade(color, isPale ? -90 : 90)}" stroke-width="4.2" stroke-linecap="round" opacity="0.5"/>
  </svg>`;
}

function spinnerSVG(){ return `<svg class="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="9" stroke-opacity="0.3"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>`; }
function checkSVG(){ return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`; }

/* ---------------- SHARED HEADER / FOOTER / DRAWER ---------------- */
function injectHeader(active){
  const el = document.getElementById('siteHeader');
  if(!el) return;
  el.innerHTML = `
  <div class="announcement">
    <a href="shop.html"><strong>Delivery Options</strong></a> — Free delivery on orders R750+
  </div>
  <header>
    <div class="wrap">
      <div class="header-top">
        <a href="index.html" class="logo">BOOT<span>ROOM</span></a>
        <form class="header-search" onsubmit="event.preventDefault(); doSearch();">
          <input id="navSearch" type="text" placeholder="What are you looking for?">
          <button type="submit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Search
          </button>
        </form>
        <div class="header-icons">
          <a href="tracking.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            Track
          </a>
          <a href="#" onclick="event.preventDefault(); openCart();" style="position:relative;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L4 2H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
            Bag
            <span class="cart-count" id="cartCount">0</span>
          </a>
        </div>
      </div>
    </div>
    <div class="nav-bar">
      <div class="wrap">
        <ul class="nav-list">
          <li class="${active==='home'?'active':''}">
            <a href="index.html">Home</a>
          </li>
          <li class="${active==='shop'?'active':''}">
            <a href="shop.html">Soccer Boots</a>
            <div class="mega">
              <div class="mega-col">
                <h4>By Surface</h4>
                <ul>
                  <li><a href="shop.html?category=Firm%20Ground">Firm Ground (FG)</a></li>
                  <li><a href="shop.html?category=Soft%20Ground">Soft Ground (SG)</a></li>
                  <li><a href="shop.html?category=Turf">Turf / AG</a></li>
                  <li><a href="shop.html?category=Indoor">Indoor (IC)</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h4>By Brand</h4>
                <ul>
                  <li><a href="shop.html?brand=Nike">Nike</a></li>
                  <li><a href="shop.html?brand=Adidas">Adidas</a></li>
                  <li><a href="shop.html?brand=Puma">Puma</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h4>Collections</h4>
                <ul>
                  <li><a href="shop.html">All Boots</a></li>
                  <li><a href="shop.html?sort=price-ascending">Under R1,500</a></li>
                  <li><a href="shop.html?sort=created-descending">New Arrivals</a></li>
                </ul>
              </div>
            </div>
          </li>
          <li><a href="shop.html?brand=Nike">Nike</a></li>
          <li><a href="shop.html?brand=Adidas">Adidas</a></li>
          <li><a href="shop.html?brand=Puma">Puma</a></li>
          <li class="sale"><a href="shop.html?sort=price-ascending">Sale</a></li>
          <li><a href="tracking.html">Track Order</a></li>
        </ul>
      </div>
    </div>
  </header>`;

  const search = document.getElementById('navSearch');
  if(search){
    search.addEventListener('input', e=>{
      state.search = e.target.value.trim().toLowerCase();
      if(location.pathname.endsWith('shop.html')){
        if(typeof render === 'function') render();
      } else {
        clearTimeout(window.__sTimer);
        window.__sTimer = setTimeout(()=>{ location.href = 'shop.html?q=' + encodeURIComponent(e.target.value); }, 500);
      }
    });
  }
}

function doSearch(){
  const q = document.getElementById('navSearch').value;
  location.href = 'shop.html?q=' + encodeURIComponent(q);
}

function injectFooter(){
  const el = document.getElementById('siteFooter');
  if(!el) return;
  el.innerHTML = `
  <div class="trust-bar">
    <div class="wrap">
      <a href="#">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        Like Us
      </a>
      <a href="#">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        Follow Us
      </a>
    </div>
  </div>
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-col">
          <h4>Client Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Delivery Options</a></li>
            <li><a href="#">Returns Policy</a></li>
            <li><a href="tracking.html">Track Your Parcel</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Visit Us</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h4>Exclusive</h4>
          <ul>
            <li><a href="shop.html?sort=price-ascending">Sale Bin</a></li>
            <li><a href="shop.html?sort=created-descending">New Arrivals</a></li>
            <li><a href="#">Gift Card</a></li>
            <li><a href="#">Momentum Multiply</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h4>Collections</h4>
          <ul>
            <li><a href="shop.html">Soccer Boots</a></li>
            <li><a href="shop.html?category=Firm%20Ground">Firm Ground</a></li>
            <li><a href="shop.html?category=Soft%20Ground">Soft Ground</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h4 style="color:var(--red);">BOOTROOM</h4>
          <p><strong>Need Help?</strong></p>
          <p>021 010 0915</p>
          <p><em>Mon–Fri, 9am–5pm</em></p>
          <p>info@bootroom.co.za</p>
        </div>
      </div>
      <div class="foot-payments">
        <span>Mastercard</span><span>Visa</span><span>PayFast</span><span>Ozow</span>
        <span>Peach</span><span>PayFlex</span><span>Mobicred</span><span>SnapScan</span>
        <span>Zapper</span><span>PayPal</span>
      </div>
      <div class="foot-copy">
        © 2026 BOOTROOM. All rights reserved.
      </div>
    </div>
  </footer>`;
}

function injectDrawer(){
  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay"></div>
    <div class="drawer" id="cartDrawer">
      <div class="drawer-head">
        <h3>Shopping Cart <span id="drawerCount" style="color:var(--muted);font-weight:400;">(0)</span></h3>
        <button class="close" id="closeCart">&times;</button>
      </div>
      <div class="drawer-body" id="cartBody"></div>
      <div class="drawer-footer" id="cartFooter"></div>
    </div>`);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('overlay').addEventListener('click', closeCart);
  document.getElementById('cartBody').addEventListener('click', e=>{
    const qty = e.target.closest('[data-qty]');
    const rm  = e.target.closest('[data-remove]');
    const row = e.target.closest('.cart-item');
    if(!row) return;
    const idx = Number(row.dataset.idx);
    if(qty){
      state.cart[idx].qty += Number(qty.dataset.qty);
      if(state.cart[idx].qty <= 0) state.cart.splice(idx,1);
    }
    if(rm) state.cart.splice(idx,1);
    saveState(); updateCartBadge(); renderCart();
  });
}
function openCart(){ document.getElementById('overlay').classList.add('open'); document.getElementById('cartDrawer').classList.add('open'); renderCart(); }
function closeCart(){ document.getElementById('overlay').classList.remove('open'); document.getElementById('cartDrawer').classList.remove('open'); }

function updateCartBadge(){
  const el = document.getElementById('cartCount');
  if(el) el.textContent = cartCount();
  const dc = document.getElementById('drawerCount');
  if(dc) dc.textContent = `(${cartCount()})`;
}

function renderCart(){
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if(!body) return;
  if(state.cart.length === 0){
    body.innerHTML = `<div class="empty-state"><h3>Your cart is empty</h3><p>Continue shopping to add items.</p></div>`;
    footer.innerHTML = '';
    return;
  }
  body.innerHTML = state.cart.map((item,idx)=>{
    const p = findProduct(item.id);
    return `
      <div class="cart-item" data-idx="${idx}">
        <div class="cart-item-media">${productImageHTML(p, item.color)}</div>
        <div class="cart-item-info">
          <div class="name">${p.name}</div>
          <div class="meta">${p.brand.toUpperCase()} · Size ${item.size}</div>
          <div class="qty-row">
            <button class="qty-btn" data-qty="-1">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-qty="1">+</button>
            <span class="remove-link" data-remove>Remove</span>
          </div>
        </div>
        <div class="cart-line-price">${fmtZAR(p.price * item.qty)}</div>
      </div>`;
  }).join('');
  const sub = cartSubtotal();
  const del = deliveryFee(sub);
  footer.innerHTML = `
    <div class="summary-row"><span>Subtotal</span><span>${fmtZAR(sub)}</span></div>
    <div class="summary-row"><span>Delivery</span><span>${del === 0 ? 'Free' : fmtZAR(del)}</span></div>
    <a href="checkout.html" class="checkout-btn">Checkout</a>
    <a href="cart.html" style="display:block;text-align:center;margin-top:12px;font-size:12px;color:var(--muted);text-decoration:underline;">View cart</a>`;
}

/* ---------------- ADD TO CART ---------------- */
function addToCart(id, btn, size){
  const product = findProduct(id);
  const color = state.selectedColor[id] || product.colors[0];
  const chosenSize = size || state.selectedSize[id] || product.sizes[Math.floor(product.sizes.length/2)];
  if(btn){
    btn.disabled = true;
    const original = btn.innerHTML;
    btn.innerHTML = spinnerSVG();
    fakeRequest({id, color, size:chosenSize}).then(()=>{
      commitAdd(id, color, chosenSize);
      btn.classList.add('done');
      btn.innerHTML = checkSVG() + ' Added';
      updateCartBadge();
      setTimeout(()=>{
        btn.classList.remove('done');
        btn.disabled = false;
        btn.innerHTML = original;
      }, 1100);
    });
  } else {
    commitAdd(id, color, chosenSize);
    updateCartBadge();
    openCart();
  }
}
function commitAdd(id, color, size){
  const existing = state.cart.find(i=>i.id===id && i.color===color && i.size===size);
  if(existing) existing.qty++;
  else state.cart.push({id, color, size, qty:1});
  saveState();
}
function fakeRequest(payload){
  return new Promise(r=>setTimeout(()=>r({ok:true, payload}), 400 + Math.random()*300));
}

/* ---------------- INIT ---------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  injectHeader(document.body.dataset.page || '');
  injectFooter();
  injectDrawer();
  updateCartBadge();
  if(typeof onReady === 'function') onReady();
});