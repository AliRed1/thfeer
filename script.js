async function generateScript() {
    const prompt = document.getElementById('aiPrompt').value;
    const lang = document.getElementById('langSelect').value;
    const resultBox = document.getElementById('aiResult');

    if (!prompt.trim()) {
        resultBox.innerText = "الرجاء إدخال سؤالك أو طلبك أولاً!";
        return;
    }

    resultBox.innerText = "⏳ جاري إرسال الطلب إلى خادم Crystal AI...";

    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, lang })
        });

        const data = await response.json();

        if (data.success) {
            resultBox.innerText = data.result;
        } else {
            resultBox.innerText = "خطأ: " + data.error;
        }
    } catch (error) {
        resultBox.innerText = "فشل الاتصال بالسيرفر: " + error.message;
    }
}
