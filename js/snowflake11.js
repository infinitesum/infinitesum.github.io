document.addEventListener('DOMContentLoaded', function() {
    const Config = {
        color: '#9dbcd4', // 默认颜色
        speed: 1, // 雨滴从生成到落到最底端所经历的时间，单位是秒。数字越小落得越快
        dom: document.getElementsByTagName('body')[0], // 下雨的区域，全屏下雨
        interval: 100, // 生成一片雨滴的时间间隔，单位是毫秒
        active: false  // 默认不下雨
    };

    const storedRainActive = localStorage.getItem('rainActive');
    if (storedRainActive !== null) {
        Config.active = storedRainActive === 'true';
    }

    if (!Config.dom) {
        throw Error('请获取存在的DOM');
    }

    const $canvas = document.createElement('div');
    function useStyle(dom, style) {
        for (let sKey in style) {
            dom.style[sKey] = style[sKey];
        }
    }

    useStyle($canvas, {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 100
    });

    const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    function handleColorSchemeChange(e) {
        Config.color = e.matches ? 'rgb(225, 245, 254)' : 'rgb(188, 188, 215)';
    }
    matchDarkMode.addListener(handleColorSchemeChange);
    handleColorSchemeChange(matchDarkMode);

    let rainInterval;

    function startRain() {
        if (!Config.active) return;
        clearInterval(rainInterval);
        rainInterval = setInterval(() => {
            const $rain = document.createElement('div');
            const angle = 20; // 雨滴下落的角度
            const rainWidth = Math.random() * (1.5 - 0.5) + 0.5;  // 雨滴的宽度，介于0.5px到2px
            const rainHeight = Math.random() * (80 - 10) + 10;  // 雨滴的长度，介于80px到50px
            useStyle($rain, {
                width: rainWidth + 'px',
                height: rainHeight + 'px',
                backgroundColor: Config.color,
                position: 'absolute',
                top: '-20px',
                left: Math.floor(Math.random() * window.innerWidth) + 'px',
                opacity: Math.random() + 0.2,
                transform: `rotate(${angle}deg)`,
                transition: 'transform ' + Config.speed + 's linear, opacity ' + Config.speed + 's linear'
            });
            setTimeout(() => {
                useStyle($rain, {
                    transform: `translateX(${Math.tan(-angle * Math.PI / 180) * window.innerHeight}px) translateY(${window.innerHeight}px) rotate(${angle}deg)`,
                    opacity: 0
                });
                $rain.addEventListener('transitionend', () => {
                    $rain.remove();
                });
            }, 100);
            $canvas.appendChild($rain);
        }, Config.interval);
    }

    function stopRain() {
        clearInterval(rainInterval);
    }

    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function() {
        Config.active = !Config.active;
        localStorage.setItem('rainActive', Config.active);  // 更新localStorage的状态
        if (Config.active) {
            startRain();
            this.textContent = '停止下雨';
        } else {
            stopRain();
            this.textContent = 'Let it rain!';
        }
    });

    // 根据localStorage中的状态可能需要立即开始下雨
    if (Config.active) {
        startRain();
        toggleButton.textContent = '停止下雨';
    }

    Config.dom.appendChild($canvas);
});
