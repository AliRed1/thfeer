function obfuscateCode() {
    const input = document.getElementById('code-input').value;
    const output = document.getElementById('code-output');
    if(!input) return;
    const encoded = btoa(unescape(encodeURIComponent(input)));
    output.value = `/* Obfuscated by SetRex */\neval(decodeURIComponent(escape(atob("${encoded}"))));`;
}

function deobfuscateCode() {
    const input = document.getElementById('code-input').value;
    const output = document.getElementById('code-output');
    const match = input.match(/atob\("([^"]+)"\)/);
    if (match && match[1]) {
        try {
            output.value = decodeURIComponent(escape(atob(match[1])));
        } catch(e) {
            output.value = "تعذر فك الشفرة أو النص غير مطابق لمستويات SetRex.";
        }
    } else {
        output.value = "لم يتم العثور على صيغة مشفرة بـ SetRex Evaluator.";
    }
}
