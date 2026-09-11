/* ================ PAGE ROUTER ================ */
function onReady(){
  const page = document.body.dataset.page;
  if (page === 'home')     initHome();
  if (page === 'cart')     initCartPage();
  if (page === 'checkout') initCheckout();
  if (page === 'tracking') initTracking();
  /* product page has its own inline script */
}

/* ================ HOME ================ */
function initHome(){
  /* Hero — pick first product with a real photo */
  const heroWrap = document.getElementById('heroVisual');
  if (heroWrap){
    const heroProduct = PRODUCTS.find(p => p.images && p.images.length) || PRODUCTS[0];
    if (heroProduct.images && heroProduct.images.length){
      heroWrap.innerHTML = `<img src="${heroProduct.images[0]}" alt="${heroProduct.name}">`;
    } else {
      heroWrap.innerHTML = bootSVG(heroProduct.colors[0]);
    }
  }

  /* Surface tiles — use a real photo per surface if available */
  const tiles = [
    { cat:'Firm Ground', code:'FG', name:'Firm Ground', sub:'Hard, dry pitches',          href:'Firm%20Ground' },
    { cat:'Soft Ground', code:'SG', name:'Soft Ground', sub:'Wet, muddy conditions',      href:'Soft%20Ground' },
    { cat:'Turf',        code:'AG', name:'Turf / AG',   sub:'Artificial grass & 5-a-side', href:'Turf' },
    { cat:'Indoor',      code:'IC', name:'Indoor',      sub:'Futsal and court surfaces',  href:'Indoor' },
  ];
  const colorByCat = {
    'Firm Ground': '#C70000',
    'Soft Ground': '#4C8A5C',
    'Turf':        '#26344A',
    'Indoor':      '#1A1A1A',
  };
  const tileWrap = document.getElementById('surfaceTiles');
  if (tileWrap){
    tileWrap.innerHTML = tiles.map(t => {
      const sample = PRODUCTS.find(p => p.category === t.cat && p.images && p.images.length);
      const art = sample
        ? `<img src="${sample.images[0]}" alt="${t.name}">`
        : bootSVG(colorByCat[t.cat] || '#C70000');
      return `
        <a class="surface-tile" href="shop.html?category=${t.href}">
          <div class="tile-art">${art}</div>
          <div class="tile-body">
            <small>${t.code}</small>
            <h3>${t.name}</h3>
            <span>${t.sub}</span>
          </div>
        </a>
      `;
    }).join('');
  }

  /* Featured products */
  const featured = PRODUCTS.filter(p => p.stock > 0).slice(0, 6);
  const grid = document.getElementById('featuredGrid');
  if (grid){
    grid.innerHTML = featured.map(cardHTML).join('');
    bindGridEvents('featuredGrid');
  }
}

