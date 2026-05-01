import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  Database, 
  Projector as Projection, 
  ExternalLink,
  ChevronRight,
  Hexagon,
  Sparkles,
  Zap,
  Layers,
  Code,
  MessageSquare,
  X,
  Send,
  Loader2,
  Bot
} from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const modelName = "gemini-1.5-flash"; // Using a more standard model name

const PROJECTS = [
  {
    title: "Attendance Insightface",
    category: "Computer Vision / AI",
    desc: "Enterprise-grade live attendance tracking system using InsightFace for high-accuracy facial recognition.",
    tech: ["Python", "InsightFace", "Docker", "Gradio"],
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1200&auto=format&fit=crop",
    link: "https://huggingface.co/spaces/vrfefavr/Attendance_Insightface",
    hf: true
  },
  {
    title: "Student Performance Predictor",
    category: "Predictive Analytics",
    desc: "Machine Learning model predicting final academic grades based on socio-economic and previous academic parameters.",
    tech: ["SciKit-Learn", "FastAPI", "Pandas"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    link: "https://huggingface.co/spaces/vrfefavr/student-performance-ML_project",
    hf: true
  },
  {
    title: "DataLens Dashboard",
    category: "Business Intelligence",
    desc: "AI-driven analytics platform for deep CSV inspection and automated visualization generation.",
    tech: ["TypeScript", "React", "Python", "Streamlit"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    link: "https://huggingface.co/spaces/vrfefavr/DataLens_Dashboard",
    hf: true
  },
  {
    title: "MRU Admissions Dashboard",
    category: "Data Engineering",
    desc: "Interactive recruitment and admissions analytics dashboard for university management systems.",
    tech: ["D3.js", "Firebase", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bbda486fdc8a?q=80&w=1200&auto=format&fit=crop",
    link: "https://huggingface.co/spaces/vrfefavr/MRU_Admissions_Dashboard",
    hf: true
  },
  {
    title: "Attendance API",
    category: "System Architecture",
    desc: "Real-time webcam-based attendance API for seamless integration with legacy ERP systems.",
    tech: ["FastAPI", "OpenCV", "Redis"],
    image: "https://images.unsplash.com/photo-1558494949-ef0109144b6e?q=80&w=1200&auto=format&fit=crop",
    hf: true
  }
];

function DatabaseIcon(props: any) {
  return <Database {...props} />;
}

const SKILLS = [
  { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "C++"], icon: Code },
  { name: "Technologies", items: ["React", "Docker", "Git", "FastAPI", "TensorFlow"], icon: Cpu },
  { name: "Systems", items: ["Linux", "AWS", "Firebase", "PostgreSQL"], icon: DatabaseIcon },
];

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hello! I'm Aura, Shashank's AI assistant. Ask me anything about his technical expertise or his Hugging Face projects." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const ai = useMemo(() => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.warn("Gemini API Key is missing or default.");
        return null;
      }
      return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI:", e);
      return null;
    }
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    if (!ai) {
      setMessages(prev => [...prev, { role: "user", content: input.trim() }, { role: "ai", content: "I'm sorry, my AI core is not configured. Please set a valid API key." }]);
      setInput("");
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: userMessage,
        config: {
          systemInstruction: `You are Aura, the AI assistant for Shashank Dubey's e-portfolio. 
          Shashank is a Software Engineer and AI Architect.
          His key projects are on Hugging Face (username: vrfefavr):
          1. Attendance Insightface: Real-time face recognition for attendance.
          2. Student Performance Predictor: ML project for grade forecasting.
          3. DataLens Dashboard: AI-driven CSV analytics.
          4. MRU Admissions Dashboard: Interactive university data dashboard.
          5. Attendance API: Webcam-based attendance automation.
          He is skilled in Python, TypeScript, React, Docker, and ML frameworks.
          Answer questions professionally and highlight his technical depth. Keep responses concise.`
        }
      });

      setMessages(prev => [...prev, { role: "ai", content: response.text || "I'm having trouble connecting to my neural network. Please try again." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "ai", content: "Error: My systems are offline. Please check back later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-white/90 selection:bg-cyan-core selection:text-obsidian">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none noise z-[60]" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-core to-cyan-core z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b-0 py-4 px-6 md:px-12 flex justify-between items-center mt-6 mx-auto max-w-[95%] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center rotate-45 border-violet-core/30">
            <Hexagon className="-rotate-45 text-violet-core" size={20} />
          </div>
          <span className="font-display font-medium tracking-tight text-lg">Dubey.dev</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium opacity-60">
          <a href="#projects" className="hover:text-violet-core transition-colors">Projects</a>
          <a href="#expertise" className="hover:text-violet-core transition-colors">Expertise</a>
          <a href="#contact" className="hover:text-violet-core transition-colors">Connect</a>
        </div>

        <div className="flex gap-4">
          <button 
             onClick={() => {
               const el = document.getElementById('contact');
               el?.scrollIntoView({ behavior: 'smooth' });
             }}
             className="glass px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold border-cyan-core/30 text-cyan-core hover:bg-cyan-core/10 transition-all"
          >
            Contact
          </button>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-24">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-violet-core mb-6"
            >
              <Terminal size={14} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">System Online // AI Architect</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-display font-bold leading-[0.9] tracking-tighter mb-8"
            >
              Shashank <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-core via-white/90 to-cyan-core">
                Dubey.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12"
            >
              Crafting scalable enterprise solutions and predictive AI models. Specializing in bridging the gap between raw data and actionable intelligence.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 bg-violet-core text-obsidian rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                View Repository <ChevronRight size={18} />
              </button>
              <div className="flex gap-2">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="glass w-14 h-14 rounded-2xl flex items-center justify-center hover:border-violet-core/50 transition-colors">
                    <Icon size={20} className="text-white/70" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[50vw] h-[50vw] bg-violet-core/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[30vw] h-[30vw] bg-cyan-core/5 rounded-full blur-[100px] pointer-events-none" />
        </section>

        {/* Hugging Face Stats Summary */}
        <section className="px-6 md:px-24 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="ML Spaces" value="06" sub="Deployed" />
            <StatCard label="Face Recog" value="99.4%" sub="Accuracy" />
            <StatCard label="Data Points" value="50K+" sub="Analyzed" />
            <StatCard label="Github Repos" value="12" sub="Open Source" />
          </div>
        </section>

        {/* Expertise Grid */}
        <section id="expertise" className="py-32 px-6 md:px-24 glass rounded-[3rem] mx-6 mb-32 border-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 text-cyan-core mb-4">
                <Sparkles size={18} />
                <h3 className="text-xs uppercase tracking-widest font-bold">Skill Matrix</h3>
              </div>
              <h2 className="text-4xl font-display font-medium leading-tight">
                Architecting <br /> the Next Era.
              </h2>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {SKILLS.map((skill, i) => (
                <div key={i} className="space-y-6">
                  <div className="p-3 w-fit glass rounded-xl text-violet-core">
                    <skill.icon size={20} />
                  </div>
                  <h4 className="font-display text-lg font-bold">{skill.name}</h4>
                  <ul className="space-y-2 opacity-50 text-sm font-medium">
                    {skill.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-violet-core/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Bento */}
        <section id="projects" className="py-32 px-6 md:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-violet-core mb-4">Case Studies</h3>
              <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight">Machine Intelligence & Systems</h2>
            </div>
            <div className="flex gap-4">
              <button className="glass px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-violet-core transition-colors">All Works</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${i % 3 === 0 ? "md:col-span-8" : "md:col-span-4"} group relative overflow-hidden rounded-[2.5rem] glass aspect-[16/10] md:aspect-auto cursor-pointer`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12 z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, j) => (
                      <span key={j} className="px-3 py-1 glass rounded-full text-[9px] uppercase tracking-widest font-bold border-white/10">{t}</span>
                    ))}
                  </div>
                  <h4 className="text-3xl font-display font-bold mb-2 group-hover:text-cyan-core transition-colors">{project.title}</h4>
                  <p className="text-sm text-white/50 max-w-sm mb-6">{project.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <a 
                      href={project.link || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 text-violet-core"
                    >
                      Explore Implementation <ExternalLink size={14} />
                    </a>
                    {project.hf && (
                      <div className="flex items-center gap-1 text-[10px] bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-400/30">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                        Hugging Face
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dynamic Space Overview */}
        <section className="py-32 px-6 md:px-24 glass rounded-[4rem] mx-6 mb-32 border-none bg-gradient-to-br from-violet-core/5 to-cyan-core/5">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 space-y-8">
              <h3 className="text-xs uppercase tracking-widest font-bold text-cyan-core italic">Innovation Lab</h3>
              <h2 className="text-5xl md:text-7xl font-display font-bold">The Neural Architecture</h2>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                My work on Hugging Face focuses on bridge the gap between heavy research models and lightweight production APIs. I build systems that don't just predict, but provide actionable insights.
              </p>
              <div className="flex gap-4">
                <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-3xl font-display font-bold">6</span>
                  <span className="text-[10px] uppercase opacity-50">Spaces</span>
                </div>
                <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-3xl font-display font-bold">CV</span>
                  <span className="text-[10px] uppercase opacity-50">Focus</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-violet-core/20 blur-[100px] rounded-full group-hover:bg-cyan-core/20 transition-colors" />
              <div className="relative glass aspect-square rounded-[3rem] p-12 overflow-hidden">
                <div className="absolute top-12 left-12 flex flex-col gap-4">
                  <div className="w-20 h-1 bg-violet-core" />
                  <div className="w-12 h-1 bg-cyan-core" />
                </div>
                <div className="h-full flex flex-col justify-center gap-8">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase opacity-40 font-mono tracking-tighter">Current Build</span>
                    <h4 className="text-2xl font-display font-medium">InsightFace Attendance v2.4</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        className="h-full bg-violet-core" 
                       />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono opacity-50">
                      <span>Inference Speed</span>
                      <span>120ms / frame</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-32 px-6 md:px-24">
          <div className="max-w-4xl mx-auto">
             <div className="flex items-center gap-3 text-cyan-core mb-12">
              <Layers size={20} />
              <h3 className="text-xs uppercase tracking-widest font-bold">Work History</h3>
            </div>
            
            <div className="space-y-12">
              <ExperienceCard 
                role="Software Development Intern"
                company="Tech Solutions Corp"
                date="2023 - Present"
                desc="Engineered an ERP report automation system reducing manual work by 70%. Integrated Selenium for dynamic data scraping and SQL for robust record management."
              />
              <ExperienceCard 
                role="Research Assistant"
                company="Vellore Institute of Technology"
                date="2022 - 2023"
                desc="Developed deep learning models (RNN-LSTM) for academic performance prediction. Achieved 94% accuracy on multi-variate time-series datasets."
              />
            </div>
          </div>
        </section>

        {/* AI Assistant Floating UI */}
        <AnimatePresence>
          {isAiOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
              className="fixed bottom-24 right-6 md:right-12 w-[350px] md:w-[400px] h-[500px] glass rounded-3xl z-[100] flex flex-col shadow-2xl border-violet-core/30 overflow-hidden"
            >
              <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-core flex items-center justify-center">
                    <Bot size={16} className="text-obsidian" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-tight text-violet-core">AURA-AI // V1.0</span>
                </div>
                <button onClick={() => setIsAiOpen(false)} className="hover:text-white/50 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-light">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      m.role === "user" 
                        ? "bg-violet-core text-obsidian font-bold" 
                        : "glass border-white/10 text-white/80"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="glass px-4 py-3 rounded-2xl flex items-center gap-2">
                       <Loader2 size={14} className="animate-spin text-cyan-core" />
                       <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Processing...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about my ML models..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-violet-core/50 transition-colors text-sm"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="p-2 bg-violet-core text-obsidian rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsAiOpen(!isAiOpen)}
          className={`fixed bottom-6 right-6 md:right-12 w-14 h-14 rounded-full flex items-center justify-center z-[110] shadow-2xl transition-all hover:scale-110 active:scale-90 ${
            isAiOpen ? "bg-red-400 text-white" : "bg-violet-core text-obsidian"
          }`}
        >
          {isAiOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>

        {/* Terminal Contact */}
        <section id="contact" className="py-32 px-6 md:px-24">
          <div className="max-w-4xl mx-auto glass rounded-3xl overflow-hidden border-violet-core/20">
            <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                <div className="w-3 h-3 rounded-full bg-green-400/50" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">shashank_dubey@terminal</span>
              <div />
            </div>
            
            <div className="p-8 md:p-12 font-mono text-sm">
              <div className="flex gap-4 mb-4">
                <span className="text-cyan-core">root@portfolio:~$</span>
                <span>cat contact_info.json</span>
              </div>
              
              <div className="pl-6 mb-12 text-violet-core">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {`{
  "email": "shashankdubey822@gmail.com",
  "github": "shashankdubey822-code",
  "availability": "Ready for new challenges",
  "timezone": "IST (UTC+5:30)"
}`}
                </pre>
              </div>

              <div className="flex gap-4">
                <span className="text-cyan-core">root@portfolio:~$</span>
                <span className="animate-pulse">_</span>
              </div>
              
              <div className="mt-12">
                <button 
                  onClick={() => setIsAiOpen(true)}
                  className="glass border-violet-core/30 px-8 py-3 rounded-full hover:bg-violet-core hover:text-obsidian transition-all group"
                >
                  Initialize Connection <Zap size={16} className="inline ml-2 group-hover:animate-bounce" />
                </button>
              </div>
            </div>
          </div>
          
          <p className="mt-20 text-center text-[10px] uppercase tracking-widest opacity-30 font-bold">
            Designed & Engineered by Shashank Dubey © 2024
          </p>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub }: any) {
  return (
    <div className="glass p-8 rounded-[2rem] border-white/5 space-y-2">
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">{label}</span>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-display font-bold text-white">{value}</span>
        <span className="text-[10px] uppercase font-bold text-violet-core mb-1.5">{sub}</span>
      </div>
    </div>
  );
}

function ExperienceCard({ role, company, date, desc }: any) {
  return (
    <div className="relative pl-12 border-l border-white/10 group">
      <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-violet-core group-hover:scale-150 transition-transform" />
      <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h4 className="text-xl font-display font-bold text-white group-hover:text-cyan-core transition-colors">{role}</h4>
        <span className="text-[10px] uppercase tracking-widest font-mono opacity-40">{date}</span>
      </div>
      <h5 className="text-violet-core text-sm font-bold uppercase tracking-widest mb-4">{company}</h5>
      <p className="text-white/50 max-w-2xl leading-relaxed">{desc}</p>
    </div>
  );
}

