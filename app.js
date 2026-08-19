const products=[
{id:1,name:"Kablosuz Kulaklık Pro",cat:"Elektronik",price:1299,emoji:"🎧"},
{id:2,name:"Akıllı Saat S9",cat:"Elektronik",price:2499,emoji:"⌚"},
{id:3,name:"Oversize Basic Tişört",cat:"Moda",price:499,emoji:"👕"},
{id:4,name:"Spor Ayakkabı Air",cat:"Spor",price:1899,emoji:"👟"},
{id:5,name:"Minimal Masa Lambası",cat:"Ev",price:699,emoji:"💡"},
{id:6,name:"Bluetooth Hoparlör",cat:"Elektronik",price:1599,emoji:"🔊"},
{id:7,name:"Premium Sırt Çantası",cat:"Moda",price:899,emoji:"🎒"},
{id:8,name:"Yoga Matı",cat:"Spor",price:599,emoji:"🧘"}
];
let active="Tümü",cart=[];
const money=n=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:0}).format(n);
function renderProducts(){
 let arr=products.filter(p=>active==="Tümü"||p.cat===active);
 const q=document.getElementById("search").value.toLowerCase().trim();
 if(q) arr=arr.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q));
 const s=document.getElementById("sort").value;
 if(s==="low")arr.sort((a,b)=>a.price-b.price); if(s==="high")arr.sort((a,b)=>b.price-a.price);
 document.getElementById("resultText").textContent=arr.length+" ürün gösteriliyor";
 document.getElementById("products").innerHTML=arr.map(p=>`<article class="product"><div class="pic">${p.emoji}</div><div class="info"><div class="tag">${p.cat}</div><div class="name">${p.name}</div><div class="price">${money(p.price)}</div><button class="add" onclick="addToCart(${p.id})">Sepete Ekle</button></div></article>`).join("");
}
function filterCategory(c){active=c;renderProducts()}
function searchProducts(){renderProducts()}
function addToCart(id){cart.push(products.find(p=>p.id===id));document.getElementById("cartCount").textContent=cart.length}
function showCart(){document.getElementById("modal").classList.remove("hidden");const box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><div class="emoji">${p.emoji}</div><div><b>${p.name}</b><br>${money(p.price)}</div></div>`).join(""):"<p>Sepetin şu an boş.</p>";document.getElementById("total").textContent=money(cart.reduce((s,p)=>s+p.price,0))}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function checkout(){if(!cart.length)return alert("Sepetiniz boş.");alert("Demo siparişi oluşturuldu. Gerçek ödeme sistemi bir sonraki aşamada bağlanabilir.");}
renderProducts();