import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'jjtech-locale';

const dictionary = {
  zh: {
    htmlLang: 'zh-CN',
    nav: {
      atelier: 'Atelier',
      workflow: 'Workflow',
      edition: 'Edition',
      savoir: 'Savoir-Faire',
      maison: 'Maison',
    },
    header: {
      brand: 'JJTECH',
      search: '搜索',
      signIn: '登录',
      langLabel: '语言',
    },
    hero: {
      eyebrow: '2026 春夏典藏',
      titleItalic: 'Maison',
      title: 'JJTech',
      lead: (
        <>
          将自动化、协作与数据洞察织入同一条数字跑道。
          <br />
          让团队像高级定制工坊一样优雅地推进每一次交付。
        </>
      ),
      primaryCta: '进入控制台',
      secondaryCta: '探索工作流',
    },
    editorial: {
      eyebrow: '编辑视角',
      title: '工坊的三根支柱。',
      readMore: '展开阅读',
      items: [
        {
          number: '01',
          title: '神经工坊',
          body: '在同一条数字跑道上调度模型、流程与人，让每一次自动化都像高级定制般精准。',
        },
        {
          number: '02',
          title: '数据高定',
          body: '把分散的指标编织成一段克制的叙事，决策者只需读懂线条本身。',
        },
        {
          number: '03',
          title: '信号宅邸',
          body: '把实时信号收束于沉静的工作台面，节奏由你掌控，提醒只在必要时浮现。',
        },
      ],
    },
    savoir: {
      eyebrow: '工艺哲学',
      titleItalic: '一种安静的',
      title: '克制纪律。',
      body: 'JJTech 的工作流被一种克制的纪律所主导：每一个自动化步骤都经过反复打磨，每一段提示词都像被裁剪过的丝缎。我们相信效率不应当喧哗——它应当如一件细节考究的成衣，穿上身时自然贴合。',
      cta: '走进工坊',
    },
    footer: {
      groups: [
        {
          title: '客户服务',
          links: [
            { label: '联系我们', href: '#contact' },
            { label: '常见问题', href: '#faq' },
            { label: '产品支持', href: '#support' },
          ],
        },
        {
          title: '关于我们',
          links: [
            { label: 'JJTech 简介', href: '#about' },
            { label: '加入我们', href: '#careers' },
            { label: '媒体中心', href: '#press' },
          ],
        },
        {
          title: '法律信息',
          links: [
            { label: '使用条款', href: '#terms' },
            { label: '隐私政策', href: '#privacy' },
            { label: 'Cookie', href: '#cookies' },
          ],
        },
      ],
      newsletter: {
        title: '订阅通讯',
        body: '每月一期工艺手记，从不打扰。',
        placeholder: '邮箱地址',
        submit: '订阅',
      },
      copyright: '© 2026 JJTECH · 智能工作流之家',
      crafted: '于上海呈献',
      regionLabel: '地区与语言',
      region: '中国大陆',
    },
    drawer: {
      eyebrow: '账户',
      title: '登录',
      close: '关闭',
      lead: '输入账号信息，开启今天的高效旅程。',
      username: '邮箱或用户名',
      password: '密码',
      show: '显示',
      hide: '隐藏',
      remember: '记住我',
      forgot: '忘记密码？',
      submit: '登录',
      or: '或',
      github: '使用 GitHub 继续',
      wechat: '使用 微信 继续',
      signupTip: '还没有账号？',
      signupCta: '立即注册',
      thirdPartyTip: '演示页面暂未连接第三方登录',
      errors: {
        username: '请输入账号或邮箱。',
        password: '请输入密码。',
        passwordShort: '密码至少需要 6 位。',
      },
    },
    misc: {
      noscript: '当前浏览器未启用 JavaScript，登录抽屉将不可用。',
    },
  },
  en: {
    htmlLang: 'en',
    nav: {
      atelier: 'Atelier',
      workflow: 'Workflow',
      edition: 'Edition',
      savoir: 'Savoir-Faire',
      maison: 'Maison',
    },
    header: {
      brand: 'JJTECH',
      search: 'Search',
      signIn: 'Sign in',
      langLabel: 'Language',
    },
    hero: {
      eyebrow: 'The 2026 Edition',
      titleItalic: 'Maison',
      title: 'JJTech',
      lead: (
        <>
          Weave automation, collaboration and insight into a single digital runway.
          <br />
          So your team can deliver with the poise of a couture atelier.
        </>
      ),
      primaryCta: 'Enter the console',
      secondaryCta: 'Discover the workflow',
    },
    editorial: {
      eyebrow: 'Editorial',
      title: 'Three pillars of the house.',
      readMore: 'Read more',
      items: [
        {
          number: '01',
          title: 'Neural Atelier',
          body: 'Conduct models, flows and people on the same digital runway — every automation as exact as a couture stitch.',
        },
        {
          number: '02',
          title: 'Data Couture',
          body: 'Tailor scattered metrics into a quiet narrative; decision makers only need read the line itself.',
        },
        {
          number: '03',
          title: 'Signal Maison',
          body: 'Hold real-time signals on a still workbench. The rhythm is yours; alerts surface only when they must.',
        },
      ],
    },
    savoir: {
      eyebrow: 'Savoir-Faire',
      titleItalic: 'A quiet',
      title: 'discipline.',
      body: "JJTech's workflows are governed by a quiet discipline: each automation step polished, each prompt cut like silk. We believe efficiency should not raise its voice — it should fit, the way a well-made garment finds the shoulder.",
      cta: 'Visit the maison',
    },
    footer: {
      groups: [
        {
          title: 'Customer Service',
          links: [
            { label: 'Contact us', href: '#contact' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Product support', href: '#support' },
          ],
        },
        {
          title: 'Our House',
          links: [
            { label: 'About JJTech', href: '#about' },
            { label: 'Careers', href: '#careers' },
            { label: 'Press', href: '#press' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Terms', href: '#terms' },
            { label: 'Privacy', href: '#privacy' },
            { label: 'Cookies', href: '#cookies' },
          ],
        },
      ],
      newsletter: {
        title: 'Newsletter',
        body: 'A monthly atelier note. We never intrude.',
        placeholder: 'Email address',
        submit: 'Subscribe',
      },
      copyright: '© 2026 JJTECH · Maison of Intelligent Workflows',
      crafted: 'Crafted in Shanghai',
      regionLabel: 'Region & language',
      region: 'Mainland China',
    },
    drawer: {
      eyebrow: 'Account',
      title: 'Sign in',
      close: 'Close',
      lead: 'Enter your credentials to begin a more efficient day.',
      username: 'Email or username',
      password: 'Password',
      show: 'Show',
      hide: 'Hide',
      remember: 'Remember me',
      forgot: 'Forgot your password?',
      submit: 'Sign in',
      or: 'Or',
      github: 'Continue with GitHub',
      wechat: 'Continue with WeChat',
      signupTip: 'New to the maison?',
      signupCta: 'Create an account →',
      thirdPartyTip: 'Third-party sign-in is not wired up in this demo.',
      errors: {
        username: 'Please enter your email or username.',
        password: 'Please enter your password.',
        passwordShort: 'Password must be at least 6 characters.',
      },
    },
    misc: {
      noscript: 'JavaScript is disabled — the sign-in drawer will not work.',
    },
  },
};

const LocaleContext = createContext({
  locale: 'zh',
  setLocale: () => {},
  t: dictionary.zh,
});

function useLocale() {
  return useContext(LocaleContext);
}

function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return 'zh';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'zh' ? stored : 'zh';
  });

  useEffect(() => {
    document.documentElement.lang = dictionary[locale].htmlLang;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: dictionary[locale],
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function LocaleSwitch({ variant = 'header' }) {
  const { locale, setLocale, t } = useLocale();
  return (
    <div
      className={`locale-switch locale-switch--${variant}`}
      role="group"
      aria-label={t.header.langLabel}
    >
      <button
        type="button"
        className={locale === 'zh' ? 'is-active' : ''}
        aria-pressed={locale === 'zh'}
        onClick={() => setLocale('zh')}
      >
        中
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={locale === 'en' ? 'is-active' : ''}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );
}

function Header({ openLogin }) {
  const { t } = useLocale();
  return (
    <header className="site-header" aria-label={t.header.brand}>
      <a className="brand" href="./" aria-label={t.header.brand}>
        {t.header.brand}
      </a>

      <nav className="top-nav" aria-label={t.header.brand}>
        <a href="#atelier"><span>{t.nav.atelier}</span></a>
        <a href="#workflow"><span>{t.nav.workflow}</span></a>
        <a href="#edition"><span>{t.nav.edition}</span></a>
        <a href="#savoir"><span>{t.nav.savoir}</span></a>
        <a href="#maison"><span>{t.nav.maison}</span></a>
      </nav>

      <div className="header-actions">
        <LocaleSwitch variant="header" />
        <button type="button" className="icon-button" aria-label={t.header.search}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m20 20-4.5-4.5" />
          </svg>
        </button>
        <button type="button" className="signin-button" onClick={openLogin}>
          {t.header.signIn}
        </button>
      </div>
    </header>
  );
}

function Hero({ openLogin }) {
  const { t } = useLocale();
  return (
    <section className="hero" id="atelier" aria-labelledby="hero-title">
      <p className="eyebrow">{t.hero.eyebrow}</p>
      <h1 id="hero-title">
        <span className="serif-italic">{t.hero.titleItalic}</span>
        <span>{t.hero.title}</span>
      </h1>
      <p className="hero-lead">{t.hero.lead}</p>
      <div className="hero-actions">
        <button type="button" className="btn-primary" onClick={openLogin}>
          {t.hero.primaryCta}
        </button>
        <a className="btn-link" href="#workflow">
          {t.hero.secondaryCta}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

function Editorial() {
  const { t } = useLocale();
  return (
    <section className="editorial" id="workflow" aria-label={t.editorial.eyebrow}>
      <header className="section-head">
        <p className="eyebrow">{t.editorial.eyebrow}</p>
        <h2>{t.editorial.title}</h2>
      </header>
      <div className="editorial-grid">
        {t.editorial.items.map((item) => (
          <article key={item.number} className="editorial-card">
            <span className="card-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <a className="btn-link small" href="#edition">
              {t.editorial.readMore}
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function SavoirFaire() {
  const { t } = useLocale();
  return (
    <section className="savoir" id="savoir" aria-label={t.savoir.eyebrow}>
      <div className="savoir-inner">
        <div className="savoir-head">
          <p className="eyebrow">{t.savoir.eyebrow}</p>
          <h2>
            <span className="serif-italic">{t.savoir.titleItalic}</span>
            <span>{t.savoir.title}</span>
          </h2>
        </div>
        <div className="savoir-body">
          <p>{t.savoir.body}</p>
          <a className="btn-link" href="#maison" id="edition">
            {t.savoir.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer" id="maison" aria-label={t.footer.copyright}>
      <div className="footer-grid">
        {t.footer.groups.map((group) => (
          <div key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4>{t.footer.newsletter.title}</h4>
          <p>{t.footer.newsletter.body}</p>
          <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder={t.footer.newsletter.placeholder}
              aria-label={t.footer.newsletter.placeholder}
            />
            <button type="submit" aria-label={t.footer.newsletter.submit}>→</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.footer.copyright}</span>
        <div className="footer-region" aria-label={t.footer.regionLabel}>
          <span>{t.footer.region}</span>
          <LocaleSwitch variant="footer" />
        </div>
        <span>{t.footer.crafted}</span>
      </div>
    </footer>
  );
}

function LoginDrawer({ isOpen, closeLogin }) {
  const { t } = useLocale();
  const usernameRef = useRef(null);
  const [formData, setFormData] = useState({ username: '', password: '', remember: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [buttonState, setButtonState] = useState('idle');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('drawer-open', isOpen);
    if (isOpen) window.setTimeout(() => usernameRef.current?.focus(), 240);
    return () => document.body.classList.remove('drawer-open');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLogin();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeLogin, isOpen]);

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
      showError(t.drawer.errors.username);
      return false;
    }
    if (!formData.password.trim()) {
      showError(t.drawer.errors.password);
      return false;
    }
    if (formData.password.trim().length < 6) {
      showError(t.drawer.errors.passwordShort);
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
    <div
      className={`drawer-root${isOpen ? ' is-open' : ''}`}
      id="login-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      aria-hidden={!isOpen}
    >
      <button
        className="drawer-backdrop"
        type="button"
        aria-label={t.drawer.close}
        onClick={closeLogin}
        tabIndex={isOpen ? 0 : -1}
      />
      <aside className={`drawer${isShaking ? ' is-shaking' : ''}`} aria-label={t.drawer.title}>
        <div className="drawer-head">
          <div>
            <p className="eyebrow">{t.drawer.eyebrow}</p>
            <h2 id="login-title">{t.drawer.title}</h2>
          </div>
          <button
            className="drawer-close"
            type="button"
            aria-label={t.drawer.close}
            onClick={closeLogin}
          >
            {t.drawer.close}
          </button>
        </div>

        <form className="drawer-form" onSubmit={submitLogin} noValidate>
          <p className="drawer-lead">{t.drawer.lead}</p>

          <div className="field">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder=" "
              required
              value={formData.username}
              onChange={updateField}
              disabled={isDisabled}
              ref={usernameRef}
            />
            <label htmlFor="username">{t.drawer.username}</label>
          </div>

          <div className="field">
            <input
              id="password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder=" "
              minLength={6}
              required
              value={formData.password}
              onChange={updateField}
              disabled={isDisabled}
            />
            <label htmlFor="password">{t.drawer.password}</label>
            <button
              type="button"
              className="field-toggle"
              aria-pressed={isPasswordVisible}
              aria-label={isPasswordVisible ? t.drawer.hide : t.drawer.show}
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              disabled={isDisabled}
            >
              {isPasswordVisible ? t.drawer.hide : t.drawer.show}
            </button>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={updateField}
                disabled={isDisabled}
              />
              <span>{t.drawer.remember}</span>
            </label>
            <a href="#forgot">{t.drawer.forgot}</a>
          </div>

          <p className="form-error" role="alert" aria-live="polite">{error}</p>

          <button
            className="submit-button"
            type="submit"
            data-state={buttonState}
            disabled={isDisabled}
          >
            <span className="button-text">{t.drawer.submit}</span>
            <span className="button-loader" aria-hidden="true" />
            <span className="button-check" aria-hidden="true" />
          </button>

          <div className="drawer-divider"><span>{t.drawer.or}</span></div>

          <div className="quick-actions" aria-label={t.drawer.or}>
            <button type="button" disabled title={t.drawer.thirdPartyTip}>{t.drawer.github}</button>
            <button type="button" disabled title={t.drawer.thirdPartyTip}>{t.drawer.wechat}</button>
          </div>

          <p className="signup-tip">
            {t.drawer.signupTip}{' '}
            <a href="#signup">{t.drawer.signupCta}</a>
          </p>
        </form>
      </aside>
    </div>
  );
}

function Shell() {
  const { t } = useLocale();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <>
      <Header openLogin={openLogin} />
      <main className="page">
        <Hero openLogin={openLogin} />
        <Editorial />
        <SavoirFaire />
      </main>
      <Footer />
      <LoginDrawer isOpen={isLoginOpen} closeLogin={closeLogin} />
      <noscript>
        <p className="noscript-notice">{t.misc.noscript}</p>
      </noscript>
    </>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Shell />
    </LocaleProvider>
  );
}
