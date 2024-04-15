document.addEventListener('DOMContentLoaded', function () {
    applyFontSetting();
    updateButtonText(); // Ensure the button text is correct on page load
});

document.addEventListener('pjax:success', function () {
    applyFontSetting();
    updateButtonText(); // Update the button text after PJAX updates
});

function applyFontSetting() {
    if (localStorage.getItem("LXGWFontEnabled") === "true") {
        document.body.classList.add("LXGWMode");
    } else {
        document.body.classList.remove("LXGWMode");
    }
}

function toggleLXGWFont() {
    var button = document.querySelector('.custom-button'); // Find the button
    if (localStorage.getItem("LXGWFontEnabled") === "true") {
        localStorage.setItem("LXGWFontEnabled", "false");
        document.body.classList.remove("LXGWMode");
        button.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/infinitesum/Twikoo-emoji@master/Blob/ablobcatrainbow.png" alt="Emoji" style="vertical-align: middle; width: 20px; height: 20px;"> 危险，请勿点击';
    } else {
        localStorage.setItem("LXGWFontEnabled", "true");
        document.body.classList.add("LXGWMode");
        button.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/infinitesum/Twikoo-emoji@master/Blob/ablobcatrainbow.png" alt="Emoji" style="vertical-align: middle; width: 20px; height: 20px;"> 不要说我没有警告过你';
    }
}

function updateButtonText() {
    var button = document.querySelector('.custom-button'); // Find the button
    if (localStorage.getItem("LXGWFontEnabled") === "true") {
        button.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/infinitesum/Twikoo-emoji@master/Blob/ablobcatrainbow.png" alt="Emoji" style="vertical-align: middle; width: 20px; height: 20px;"> 不要点这里啦！';
    } else {
        button.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/infinitesum/Twikoo-emoji@master/Blob/ablobcatrainbow.png" alt="Emoji" style="vertical-align: middle; width: 20px; height: 20px;"> 危险，请勿点击';
    }
}
