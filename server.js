const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// مسار الذكاء الاصطناعي الحقيقي
app.post('/api/ai', async (req, res) => {
    try {
        const { prompt, lang } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'الرجاء إدخال الطلب أو السؤال!' });
        }

        // هنا نربط السيرفر بـ Google Gemini API الحقيقي
        // ضع مفتاح الـ API الخاص بك هنا (Gemini API Key)
        const GEMINI_API_KEY = "ضع_مفتاح_الـ_API_هنا"; 
        
        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت مساعد برمجي ذكي خبير في لغة البرمجة ${lang}. المبرمج يطلب منك الآتي بدقة واحترافية عالية، اكتب الكود أو الإجابة مباشرة بدون مقدمات طويلة:\n\n${prompt}`
                    }]
                }]
            })
        });

        const data = await apiResponse.json();
        
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            res.json({ success: true, result: aiText });
        } else {
            res.status(500).json({ error: 'فشل في الحصول على استجابة صحيحة من نموذج الذكاء الاصطناعي.' });
        }

    } catch (error) {
        res.status(500).json({ error: 'حدث خطأ في الاتصال: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`💎 منصة كريستل مرتبطة بـ Gemini AI تعمل على: http://localhost:${PORT}`);
});
