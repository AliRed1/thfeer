function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId + '-tab').style.display = 'block';
    event.currentTarget.classList.add('active');
}

// محاكاة طلب الذكاء الاصطناعي لكتابة السكربتات
function generateScript() {
    let prompt = document.getElementById('aiPrompt').value;
    if(!prompt) return;
    document.getElementById('aiResult').innerText = "كريستل AI يكتب السكربت الآن...\n\n// سكربت تم توليده بناءً على طلبك:\nconsole.log('Crystal AI Script Generated for: " + prompt + "');";
}

// محاكاة تلغيم الكود
function obfuscatePayload() {
    let code = document.getElementById('sourceCode').value;
    if(!code) return;
    let encoded = btoa(code);
    document.getElementById('obfuscatedResult').value = "/* Crystal Obfuscator */\neval(atob('" + encoded + "'));";
}

// محاكاة فحص الملف
function scanFile() {
    let fileInput = document.getElementById('scanInput');
    if(fileInput.files.length === 0) {
        alert("الرجاء اختيار ملف أولاً!");
        return;
    }
    let fileName = fileInput.files[0].name;
    document.getElementById('scanResult').innerText = "جاري فحص الملف: " + fileName + "\n[+] الحالة: نظيف وآمن (Crystal Security Scanner)";
}

function encryptFile() { alert("تم تشفير الملف بنجاح عبر نظام كريستل!"); }
function decryptFile() { alert("تم فك تشفير الملف بنجاح!"); }
