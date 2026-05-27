const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const canvas = document.querySelector("#bg-canvas");
const card = document.querySelector(".login-card");
const form = document.querySelector("#login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");
const submitButton = document.querySelector(".submit-button");
const formError = document.querySelector("#form-error");

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

function initParticles() {
  if (!canvas || prefersReducedMotion.matches) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  let particles = [];
  let visible = true;

  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.45,
    speed: Math.random() * 0.36 + 0.08,
    drift: Math.random() * 0.34 - 0.17,
    alpha: Math.random() * 0.55 + 0.18,
    depth: Math.random() * 0.75 + 0.25,
  });

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(88, Math.max(44, Math.floor(width / 18)));
    particles = Array.from({ length: count }, createParticle);
  };

  const drawLine = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 128) return;

    ctx.globalAlpha = (1 - distance / 128) * 0.18;
    ctx.strokeStyle = "#33f8ff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };

  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    particles.forEach((particle, index) => {
      particle.y -= particle.speed * particle.depth;
      particle.x += particle.drift * particle.depth;

      if (particle.y < -12) {
        particle.y = height + 12;
        particle.x = Math.random() * width;
      }

      if (particle.x < -12) particle.x = width + 12;
      if (particle.x > width + 12) particle.x = -12;

      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 7,
      );
      gradient.addColorStop(0, `rgba(51, 248, 255, ${particle.alpha})`);
      gradient.addColorStop(0.48, `rgba(155, 92, 255, ${particle.alpha * 0.35})`);
      gradient.addColorStop(1, "rgba(51, 248, 255, 0)");

      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 7, 0, Math.PI * 2);
      ctx.fill();

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        drawLine(particle, particles[nextIndex]);
      }
    });

    ctx.globalAlpha = 1;
    animationFrame = window.requestAnimationFrame(tick);
  };

  const handleVisibility = () => {
    visible = !document.hidden;
    if (visible && !animationFrame) tick();
    if (!visible) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
  };

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 120);
  });
  document.addEventListener("visibilitychange", handleVisibility);
  resize();
  tick();
}

function initCardTilt() {
  if (!card || prefersReducedMotion.matches || window.matchMedia("(pointer: coarse)").matches) return;

  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const update = () => {
    const rect = card.getBoundingClientRect();
    const x = (pointerX - rect.left) / rect.width - 0.5;
    const y = (pointerY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateZ(0)`;
    frame = 0;
  };

  card.addEventListener("mousemove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) frame = window.requestAnimationFrame(update);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
  });
}

function initPasswordToggle() {
  if (!password || !passwordToggle) return;

  passwordToggle.addEventListener("click", () => {
    const shouldShow = password.type === "password";
    password.type = shouldShow ? "text" : "password";
    passwordToggle.setAttribute("aria-pressed", String(shouldShow));
    passwordToggle.setAttribute("aria-label", shouldShow ? "隐藏密码" : "显示密码");
    password.focus({ preventScroll: true });
  });
}

function setError(message) {
  formError.textContent = message;
  if (!message || !card) return;

  card.classList.remove("is-shaking");
  void card.offsetWidth;
  card.classList.add("is-shaking");
  window.setTimeout(() => card.classList.remove("is-shaking"), 460);
}

function validateForm() {
  const account = username.value.trim();
  const secret = password.value.trim();

  username.setCustomValidity("");
  password.setCustomValidity("");

  if (!account) {
    username.setCustomValidity("请输入账号或邮箱");
    username.reportValidity();
    setError("请输入账号或邮箱。");
    return false;
  }

  if (!secret) {
    password.setCustomValidity("请输入密码");
    password.reportValidity();
    setError("请输入密码。");
    return false;
  }

  if (secret.length < 6) {
    password.setCustomValidity("密码至少需要 6 位");
    password.reportValidity();
    setError("密码至少需要 6 位。");
    return false;
  }

  setError("");
  return true;
}

function setFormDisabled(isDisabled) {
  [username, password, passwordToggle].forEach((control) => {
    if (control) control.disabled = isDisabled;
  });
}

function initForm() {
  if (!form || !submitButton) return;

  [username, password].forEach((input) => {
    input.addEventListener("input", () => {
      input.setCustomValidity("");
      if (formError.textContent) setError("");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    submitButton.dataset.state = "loading";
    submitButton.disabled = true;
    setFormDisabled(true);

    try {
      await wait(1100);
      submitButton.dataset.state = "success";
      setError("");
      await wait(650);
      window.location.hash = "dashboard-demo";
    } catch {
      submitButton.dataset.state = "idle";
      setError("登录失败，请稍后再试。");
    } finally {
      await wait(450);
      submitButton.disabled = false;
      submitButton.dataset.state = "idle";
      setFormDisabled(false);
    }
  });
}

function initKeyboardPolish() {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      target.value = "";
      target.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
}

initParticles();
initCardTilt();
initPasswordToggle();
initForm();
initKeyboardPolish();
