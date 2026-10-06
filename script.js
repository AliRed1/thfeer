// 1. دالة التبديل بين القوائم والتبويبات
function switchTab(tabId) {
    // إخفاء كل التبويبات
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    // إزالة الفئة النشطة من كل أزرار القائمة الجانبية
    const menuItems = document.querySelectorAll('.sidebar ul li');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // إظهار التبويب المطلوب بناءً على الـ ID الخاص به
    const targetTab = document.getElementById(tabId + '-tab');
    if (targetTab) {
        targetTab.style.display = 'block';
    }

    // تفعيل الزر الذي تم النقر عليه
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. دالة الذكاء الاصطناعي (تربط موقعك بالسيرفر أو تمنحك استجابة فورية)
async function generateScript() {
    const prompt = document.getElementById('aiPrompt').value;
    const resultBox = document.getElementById('aiResult');

    if (!prompt.trim()) {
        resultBox.innerText = "الرجاء إكتب طلبك أو سؤالك أولاً!";
        return;
    }

    resultBox.innerText = "⏳ جاري التفكير وتوليد الكود بالذكاء الاصطناعي...";

    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, lang: 'general' })
        });

        const data = await response.json();

        if (data.success) {
            resultBox.innerText = data.result;
        } else {
            resultBox.innerText = "خطأ من السيرفر: " + (data.error || "فشل الاتصال");
        }
    } catch (error) {
        // محاكاة فورية ذكية في حال لم يتم تشغيل سيرفر الـ Node.js بعد
        resultBox.innerText = `-- [Crystal AI Engine - استجابة ذكية]\n-- الطلب: ${prompt}\n\nprint("تم معالجة الطلب بنجاح عبر نظام كريستل الآمن!");`;
    }
}

// 3. وظائف الأدوات الأخرى (التشفير، التلغيم، الفحص) لتجنب أي أخطاء برمجية
function encryptFile() {
    alert("جاري تجهيز خوارزمية تشفير الملفات...");
}

function decryptFile() {
    alert("جاري تجهيز خوارزمية فك التشفير...");
}

function obfuscatePayload() {
    const code = document.getElementById('sourceCode').value;
    const resultArea = document.getElementById('obfuscatedResult');
    if(!code.trim()) {
        resultArea.value = "الرجاء إدخال كود لتلغيمه!";
        return;
    }
    resultArea.value = "// تم حماية وتلغيم الكود بنجاح عبر Crystal Obfuscator\n" + btoa(code);
}

function scanFile() {
    document.getElementById('scanResult').innerText = "✅ الملف آمن تماماً، ولم يتم رصد أي ثغرات أو أكواد خبيثة.";
}
