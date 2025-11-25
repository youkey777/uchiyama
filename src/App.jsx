import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Menu, X, Check, ArrowDown,
  Shield, TrendingUp, BookOpen, Home,
  GraduationCap, Coins, LineChart, Users,
  FileText, Wallet, Heart, MessageCircle, Calendar
} from 'lucide-react';

/* フォントの読み込みとグローバルスタイルの定義 
  - Font: Zen Kaku Gothic New (親しみやすさと誠実さ)
*/
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap');
    
    :root {
      --cursor-size: 20px;
    }

    body {
      font-family: 'Zen Kaku Gothic New', sans-serif;
      cursor: none; /* デフォルトカーソルを隠す */
      background-color: #F8FAFC;
      color: #334155;
      line-height: 1.8;
    }

    /* カスタムカーソル */
    .custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      width: var(--cursor-size);
      height: var(--cursor-size);
      border: 1px solid rgba(14, 165, 233, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, background-color 0.3s;
      mix-blend-mode: multiply;
    }
    .custom-cursor.hovered {
      width: 60px;
      height: 60px;
      background-color: rgba(14, 165, 233, 0.1);
      border-color: transparent;
      backdrop-filter: blur(2px);
    }

    /* スクロールバー非表示 */
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    /* テキスト選択色 */
    ::selection {
      background: #bae6fd;
      color: #0c4a6e;
    }
    
    .fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

/* Utility: Scroll Reveal */
const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* Hooks & Components */
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

const FloatingOrb = ({ size, color, top, left, speed = 0.05, scrollY, delay = 0 }) => {
  const yPos = scrollY * speed;
  return (
    <div
      className={`absolute rounded-full blur-[80px] opacity-60 mix-blend-multiply transition-transform duration-100 ease-linear will-change-transform`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: top,
        left: left,
        transform: `translateY(${yPos}px) scale(${1 + Math.sin(scrollY * 0.001 + delay) * 0.1})`,
        zIndex: 0
      }}
    />
  );
};