/* ================ PRODUCT CARD (shared) ================ */
function cardHTML(p){
  const selColor = state.selectedColor[p.id] || p.colors[0];
  const soldOut = p.stock === 0;
  const low = p.stock > 0 && p.stock <= 4;
  const badge = soldOut
    ? '<span class="badge sold-out">Sold Out</span>'
    : low ? `<span class="badge low">Only ${p.stock} left</span>` : '';

  const primary = (p.images && p.images.length)
    ? `<img src="${p.images[0]}" alt="${p.name}" loading="lazy"
            style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;padding:24px;transition:opacity .35s;">`
    : bootSVG(selColor);

  const secondary = (p.images && p.images[1])
    ? `<img src="${p.images[1]}" alt="" loading="lazy" class="hover-img"
            style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;padding:24px;opacity:0;transition:opacity .35s;">`
    : '';

  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-media">
        ${badge}
        <a href="product.html?id=${p.id}" class="media-link" aria-label="${p.name}"></a>
        ${primary}
        ${secondary}
        <div class="quick-actions">
          <button class="quick-add" data-quick="${p.id}" ${soldOut ? 'disabled' : ''}>
            ${soldOut ? 'Sold Out' : 'Select Options'}
          </button>
          <a class="quick-view-btn" href="product.html?id=${p.id}" title="Quick view" aria-label="Quick view">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
        </div>
      </div>
      <div class="product-info">
        <div class="product-vendor">${p.brand}</div>
        <a href="product.html?id=${p.id}" class="product-title">${p.name}</a>
        <div class="product-price">${fmtZAR(p.price)}</div>
        <div class="color-swatches">
          ${p.colors.map(c => `
            <span style="background:${c}; ${c === selColor ? 'outline:2px solid #C70000; outline-offset:1px;' : ''}"
                  data-swatch="${c}" data-pid="${p.id}"></span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function bindGridEvents(id){
  const grid = document.getElementById(id);
  if (!grid) return;
  grid.addEventListener('click', e => {
    /* Swatch click → change colour in place */
    const swatch = e.target.closest('[data-swatch]');
    if (swatch){
      e.preventDefault();
      e.stopPropagation();
      const pid = swatch.dataset.pid;
      state.selectedColor[pid] = swatch.dataset.swatch;
      saveState();
      const card = swatch.closest('.product-card');
      card.outerHTML = cardHTML(findProduct(pid));
      return;
    }
    /* Quick add → go to product page for size selection */
    const qa = e.target.closest('[data-quick]');
    if (qa && !qa.disabled){
      e.preventDefault();
      e.stopPropagation();
      location.href = `product.html?id=${qa.dataset.quick}`;
    }
  });
}

/* ================ CART PAGE ================ */
function initCartPage(){
  const wrap = document.getElementById('cartPage');
  if (!wrap) return;

  const renderPage = () => {
    if (state.cart.length === 0){
      wrap.innerHTML = `<div class="empty-state" style="padding:100px 20px;">
        <h3>Your cart is empty</h3>
        <p style="margin-top:14px;">
          <a href="shop.html" style="color:var(--red);text-decoration:underline;font-weight:700;">Continue shopping →</a>
        </p>
      </div>`;
      return;
    }
    const sub = cartSubtotal();
    const del = deliveryFee(sub);
    const total = sub + del;

    wrap.innerHTML = `
      <div class="cart-page">
        <div>
          <h2 style="font-size:16px;text-transform:uppercase;letter-spacing:1px;margin-bottom:24px;">
            Shopping Cart (${cartCount()})
          </h2>
          ${state.cart.map((item, idx) => {
            const p = findProduct(item.id);
            return `
              <div class="cart-line" data-idx="${idx}">
                <a class="cart-line-media" href="product.html?id=${p.id}" style="display:flex;align-items:center;justify-content:center;">
                  ${productImageHTML(p, item.color)}
                </a>
                <div class="cart-line-info">
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
          }).join('')}
        </div>
        <aside class="summary">
          <h3>Order Summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>${fmtZAR(sub)}</span></div>
          <div class="summary-row"><span>Delivery</span><span>${del === 0 ? 'Free' : fmtZAR(del)}</span></div>
          <div class="summary-row total"><span>Total</span><span>${fmtZAR(total)}</span></div>
          <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
          <a href="shop.html" style="display:block;text-align:center;margin-top:14px;font-size:12px;color:var(--muted);text-decoration:underline;">Continue shopping</a>
        </aside>
      </div>`;

    wrap.querySelectorAll('[data-qty]').forEach(b => b.addEventListener('click', () => {
      const row = b.closest('.cart-line');
      const idx = Number(row.dataset.idx);
      state.cart[idx].qty += Number(b.dataset.qty);
      if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
      saveState(); updateCartBadge(); renderPage();
    }));
    wrap.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
      const row = b.closest('.cart-line');
      const idx = Number(row.dataset.idx);
      state.cart.splice(idx, 1);
      saveState(); updateCartBadge(); renderPage();
    }));
  };
  renderPage();
}

/* ================ CHECKOUT ================ */
function initCheckout(){
  const wrap = document.getElementById('checkoutWrap');
  if (!wrap) return;

  if (state.cart.length === 0){
    wrap.innerHTML = `<div class="empty-state" style="padding:100px 20px;">
      <h3>Your cart is empty</h3>
      <p style="margin-top:14px;"><a href="shop.html" style="color:var(--red);text-decoration:underline;font-weight:700;">Go shopping →</a></p>
    </div>`;
    return;
  }

  const sub = cartSubtotal();
  const del = deliveryFee(sub);
  const total = sub + del;

  wrap.innerHTML = `
    <div class="cart-page">
      <form class="checkout-form" id="checkoutForm">
        <h3>Delivery Details</h3>
        <div class="form-row">
          <label>Full Name <input name="name" required></label>
          <label>Email <input name="email" type="email" required></label>
        </div>
        <div class="form-row">
          <label>Phone <input name="phone" required></label>
          <label>Postal Code <input name="postal" required></label>
        </div>
        <label>Address <input name="address" required></label>
        <label>City <input name="city" required></label>

        <h3>Payment</h3>
        <label>Card Number <input name="card" placeholder="4242 4242 4242 4242" required></label>
        <div class="form-row">
          <label>Expiry <input name="expiry" placeholder="MM/YY" required></label>
          <label>CVV <input name="cvv" placeholder="123" required></label>
        </div>

        <button type="submit" class="add-to-cart-lg" id="placeOrderBtn" style="margin-top:24px;">
          Place Order · ${fmtZAR(total)}
        </button>
      </form>

      <aside class="summary">
        <h3>Your Order</h3>
        ${state.cart.map(i => {
          const p = findProduct(i.id);
          return `
            <div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid var(--line);align-items:center;">
              <div style="width:64px;height:64px;flex:none;background:#fff;padding:6px;display:flex;align-items:center;justify-content:center;">
                ${productImageHTML(p, i.color)}
              </div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;color:var(--ink);">${p.name}</div>
                <div style="font-size:11px;color:var(--muted);margin-top:2px;">Size ${i.size} · Qty ${i.qty}</div>
              </div>
              <div style="font-size:13px;font-weight:700;">${fmtZAR(p.price * i.qty)}</div>
            </div>`;
        }).join('')}
        <div class="summary-row" style="margin-top:16px;"><span>Subtotal</span><span>${fmtZAR(sub)}</span></div>
        <div class="summary-row"><span>Delivery</span><span>${del === 0 ? 'Free' : fmtZAR(del)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${fmtZAR(total)}</span></div>
      </aside>
    </div>`;

  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('placeOrderBtn');
    btn.disabled = true;
    btn.innerHTML = spinnerSVG() + ' Placing Order';
    const customer = Object.fromEntries(new FormData(e.target).entries());
    fakeRequest({cart: state.cart, customer}).then(() => {
      const orderId = 'BR-' + Math.floor(100000 + Math.random()*900000);
      const order = {
        id: orderId,
        placed: new Date().toISOString(),
        status: 'processing',
        customer,
        items: state.cart.slice(),
        subtotal: sub, delivery: del, total
      };
      state.orders = state.orders || [];
      state.orders.unshift(order);
      state.cart = [];
      saveState(); updateCartBadge();

      wrap.innerHTML = `
        <div class="summary" style="max-width:620px;margin:60px auto;text-align:center;padding:56px 40px;">
          <div style="width:60px;height:60px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;color:#fff;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style="font-size:24px;margin-bottom:12px;">Order Placed</h2>
          <p style="color:var(--muted);margin-bottom:6px;">We're prepping your boots for dispatch.</p>
          <p style="color:var(--muted);">A confirmation has been sent to ${customer.email}.</p>
          <div style="font-size:16px;font-weight:700;color:var(--red);margin:24px 0;letter-spacing:1px;">${orderId}</div>
          <a href="tracking.html?order=${orderId}" class="btn-primary" style="margin-right:10px;">Track Order</a>
          <a href="shop.html" class="btn-secondary">Continue Shopping</a>
        </div>`;
    });
  });
}

