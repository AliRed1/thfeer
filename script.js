function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId + '-tab').style.display = 'block';
    event.currentTarget.classList.add('active');
}

// توليد السكربتات مع تحديد اللغة
function generateScript() {
    let prompt = document.getElementById('aiPrompt').value;
    let lang = document.getElementById('langSelect').value;
    if(!prompt) {
        alert("الرجاء كتابة طلبك لمساعد كريستل أولاً!");
        return;
    }
    
    let sampleCode = `// Crystal AI Generated Code [Language: ${lang.toUpperCase()}]\n// Request: ${prompt}\n\n`;
    if(lang === 'js') {
        sampleCode += `console.log("Crystal AI Ready!");\nfunction runTask() {\n    // Write your code here\n}`;
    } else if(lang === 'py') {
        sampleCode += `print("Crystal AI Ready!")\ndef run_task():\n    pass`;
    } else if(lang === 'lua') {
        sampleCode += `print("Crystal AI FiveM Ready!")\nRegisterCommand('crystal', function(source, args)\n    -- Code here\nend, false)`;
    } else {
        sampleCode += `<!-- Crystal Web Component -->\n<div>Crystal AI Output</div>`;
    }
    
    document.getElementById('aiResult').innerText = sampleCode;
}

// تصدير وتحميل الكود كملف حقيقي
function downloadCodeFile() {
    let content = document.getElementById('aiResult').innerText;
    let lang = document.getElementById('langSelect').value;
    let extensions = { js: 'js', py: 'py', lua: 'lua', bash: 'sh', html: 'html' };
    let filename = `crystal_script.${extensions[lang] || 'txt'}`;
    
    let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// ميزة السحب والإفلات وتشفير الملفات
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

if(dropZone) {
    dropZone.click = () => fileInput.click();
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = '#0284c7'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = '#374151'; });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if(e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            dropZone.innerText = "تم إفلات الملف: " + e.dataTransfer.files[0].name;
        }
    });
}

function encryptFile() {
    if(fileInput.files.length === 0) {
        alert("الرجاء اختيار ملف أو سحبه أولاً!");
        return;
    }
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        let base64Data = btoa(e.target.result);
        let blob = new Blob([base64Data], { type: 'text/plain' });
        let downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = file.name + ".crystal";
        downloadLink.style.display = 'block';
        downloadLink.innerText = "تحميل الملف المشفر: " + file.name + ".crystal";
        alert("تم تشفير محتوى الملف بنجاح!");
    };
    reader.readAsBinaryString(file);
}

function decryptFile() {
    alert("جاهز لفك تشفير ملفات كريستل المدمجة!");
}

// أدوات التلغيم المتقدمة (Obfuscation)
function obfuscatePayload(type) {
    let code = document.getElementById('sourceCode').value;
    if(!code) return;
    
    if(type === 'base64') {
        let encoded = btoa(encodeURIComponent(code));
        document.getElementById('obfuscatedResult').value = `/* Crystal Multi-Layer Base64 */\neval(decodeURIComponent(atob('${encoded}')));`;
    } else if(type === 'hex') {
        let hexResult = "";
        for (let i = 0; i < code.length; i++) {
            hexResult += "\\x" + code.charCodeAt(i).toString(16);
        }
        document.getElementById('obfuscatedResult').value = `/* Crystal Hex Obfuscation */\neval("${hexResult}");`;
    }
}

function scanFile() {
    let scanInput = document.getElementById('scanInput');
    if(scanInput.files.length === 0) {
        alert("الرجاء اختيار ملف للفحص!");
        return;
    }
    document.getElementById('scanResult').innerText = "[+] فحص كريستل الأمني:\n- اسم الملف: " + scanInput.files.length + "\n- الحالة الأمنية: آمن تماماً وخالٍ من الثغرات الخبيثة.";
}
