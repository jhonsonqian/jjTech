import { useEffect, useRef, useState } from 'react';

const coverCards = [
  ['01', 'Neural Ops', 'Fluid command center', 'cover-card-one'],
  ['02', 'Data Silk', 'Decision fabric', 'cover-card-two'],
  ['03', 'Cloud Atelier', 'Tailored automation', 'cover-card-three'],
  ['04', 'Signal Muse', 'Live intelligence', 'cover-card-four'],
];

const tickerItems = [
  'JJTech Editorial System',
  'Luxury-grade automation',
  'Future workplace',
  'Human x AI rhythm',
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <path d="M32 4 58 18.5v27L32 60 6 45.5v-27L32 4Z" />
        <path d="M21 25.5 32 19l11 6.5v13L32 45l-11-6.5v-13Z" />
        <path d="M32 19v26M21 25.5l22 13M43 25.5l-22 13" />
      </svg>
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || reducedMotion) return undefined;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let frame = 0;
    let resizeTimer = 0;
    let particles = [];

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.28 + 0.06,
      drift: Math.random() * 0.28 - 0.14,
      alpha: Math.random() * 0.42 + 0.14,
      depth: Math.random() * 0.8 + 0.2,
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
      particles = Array.from({ length: Math.min(72, Math.max(36, Math.floor(width / 22))) }, createParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((particle) => {
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
          particle.radius * 8,
        );
        gradient.addColorStop(0, `rgba(245, 221, 173, ${particle.alpha})`);
        gradient.addColorStop(0.5, `rgba(217, 86, 122, ${particle.alpha * 0.35})`);
        gradient.addColorStop(1, 'rgba(245, 221, 173, 0)');

        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        draw();
      }
    };

    resize();
    draw();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" />;
}

function Header({ isLoginOpen, openLogin }) {
  return (
    <header className="site-header" aria-label="站点导航">
      <a className="brand" href="./" aria-label="JJTech 首页">
        <BrandMark />
        <span>JJTech</span>
      </a>

      <nav className="top-nav" aria-label="首页栏目">
        <a href="#atelier">Atelier</a>
        <a href="#workflow">Workflow</a>
        <a href="#edition">Edition</a>
      </nav>

      <button
        className="avatar-trigger"
        type="button"
        aria-label="打开登录面板"
        aria-expanded={isLoginOpen}
        aria-controls="login-panel"
        onClick={openLogin}
      >
        <span className="avatar-ring" aria-hidden="true" />
        <span className="avatar-face" aria-hidden="true">J</span>
      </button>
    </header>
  );
}