const BrandSite = () => {
  const { x, y } = useMousePosition();
  const scrollY = useScrollPosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-slate-600 bg-slate-50">
      <GlobalStyles />

      {/* カスタムカーソル */}
      <div
        className={`custom-cursor hidden md:block ${isHovering ? 'hovered' : ''}`}
        style={{ left: `${x}px`, top: `${y}px` }}
      />

      {/* 背景: 動的なオーブ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb size="40vw" color="#E0F2FE" top="-10%" left="-10%" speed={-0.1} scrollY={scrollY} delay={0} />
        <FloatingOrb size="35vw" color="#F0F9FF" top="40%" left="60%" speed={0.05} scrollY={scrollY} delay={2} />
        <FloatingOrb size="25vw" color="#E0F7FA" top="80%" left="10%" speed={-0.08} scrollY={scrollY} delay={4} />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-darken bg-white/50 backdrop-blur-sm">
        <div
          className="text-2xl font-bold tracking-tight text-slate-800 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          FP.Design
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10 text-sm font-medium text-slate-600">
          {[
            { id: 'philosophy', label: '想い・考え方' },
            { id: 'case', label: '事例紹介' },
            { id: 'service', label: 'サービス' },
            { id: 'flow', label: '流れ' },
            { id: 'profile', label: 'プロフィール' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative hover:text-sky-600 transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sky-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="text-slate-800 font-bold hover:text-sky-600 transition-colors"
          >
            お問い合わせ
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-800 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out md:hidden flex items-center justify-center ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-8 text-center">
          {[
            { id: 'philosophy', label: '想い・考え方' },
            { id: 'case', label: '事例紹介' },
            { id: 'service', label: 'サービス' },
            { id: 'flow', label: '流れ' },
            { id: 'profile', label: 'プロフィール' },
            { id: 'contact', label: 'お問い合わせ' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-2xl font-medium text-slate-800"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section - Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-slate-50">
        {/* Right Half - Full Image with Gradient Overlay */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
          <img
            src="/hero_main.jpg"
            alt="Financial Planning Consultation"
            className="w-full h-full object-cover translate-x-[15px] lg:translate-x-0"
            style={{ objectPosition: '75% center' }}
          />
          {/* Gradient overlay from center to left */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 lg:via-slate-50/80 to-transparent"></div>
        </div>

        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          {/* Left Content */}
          <div className="max-w-2xl space-y-8 fade-in-up">
            <div className="inline-block px-4 py-2 bg-sky-100 text-sky-600 rounded-full text-sm font-bold">
              FINANCIAL PLANNING
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
              あなたの夢を、<br />
              <span className="text-sky-500">お金のプロ</span>が<br />
              カタチにします。
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              保険の見直しから資産形成まで、<br />
              一人ひとりに寄り添った<br className="md:hidden" />ライフプランを提案。
            </p>
            <div className="flex flex-wrap gap-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#contact"
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm md:text-base"
              >
                無料相談を予約
              </a>
              <a
                href="#case"
                className="px-6 md:px-8 py-3 md:py-4 border-2 border-sky-300 text-sky-600 bg-white rounded-full font-medium hover:bg-sky-50 transition-all duration-300 whitespace-nowrap text-sm md:text-base"
              >
                事例を見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 md:px-12 lg:px-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 sticky top-32 h-fit">
              <h2 className="text-4xl font-light text-slate-800 mb-8 leading-tight">
                「売らない」<br />という<span className="font-bold border-b-4 border-sky-200">誠実</span>。
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                金融商品はあくまで手段です。<br />
                いきなり薬を出さない医者のように、<br />
                まずはあなたの家計を「診察」します。<br />
                無理な勧誘は一切行いません。
              </p>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Policy</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 group">
                    <span className="mt-1 w-2 h-2 rounded-full bg-sky-400 group-hover:scale-125 transition-transform"></span>
                    <span className="text-slate-700">家計を整える → 商品はその後</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="mt-1 w-2 h-2 rounded-full bg-sky-400 group-hover:scale-125 transition-transform"></span>
                    <span className="text-slate-700">リスクの低い運用からご案内</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <span className="mt-1 w-2 h-2 rounded-full bg-sky-400 group-hover:scale-125 transition-transform"></span>
                    <span className="text-slate-700">安定した運用をサポート</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-24">
              {[
                {
                  num: "01",
                  title: "聴く技術",
                  desc: "不安の正体は、言葉にすることで見えてきます。沈黙も大切にしながら、あなたのペースで「本当の悩み」を引き出します。"
                },
                {
                  num: "02",
                  title: "可視化する",
                  desc: "専門用語は使いません。複雑なお金の流れを、シンプルな図解とシミュレーションで「見える化」し、納得感を大切にします。"
                },
                {
                  num: "03",
                  title: "中立を貫く",
                  desc: "特定の金融機関に属さない独立系FPだからこそ、メリットだけでなくデメリットも包み隠さずお伝えできます。"
                }
              ].map((item, idx) => (
                <RevealOnScroll key={idx} className="group relative pl-8 md:pl-0 border-l md:border-l-0 border-slate-200">
                  <div className="hidden md:block absolute -left-12 top-0 text-sm font-bold text-sky-200 -rotate-90 origin-bottom-right translate-y-8">
                    POINT
                  </div>
                  <span className="text-6xl md:text-8xl font-thin text-sky-100 absolute -top-12 -left-4 md:-left-12 -z-10 group-hover:text-sky-200 transition-colors duration-500">
                    {item.num}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed md:text-lg max-w-xl">
                    {item.desc}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section (Moved) */}
      <section id="profile" className="py-32 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Title & Name (Moved to top) */}
          <div className="mb-12 text-center md:text-left">
            <span className="text-sky-600 font-medium tracking-widest text-sm uppercase mb-2 block">Profile</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">内山 英</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">
            <div className="w-full md:w-5/12 space-y-12 sticky top-32">
              <RevealOnScroll animation="fade-right">
                <div className="relative group">
                  <div className="aspect-[3/4] overflow-hidden rounded-[2rem] relative z-10 shadow-2xl">
                    {/* プロフィール画像: 2枚目の画像 */}
                    <img
                      src="/profile_main.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-bold text-slate-400 mb-6 border-b border-slate-200 pb-2 inline-block uppercase tracking-widest">保有資格</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {["FP技能士", "公的年金アドバイザー", "住宅ローンアドバイザー", "確定拠出年金診断士", "がんファイナンスアドバイザー", "生保損保保険募集人", "お金の小学校認定講師"].map((lic, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-sm text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                        <div className="bg-sky-100 p-1 rounded-full"><Check size={12} className="text-sky-600" /></div>
                        {lic}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <div className="w-full md:w-7/12 space-y-16">
              <RevealOnScroll>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-light text-slate-800 leading-tight">
                      年間100冊の本と、<br />
                      等身大の経験を武器に。
                    </h2>
                  </div>

                  <div className="space-y-6 text-slate-600 leading-relaxed">
                    <p>
                      1979年 静岡生まれ。営業職を経て、独立を決意。「お金」で人生の選択肢を狭めてほしくないという想いから、FPとしての活動をスタートしました。
                    </p>
                    <p>
                      独立後の成功と葛藤、そして年間100冊の読書で培った知識を活かし、教科書通りではない「生きたお金の知恵」をお伝えします。
                    </p>
                  </div>
                </div>

                {/* 経歴 */}
                <div className="pt-8">
                  <h4 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2 inline-block">これまでの歩み</h4>
                  <div className="space-y-8 border-l-2 border-slate-100 ml-3 pl-8 relative">
                    {[
                      { year: "10代", title: "バスケに明け暮れた青春時代", desc: "静岡生まれ。小中高とバスケ部に所属。近畿大学入学を機に大阪へ転居。" },
                      { year: "20代", title: "「学び」への目覚め", desc: "営業・マネージメント職を経験。友人の影響で猛勉強を開始し、年間100冊の読書を10年継続。" },
                      { year: "30代", title: "独立、そして成功と葛藤", desc: "営業代行で独立し年商2億を達成。雑誌の取材を2回受けるなど実績を残すが、より個人の人生に寄り添う道を志す。" },
                      { year: "現在", title: "FPとして奔走する日々", desc: "独立系FP事務所へ所属。「お金の小学校認定講師」としても活動中。お客様のお金の問題解決に奔走中。" },
                    ].map((item, i) => (
                      <div key={i} className="relative group">
                        <span className={`absolute -left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-white transition-colors duration-300 ${i === 3 ? 'bg-sky-500 ring-2 ring-sky-100' : 'bg-slate-300 group-hover:bg-sky-300'}`}></span>
                        <span className={`text-sm font-bold block mb-1 transition-colors duration-300 ${i === 3 ? 'text-sky-600' : 'text-slate-400 group-hover:text-sky-500'}`}>{item.year}</span>
                        <h5 className="text-lg font-bold text-slate-700 group-hover:text-sky-700 transition-colors">{item.title}</h5>
                        <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* 書籍監修セクション (Moved) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <RevealOnScroll className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden border border-slate-100">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-100/50 via-transparent to-transparent pointer-events-none"></div>

            <div className="md:w-1/2 space-y-6 z-10">
              <span className="text-sky-600 font-medium tracking-widest text-sm uppercase block mb-2">Works</span>
              <h2 className="text-3xl font-bold text-slate-800">書籍監修</h2>
              <p className="text-slate-600 leading-relaxed">
                「お金の小学校」「退職金で損する人得する人」など、お金に関する書籍の監修も行っています。<br />
                難しいことを分かりやすく伝えることを大切にしています。
              </p>
            </div>

            <div className="md:w-1/2 flex gap-6 z-10 justify-center">
              {/* 書籍画像1 (3枚目) */}
              <div className="w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                <img src="/book1.jpg" alt="お金の小学校" className="w-full h-full object-cover" />
              </div>
              {/* 書籍画像2 (4枚目) */}
              <div className="w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 mt-8">
                <img src="/book2.png" alt="退職金で損する人得する人" className="w-full h-full object-cover" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Case Study Section (Redesigned) */}
      <section id="case" className="py-32 bg-slate-50 overflow-hidden relative">
        {/* 背景文字 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-slate-200/20 whitespace-nowrap pointer-events-none select-none"
          style={{ transform: `translate(-50%, -50%) translateX(${(scrollY - 2000) * 0.1}px)` }}
        >
          CASE STUDY
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <RevealOnScroll className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 relative overflow-hidden">

            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 border-b-2 border-sky-200 text-slate-500 font-bold tracking-widest text-sm uppercase mb-6">Case.01</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                30代 共働き ご夫婦 （お子様2人）
              </h2>
              <p className="text-slate-500">「保険料が高くて貯金ができない」というお悩み</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Before */}
              <div className="space-y-8 md:space-y-12 px-4 md:px-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">BEFORE</span>
                  <h4 className="text-2xl font-bold text-slate-600 mt-2">見直し前</h4>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">毎月の保険料</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-400">¥40,000</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">65歳時点の資産</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-400">900万円</span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed text-center">
                  医療・がん・年金保険など、勧められるがままに加入しており、毎月の固定費が家計を圧迫していました。
                </p>
              </div>

              {/* After */}
              <div className="bg-sky-50/50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 lg:p-12 border border-sky-100 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="text-center mb-10 relative z-10">
                  <span className="text-sky-500 text-sm font-bold uppercase tracking-widest">AFTER</span>
                  <h4 className="text-3xl font-bold text-slate-800 mt-2">見直し後</h4>
                </div>

                <div className="space-y-10 relative z-10">
                  <div className="flex justify-between items-end border-b border-sky-200 pb-2">
                    <span className="text-slate-600 font-medium">毎月の保険料</span>
                    <span className="text-3xl md:text-4xl font-bold text-sky-600">¥10,000</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end border-b border-sky-200 pb-2">
                      <span className="text-slate-600 font-medium text-sm md:text-base">65歳時点の資産</span>
                      <span className="text-2xl md:text-4xl font-bold text-sky-600">2,000万円</span>
                    </div>
                    <p className="text-right text-xs font-bold text-sky-500">資産が2倍以上に！</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mt-10 leading-relaxed relative z-10">
                  浮いた3万円を新NISAで運用(年利3-5%想定)。<br />
                  必要な保障は残しつつ、将来のための大きな資産形成へシフトしました。
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Service List */}
      <section id="service" className="py-32 px-6 md:px-12 lg:px-24 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-5xl font-light text-slate-800 mb-16">サービスメニュー</h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: '無料初回相談(60分)', desc: 'まずは現状をお聞かせください。', icon: MessageCircle },
              { title: '家計診断', desc: '収支を分析し改善プランを作成。', icon: TrendingUp },
              { title: '保険証券チェック', desc: '重複・過不足を確認し最適化。', icon: Shield },
              { title: '資産運用の設計', desc: 'NISA/iDeCoを活用したプラン。', icon: LineChart },
              { title: 'セカンドオピニオン', desc: '他社提案を中立的に診断。', icon: Users },
            ].map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100} className="group relative bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="mb-6">
                  <item.icon size={32} className="text-sky-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </RevealOnScroll>
            ))}
          </div>

          {/* 取扱商品（トピックス）：おしゃれなデザインに */}
          <RevealOnScroll delay={200} className="mt-24">
            <h4 className="text-sm font-bold text-slate-400 text-center mb-12 uppercase tracking-widest">取扱商品</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { label: "生命保険\n医療保険", icon: <Heart size={24} /> },
                { label: "がん保険\n就業不能保険", icon: <Shield size={24} /> },
                { label: "新NISA\n活用法", icon: <TrendingUp size={24} /> },
                { label: "iDeCo\n始め方", icon: <Wallet size={24} /> },
                { label: "投資信託\n選び方", icon: <LineChart size={24} /> },
                { label: "住宅ローン\n考え方", icon: <Home size={24} /> },
                { label: "教育資金\nづくり", icon: <GraduationCap size={24} /> },
                { label: "老後資金\n計画", icon: <Coins size={24} /> },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-sky-100">
                  <div className="text-slate-400 mb-4 group-hover:text-sky-500 transition-colors">{item.icon}</div>
                  <span className="text-slate-700 font-medium text-sm whitespace-pre-line leading-relaxed group-hover:text-sky-900">{item.label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Flow Section */}
      <section id="flow" className="py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <RevealOnScroll>
            <h2 className="text-3xl font-light text-center text-slate-800 mb-16">相談の流れ</h2>
          </RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            <div className="hidden md:block absolute top-1/3 left-0 w-full h-[1px] bg-slate-200 -z-10"></div>
            {[
              { step: "01", label: "ご予約", sub: "Webフォーム" },
              { step: "02", label: "初回面談", sub: "60分無料" },
              { step: "03", label: "ヒアリング", sub: "分析・診断" },
              { step: "04", label: "ご提案", sub: "プラン作成" },
              { step: "05", label: "フォロー", sub: "実行支援" }
            ].map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100} className="bg-white p-8 rounded-full w-48 h-48 flex flex-col items-center justify-center shadow-sm border border-slate-100 relative group hover:scale-105 transition-transform duration-300">
                <div className="text-sky-400 font-thin text-3xl mb-2">{item.step}</div>
                <h3 className="font-bold text-slate-700 mb-1">{item.label}</h3>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </RevealOnScroll>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-12 text-sm">対応エリア：オンライン（全国対応） / 対面（大阪近郊）</p>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50 to-transparent"></div>

        <div className="max-w-3xl mx-auto relative z-10 text-center space-y-12">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-6xl font-light text-slate-800">
              お問い合わせ
            </h2>
            <p className="text-slate-500 mt-4">
              まずは「知ってもらう」ことから。<br />
              気軽な雑談のつもりで、ご連絡ください。
            </p>
          </RevealOnScroll>

          <form className="space-y-8 text-left max-w-xl mx-auto">
            <input
              type="text"
              name="name"
              placeholder="お名前"
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400 transition-colors placeholder:text-slate-400"
            />
            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400 transition-colors placeholder:text-slate-400"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="ご相談内容をご記入ください"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-400 transition-colors resize-none placeholder:text-slate-400"
            />

            <div className="pt-8 text-center">
              <button
                type="button"
                className="group relative inline-flex items-center gap-4 px-12 py-5 bg-slate-900 text-white rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-sky-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="relative z-10 font-medium">送信する</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-400 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Financial Partner Design.</p>
      </footer>
    </div>
  );
};

export default BrandSite;
