document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('.button');
  buttons.forEach(function(button) {
    var label = button.querySelector('.label').textContent;
    if (label.includes('!')) {
      button.classList.add('bounce');
    }
  });

  var sparkleEffectElement = document.querySelector('.sparkle-effect');
  if (sparkleEffectElement) {
    var sparklesCount = 10;
    for (var i = 0; i < sparklesCount; i++) {
      var sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.textContent = '✦';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      var size = Math.random() * 10 + 10;
      sparkle.style.fontSize = size + 'px';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      sparkle.style.animationDuration = Math.random() * 4 + 3 + 's';
      sparkleEffectElement.appendChild(sparkle);
    }
  }

  const tiltEffects = document.querySelectorAll('.tilt-effect');
  tiltEffects.forEach((effect) => {
    const maxTilt = 30;
    const perspective = 1000;
    const sensitivity = 0.8;
    const animationDuration = 500;
    const tiltThreshold = 10;
    let tiltX = 0;
    let tiltY = 0;
    let animationFrameId;

    function handleOrientation(event) {
      const beta = event.beta;
      const gamma = event.gamma;
      tiltY = (gamma / 180) * maxTilt * sensitivity;
      tiltX = (beta / 180) * maxTilt * sensitivity;
      tiltY = Math.min(Math.max(tiltY, -tiltThreshold), tiltThreshold);
      tiltX = Math.min(Math.max(tiltX, -tiltThreshold), tiltThreshold);
    }

    function handleMouseMove(event) {
      const mouseX = event.clientX - effect.getBoundingClientRect().left - effect.offsetWidth / 2;
      const mouseY = event.clientY - effect.getBoundingClientRect().top - effect.offsetHeight / 2;
      const tiltYTarget = (mouseX / effect.offsetWidth) * maxTilt * sensitivity;
      const tiltXTarget = -(mouseY / effect.offsetHeight) * maxTilt * sensitivity;
      tiltY += (tiltYTarget - tiltY) * 0.1;
      tiltX += (tiltXTarget - tiltX) * 0.1;
      tiltY = Math.min(Math.max(tiltY, -tiltThreshold), tiltThreshold);
      tiltX = Math.min(Math.max(tiltX, -tiltThreshold), tiltThreshold);
    }

    function resetTilt() {
      const startTime = performance.now();

      function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        tiltX = tiltX * (1 - progress);
        tiltY = tiltY * (1 - progress);
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    function updateTilt() {
      effect.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      animationFrameId = requestAnimationFrame(updateTilt);
    }

    effect.addEventListener('mousemove', handleMouseMove);
    effect.addEventListener('mouseleave', resetTilt);

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    updateTilt();
  });
});
