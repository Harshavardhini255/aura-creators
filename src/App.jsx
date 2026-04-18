import React, { useEffect, useRef, useState } from 'react';
import { 
  Menu, X, ArrowRight, Activity, Zap, BrainCircuit, BarChart3, ChevronRight,
  LayoutTemplate, Target, Sparkles, Check
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial animations for Hero
    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }

    // ScrollTrigger animations for all new sections
    const fadeElements = gsap.utils.toArray('.st-fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-primary overflow-x-hidden font-sans text-white/90">
      
      {/* =========================================
          PERSISTENT BACKGROUND
      ========================================= */}
      <div className="fixed inset-0 z-0">
        <video
          key="bg-video-new"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Subtle blur overlay to make background less distracting but still visible */}
        <div className="absolute inset-0 z-10 backdrop-blur-[6px] bg-black/30" />

        {/* Watermark text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif font-black text-white opacity-5 blur-[4px] pointer-events-none select-none z-10 tracking-widest leading-none">
          AURA
        </div>
        
        {/* Noise overlay */}
        <div className="bg-noise z-20" />
      </div>

      {/* =========================================
          CONTENT LAYER SCROLL CONTAINER
      ========================================= */}
      <div className="relative z-30 flex flex-col min-h-screen">
        
        {/* NAVBAR (Existing) */}
        <nav 
          ref={navRef}
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isScrolled ? 'py-4 md:py-6 glass border-b !border-white/10' : 'py-6 md:py-[80px] bg-transparent'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
            <div className="font-serif font-bold text-2xl tracking-wide text-white">
              Aura Creators
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
              {['Features', 'Intelligence', 'Process', 'Pricing'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white/80 hover:text-white hover:opacity-100 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#login" className="text-white/80 hover:text-white font-medium transition-colors text-sm">
                Log In
              </a>
              <button className="group relative flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300">
                <span>Get Started</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 md:hidden">
            {['Features', 'Intelligence', 'Process', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-2xl font-serif text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="h-px w-12 bg-white/20 my-4" />
            <a href="#login" className="text-lg font-sans text-white/80">Log In</a>
            <button className="bg-accent text-primary px-8 py-4 rounded-full font-bold mt-4 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              Get Started <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* =========================================
            SECTION: HERO
        ========================================= */}
        <section ref={heroRef} className="flex-1 flex flex-col items-center justify-center pt-32 md:pt-40 pb-20 px-6 w-full max-w-[1440px] mx-auto min-h-[90vh]">
          <div ref={contentRef} className="flex flex-col items-center text-center w-full relative">
            
            <div className="hidden xl:block absolute left-0 bottom-12 text-white/40 font-mono text-xs tracking-widest max-w-[200px] text-left">
              // aura intelligence for brandowners:
            </div>
            <div className="hidden xl:block absolute right-0 top-12 text-accent/60 font-mono text-xs tracking-widest text-right">
              // YOUR BRAND .YOUR REVENUE.
            </div>

            <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2 mb-8 mb:mb-12 border border-white/10 hover:bg-white/5 transition-colors cursor-default">
              <Zap size={14} className="text-accent" fill="currentColor" />
              <span className="font-mono text-xs tracking-wider uppercase text-white/90">
                analyse patterns anywhere
              </span>
            </div>

            <h1 className="text-[36px] md:text-[clamp(48px,8vw,110px)] leading-[1.1] font-serif font-black text-white text-glow mb-6 max-w-[1200px]">
              <div className="hidden md:block">
                <span>TAKE YOUR BUSINESS</span><br />
                <span className="font-drama italic text-accent font-medium pr-2">TO THE NEXT LEVEL</span>
              </div>
              <div className="md:hidden flex flex-col gap-2">
                <span>TAKE YOUR BRAND</span>
                <span className="font-drama italic text-accent font-medium">TO NEXT LEVEL</span>
              </div>
            </h1>

            <p className="text-base md:text-lg text-white/70 max-w-[600px] mb-10 md:mb-14 leading-relaxed px-4">
              aura learns your business energy patterns automatically and takes you to the next level
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mb-20">
              <button className="group w-full sm:w-auto bg-accent text-primary px-8 md:px-10 py-4 rounded-full font-bold text-base hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 flex items-center justify-center gap-3">
                get my free energy
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group w-full sm:w-auto glass text-white px-8 md:px-10 py-4 rounded-full font-medium text-base hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-3">
                See how it works
                <ChevronRight size={18} className="text-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Bottom Feature Strip (Original) */}
          <div id="features" className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mt-auto st-fade-up">
            {[
              { icon: Activity, title: 'Predict Output' },
              { icon: Zap, title: 'Reduce Lags' },
              { icon: BrainCircuit, title: 'Smart Content Gen' },
              { icon: BarChart3, title: 'Growth Automation' }
            ].map((feature, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex flex-row md:flex-col items-center md:items-start gap-4 hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <feature.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-white/90 text-sm md:text-base md:mt-2">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            SECTION: INTELLIGENCE SHOWCASE
        ========================================= */}
        <section id="intelligence" className="w-full max-w-[1440px] mx-auto px-6 py-32 flex flex-col gap-32">
          
          <div className="text-center mb-10 st-fade-up">
            <h2 className="font-serif text-[40px] md:text-[60px] font-black text-white text-glow mb-4">
              Creative Engine. <span className="font-drama italic text-accent">Precision Growth.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              We leverage neural architecture to interpret your brand's core aesthetics and scale your reach automatically.
            </p>
          </div>

          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center st-fade-up">
            <div className="order-2 md:order-1 glass h-[400px] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
              <div className="relative z-10 flex flex-col justify-center items-center h-full gap-6">
                <LayoutTemplate size={80} className="text-accent opacity-50 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]" strokeWidth={1} />
                <div className="text-center font-mono opacity-60">GENERATING_AESTHETICS.SYS</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block p-3 glass rounded-xl text-accent mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Aesthetic Generation</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                Aura automatically composes the perfect visual frame for your brand, eliminating content block. It analyzes current cultural trends and aligns them seamlessly with your unique visual signature.
              </p>
              <ul className="mt-6 space-y-3">
                {['Automated color grading', 'Dynamic typography layouts', 'Style matching AI'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80"><Check size={18} className="text-accent" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center st-fade-up">
            <div>
              <div className="inline-block p-3 glass rounded-xl text-accent mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Audience Prediction</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                Stop guessing. Our neural net learns your audience's behavior, determining exactly when and what they want to see, boosting your CTR and long-term retention.
              </p>
              <button className="mt-8 group text-accent font-semibold flex items-center gap-2 hover:text-white transition-colors">
                Explore Analytics <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="glass h-[400px] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
              <div className="relative z-10 flex flex-col justify-center items-center h-full gap-6">
                 <Activity size={80} className="text-accent opacity-50 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]" strokeWidth={1} />
                <div className="text-center font-mono opacity-60">PREDICTIVE_MODELS.AI</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION: HOW IT WORKS
        ========================================= */}
        <section id="process" className="w-full py-32 bg-black/40 border-y border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 st-fade-up">
            <h2 className="text-center font-serif text-[40px] md:text-[50px] font-black text-white mb-20">
              Three Steps to <span className="font-drama italic text-accent font-medium">Domination.</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[40px] left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

              {[
                { step: '01', title: 'Connect Sync', desc: 'Link your existing social channels and data sources in one seamless click.' },
                { step: '02', title: 'Aura Learns', desc: 'Our systems ingest your past performance, mapping your brand energy.' },
                { step: '03', title: 'Automated Scale', desc: 'Sit back and watch as Aura deploys optimized content natively.'}
              ].map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-2xl font-mono text-accent font-bold mb-6 relative z-10 ring-4 ring-transparent hover:ring-accent/20 transition-all cursor-default">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 max-w-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION: PRICING
        ========================================= */}
        <section id="pricing" className="w-full max-w-[1200px] mx-auto px-6 py-32">
          <div className="text-center mb-16 st-fade-up">
            <h2 className="font-serif text-[40px] md:text-[50px] font-black text-white mb-4">
              Unlock Your <span className="text-accent text-glow">Aura</span>
            </h2>
            <p className="text-white/60">Choose the intelligence tier that fits your trajectory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Starter Plan */}
            <div className="glass p-8 rounded-3xl h-full flex flex-col st-fade-up">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-serif font-black mb-6">$0<span className="text-lg text-white/50 font-sans">/mo</span></div>
              <p className="text-white/60 mb-8 border-b border-white/10 pb-8">Perfect to test the algorithmic waters.</p>
              <ul className="space-y-4 mb-8 flex-1 text-sm">
                <li className="flex items-center gap-3"><Check size={16} className="text-white/40" /> 10 AI Generations / mo</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-white/40" /> Trend Analysis</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-white/40" /> Basic Scheduler</li>
              </ul>
              <button className="w-full py-4 rounded-full glass hover:bg-white/10 transition-colors font-bold">Start Free</button>
            </div>

            {/* Creator Plan (Highlighted) */}
            <div className="glass p-8 rounded-3xl h-full flex flex-col border border-accent/50 shadow-[0_0_40px_rgba(0,229,255,0.15)] relative md:scale-105 z-10 st-fade-up">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-primary px-4 py-1 rounded-full text-xs font-bold font-mono">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Creator</h3>
              <div className="text-4xl font-serif font-black mb-6 text-accent">$49<span className="text-lg text-white/50 font-sans">/mo</span></div>
              <p className="text-white/60 mb-8 border-b border-white/10 pb-8">Command your audience with deep AI automation.</p>
              <ul className="space-y-4 mb-8 flex-1 text-sm">
                <li className="flex items-center gap-3"><Check size={16} className="text-accent" /> Unlimited AI Generations</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-accent" /> Predictive Analytics</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-accent" /> Full Auto-deployment</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-accent" /> Custom Brand Voice</li>
              </ul>
              <button className="w-full py-4 rounded-full bg-accent text-primary transition-all font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]">Go Pro</button>
            </div>

            {/* Scale Plan */}
            <div className="glass p-8 rounded-3xl h-full flex flex-col st-fade-up">
              <h3 className="text-xl font-bold mb-2">Scale</h3>
              <div className="text-4xl font-serif font-black mb-6">$199<span className="text-lg text-white/50 font-sans">/mo</span></div>
              <p className="text-white/60 mb-8 border-b border-white/10 pb-8">Enterprise integration architectures.</p>
              <ul className="space-y-4 mb-8 flex-1 text-sm">
                <li className="flex items-center gap-3"><Check size={16} className="text-white/40" /> Everything in Creator</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-white/40" /> Direct API Access</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-white/40" /> Custom System Models</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-white/40" /> Priority Edge Compute</li>
              </ul>
              <button className="w-full py-4 rounded-full glass hover:bg-white/10 transition-colors font-bold">Contact Sales</button>
            </div>
          </div>
        </section>

        {/* =========================================
            FOOTER
        ========================================= */}
        <footer className="w-full mt-20 relative border-t border-white/10 pt-20 pb-10 overflow-hidden bg-primary/80">
          <div className="max-w-[1440px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            {/* Brand Col */}
            <div className="col-span-1 md:col-span-1">
              <div className="font-serif font-bold text-2xl tracking-wide text-white mb-6">Aura Creators</div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Redefining the creative workflow with intelligent automations and unparalleled aesthetics.
              </p>
              <div className="flex items-center gap-4 text-white/60">
                <a href="#" className="hover:text-accent transition-colors font-medium">Twitter</a>
                <a href="#" className="hover:text-accent transition-colors font-medium">Instagram</a>
                <a href="#" className="hover:text-accent transition-colors font-medium">Website</a>
                <a href="#" className="hover:text-accent transition-colors font-medium">Email</a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-bold text-white/90 mb-6">Platform</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Intelligence</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white/90 mb-6">Resources</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white/90 mb-6">Legal</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-6 text-center text-white/40 text-sm relative z-10">
            &copy; {new Date().getFullYear()} Aura Creators Inc. All Rights Reserved.
          </div>

          {/* Giant Bottom Watermark */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-black text-white/5 select-none pointer-events-none whitespace-nowrap leading-none tracking-widest z-0">
            AURA CREATORS
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
