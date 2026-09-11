/* ---------------- PRODUCT DATA ---------------- */
const PRODUCTS = [
  { id:'p1', brand:'Nike', name:'Mercurial Superfly 11 Pro White/Bright Crimson', category:'Firm Ground', tag:'FG', price:3499, stock:5,
    colors:['#C70000','#FFFFFF','#1A1A1A'], sizes:['UK7','UK8','UK9','UK10','UK11'],
    images:['images/Nike Mercurial Superfly 11 1.jpg','images/Nike Mercurial Superfly 11 2.jpg'],
    desc:'Designed to unleash next-level speed, the Superfly 11 Pro\'s springy Air Zoom cushioning helps you create separation in open spaces.' },

  { id:'p2', brand:'Nike', name:'Mercurial Superfly 11 Academy White/Bright Crimson', category:'Firm Ground', tag:'FG', price:1899, stock:4,
    colors:['#FFFFFF','#C70000'], sizes:['UK7','UK8','UK9','UK10'],
    images:['images/Nike Mercurial Superfly 11 2.jpg','images/Nike Mercurial Superfly 11 1.jpg'],
    desc:'Designed to fuel fast sprints, the Superfly 11 Academy\'s soft NikeSkin upper has you ready for takeoff.' },

  { id:'p3', brand:'Nike', name:'Jr. Phantom 6 Low Academy Bright Crimson', category:'Firm Ground', tag:'FG', price:1299, stock:6,
    colors:['#C70000','#1A1A1A'], sizes:['UK2.5','UK3.5','UK4.5','UK5'],
    images:['images/SportSAShoeBackgroundTemplate-2026 3.jpg','images/SportSAShoeBackgroundTemplate-2026 4.jpg'],
    desc:'Level up your accuracy with the Phantom 6 Academy. It powers your precision with a NikeSkin touch zone.' },

  { id:'p4', brand:'Nike', name:'Mercurial Vapor 17 Academy Bright Crimson/Blur', category:'Firm Ground', tag:'FG', price:1799, stock:5,
    colors:['#C70000','#26344A'], sizes:['UK7','UK8','UK9','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08-17T124926.152_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-08-17T124411.931_5000x.jpg'],
    desc:'Designed to spark quick sprints, the Vapor 17 Academy\'s soft NikeSkin upper has you ready for takeoff.' },

  { id:'p5', brand:'Nike', name:'Jr. Mercurial Superfly 11 Academy White', category:'Firm Ground', tag:'FG', price:1499, stock:8,
    colors:['#FFFFFF','#C70000'], sizes:['UK2.5','UK3.5','UK4.5','UK5'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08-17T124905.839_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-08-17T124942.920_5000x.jpg'],
    desc:'Designed to fuel fast sprints, the Superfly 11 Academy\'s soft, laceless NikeSkin upper has you ready for takeoff.' },

  { id:'p6', brand:'Puma', name:'Future 9 Match Advanced Level FG/AG', category:'Firm Ground', tag:'FG', price:2099, stock:3,
    colors:['#FFFFFF','#4C8A5C'], sizes:['UK7','UK8','UK9','UK10'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08 4.jpg','images/SportSAShoeBackgroundTemplate-2026-08 5.jpg'],
    desc:'Create your own football destiny in these FUTURE 9 MATCH boots. Soft and supportive.' },

  { id:'p7', brand:'Nike', name:'Mercurial Superfly 11 Academy Kylian Mbappé Gold', category:'Firm Ground', tag:'FG', price:1999, stock:5,
    colors:['#D4AF37','#4C8A5C'], sizes:['UK7','UK8','UK9','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08-17T133046.104_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-08-17T133215.438_5000x.jpg'],
    desc:'Inspired by Kylian\'s speed-forged legacy. This gold boot is embellished with maker\'s marks.' },

  { id:'p8', brand:'Puma', name:'Future 9 Match MxSG Black Intense Mint', category:'Soft Ground', tag:'SG', price:2099, stock:6,
    colors:['#1A1A1A','#4C8A5C'], sizes:['UK8','UK9','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08-17T133030.751_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-08-17T133103.230_5000x.jpg'],
    desc:'Unleash your creative playmaking with PUMA FUTURE 9 Match MxSG.' },

  { id:'p9', brand:'Puma', name:'Future 9 Match MxSG Sugared Almond', category:'Soft Ground', tag:'SG', price:2099, stock:5,
    colors:['#E8D5B7','#1A1A1A'], sizes:['UK8','UK9','UK10'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08-17T133153.033_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-08-17T133046.104_5000x.jpg'],
    desc:'Unleash your creative playmaking with PUMA FUTURE 9 Match MxSG.' },

  { id:'p10', brand:'Puma', name:'Ultra Nitro 7 Match MxSG Ultra Red', category:'Soft Ground', tag:'SG', price:2099, stock:7,
    colors:['#C70000','#FFFFFF'], sizes:['UK7','UK8','UK9','UK10','UK12'],
    images:['images/SportSAShoeBackgroundTemplate-2026-07-24T133610.587_5000x.jpg','images/puma__pum-109115-01__sideview02_5000x.webp'],
    desc:'Supercharge your game when you fly in lightweight ULTRA NITRO 7 MATCH boots.' },

  { id:'p11', brand:'Adidas', name:'Predator Elite Firm Ground', category:'Firm Ground', tag:'FG', price:4499, stock:8,
    colors:['#C70000','#1A1A1A','#FFFFFF'], sizes:['UK7','UK8','UK9','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026-07-22T112850.587_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-07-22T112913.215_5000x.jpg'],
    desc:'HybridTouch 2.0 upper with raised rubber Strike Zone for swerve and power.' },

  { id:'p12', brand:'Adidas', name:'F50 Hyperfast Elite Soft Ground Solar Turbo', category:'Soft Ground', tag:'SG', price:4999, stock:4,
    colors:['#F5A623','#1A1A1A','#D4AF37'], sizes:['UK8','UK9','UK10'],
    images:['images/SportSAShoeBackgroundTemplate-2026-07-08T150935.622_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-07-08T151215.167_800x.jpg'],
    desc:'Unleash determination on the pitch with the F50 Hyperfast Elite Soft Ground Football Boots.' },

  { id:'p13', brand:'Nike', name:'Mercurial Superfly 11 Elite Multi-Color', category:'Firm Ground', tag:'FG', price:5899, stock:3,
    colors:['#C70000','#4C8A5C','#26344A'], sizes:['UK8','UK9','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08-17T124958.940_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-08-17T124411.931_5000x.jpg'],
    desc:'The Superfly 11 Elite is unbelievably fast.' },

  { id:'p14', brand:'Adidas', name:'F50 Hyperfast Club Kids Solar Turbo', category:'Firm Ground', tag:'FG', price:899, stock:6,
    colors:['#F5A623','#1A1A1A'], sizes:['UK2','UK4'],
    images:['images/SportSAShoeBackgroundTemplate-2026-07-08T151149.224_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026-07-08T151117.268_5000x.jpg'],
    desc:'Unleash energy and ignite play with the F50 Hyperfast Club Firm-Ground / Multi-Ground Boots.' },

  { id:'p15', brand:'Adidas', name:'Predator League Fold-Over Tongue FG', category:'Firm Ground', tag:'FG', price:1999, stock:9,
    colors:['#F5A623','#1A1A1A','#C0C0C0'], sizes:['UK7','UK8','UK9','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026 3.jpg','images/SportSAShoeBackgroundTemplate-2026 4.jpg'],
    desc:'Step onto the pitch with confidence in the Predator League Fold-Over Tongue Firm-Ground Football Boots.' },

  { id:'p16', brand:'Adidas', name:'F50 Hyperfast League Firm Ground Solar Turbo', category:'Firm Ground', tag:'FG', price:1799, stock:4,
    colors:['#F5A623','#1A1A1A'], sizes:['UK8','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026 5.jpg','images/SportSAShoeBackgroundTemplate-2026 3.jpg'],
    desc:'Unleash your speed and stir up chaos on the pitch with the F50 Hyperfast League Firm Ground Football Boots.' },

  { id:'p17', brand:'Adidas', name:'Predator Club Fold-Over Tongue FG/MG', category:'Firm Ground', tag:'FG', price:1399, stock:11,
    colors:['#F5A623','#C0C0C0','#1A1A1A'], sizes:['UK7','UK8','UK9','UK10','UK11'],
    images:['images/Nike Mercurial Superfly 11 1.jpg','images/Nike Mercurial Superfly 11 2.jpg'],
    desc:'Take control on the pitch in the Predator Club Fold-Over Tongue Firm Ground/Multi Ground Football Boots.' },

  { id:'p18', brand:'Adidas', name:'Predator Club Kids Solar Turbo', category:'Firm Ground', tag:'FG', price:999, stock:7,
    colors:['#F5A623','#C0C0C0'], sizes:['UK2','UK3','UK4','UK5'],
    images:['images/SportSAShoeBackgroundTemplate-2026 4.jpg','images/SportSAShoeBackgroundTemplate-2026 5.jpg'],
    desc:'Watch them step out and shine in the Predator Club Fold-Over Tongue Firm-Ground/Multi-Ground Football Boots.' },

  { id:'p19', brand:'Adidas', name:'Predator Pro Fold Over Tongue FG Solar Turbo', category:'Firm Ground', tag:'FG', price:3499, stock:5,
    colors:['#F5A623','#1A1A1A'], sizes:['UK8','UK9','UK10','UK11'],
    images:['images/SportSAShoeBackgroundTemplate-2026-07-08T150935.622_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026 3.jpg'],
    desc:'Take control in front of the goal in the adidas Predator Pro Fold-Over Tongue Firm Ground Football Boots.' },

  { id:'p20', brand:'Puma', name:'Future 9 Play MxSG Junior Sugared Almond', category:'Soft Ground', tag:'SG', price:1099, stock:8,
    colors:['#E8D5B7','#1A1A1A'], sizes:['UK2','UK3','UK4','UK5'],
    images:['images/puma__pum-109115-01__backview_5000x.jpg','images/puma__pum-109115-01__sideview02_5000x.webp'],
    desc:'Playmakers, unleash your creativity with FUTURE 9 PLAY Jr.' },

  { id:'p21', brand:'Puma', name:'Ultra 7 Play FG/AG Junior Ultra Red', category:'Firm Ground', tag:'FG', price:1099, stock:6,
    colors:['#C70000','#1A1A1A'], sizes:['UK2','UK3','UK4','UK5'],
    images:['images/SportSAShoeBackgroundTemplate-2026-07-24T133610.587_5000x.jpg','images/SportSAShoeBackgroundTemplate-2026 5.jpg'],
    desc:'Not even you knew you could be this fast. The lightweight synthetic upper keeps you locked in.' },

  { id:'p22', brand:'Puma', name:'Future 9 Pro MxSG Sugared Almond', category:'Soft Ground', tag:'SG', price:3099, stock:3,
    colors:['#E8D5B7','#1A1A1A'], sizes:['UK8','UK8.5','UK9','UK10'],
    images:['images/SportSAShoeBackgroundTemplate-2026-08-17T133153.033_5000x.jpg','images/puma__pum-109115-01__sideview02_5000x.webp'],
    desc:'Everything else can be taught. Creativity? That\'s all you. Unleash your playmaking skills with FUTURE 9 PRO.' },
];

/* ---------------- STATE ---------------- */
function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem('bootroom_state') || '{}');
    return {
      search:'', category:'All', brand:'All', sort:'created-descending',
      priceMin:null, priceMax:null, sizes:[],
      selectedColor:{}, selectedSize:{}, cart:[], orders:[],
      ...saved
    };
  }catch(e){
    return { search:'', category:'All', brand:'All', sort:'created-descending',
      priceMin:null, priceMax:null, sizes:[],
      selectedColor:{}, selectedSize:{}, cart:[], orders:[] };
  }
}
let state = loadState();

function saveState(){
  localStorage.setItem('bootroom_state', JSON.stringify(state));
}

/* ---------------- HELPERS ---------------- */
function fmtZAR(n){ return 'R' + n.toLocaleString('en-ZA'); }
function findProduct(id){ return PRODUCTS.find(p=>p.id===id); }
function cartCount(){ return state.cart.reduce((s,i)=>s+i.qty,0); }
function cartSubtotal(){
  return state.cart.reduce((s,i)=>s + findProduct(i.id).price*i.qty, 0);
}
function deliveryFee(subtotal){
  return (subtotal >= 750 || subtotal === 0) ? 0 : 99;
}

/* ---------------- IMAGE HELPER ---------------- */
function productImageHTML(product, color){
  if (product && product.images && product.images.length){
    return `<img src="${product.images[0]}" alt="${product.name}"
              style="width:100%;height:100%;object-fit:contain;display:block;" loading="lazy">`;
  }
  return bootSVG(color);
}