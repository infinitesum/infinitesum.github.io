window.onscroll = function() {
    let scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let scrollPercent = Math.round((scrolled / scrollTotal) * 100);

    let percentElement = document.getElementById("percent");
    if (percentElement) {
        percentElement.textContent = scrollPercent + '%'; // 直接更新百分比文本
    }
};
