const yes = document.getElementById('yes');
const no = document.getElementById('no');
const video = document.getElementById('video');
const mask = document.getElementById('mask');
const heartsContainer = document.getElementById('hearts-container');
const container = document.querySelector('.video-container');
const happy = document.getElementById('happy');
const nextBtn = document.getElementById('nextBtn');
const nextBtn2 = document.getElementById('nextBtn2');
const intro = document.getElementById('intro');
const love = document.getElementById('love');
const love2 = document.getElementById('love2');
const scene = document.getElementById('scene');
const scene2 = document.getElementById('scene2');
container.classList.remove('bg-visible');
video.addEventListener('playing', () => {
    container.classList.add('bg-visible');
});
let yesPaddingTop = 10;
let yesPadding = 10;
let yesWidth = 100;
let yesFontSize = 16;
let noClicks = 0;
let brightness = 1;
let contrast = 1;
yes.style.boxSizing = 'border-box';
yes.style.width = `${yesWidth}px`;
yes.style.padding = `${yesPadding}px`;
yes.style.fontSize = `${yesFontSize}px`;
function makeInteractive(balloon) {
    let offsetX = 0;
    let offsetY = 0;
    balloon.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        const rect = balloon.getBoundingClientRect();
        offsetX = t.clientX - rect.left;
        offsetY = t.clientY - rect.top;
    }, { passive: true });
    balloon.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const t = e.touches[0];
        balloon.style.left = t.clientX - offsetX + 'px';
        balloon.style.top = t.clientY - offsetY + 'px';
    }, { passive: false });
    balloon.addEventListener('click', () => popBalloon(balloon));
}
function play(src, volume = 0.7) {
    const a = new Audio(src);
    a.volume = volume;
    a.play();
}
function heartStart() {
    let maskHeight = 0;
    const duration = 15000;
    const steps = 150;
    const intervalTime = duration / steps;
    const interval = setInterval(() => {
        maskHeight += 2;
        mask.style.height = `${maskHeight}%`;
        const maskPixelHeight = (maskHeight / 100) * video.clientHeight;
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.position = 'absolute';
            heart.style.left = `${Math.random() * (video.clientWidth - 20)}px`;
            heart.style.top = `${maskPixelHeight - 15 + Math.random() * 10}px`;
            heart.style.fontSize = `${10 + Math.random() * 20}px`;
            heart.style.opacity = `${0.5 + Math.random() * 0.5}`;
            heart.style.pointerEvents = 'none';
            heart.style.transition = 'transform 2s linear, opacity 2s linear';
            heartsContainer.appendChild(heart);
            setTimeout(() => {
                heart.style.transform = `translateY(${-200 + Math.random() * 100}px)`;
                heart.style.opacity = '0';
            }, 10);
            setTimeout(() => heart.remove(), 2100);
        }
        if (maskHeight >= 100) {
            clearInterval(interval);
            video.style.display = 'none';
            mask.style.display = 'none';
            play('./res/yeeeeaaaahhhh.mp3', 0.5);
            container.style.transform = 'scale(1) rotate(360deg)';
            const rand = (min, max) => Math.random() * (max - min) + min;
            (async () => {
                for (let i = 0; i < 8; i++) {
                    await new Promise(r => setTimeout(r, rand(20, 100)));
                    play('./res/firework1.mp3', rand(0.5, 0.9));
                    await new Promise(r => setTimeout(r, rand(30, 120)));
                    play('./res/firework2.mp3', rand(0.4, 0.8));
                    await new Promise(r => setTimeout(r, rand(80, 200)));
                    play('./res/firework3.mp3', rand(0.6, 1));
                }
            })();
            happy.style.display = 'block';
            document.body.style.overflow = 'visible';
            setTimeout(() => (nextBtn.style.visibility = 'visible'), 4000);
        }
    }, intervalTime);
}
function popBalloon(balloon) {
    balloon.style.transition = 'transform 0.2s';
    balloon.style.transform = 'scale(1.5)';
    setTimeout(() => {
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
            confetti.style.left = `${balloon.offsetLeft + balloon.offsetWidth / 2}px`;
            confetti.style.top = `${balloon.offsetTop + balloon.offsetHeight / 2}px`;
            document.body.appendChild(confetti);
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            confetti.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0 },
            ], { duration: 800, easing: 'ease-out' });
            setTimeout(() => confetti.remove(), 800);
        }
        balloon.style.transition = 'opacity 0.1s';
        balloon.style.opacity = '0';
        setTimeout(() => {
            balloon.remove();
        }, 100);
    }, 200);
}
no.onclick = () => {
    brightness -= 0.1;
    contrast += 0.25;
    brightness = Math.max(brightness, 0.2);
    contrast = Math.min(contrast, 2);
    video.style.filter = `brightness(${brightness}) contrast(${contrast})`;
    const steps = 6;
    noClicks = Math.min(noClicks + 1, steps);
    const containerWidth = container.clientWidth || window.innerWidth;
    const targetWidth = containerWidth;
    const stepWidth = targetWidth / steps;
    yes.style.boxSizing = 'border-box';
    yes.style.whiteSpace = 'nowrap';
    yes.style.transition = 'width 300ms ease, padding 300ms ease, font-size 300ms ease';
    yes.style.flex = '0 0 auto';
    no.style.flex = '0 0 auto';
    const newWidth = Math.min(Math.round(stepWidth * noClicks), targetWidth);
    yes.style.width = `${newWidth}px`;
    yes.style.padding = `${yesPadding + noClicks * 37}px`;
    yes.style.fontSize = `${yesFontSize + noClicks * 8}px`;
    yes.style.paddingTop = `${yesPaddingTop}px`;
    if (noClicks >= steps) {
        no.style.transition = 'transform 500ms ease, opacity 400ms ease';
        no.style.transform = `translateX(${targetWidth + 100}px)`;
        no.style.opacity = '0';
        no.style.pointerEvents = 'none';
    }
};
yes.onclick = () => {
    brightness = 1;
    contrast = 1;
    video.style.filter = `brightness(${brightness}) contrast(${contrast})`;
    video.play();
    yes.style.display = 'none';
    no.style.display = 'none';
    setTimeout(() => heartStart(), 3000);
};
nextBtn.onclick = () => {
    intro.style.display = 'none';
    love.style.display = 'block';
    play('./res/backgroundMusic.mp3', 0.5);
    for (let i = 0; i < 70; i++) {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = Math.random() * 90 + 'vw';
        b.style.top = Math.random() * 80 + 'vh';
        const lightness = 50 + Math.random() * 40;
        b.style.background = `hsl(350, 100%, ${lightness}%)`;
        scene.appendChild(b);
        makeInteractive(b);
    }
    setTimeout(() => (nextBtn2.style.visibility = 'visible'), 15000);
};
nextBtn2.onclick = () => {
    love.style.display = 'none';
    love2.style.display = 'block';
    for (let i = 0; i < 70; i++) {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = Math.random() * 90 + 'vw';
        b.style.top = Math.random() * 80 + 'vh';
        const lightness = 50 + Math.random() * 40;
        b.style.background = `hsl(350, 100%, ${lightness}%)`;
        scene2.appendChild(b);
        makeInteractive(b);
    }
};
export {};
//# sourceMappingURL=main.js.map