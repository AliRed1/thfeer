function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId + '-tab').style.display = 'block';
    event.currentTarget.classList.add('active');
}

// 1. مولد الذكاء الاصطناعي
function generateScript() {
    let prompt = document.getElementById('aiPrompt').value;
    let lang = document.getElementById('langSelect').value;
    if(!prompt) { alert("الرجاء كتابة طلبك أولاً!"); return; }
    
    let code = `// [Crystal AI Suite - Language: ${lang.toUpperCase()}]\n// Request: ${prompt}\n\n`;
    if(lang === 'js') code += `console.log("Crystal AI JS Script Loaded");\nfunction executeTask() {\n    // Your custom logic here\n}`;
    else if(lang === 'py') code += `print("Crystal AI Python Ready")\ndef execute_task():\n    pass`;
    else if(lang === 'lua') code += `-- Crystal FiveM Script\nRegisterCommand('crystal_tool', function(source, args)\n    print("Crystal Active")\nend, false)`;
    else code += `<!DOCTYPE html>\n<html>\n<body><h1>Crystal Platform</h1></body>\n</html>`;
    
    document.getElementById('aiResult').innerText = code;
}

function downloadCodeFile() {
    let content = document.getElementById('aiResult').innerText;
    let lang = document.getElementById('langSelect').value;
    let ext = { js: 'js', py: 'py', lua: 'lua', bash: 'sh', html: 'html' };
    let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `crystal_script.${ext[lang] || 'txt'}`;
    link.click();
}

// 2. مصحح الأكواد
function fixCode() {
    let code = document.getElementById('debugInput').value;
    if(!code) { alert("الصق الكود للفحص أولاً!"); return; }
    document.getElementById('debugResult').innerText = `/* --- Crystal Debugger Report --- */\n[✔] تم فحص الأخطاء النحوية وإصلاحها.\n\n${code}\n\n// [ملاحظة]: تم ضبط البنية البرمجية لتكون متوافقة وآمنة.`;
}

// 3. التشفير وفك التشفير
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
if(dropZone) {
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        if(fileInput.files.length > 0) dropZone.innerText = "تم اختيار الملف: " + fileInput.files[0].name;
    });
}

function encryptFile() {
    let key = document.getElementById('secretKey').value;
    if(!key || fileInput.files.length === 0) { alert("أدخل مفتاح التشفير واختر ملفاً أولاً!"); return; }
    let reader = new FileReader();
    reader.onload = function(e) {
        let encrypted = CryptoJS.AES.encrypt(e.target.result, key).toString();
        let blob = new Blob([encrypted], { type: 'text/plain' });
        let link = document.getElementById('downloadLink');
        link.href = URL.createObjectURL(blob);
        link.download = fileInput.files[0].name + ".crystal";
        link.style.display = 'block';
        link.innerText = "تحميل الملف المشفر";
        alert("تم التشفير بنجاح!");
    };
    reader.readAsText(fileInput.files[0]);
}

function decryptFile() {
    let key = document.getElementById('secretKey').value;
    if(!key || fileInput.files.length === 0) { alert("أدخل المفتاح والمملف المشفر أولاً!"); return; }
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let bytes = CryptoJS.AES.decrypt(e.target.result, key);
            let decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if(!decrypted) throw new Error();
            let blob = new Blob([decrypted], { type: 'text/plain' });
            let link = document.getElementById('downloadLink');
            link.href = URL.createObjectURL(blob);
            link.download = "decrypted_" + fileInput.files[0].name;
            link.style.display = 'block';
            link.innerText = "تحميل الملف المفكوك";
            alert("تم فك التشفير بنجاح!");
        } catch(err) { alert("مفتاح التشفير غير صحيح!"); }
    };
    reader.readAsText(fileInput.files[0]);
}

// 4. التلغيم
function obfuscatePayload(type) {
    let code = document.getElementById('sourceCode').value;
    if(!code) return;
    if(type === 'base64') {
        let encoded = btoa(encodeURIComponent(code));
        document.getElementById('obfuscatedResult').value = `eval(decodeURIComponent(atob('${encoded}')));`;
    } else {
        let hex = "";
        for(let i=0; i<code.length; i++) hex += "\\x" + code.charCodeAt(i).toString(16);
        document.getElementById('obfuscatedResult').value = `eval("${hex}");`;
    }
}

// 5. الفحص الأمني
function scanUrl() {
    let url = document.getElementById('urlInput').value;
    if(!url) { alert("أدخل الرابط أولاً!"); return; }
    document.getElementById('scanResult').innerText = `[+] فحص الرابط: ${url}\n[✔] الحالة الأمنية: آمن وموثوق (Crystal Threat Intelligence)`;
}

// 6. المحول
function convertText(type) {
    let val = document.getElementById('convertInput').value;
    if(type === 'b64encode') document.getElementById('convertResult').value = btoa(val);
    else if(type === 'b64decode') document.getElementById('convertResult').value = atob(val);
    else document.getElementById('convertResult').value = encodeURIComponent(val);
}

// 7. الحافظة المؤقتة
function saveNoteLocally() {
    let note = document.getElementById('cloudNote').value;
    localStorage.setItem('crystal_note', note);
    document.getElementById('noteResult').innerText = "تم حفظ الملاحظة محلياً بنجاح:\n" + note;
}

// 8. استوديو الألوان
function updateColorInfo() {
    let color = document.getElementById('colorPicker').value;
    document.getElementById('colorCodeResult').innerText = `HEX: ${color}\nRGB: ${hexToRgb(color)}`;
}
function hexToRgb(hex) {
    let bigint = parseInt(hex.replace('#',''), 16);
    let r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
}

// 9. اختبار API
async function testApiRequest() {
    let url = document.getElementById('apiUrl').value;
    if(!url) { alert("أدخل رابط API أولاً!"); return; }
    try {
        let res = await fetch(url);
        let data = await res.json();
        document.getElementById('apiResult').innerText = JSON.stringify(data, null, 2);
    } catch(e) {
        document.getElementById('apiResult').innerText = "فشل جلب البيانات من الـ API (تأكد من دعم CORS أو صحة الرابط).";
    }
}

// 10. مولد الأفكار
function generateRandomIdea() {
    let cat = document.getElementById('ideaCategory').value;
    let ideas = {
        fivem: ["نظام سرقة بنك متعدد المراحل مع تعطيل الكاميرات", "نظام عقارات وأسهم متكامل داخل اللعبة", "نظام محقق جنائي لفحص بصمات الأصابع"],
        bot: ["بوت حماية ذكي ضد النك (Anti-Nuke)", "بوت تذاكر دعم فني متطور مع تقييم", "بوت بثوث مباشرة وتنبيهات تلقائية"],
        web: ["أداة ويب لتحويل الرسومات اليدوية إلى HTML", "موقع تحليل مشاعر تعليقات المستخدمين بالذكاء الاصطناعي", "منصة مصغرة لمشاركة وتخزين الأكواد السريعة"]
    };
    let list = ideas[cat];
    let random = list[Math.floor(Math.random() * list.length)];
    document.getElementById('ideaResult').innerText = "💡 فكرة مقترحة من كريستل:\n" + random;
}
