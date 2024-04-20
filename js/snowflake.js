document.addEventListener('DOMContentLoaded', function() {
    const Config = {
        snow: ['❄', '※', '❅', '❆', '❇', '❈', '❉', '❊', '❋'],
        color: '#d9e2e7', // 默认颜色
        speed: 10,
        dom: document.getElementsByTagName('body')[0],
        interval: 800
    };
    if (!Config.dom) {
        throw Error('请获取存在的DOM');
    }
    const $canvas = document.createElement('div');
    useStyle($canvas, {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 100
    });

    // 监听暗色模式变化
    const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    function handleColorSchemeChange(e) {
        Config.color = e.matches ? 'rgb(255, 255, 255)' : 'rgb(149, 141, 186)'; // 暗模式使用白色，亮模式使用淡蓝色
    }
    matchDarkMode.addListener(handleColorSchemeChange);
    handleColorSchemeChange(matchDarkMode); // 初始化颜色

    setInterval(() => {
        const $snow = document.createElement('div');
        $snow.innerText = Config.snow[rand(0, Config.snow.length - 1)];
        useStyle($snow, {
            display: 'inline-block',
            color: Config.color,
            fontSize: rand(14, 25) + 'px',
            position: 'absolute',
            top: 0,
            left: rand(0, 100) + '%',
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

    function rand(from, to) {
        return from + Math.floor(Math.random() * (to - from + 1));
    }
    function useStyle(dom, style) {
        for (let sKey in style) {
            dom.style[sKey] = style[sKey];
        }
    }

    Config.dom.appendChild($canvas);
});
