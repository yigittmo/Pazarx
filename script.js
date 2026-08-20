const products=[
{id:1,name:'Kablosuz Kulaklık Pro',cat:'Elektronik',price:1299,icon:'🎧',rating:4.8},
{id:2,name:'Akıllı Saat Ultra',cat:'Elektronik',price:2499,icon:'⌚',rating:4.7},
{id:3,name:'Oversize Premium Tişört',cat:'Moda',price:599,icon:'👕',rating:4.6},
{id:4,name:'Spor Ayakkabı Air',cat:'Spor',price:1899,icon:'👟',rating:4.9},
{id:5,name:'Minimal Masa Lambası',cat:'Ev Yaşam',price:749,icon:'💡',rating:4.5},
{id:6,name:'Bluetooth Hoparlör',cat:'Elektronik',price:999,icon:'🔊',rating:4.7},
{id:7,name:'Urban Sırt Çantası',cat:'Moda',price:899,icon:'🎒',rating:4.6},
{id:8,name:'Yoga & Fitness Matı',cat:'Spor',price:499,icon:'🧘',rating:4.8},
{id:9,name:'Cilt Bakım Seti',cat:'Güzellik',price:799,icon:'🧴',rating:4.7},
{id:10,name:'Mekanik Klavye',cat:'Elektronik',price:1599,icon:'⌨️',rating:4.9},
{id:11,name:'Dekoratif Vazo',cat:'Ev Yaşam',price:449,icon:'🏺',rating:4.4},
{id:12,name:'Parfüm Seti',cat:'Güzellik',price:1199,icon:'✨',rating:4.8}
];
let shown=[...products],cart=[],favorites=new Set();
function render(){document.getElementById('products').innerHTML=shown.map(p=>`<article class="product"><button class="fav" onclick="toggleFav(${p.id})">${favorites.has(p.id)?'❤️':'♡'}</button><div class="visual">${p.icon}</div><div class="info"><small>${p.cat}</small><h3>${p.name}</h3><div class="rating">★ ${p.rating}</div><div class="price">${p.price.toLocaleString('tr-TR')} TL</div><button class="add" onclick="add(${p.id})">Sepete Ekle</button></div></article>`).join('');document.getElementById('resultText').textContent=shown.length+' ürün gösteriliyor'}
function filter(cat){shown=cat==='Tümü'?[...products]:products.filter(p=>p.cat===cat);render()}
function searchProducts(){const q=document.getElementById('search').value.toLowerCase();shown=products.filter(p=>p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q));render()}
function sortProducts(v){shown.sort((a,b)=>v==='low'?a.price-b.price:v==='high'?b.price-a.price:0);render()}
function add(id){cart.push(products.find(p=>p.id===id));document.getElementById('count').textContent=cart.length}
function toggleFav(id){favorites.has(id)?favorites.delete(id):favorites.add(id);render()}
function openCart(){const total=cart.reduce((s,p)=>s+p.price,0);showModal(`<button class="close" onclick="closeModal()">×</button><h2>🛒 Sepetim</h2>${cart.length?cart.map(p=>`<div class="cart-row"><span>${p.icon} ${p.name}</span><b>${p.price.toLocaleString('tr-TR')} TL</b></div>`).join(''):'<p>Sepetiniz boş.</p>'}<div class="total">Toplam: <b>${total.toLocaleString('tr-TR')} TL</b></div>${cart.length?'<button class="modal-main" onclick="checkout()">Siparişi Tamamla</button>':''}`)}
function checkout(){alert('Demo sipariş oluşturuldu! Gerçek ödeme sistemi sonraki aşamada bağlanabilir.');cart=[];document.getElementById('count').textContent=0;closeModal()}
function openLogin(){showModal(`<button class="close" onclick="closeModal()">×</button><h2>👤 PazarX Hesabım</h2><input class="field" placeholder="E-posta"><input class="field" type="password" placeholder="Şifre"><button class="modal-main" onclick="alert('Demo giriş ekranı.')">Giriş Yap</button><p style="text-align:center;color:#777">Hesabın yok mu? Kayıt ol</p>`)}
function showModal(html){document.getElementById('modalContent').innerHTML=html;document.getElementById('modal').style.display='block'}
function closeModal(){document.getElementById('modal').style.display='none'}
render();