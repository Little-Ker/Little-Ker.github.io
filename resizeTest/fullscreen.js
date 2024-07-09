const gameDetail = document.querySelector('#gameDetail');
        const gameCanvas = document.querySelector('#gameCanvas');
        const game = document.querySelector('#game');

        const scrollBg = document.querySelector('#scrollBg');

        const tipText = document.querySelector('#tipText');
        const fullScreenBtn = document.querySelector('#fullScreenBtn');

        let isFullScreen = false;


        // 開啟 遊戲全屏畫面
        const openFullScreenBtn = () => {
            fullScreenBtn.innerText = 'Exit Full Screen';
            isFullScreen = true
            if (mobile()) {
                resize();
                setFullScreenGame(true);
                return
            }

            // 網頁版 F11 放大畫面
            if (gameDetail?.requestFullscreen) {
                gameDetail.requestFullscreen();
            } else if (gameDetail?.webkitRequestFullscreen) { // Safari 和 Chrome
                gameDetail.webkitRequestFullscreen();
            } else if (gameDetail?.mozRequestFullScreen) { // Firefox
                gameDetail.mozRequestFullScreen();
            } else if (gameDetail?.msRequestFullscreen) { // IE/Edge
                gameDetail.msRequestFullscreen();
            } else {
                console.log("Fullscreen API is not supported.");
            }
        }

        // 關閉 遊戲全屏畫面
        const closeFullScreenBtn = () => {
            fullScreenBtn.innerText = 'Full Screen';
            isFullScreen = false
            if (mobile()) {
                resize();
                setFullScreenGame(false);
                return
            }
            document.exitFullscreen();
        }

        const onFullScreen = () => {
            if (isFullScreen) {
                closeFullScreenBtn()
                return
            }
            openFullScreenBtn()
        }

        fullScreenBtn.addEventListener('click', onFullScreen);

        // 遊戲是否顯示全屏
        const setFullScreenGame = (show) => {
            console.log('show',show)
            if (show) {
                gameDetail.classList.add('gameDetailMax');
                game.classList.add('gameMax');
            } else {
                gameDetail.classList.remove('gameDetailMax');
                game.classList.remove('gameMax');
            }
        }

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

        // 手機橫直向判斷
        const orientation = () => {
            if (!screenDir.matches) {
                console.log('目前是橫像')
                // window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0; // For most browsers
                document.body.scrollTop = 0; // For some older browsers
                document.body.style.overflow = 'hidden';
                setIsCloseTip(false);
            } else {
                console.log('目前是直像')
                document.body.style.overflow = 'auto';
                setIsCloseTip(true);
            }
        }
        const screenDir = window.matchMedia("(orientation: portrait)");
        screenDir.addListener(orientation);

        // 裝置判斷
        const mobile = () => {
            try {
                console.log('手機板')
                document.createEvent('TouchEvent');
                // setTESMobileText('手機裝置')
                return true;
            } catch (e) {
                // setTESMobileText('電腦裝置')
                return false;
            }
        }

        // 遊戲畫面大小調整(根據高度縮放)
        const resize = () => {
            if (!gameCanvas) return;
            const pageW = 720;
            const pageH = 1280;
            const ratio = pageH / pageW;

            const navbarHeight = 48;
            const fullScreenBtnHeight = 36

            const winW = window.innerWidth;
            const winH = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - fullScreenBtnHeight - (isFullScreen ? 0 : navbarHeight);

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
                orientation();
            } else {
                setIsCloseTip(true)
            }
            resize();
        });

        window.onload = () => {
            if (mobile()) {
                orientation();
            } else {
                setIsCloseTip(true)
            }

            // firstPosY = window.innerHeight;
            // console.log('=========window.innerHeight',window.innerHeight, firstPosY)
            // window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0; // For most browsers
            document.body.scrollTop = 0; // For some older browsers
            resize();
        }

        // ios 禁止手機縮放
        // document.addEventListener('gesturestart', function (event) {
        //     event.preventDefault()
        // })