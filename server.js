const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname)); // لخدمة ملفات الموقع الثابتة

app.listen(PORT, () => {
    console.log(`منصة كريستل تعمل الآن على الرابط: http://localhost:${PORT}`);
});
