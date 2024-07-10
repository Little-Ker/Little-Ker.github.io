const gameDetail = document.querySelector('#gameDetail');
        const gameCanvas = document.querySelector('#gameCanvas');
        const game = document.querySelector('#game');
        const gameBg = document.querySelector('#gameBg');

        const scrollBg = document.querySelector('#scrollBg');

        const tipText = document.querySelector('#tipText');

        const btnList = document.querySelector('#btnList');

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

        // 是否關閉遊戲背景
        const setIsGameClose = (close) => {
            if (close) {
                gameBg.classList.add('closeGameBg');
            } else {
                gameBg.classList.remove('closeGameBg');
            }
        }

        // 手機橫直向判斷
        const orientation = () => {
            if (!screenDir.matches) {
                console.log('目前是橫像')
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // document.body.style.overflow = 'hidden';
                setIsCloseTip(false);
            } else {
                console.log('目前是直像')
                // document.body.style.overflow = 'auto';
                window.scrollTo({ top: 0, behavior: 'smooth' });
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

            const fullScreenBtnHeight = 36;

            const winW = window.innerWidth;
            const winH = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - fullScreenBtnHeight;

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
                setIsGameClose(true)
                // orientation();
            } else {
                setIsGameClose(false)
                setIsCloseTip(true)
            }

            resize();
        });

        window.onload = () => {
            if (mobile()) {
                setIsGameClose(true)
                orientation();
            } else {
                setIsGameClose(false)
                setIsCloseTip(true)
            }

            // window.scrollTo(0, 0);
            // window.scrollTo({ top: 0, behavior: 'smooth' });
            // setTimeout(() => window.scrollTo(0,0), 50);
            resize();
        };


        window.onscroll = function() {
            let scrollPositionY = window.scrollY || window.pageYOffset;
            btnList.innerText = `垂直捲軸位置: ${scrollPositionY}`;
        };

        window.onbeforeunload = function(){
            //刷新后页面自动回到顶部
          document.documentElement.scrollTop = 0;  //ie下
          document.body.scrollTop = 0;  //非ie
        }

        // $(window)；.ready(function() {
        //     $(window).scrollTop(0);
        //     window.scrollTo(0, 0);
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     console.log('ready')
        // });
