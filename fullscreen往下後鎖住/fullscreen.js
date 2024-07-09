const gameDetail = document.querySelector('#gameDetail');
const gameCanvas = document.querySelector('#gameCanvas');
const game = document.querySelector('#game');
const gameBg = document.querySelector('#gameBg');

const scrollBg = document.querySelector('#scrollBg');

const tipText = document.querySelector('#tipText');

const test = document.querySelector('#test');

// 是否關閉提示
const setIsCloseTip = (close) => {
    if (close) {
        tipText.innerText = '';
        tipText.classList.add('closeTip');
    } else {
        tipText.innerText = '手機請轉直';
        tipText.classList.remove('closeTip');
    }
}

// 是否關閉遊戲背景
const setIsGameBgClose = (close) => {
    if (close) {
        gameBg.classList.add('closeGameBg');
    } else {
        gameBg.classList.remove('closeGameBg');
    }
}

// 手機橫直向判斷
const orientation = () => {
    if (!screenDir.matches) {
        console.log('目前是橫向')
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.style.overflow = 'hidden';
        setIsCloseTip(false);
    } else {
        console.log('目前是直向')
        document.body.style.overflow = 'auto';
        setIsCloseTip(true);
    }
}
const screenDir = window.matchMedia("(orientation: portrait)");
screenDir.addListener(orientation);

// 裝置判斷
const mobile = () => {
    try {
        document.createEvent('TouchEvent');
        console.log('手機裝置')
        return true;
    } catch (e) {
        console.log('電腦裝置')
        return false;
    }
}

// 遊戲畫面大小調整(根據高度縮放)
const resize = () => {
    if (!gameCanvas) return;
    const pageW = 720;
    const pageH = 1280;
    const ratio = pageH / pageW;

    const winW = window.innerWidth;
    const winH = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

    let width = winH / ratio;
    let height = winH;

    if (height / winW >= ratio) {
        height = winW * ratio;
        width = winW;
    }

    gameCanvas.style.width = `${width || 0}px`;
    gameCanvas.style.height = `${height || 0}px`;

    if (mobile())  {
        scrollBg.style.height = `${height + 600}px`;
    }
}

window.addEventListener('resize', () => {
    if (mobile()) {
        setIsGameBgClose(true)
        orientation();
    } else {
        setIsGameBgClose(false)
        setIsCloseTip(true)
    }
    resize();
});

window.onload = () => {
    if (mobile()) {
        setIsGameBgClose(true)
        orientation();
    } else {
        setIsGameBgClose(false)
        setIsCloseTip(true)
    }
    resize();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
    if (!mobile()) return;

    let scrollPositionY = window.scrollY || window.pageYOffset;
    console.log('scrollPositionY', scrollPositionY)

    test.innerText = `scrollPositionY: ${scrollPositionY}`;

    // 滾到一定程度，鎖住不給滾動
    if (scrollPositionY >= 100) {
        document.body.style.overflow = 'hidden';
    }

    // let scrollPositionX = window.scrollX || window.pageXOffset;
    // document.getElementById('scrollPosition').innerText = `垂直捲軸位置: ${scrollPositionY}, 水平捲軸位置: ${scrollPositionX}`;
};
