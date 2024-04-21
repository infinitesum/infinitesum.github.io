document.addEventListener('DOMContentLoaded', function() {
    const Config = {
        snow: ['❄', '※', '❅', '❆', '🎉', '❈', '❉', '❊', '❋'],
        color: '#d9e2e7', // 默认颜色
        speed: 10,
        dom: document.getElementsByTagName('body')[0],
        interval: 800,
        active: false  // 默认不下雪
    };

    // 尝试从localStorage中获取下雪状态
    const storedSnowActive = localStorage.getItem('snowActive');
    if (storedSnowActive !== null) {
        Config.active = storedSnowActive === 'true';
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
        Config.color = e.matches ? 'rgb(255, 255, 255)' : 'rgb(149, 141, 186)';
    }
    matchDarkMode.addListener(handleColorSchemeChange);
    handleColorSchemeChange(matchDarkMode);

    let snowInterval;

    function startSnow() {
        if (!Config.active) return;
        snowInterval = setInterval(() => {
            const $snow = document.createElement('div');
            $snow.innerText = Config.snow[Math.floor(Math.random() * Config.snow.length)];
            useStyle($snow, {
                display: 'inline-block',
                color: Config.color,
                fontSize: Math.floor(Math.random() * (25 - 14 + 1) + 14) + 'px',
                position: 'absolute',
                top: 0,
                left: Math.floor(Math.random() * 100) + '%',
                transition: 'transform ' + Config.speed + 's linear' + ',opacity ' + Config.speed + 's linear',
                transform: 'translateY(-100%)',
                opacity: Math.random() + 0.3
            });
            setTimeout(() => {
                useStyle($snow, {
                    transform: 'translate(0, ' + window.innerHeight + 'px) rotate(480deg)',
                    opacity: 0
                });
                $snow.addEventListener('transitionend', () => {
                    $snow.remove();
                });
            }, 100);
            $canvas.appendChild($snow);
        }, Config.interval);
    }

    function stopSnow() {
        clearInterval(snowInterval);
    }

    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function() {
        Config.active = !Config.active;
        localStorage.setItem('snowActive', Config.active);  // 更新localStorage的状态
        if (Config.active) {
            startSnow();
            this.textContent = '停止下雪';
        } else {
            stopSnow();
            this.textContent = 'Let it snow!';
        }
    });

    // 根据localStorage中的状态可能需要立即开始下雪
    if (Config.active) {
        startSnow();
        toggleButton.textContent = '停止下雪';
    }

    Config.dom.appendChild($canvas);
});
