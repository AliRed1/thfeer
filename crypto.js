function processBase64(encode) {
    const input = document.getElementById('crypto-input').value;
    const output = document.getElementById('crypto-output');
    try {
        if (encode) {
            output.value = btoa(unescape(encodeURIComponent(input)));
        } else {
            output.value = decodeURIComponent(escape(atob(input)));
        }
    } catch (e) {
        output.value = "خطأ: تأكد من صحة البيانات المدخلة!";
    }
}
