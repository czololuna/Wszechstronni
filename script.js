/* ====== Stars Canvas ====== */
(function(){
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');

    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;

    const STAR_COUNT = Math.round((w * h) / 12000);
    const stars = [];

    function rand(min, max){ return Math.random() * (max - min) + min; }

    function initStars(){
        stars.length = 0;
        for(let i=0;i<STAR_COUNT;i++){
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: rand(0.4, 1.6),
                alpha: rand(0.2, 0.95),
                twinkleSpeed: rand(0.002, 0.01),
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    function draw(){
        ctx.clearRect(0,0,w,h);
        for(const s of stars){
            s.phase += s.twinkleSpeed;
            const a = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));

            ctx.beginPath();
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r*4);
            g.addColorStop(0, `rgba(255,255,255,${a})`);
            g.addColorStop(0.6, `rgba(200,220,255,${a*0.25})`);
            g.addColorStop(1, `rgba(200,220,255,0)`);

            ctx.fillStyle = g;
            ctx.arc(s.x, s.y, s.r*4, 0, Math.PI*2);
            ctx.fill();
        }
    }

    let rafId;
    function loop(){
        draw();
        rafId = requestAnimationFrame(loop);
    }

    let resizeTimer;
    function onResize(){
        cancelAnimationFrame(rafId);
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(()=>{
            w = canvas.width = innerWidth;
            h = canvas.height = innerHeight;
            initStars();
            loop();
        }, 120);
    }

    initStars();
    loop();
    addEventListener('resize', onResize);
})();

/* ====== Fade-in przy scrollu ====== */
(function(){
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('section.fade').forEach(s => observer.observe(s));
})();

/* ====== Mobile menu ====== */
(function(){
    const hamburger = document.getElementById('hamburger');
    const mobileContainer = document.getElementById('mobileMenuContainer');
    let open = false;

    function buildMenu(){
        const menu = document.createElement('div');
        menu.className = 'mobile-menu';
        menu.innerHTML = `
            <a href="#o-co-chodzi">O co chodzi</a>
            <a href="#co-znajdziesz">Co znajdziesz</a>
            <a href="#dla-kogo">Dla kogo</a>
        `;
        menu.addEventListener('click', ()=> toggleMenu(false));
        return menu;
    }

    function toggleMenu(force){
        open = typeof force === 'boolean' ? force : !open;
        mobileContainer.innerHTML = '';
        if(open){
            mobileContainer.appendChild(buildMenu());
            mobileContainer.setAttribute('aria-hidden','false');
        } else {
            mobileContainer.setAttribute('aria-hidden','true');
        }
    }

    hamburger.addEventListener('click', ()=> toggleMenu());
    addEventListener('resize', ()=> {
        if(innerWidth > 720) toggleMenu(false);
    });
})();