/* ================ TRACKING ================ */
function initTracking(){
  const params = new URLSearchParams(location.search);
  const prefill = params.get('order');
  const form = document.getElementById('trackForm');
  const result = document.getElementById('trackResult');
  if (!form || !result) return;

  if (prefill){
    form.querySelector('input').value = prefill;
    setTimeout(() => form.dispatchEvent(new Event('submit')), 80);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const id = form.querySelector('input').value.trim().toUpperCase();
    const order = (state.orders || []).find(o => o.id === id);
    result.innerHTML = `<div class="empty-state">Looking up ${id}…</div>`;
    fakeRequest({orderId:id}).then(() => {
      if (!order){
        result.innerHTML = `<div class="empty-state"><h3>Order not found</h3><p>We couldn't find an order with that ID. Check your confirmation email.</p></div>`;
        return;
      }
      const steps = ['processing','packed','dispatched','delivered'];
      const current = steps.indexOf(order.status);
      const labels = {processing:'Processing', packed:'Packed', dispatched:'Dispatched', delivered:'Delivered'};
      result.innerHTML = `
        <div class="track-panel">
          <div class="track-head">
            <div>
              <div class="label">Order ${order.id}</div>
              <h2>${fmtZAR(order.total)} · ${order.items.reduce((s,i)=>s+i.qty,0)} items</h2>
            </div>
            <div class="track-status">${labels[order.status]}</div>
          </div>
          <div class="track-steps">
            ${steps.map((s,i)=>`
              <div class="track-step ${i<=current?'done':''}">
                <div class="dot"></div>
                <div class="lbl">${labels[s]}</div>
              </div>`).join('')}
          </div>
          ${order.items.map(i => {
            const p = findProduct(i.id);
            return `
              <div style="display:flex;gap:14px;padding:12px 0;border-top:1px solid var(--line);align-items:center;">
                <div style="width:70px;height:70px;flex:none;background:#fff;padding:6px;display:flex;align-items:center;justify-content:center;">
                  ${productImageHTML(p, i.color)}
                </div>
                <div style="flex:1;">
                  <div style="font-size:13px;font-weight:700;">${p.name}</div>
                  <div style="font-size:12px;color:var(--muted);margin-top:2px;">Size ${i.size} · Qty ${i.qty}</div>
                </div>
                <div style="font-size:13px;font-weight:700;">${fmtZAR(p.price * i.qty)}</div>
              </div>`;
          }).join('')}
        </div>`;
    });
  });
}