function Hero({ openLogin }) {
  const repeatedCards = [...coverCards, ...coverCards.slice(0, 2)];
  const repeatedTicker = [...tickerItems, ...tickerItems];

  return (
    <main className="magazine-home">
      <section className="hero-stage" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Digital couture · 2026 edition</p>
          <h1 id="hero-title">让智能工作流拥有高级定制的质感</h1>
          <p className="hero-lead">
            JJTech 将自动化、协作与数据洞察织入同一条数字跑道，让团队像时尚大片一样优雅地推进每一次交付。
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#workflow">探索工作流</a>
            <button className="secondary-link" type="button" onClick={openLogin}>进入控制台</button>
          </div>
        </div>

        <div className="runway" id="atelier" aria-label="动态视觉跑马展示">
          <div className="runway-track">
            {repeatedCards.map(([number, title, subtitle, className], index) => (
              <article className={`cover-card ${className}`} aria-hidden={index >= coverCards.length} key={`${title}-${index}`}>
                <span>{number}</span>
                <strong>{title}</strong>
                <em>{subtitle}</em>
              </article>
            ))}
          </div>
        </div>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {repeatedTicker.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="feature-strip" id="workflow" aria-label="平台能力">
        <article>
          <span>01</span>
          <h2>高清主视觉</h2>
          <p>以大面积动态画面建立品牌第一印象，像时尚杂志首页一样抓住注意力。</p>
        </article>
        <article id="edition">
          <span>02</span>
          <h2>轻量登录</h2>
          <p>右上角头像保留登录入口，不打断首页浏览节奏，需要时再展开控制台入口。</p>
        </article>
        <article>
          <span>03</span>
          <h2>响应式体验</h2>
          <p>桌面端强调大片跑马视觉，移动端转为单列沉浸式封面布局。</p>
        </article>
      </section>
    </main>
  );
}

function LoginModal({ isOpen, closeLogin }) {
  const cardRef = useRef(null);
  const usernameRef = useRef(null);
  const [formData, setFormData] = useState({ username: '', password: '', remember: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [buttonState, setButtonState] = useState('idle');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('login-open', isOpen);
    if (isOpen) window.setTimeout(() => usernameRef.current?.focus(), 180);
    return () => document.body.classList.remove('login-open');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLogin();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeLogin, isOpen]);

  useEffect(() => {
    const card = cardRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (!card || reducedMotion || coarsePointer) return undefined;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const update = () => {
      const rect = card.getBoundingClientRect();
      const x = (pointerX - rect.left) / rect.width - 0.5;
      const y = (pointerY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateZ(0)`;
      frame = 0;
    };

    const onMouseMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

  const showError = (message) => {
    setError(message);
    if (!message) return;
    setIsShaking(false);
    window.requestAnimationFrame(() => setIsShaking(true));
    window.setTimeout(() => setIsShaking(false), 460);
  };

  const updateField = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    if (error) showError('');
  };

  const validate = () => {
    if (!formData.username.trim()) {
      showError('请输入账号或邮箱。');
      return false;
    }
    if (!formData.password.trim()) {
      showError('请输入密码。');
      return false;
    }
    if (formData.password.trim().length < 6) {
      showError('密码至少需要 6 位。');
      return false;
    }
    showError('');
    return true;
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setButtonState('loading');
    setIsDisabled(true);

    await wait(1100);
    setButtonState('success');
    await wait(650);
    window.location.hash = 'dashboard-demo';
    await wait(450);
    setButtonState('idle');
    setIsDisabled(false);
  };

  return (
    <div className={`login-overlay${isOpen ? ' is-open' : ''}`} id="login-panel" role="dialog" aria-modal="true" aria-labelledby="login-title" aria-hidden={!isOpen}>
      <button className="overlay-backdrop" type="button" aria-label="关闭登录面板" onClick={closeLogin} />
      <section className="card-wrap" aria-label="登录表单">
        <form className={`login-card${isShaking ? ' is-shaking' : ''}`} id="login-form" aria-labelledby="login-title" onSubmit={submitLogin} noValidate ref={cardRef}>
          <button className="close-login" type="button" aria-label="关闭登录面板" onClick={closeLogin} />
          <div className="card-glow" aria-hidden="true" />
          <div className="form-heading">
            <p className="eyebrow">Secure access</p>
            <h2 id="login-title">欢迎回来</h2>
            <p>输入账号信息，开启今天的高效旅程。</p>
          </div>

          <div className="field-group">
            <label htmlFor="username">账号 / 邮箱</label>
            <div className="input-shell">
              <input id="username" name="username" type="text" autoComplete="username" placeholder=" " required value={formData.username} onChange={updateField} disabled={isDisabled} ref={usernameRef} />
              <span className="floating-label">请输入账号或邮箱</span>
              <span className="field-line" aria-hidden="true" />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="password">密码</label>
            <div className="input-shell password-shell">
              <input id="password" name="password" type={isPasswordVisible ? 'text' : 'password'} autoComplete="current-password" placeholder=" " minLength={6} required value={formData.password} onChange={updateField} disabled={isDisabled} />
              <span className="floating-label">请输入至少 6 位密码</span>
              <button className="password-toggle" type="button" aria-label={isPasswordVisible ? '隐藏密码' : '显示密码'} aria-pressed={isPasswordVisible} onClick={() => setIsPasswordVisible((visible) => !visible)} disabled={isDisabled}>
                <span className="eye-icon" aria-hidden="true" />
              </button>
              <span className="field-line" aria-hidden="true" />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" name="remember" checked={formData.remember} onChange={updateField} disabled={isDisabled} />
              <span>记住我</span>
            </label>
            <a href="#forgot">忘记密码？</a>
          </div>

          <p className="form-error" id="form-error" role="alert" aria-live="polite">{error}</p>

          <button className="submit-button" type="submit" data-state={buttonState} disabled={isDisabled}>
            <span className="button-text">登录控制台</span>
            <span className="button-loader" aria-hidden="true" />
            <span className="button-check" aria-hidden="true" />
          </button>

          <div className="divider"><span>或使用演示入口</span></div>

          <div className="quick-actions" aria-label="第三方登录演示入口">
            <button type="button" disabled title="演示页面暂未连接第三方登录">GitHub</button>
            <button type="button" disabled title="演示页面暂未连接第三方登录">WeChat</button>
          </div>

          <p className="signup-tip">还没有账号？<a href="#signup">立即注册</a></p>
        </form>
      </section>
    </div>
  );
}

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <>
      <ParticleCanvas />
      <Header isLoginOpen={isLoginOpen} openLogin={openLogin} />
      <Hero openLogin={openLogin} />
      <LoginModal isOpen={isLoginOpen} closeLogin={closeLogin} />
      <noscript>
        <p className="noscript-notice">当前浏览器未启用 JavaScript，动态特效和头像登录面板将不可用。</p>
      </noscript>
    </>
  );
}
