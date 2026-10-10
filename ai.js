function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const messages = document.getElementById('ai-messages');
    if (!input.value.trim()) return;

    const userText = input.value;
    messages.innerHTML += `
        <div class="bg-red-950/40 border border-red-900/50 p-4 rounded-xl max-w-[85%] mr-auto text-left">
            <p class="text-sm text-gray-200">${userText}</p>
        </div>
    `;
    input.value = '';

    setTimeout(() => {
        messages.innerHTML += `
            <div class="bg-gray-800/60 p-4 rounded-xl border border-gray-700/50 max-w-[85%]">
                <p class="text-sm">[SetRex AI]: تم استلام طلبك وبدء معالجته بنجاح.</p>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;
    }, 600);
}
