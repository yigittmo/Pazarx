const products=[
{id:1,name:'Kablosuz Kulaklık Pro',cat:'Elektronik',price:1299,icon:'🎧',rating:4.8,seller:'TeknoSepet',desc:'Günlük kullanım için yüksek kaliteli kablosuz kulaklık.'},
{id:2,name:'Akıllı Saat Ultra',cat:'Elektronik',price:2499,icon:'⌚',rating:4.7,seller:'TeknoSepet',desc:'Şık tasarım ve günlük kullanım özellikleri.'},
{id:3,name:'Oversize Premium Tişört',cat:'Moda',price:599,icon:'👕',rating:4.6,seller:'ModaPark',desc:'Yumuşak kumaşlı modern oversize tişört.'},
{id:4,name:'Spor Ayakkabı Air',cat:'Spor',price:1899,icon:'👟',rating:4.9,seller:'FitStore',desc:'Spor ve günlük kullanım için rahat ayakkabı.'},
{id:5,name:'Minimal Masa Lambası',cat:'Ev Yaşam',price:749,icon:'💡',rating:4.5,seller:'EvDekor',desc:'Minimal çalışma ve yaşam alanı lambası.'},
{id:6,name:'Bluetooth Hoparlör',cat:'Elektronik',price:999,icon:'🔊',rating:4.7,seller:'TeknoSepet',desc:'Taşınabilir, güçlü ses deneyimi.'},
{id:7,name:'Urban Sırt Çantası',cat:'Moda',price:899,icon:'🎒',rating:4.6,seller:'ModaPark',desc:'Günlük kullanım için geniş bölmeli çanta.'},
{id:8,name:'Yoga & Fitness Matı',cat:'Spor',price:499,icon:'🧘',rating:4.8,seller:'FitStore',desc:'Evde spor ve yoga için kaymaz mat.'},
{id:9,name:'Cilt Bakım Seti',cat:'Güzellik',price:799,icon:'🧴',rating:4.7,seller:'BeautyBox',desc:'Günlük bakım rutini için ürün seti.'},
{id:10,name:'Mekanik Klavye',cat:'Elektronik',price:1599,icon:'⌨️',rating:4.9,seller:'TeknoSepet',desc:'Oyuncular ve çalışma için mekanik klavye.'}
];
const stores=[['TeknoSepet','Elektronik','TS'],['ModaPark','Moda','MP'],['FitStore','Spor','FS'],['EvDekor','Ev Yaşam','ED'],['BeautyBox','Güzellik','BB']];
let shown=[...products],cart=[],favorites=new Set();
function render(){productsEl.innerHTML=shown.map(p=>`<article class="product"><button class="fav" onclick="toggleFav(${p.id})">${favorites.has(p.id)?'❤️':'♡'}</button><div class="visual" onclick="detail(${p.id})">${p.icon}</div><div class="info"><small>${p.cat}</small><h3 onclick="detail(${p.id})">${p.name}</h3><div class="rating">★ ${p.rating}</div><div class="price">${p.price.toLocaleString('tr-TR')} TL</div><div class="seller">Mağaza: ${p.seller}</div><button class="add" onclick="add(${p.id})">Sepete Ekle</button></div></article>`).join('');result.textContent=shown.length+' ürün gösteriliyor'}
function filter(cat){shown=cat==='Tümü'?[...products]:products.filter(p=>p.cat===cat);render()}
function searchProducts(){let q=search.value.toLowerCase();shown=products.filter(p=>(p.name+p.cat+p.seller).toLowerCase().includes(q));render()}
function sortProducts(v){shown.sort((a,b)=>v==='low'?a.price-b.price:v==='high'?b.price-a.price:0);render()}
function add(id){cart.push(products.find(p=>p.id===id));count.textContent=cart.length}
function toggleFav(id){favorites.has(id)?favorites.delete(id):favorites.add(id);render()}
function detail(id){let p=products.find(x=>x.id===id);show(`<button class="close" onclick="closeModal()">×</button><div class="detail"><div class="detailVisual">${p.icon}</div><div><small>${p.cat}</small><h1>${p.name}</h1><div class="rating">★ ${p.rating} · 124 değerlendirme</div><p>${p.desc}</p><div class="detailPrice">${p.price.toLocaleString('tr-TR')} TL</div><p>Satıcı: <b>${p.seller}</b></p><button class="mainBtn" onclick="add(${p.id});closeModal()">Sepete Ekle</button></div></div>`)}
function store(name){let ps=products.filter(p=>p.seller===name);show(`<button class="close" onclick="closeModal()">×</button><div class="storeHeader"><h2>${name}</h2><p>⭐ 4.8 · Güvenilir Mağaza</p></div><h3>Mağaza Ürünleri</h3>${ps.map(p=>`<div class="cartRow"><span>${p.icon} ${p.name}</span><b>${p.price.toLocaleString('tr-TR')} TL</b></div>`).join('')||'<p>Bu mağazada henüz ürün yok.</p>'`)}
function renderStores(){storesEl.innerHTML=stores.map(s=>`<div class="store" onclick="store('${s[0]}')"><div class="storeLogo">${s[2]}</div><h3>${s[0]}</h3><p>${s[1]} · ⭐ 4.8 · Mağazayı görüntüle →</p></div>`).join('')}
function openCart(){let total=cart.reduce((a,p)=>a+p.price,0);show(`<button class="close" onclick="closeModal()">×</button><h2>🛒 Sepetim</h2>${cart.length?cart.map(p=>`<div class="cartRow"><span>${p.icon} ${p.name}</span><b>${p.price.toLocaleString('tr-TR')} TL</b></div>`).join(''):'<p>Sepetiniz boş.</p>'}<div class="total">Toplam: <b>${total.toLocaleString('tr-TR')} TL</b></div>${cart.length?'<button class="mainBtn" onclick="checkout()">Siparişi Tamamla</button>':''}`)}
function checkout(){alert('Demo sipariş oluşturuldu!');cart=[];count.textContent=0;closeModal()}
function openLogin(){show(`<button class="close" onclick="closeModal()">×</button><h2>👤 PazarX Hesabım</h2><input class="field" placeholder="E-posta"><input class="field" type="password" placeholder="Şifre"><button class="mainBtn" onclick="alert('Demo giriş ekranı.')">Giriş Yap</button><p style="text-align:center;color:#777">Hesabın yok mu? Kayıt ol</p>`)}
function show(html){modalBox.innerHTML=html;modal.style.display='block'}
function closeModal(){modal.style.display='none'}
const productsEl=document.getElementById('products'),result=document.getElementById('result'),storesEl=document.getElementById('stores'),modal=document.getElementById('modal'),modalBox=document.getElementById('modalBox'),search=document.getElementById('search'),count=document.getElementById('count');
render();renderStores();