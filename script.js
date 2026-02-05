const ADMIN_KEY = "gloria_verify";
const MY_WHATSAPP = "254795104088"; // Your target number

const responses = {
    "price": "Our prices are: 1kg (KSh 450), 1/2kg (KSh 250), 1/4kg (KSh 150).",
    "delivery": "We deliver in Nairobi under 24 hours!",
    "location": "Find us in Umoja One, Nairobi, near Consolidated Bank.",
    "benefit": "100% natural, protein-rich, and cholesterol-free peanuts!",
    "pay": "Pay to Till 6066203 and upload the screenshot here!",
    "hi": "Hi there! I'm Gloria's helper. Ask me about pricing or delivery."
};

function openPage(pId, el) {
  document.querySelectorAll(".page-content").forEach(p => p.style.display = "none");
  document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
  document.getElementById(pId).style.display = "block";
  el.classList.add("active");
}

function order(productSize) {
    const myNumber = "254795104088"; // Your primary business number
    const message = `Hi Gloria! I want to order the ${productSize} Nutri-Finest Peanut Butter. Please send payment details.`;
    const url = `https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`;
    
    // This part sends it to your WhatsApp
    window.open(url, '_blank');
    
    // This part keeps the chatbot helpful
    appendMessage('bot', `Opening WhatsApp to send your order for ${productSize}...`);
}

function processReceipt(event) {
  const file = event.target.files[0];
  const body = document.getElementById('chat-body');
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      body.innerHTML += `<div style="align-self: flex-end;"><img src="${e.target.result}" style="width:100px; border-radius:8px;"></div>`;
      body.innerHTML += `<div class="bot-msg">Opening WhatsApp to notify Gloria...</div>`;
      setTimeout(() => {
        window.open(`https://wa.me/254746979735?text=Hi Gloria, I've uploaded my receipt. Please verify!`, "_blank");
      }, 1000);
      body.scrollTop = body.scrollHeight;
    }
    reader.readAsDataURL(file);
  }
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');
  const text = input.value.toLowerCase().trim();
  if (text === "") return;
  body.innerHTML += `<div class="user-msg">${input.value}</div>`;
  if (text === ADMIN_KEY) {
    document.getElementById('admin-verify-btn').style.display = "block";
    body.innerHTML += `<div class="bot-msg" style="color:blue;">Admin Access Active.</div>`;
  } else {
    let reply = "Feel free to call Gloria at 0746979735 for any specific questions!";
    for (let k in responses) { if (text.includes(k)) { reply = responses[k]; break; } }
    setTimeout(() => { body.innerHTML += `<div class="bot-msg">${reply}</div>`; body.scrollTop = body.scrollHeight; }, 600);
  }
  input.value = "";
  body.scrollTop = body.scrollHeight;
}

function sendSuccessMsg() {
  const body = document.getElementById('chat-body');
  document.getElementById('admin-verify-btn').style.display = "none";
  body.innerHTML += `<div class="bot-msg" style="background:#e8f5e9; border:1px solid #2e7d32;">✅ <b>Order Verified!</b> Delivery in less than 24 hours.</div>`;
  body.scrollTop = body.scrollHeight;
}

// APPLICATION FORMS TO WHATSAPP
function submitSupplierApp() {
    const name = document.getElementById('sup-name').value;
    const loc = document.getElementById('sup-loc').value;
    const price = document.getElementById('sup-price').value;
    if(!name || !loc || !price) { alert("Please fill all fields!"); return; }
    
    const message = `*NEW SUPPLIER APPLICATION*%0A---------------------------%0A*Name:* ${name}%0A*Source:* ${loc}%0A*Bid Price:* KSh ${price} per sack%0A---------------------------%0APlease review my offer.`;
    window.open(`https://wa.me/${MY_WHATSAPP}?text=${message}`, "_blank");
}

function submitDeliveryApp() {
    const name = document.getElementById('del-name').value;
    const area = document.getElementById('del-area').value;
    const vehicle = document.getElementById('del-vehicle').value;
    if(!name || !area || !vehicle) { alert("Please fill all fields!"); return; }
    
    const message = `*NEW DELIVERY JOB APPLICATION*%0A---------------------------%0A*Applicant:* ${name}%0A*Areas:* ${area}%0A*Vehicle:* ${vehicle}%0A---------------------------%0AI am ready to start delivering!`;
    window.open(`https://wa.me/${MY_WHATSAPP}?text=${message}`, "_blank");
}

function addComment() {
    const name = document.getElementById('com-name').value;
    const comment = document.getElementById('com-text').value;
    if (name && comment) {
        const list = document.getElementById('comment-list');
        const newComment = document.createElement('li');
        newComment.innerHTML = `<b>${name}:</b> ${comment}`;
        list.appendChild(newComment);
        // Clear the boxes after posting
        document.getElementById('com-name').value = '';
        document.getElementById('com-text').value = '';
    } else {
        alert("Please enter both your name and a comment!");
    }
}

function toggleChat() {
  const win = document.getElementById('chat-window');
  win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
}

function makeCall() { window.open("tel:0746979735", "_blank"); }
function switchForm(t) {
  document.getElementById('bidForm').classList.toggle('active', t === 'bid');
  document.getElementById('delForm').classList.toggle('active', t === 'del');
  document.getElementById('f1').classList.toggle('active', t === 'bid');
  document.getElementById('f2').classList.toggle('active', t === 'del');

}
