// تشفير النص إلى Base64
function encryptText() {
    let input = document.getElementById('inputText').value;
    try {
        let encoded = btoa(encodeURIComponent(input));
        document.getElementById('outputText').value = encoded;
    } catch (e) {
        document.getElementById('outputText').value = "خطأ في عملية التشفير!";
    }
}

// فك تشفير Base64
function decryptText() {
    let input = document.getElementById('inputText').value;
    try {
        let decoded = decodeURIComponent(atob(input));
        document.getElementById('outputText').value = decoded;
    } catch (e) {
        document.getElementById('outputText').value = "النص غير صالح أو ليس بتشفير Base64 صحيح!";
    }
}

// محاكاة حماية/تلغيم الكود (تشفير بسيط عبر تحويل الحروف إلى قيم سداسية عشرية Hex)
function obfuscateCode() {
    let input = document.getElementById('inputText').value;
    if (!input) return;
    
    let obfuscated = "eval(function(p,a,c,k,e,d){...}(this," + input.length + ",..." + 
                     btoa(input) + "));";
    
    // طريقة بديلة ومفيدة لتلغيم النصوص أو جعلها غير مقروءة للبشر عبر Hex
    let hexResult = "";
    for (let i = 0; i < input.length; i++) {
        hexResult += "\\x" + input.charCodeAt(i).toString(16);
    }
    
    document.getElementById('outputText').value = "/* Obfuscated Hex */\n" + hexResult;
}

// مسح الحقول
function clearText() {
    document.getElementById('inputText').value = "";
    document.getElementById('outputText').value = "";
}
