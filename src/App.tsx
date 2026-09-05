/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  ChevronLeft,
  Code2, 
  Palette, 
  Terminal, 
  Send,
  Menu,
  X,
  ArrowUpRight,
  Instagram,
  GraduationCap
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  institution: string;
  period: string;
  logos: string[];
}

interface Publication {
  id: number;
  title: string;
  journal: string;
  year: string;
  doi?: string;
  tags: string[];
  authors?: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Antecipação de Risco na Construção Civil",
    description: "Plataforma baseada em IA para previsão probabilística de perdas de materiais em obras, integrando dados técnicos (SINAPI/SICRO), contextuais (IBGE) e climáticos (INMET).",
    institution: "Enactus & Instituto Cury",
    period: "2026 — Atual",
    logos: ["/src/assets/images/enactus.png"]
  },
  {
    id: 2,
    title: "Segurança e Privacidade Multimodal de Segunda Geração",
    description: "Algoritmos avançados e redes neurais profundas para identificar desinformação e deepfakes em fluxos multimodais, utilizando fusão multimodal tardia e Cross-Attention.",
    institution: "Centro de Excelência em Tecnologias Imersivas (CCTI)",
    period: "2026 — Atual",
    logos: ["/src/assets/images/akcit.jpg"]
  },
  {
    id: 3,
    title: "IA Preditiva e Generativa na Secretaria de Economia",
    description: "Plataforma de IA com modelos preditivos para análise fiscal e detecção de sonegação (ICMS), integrada a LLMs para automação de pareceres jurídicos e triagem de processos administrativos.",
    institution: "CEIA & Secretaria da Economia de Goiás",
    period: "2026 — Atual",
    logos: ["/src/assets/images/ceia.png"]
  },
  {
    id: 19,
    title: "Sistema Integrado de Gestão de Alertas Técnicos Climáticos",
    description: "Solução para a prevenção e gestão de alagamentos urbanos causados por eventos climáticos extremos. Integra dados ambientais e territoriais para identificar áreas de risco e apoiar decisões preventivas como bloqueio de vias, mobilização de equipes e emissão de alertas.",
    institution: "ClimaGyn",
    period: "2025 — Atual",
    logos: ["/src/assets/images/climagyn.png"]
  },
  {
    id: 20,
    title: "Sistema Inteligente de Monitoramento Ambiental e Apoio ao Manejo de Incêndios Florestais no Cerrado",
    description: "O Ignis Detect foca na prevenção de incêndios ambientais no Cerrado, identificando antecipadamente regiões com maior risco de ignição e propagação do fogo para fins de tomada de decisões preventivas por gestores e produtores.",
    institution: "Ignis Detect",
    period: "2025 — Atual",
    logos: ["/src/assets/images/ignis_detect.png"]
  },
  {
    id: 4,
    title: "Sementes e Inovação",
    description: "Desenvolvimento de sistemas computacionais para identificação de espécies vegetais baseados em caracteres morfológicos simples, visando auxílio na biodiversidade vegetal e análises laboratoriais.",
    institution: "Universidade Federal de Goiás",
    period: "2025 — 2026",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/inf.png"]
  },
  {
    id: 5,
    title: "Nature SPAM Filter",
    description: "Desenvolvimento de ferramenta de IA para identificar menções à vida selvagem em notícias online, comparando a eficácia de classificadores zero-shot e LLMs com anotações de voluntários humanos.",
    institution: "Environmental Change Institute, University of Oxford",
    period: "2025 — 2025",
    logos: ["/src/assets/images/eci.jpg"]
  },
  {
    id: 6,
    title: "Etch A Cell - ImmunoExplorers",
    description: "Análise de células imunológicas em tecidos renais via microscopia eletrônica, focando em segmentação de alta resolução para compreensão de mecanismos de rejeição em transplantes.",
    institution: "The Francis Crick Institute",
    period: "2025 — 2025",
    logos: ["/src/assets/images/francis_crick.png"]
  },
  {
    id: 7,
    title: "Classificação de Plantas em Estufas IoT e Tradicionais via Análise Multivariada",
    description: "Investigação de diferenças fisiológicas de plantas cultivadas em estufas tradicionais e habilitadas para IoT via machine learning. Utilizou registros de pigmentação foliar, biomassa e diâmetro radicular sob algoritmos de regressão logística, Random Forest e XGBoost, demonstrando a superioridade do monitoramento inteligente na uniformidade e eficiência fotossintética das culturas.",
    institution: "Universidade Federal de Goiás",
    period: "2025 — 2025",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/IPTSP.svg"]
  },
  {
    id: 8,
    title: "Mortalidade Materna como Indicador de Mortalidade Infantil em Análise Epidemiológica Global",
    description: "Análise da relação entre a mortalidade materna e infantil como indicadores interconectados de saúde pública. Através de dados de 167 países (2014-2024) e de modelos de regressão múltipla, o estudo identificou fortes correlações com taxas de mortalidade neonatal e de menores de cinco anos, estabelecendo a saúde materna como um indicador sentinela global.",
    institution: "Universidade Federal de Goiás",
    period: "2025 — 2025",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/IPTSP.svg"]
  },
  {
    id: 9,
    title: "Anticoncepcionais Orais e Risco de Progressão do Câncer de Ovário em Portadoras de Mutação BRCA",
    description: "Estudo sobre a interação entre fatores genéticos e hormonais na progressão do câncer de ovário em portadoras de mutações BRCA. Analisando mais de 200.000 registros clínicos com modelagem computacional e estatística, revelou um efeito protetor significativo no uso de contraceptivos orais, subsidiando estratégias personalizadas de prevenção.",
    institution: "Universidade Federal de Goiás",
    period: "2025 — 2025",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/IPTSP.svg"]
  },
  {
    id: 10,
    title: "Modelagem Preditiva para Redução de Biópsias no Diagnóstico de Doenças Eritemato-Descamativas",
    description: "Aplicação de modelagem preditiva e inteligência artificial para otimização do diagnóstico de doenças eritemato-descamativas (como psoríase e líquen plano). Comparando dados clínicos e histopatológicos de 366 pacientes, demonstrou que calibrações probabilísticas podem evitar biópsias invasivas em até 72% dos casos, mantendo alta sensibilidade e especificidade.",
    institution: "Universidade Federal de Goiás",
    period: "2025 — 2025",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/IPTSP.svg"]
  },
  {
    id: 11,
    title: "Análise Evolutiva de Proteínas Kisspeptinas via Alinhamento de Sequências Múltiplas e Matriz PAM250",
    description: "Exploração das relações evolutivas de proteínas Kiss1 e Kiss2 em várias espécies de vertebrados. Através de ferramentas bioinformáticas como o algoritmo MUSCLE e a matriz PAM250, o estudo analisou conservação e divergência de sequências, revelando forte similaridade em mamíferos e maior variação em anfíbios e peixes.",
    institution: "Universidade Federal de Goiás",
    period: "2025 — 2025",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/IPTSP.svg"]
  },
  {
    id: 12,
    title: "Segurança e Privacidade de Dados Multimodais",
    description: "Pesquisa e desenvolvimento de técnicas avançadas para proteção de dados multimodais (imagens, vídeos, textos e áudios), garantindo integridade e privacidade em ambientes de vigilância digital.",
    institution: "Centro de Competências em Tecnologias Imersivas (CCTI)",
    period: "2023 — 2025",
    logos: ["/src/assets/images/akcit.jpg"]
  },
  {
    id: 13,
    title: "Ataques Adversariais em Modelos de Linguagem: Técnicas Ofensivas na Exploração de Vieses em LLMs",
    description: "Investigação sistemática e taxonomia de prompts e entradas adversariais para expor e mitigar vulnerabilidades e vieses em LLMs, visando o desenvolvimento mais seguro de sistemas generativos.",
    institution: "Universidade Federal de Goiás",
    period: "2024 — 2024",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/inf.png"]
  },
  {
    id: 14,
    title: "Emotion Talk: Suporte Emocional via Mensagens de Áudio para Assistência Psicológica",
    description: "Plataforma de suporte psicológico contínuo baseada em reconhecimento de emoções em áudios, integrando Whisper (transcrição), Emotion2Vec+ (emoção), BERT e respostas empáticas via GPT.",
    institution: "Universidade Federal de Goiás",
    period: "2024 — 2024",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/inf.png"]
  },
  {
    id: 15,
    title: "Mineração Inteligente em Protocolos de Saúde",
    description: "Implementação de análise de similaridade e visualização de fluxos de atendimento em prontuários eletrônicos para automação de protocolos clínicos e auxílio na tomada de decisão médica.",
    institution: "CEIA - Centro de Excelência em IA & Mindify",
    period: "2023 — 2024",
    logos: ["/src/assets/images/ceia.png"]
  },
  {
    id: 16,
    title: "Sistema de Detecção de Faixas para Assistência ao Motorista em Veículos",
    description: "Desenvolvimento de pipeline de visão computacional tradicional para assistência ao motorista e navegação autônoma em tempo real, cobrindo calibração, correção de perspectiva e segmentação.",
    institution: "Universidade Federal de Goiás",
    period: "2023 — 2023",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/inf.png"]
  },
  {
    id: 17,
    title: "Monitoramento Inteligente de Qualidade do Ar para Workshops Automotivos",
    description: "Sistema IoT integrado de sensores e algoritmos de aprendizado de máquina para medição e alerta de qualidade de ar e salubridade em ambientes industriais, focando em segurança ocupacional.",
    institution: "Universidade Federal de Goiás",
    period: "2023 — 2023",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/inf.png"]
  },
  {
    id: 18,
    title: "Sistema Integrado de Assistência a Operações de Resgate via Hexápode e Drone",
    description: "Cooperação robótica terra-ar para busca e resgate em áreas de risco. Combina mecatrônica e visão computacional (DJI Tello, hexápode e AprilTags) para navegação guiada e mapeamento.",
    institution: "Universidade Federal de Goiás",
    period: "2023 — 2023",
    logos: ["/src/assets/images/ufg_logo.png", "/src/assets/images/inf.png"]
  }
];

const PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: "AKCIT-FN at CheckThat! 2025: Switching Fine-Tuned SLMs and LLM Prompting for Multilingual Claim Normalization",
    journal: "CLEF 2025 – Madrid, Spain",
    year: "2025",
    authors: "ALMADA, F. L. N. ; MARIANO, K. D. P. ; DUTRA, M. A. ; MONTEIRO, V. E. S. ; GOMES, J. R. S. ; Galvao, A. R. F. ; SORES, A. S.",
    tags: ["NLP", "LLMs", "Conference"],
    doi: "#"
  },
  {
    id: 2,
    title: "Evolutionary Analysis of Kisspeptin Proteins via Multiple Sequence Alignment and PAM250 Matrix",
    journal: "II Encontro Regional de Biotecnologia – Belém, Brazil",
    year: "2025",
    authors: "MARIANO, K. D. P.",
    tags: ["Bioinformatics", "Evolutionary Analysis"],
    doi: "#"
  },
  {
    id: 3,
    title: "Uso de Contraceptivo Orais e Risco de Progressão do Câncer de Ovário em Portador da Mutação BRCA",
    journal: "Revista de Patologia Tropical, v. 54",
    year: "2025",
    authors: "MARIANO, K. D. P.; LOPES, E. S. ; OLIVEIRA, N. B.",
    tags: ["Medicine", "Genetics"],
    doi: "#"
  },
  {
    id: 4,
    title: "Classificação de Plantas em Estufas IOT e Tradicionais Usando Análise Multivariada de Parâmetros Fisiológicos",
    journal: "Revista de Patologia Tropical, v. 54",
    year: "2025",
    authors: "MARIANO, K. D. P.; SANTOS, A. C. V. ; RODRIGUES, B. L. S. ; TRINDADE, E. A. ; SANTOS, E. F. ; MENDES, G. C.",
    tags: ["IoT", "Data Science"],
    doi: "#"
  },
  {
    id: 5,
    title: "Modelagem Preditiva Para Redução de Biópsias no Diagnóstico de Doenças Eritemato-Descamativas",
    journal: "Revista de Patologia Tropical, v. 54",
    year: "2025",
    authors: "MARIANO, K. D. P.; LOPES, E. S. ; OLIVEIRA, N. B. ; FREITAS, K. S. P.",
    tags: ["Predictive Modeling", "Diagnosis"],
    doi: "#"
  },
  {
    id: 6,
    title: "Mortalidade Materna como Indicador da Mortalidade Infantil em Análise Epidemiológica Global",
    journal: "Revista de Patologia Tropical, v. 54",
    year: "2025",
    authors: "MARIANO, K. D. P.; LOPES, E. S. ; OLIVEIRA, N. B.",
    tags: ["Epidemiology", "Global Health"],
    doi: "#"
  },
  {
    id: 7,
    title: "Exploitation of Real Vulnerabilities in Language Models: Cases of Data Leakage, Jailbreaking, and Command Injection",
    journal: "19° Congresso Brasileiro de Sistemas – Goiânia, Brazil",
    year: "2024",
    authors: "K. D. P. Mariano",
    tags: ["Security", "LLMs"],
    doi: "#"
  },
  {
    id: 8,
    title: "Exploitation of Vulnerabilities in Language Models: An Analysis of Prompt Injection Attacks",
    journal: "19° Congresso Brasileiro de Sistemas – Goiânia, Brazil",
    year: "2024",
    authors: "K. D. P. Mariano",
    tags: ["Cybersecurity", "AI Safety"],
    doi: "#"
  },
  {
    id: 9,
    title: "Emotion Talk: Emotional Support via Audio Messages for Psychological Assistance",
    journal: "Arxiv",
    year: "2024",
    authors: "MARIANO, K. D. P.; MONTEIRO, V. E. S. ; ALMADA, F. L. N. ; DUTRA, M. A.",
    tags: ["NLP", "Audio Analysis", "IA"],
    doi: "#"
  },
  {
    id: 10,
    title: "Lane Detection System for Driver Assistance in Vehicles.",
    journal: "Arxiv",
    year: "2024",
    authors: "MARIANO, K. D. P.; Fernades, F. C. ; Oliveira, L. G. S. ; Rodrigues, L. E. S. ; Brandão, M. A.",
    tags: ["Computer Vision", "Autonomous Driving"],
    doi: "#"
  },
  {
    id: 11,
    title: "Smart Air Quality Monitoring for Automotive Workshop Environments.",
    journal: "Arxiv",
    year: "2024",
    authors: "MARIANO, K. D. P.; ALMADA, F. L. N. ; DUTRA, M. A.",
    tags: ["IoT", "Deep Learning"],
    doi: "#"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [pubPage, setPubPage] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const pubsPerPage = 6;
  const totalPubPages = Math.ceil(PUBLICATIONS.length / pubsPerPage);

  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const aIsAtual = a.period.toLowerCase().includes("atual");
    const bIsAtual = b.period.toLowerCase().includes("atual");
    
    if (aIsAtual && !bIsAtual) return -1;
    if (!aIsAtual && bIsAtual) return 1;
    
    const getEndYear = (p: string) => {
      const parts = p.split(/[-—]/).map(s => s.trim());
      if (parts.length > 1) {
        if (parts[1].toLowerCase() === "atual") return 9999;
        return parseInt(parts[1], 10) || 0;
      }
      return parseInt(parts[0], 10) || 0;
    };
    
    const getStartYear = (p: string) => {
      const parts = p.split(/[-—]/).map(s => s.trim());
      return parseInt(parts[0], 10) || 0;
    };

    const endA = getEndYear(a.period);
    const endB = getEndYear(b.period);

    if (endA !== endB) {
      return endB - endA;
    }

    const startA = getStartYear(a.period);
    const startB = getStartYear(b.period);
    return startB - startA;
  });

  const [projectPage, setProjectPage] = useState(0);
  const projectsPerPage = 6;
  const totalProjectPages = Math.ceil(sortedProjects.length / projectsPerPage);

  const navLabels: Record<string, string> = {
    home: 'Início',
    about: 'Sobre mim',
    projects: 'Projetos desenvolvidos',
    publications: 'Publicações científicas',
    skills: 'Formação acadêmica',
    contact: 'Entre em contato'
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic intersection observer logic
      const sections = ['home', 'about', 'projects', 'publications', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper selection:bg-ink selection:text-paper font-sans">
      {/* --- Navigation --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-paper/80 backdrop-blur-md border-b border-ink/10 py-6' : 'bg-transparent py-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col cursor-pointer"
            onClick={() => scrollTo('home')}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 opacity-60">Portfólio 2026</span>
            <h1 className="text-2xl font-serif italic font-semibold leading-none">Kauan Divino</h1>
          </motion.div>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 lg:gap-10 items-center text-[11px] uppercase tracking-widest font-bold pt-2">
            {['home', 'about', 'projects', 'publications', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`transition-all duration-300 border-b cursor-pointer ${
                  activeSection === item ? 'border-ink opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                {navLabels[item]}
              </button>
            ))}
          </div>
 
          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
 
      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-40 bg-paper flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {['home', 'about', 'projects', 'publications', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-3xl sm:text-4xl font-serif italic font-bold tracking-tight cursor-pointer text-center"
              >
                {navLabels[item]}
              </button>
            ))}
            <button className="absolute top-10 right-10 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden px-10 pt-32 pb-20 bg-[#0d080b] text-paper">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo - Informações e Posicionamento */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-7 flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-sans font-black text-paper leading-[1.1] mb-6 tracking-tight">
              Kauan Divino
            </h2>
            
            {/* Frase de Posicionamento Memorável */}
            <p className="text-2xl md:text-3xl font-serif italic text-paper/90 leading-relaxed mb-6">
              Desenvolvendo sistemas inteligentes <br />
              <span className="font-sans font-black not-italic text-accent">através da ciência.</span>
            </p>
            
            {/* Subtítulo Estratégico */}
            <p className="text-base text-paper/75 leading-relaxed max-w-xl mb-10 font-light">
              Pesquisador em Inteligência Artificial Aplicada, desenvolvendo sistemas inteligentes fundamentados em pesquisa científica e aplicações reais.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => scrollTo('projects')}
                className="px-8 py-4 bg-paper text-ink rounded-full text-xs uppercase tracking-widest font-black hover:bg-accent hover:text-ink hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-black/40 cursor-pointer"
              >
                VER PROJETOS
              </button>
              <button 
                onClick={() => scrollTo('publications')}
                className="px-8 py-4 border border-paper/20 rounded-full text-xs uppercase tracking-widest font-black hover:bg-paper hover:text-ink hover:border-paper transition-all duration-300 cursor-pointer text-paper"
              >
                PUBLICAÇÕES
              </button>
            </div>
          </motion.div>

          {/* Lado Direito - Foto de Perfil */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="col-span-12 md:col-span-5 flex flex-col justify-center"
          >
            <div className="relative group max-w-lg mx-auto w-full">
              <div className="aspect-[4/5] w-full overflow-hidden transition-all duration-700">
                <img 
                  src="/src/assets/images/foto_pessoal.png" 
                  alt="Kauan Divino" 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Parte Inferior - Elemento de Prova Social / Métricas Rápidas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-paper/10 flex flex-wrap justify-between items-center gap-y-6"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs md:text-sm font-mono text-paper/65">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
              Pesquisa Aplicada
            </span>
            <span className="opacity-30">•</span>
            <span>Sistemas Inteligentes</span>
            <span className="opacity-30">•</span>
            <span>Empreendedorismo</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] text-paper/60 uppercase tracking-widest">
            <a 
              href="https://www.linkedin.com/in/kauan-divino/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-accent transition-colors duration-350 group"
            >
              <Linkedin size={13} className="stroke-[1.8] group-hover:scale-110 transition-transform duration-350" />
              <span>LinkedIn</span>
            </a>
            <span className="opacity-25 text-[10px] hidden sm:inline">/</span>
            <a 
              href="https://www.instagram.com/kauandpm" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-accent transition-colors duration-350 group"
            >
              <Instagram size={13} className="stroke-[1.8] group-hover:scale-110 transition-transform duration-350" />
              <span>Instagram</span>
            </a>
            <span className="opacity-25 text-[10px] hidden sm:inline">/</span>
            <a 
              href="http://lattes.cnpq.br/5608028014613925" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-accent transition-colors duration-350 group"
            >
              <GraduationCap size={14} className="stroke-[1.8] group-hover:scale-110 transition-transform duration-350" />
              <span>Lattes</span>
            </a>
          </div>
        </motion.div>

        {/* Background Decorative Element */}
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-accent/5 rounded-full -z-10 animate-pulse duration-[10s] blur-3xl"></div>
      </section>

      {/* --- Sobre Mim (About Me) Section --- */}
      <section id="about" className="py-32 bg-paper border-t border-ink/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-10">
          
          {/* Título Centralizado */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold opacity-30 tracking-[0.5em] mb-4 block">Pesquisador & Acadêmico</span>
            <h2 className="text-4xl md:text-5xl font-sans font-black text-ink leading-tight tracking-tight uppercase">
              SOBRE MIM
            </h2>
            <div className="mt-4 h-1 w-12 bg-[#B35E38] mx-auto"></div>
          </div>

          {/* Texto de Descrição Principal Centralizado e Legível */}
          <div className="max-w-3xl mx-auto space-y-6 text-base text-ink/75 font-light leading-relaxed text-center mb-20">
            <p>
              Olá! Me chamo Kauan Divino. Sou pesquisador em Inteligência Artificial Aplicada e dedico os meus esforços ao desenvolvimento de sistemas inteligentes que nascem diretamente da investigação científica.
            </p>
            <p>
              Atualmente, sou mestrando em Ciências da Computação na Universidade Federal de Goiás (UFG), onde meu foco é o uso de inteligência artificial aplicada à genômica humana brasileira.
            </p>
            <p>
              Também atuo como pesquisador no Centro de Excelência em Inteligência Artificial (CEIA) e no Centro de Competências em Tecnologias Imersivas (AKCIT). Nesses espaços, colaboro de forma ativa em pesquisas científicas voltadas para tecnologias emergentes.
            </p>
            <p>
              O que de fato me move é a oportunidade de criar soluções reais, capazes de estreitar os laços entre a ciência, tecnologia e inovação.
            </p>
          </div>

          {/* Elementos Estéticos: Formação em Destaque e Citação em Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-5xl mx-auto items-center">
            
            {/* Formação Pioneira */}
            <div className="md:col-span-7 p-8 md:p-10 border-2 border-ink bg-subtle-bg/35 rounded-none space-y-6 transition-all duration-300 group relative shadow-[8px_8px_0px_0px_#B35E38] hover:shadow-[12px_12px_0px_0px_#B35E38] hover:-translate-y-1">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-none bg-[#B35E38] text-paper flex items-center justify-center transition-all duration-300 group-hover:bg-ink group-hover:text-paper shadow-[3px_3px_0px_0px_#111111]">
                  <GraduationCap size={26} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-ink leading-tight">Formação Pioneira</h4>
                  <p className="text-[11px] uppercase tracking-widest font-mono text-[#B35E38] font-bold mt-1">Universidade Federal de Goiás</p>
                </div>
              </div>
              
              <div className="h-px w-full bg-[#B35E38]/20 group-hover:bg-accent/40 transition-colors"></div>
              
              <p className="text-sm md:text-base text-ink/80 leading-relaxed font-light">
                Sou graduado pelo primeiro bacharelado em Inteligência Artificial da América Latina, na UFG. Faço parte das primeiras 40 pessoas formadas oficialmente em IA em todo o continente americano.
              </p>
            </div>

            {/* Citação Estilizada */}
            <div className="md:col-span-5 flex flex-col justify-center pl-6 md:pl-8 border-l-4 border-[#B35E38]/40 py-4 transition-all duration-300 select-none md:my-0 my-6">
              <span className="text-3xl font-serif text-[#B35E38] leading-none mb-1">“</span>
              <p className="text-base md:text-lg font-serif italic text-ink/75 leading-relaxed">
                Acredito na tecnologia como motor de inovação, transformando ideias científicas audaciosas no futuro que queremos viver.
              </p>
              <span className="text-3xl font-serif text-[#B35E38] leading-none mt-1 text-right">”</span>
            </div>

          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="py-32 border-t border-ink/5 bg-subtle-bg">
        <div className="max-w-7xl mx-auto px-10">
          
          {/* Título Centralizado */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold opacity-30 tracking-[0.5em] mb-4 block">Portfólio</span>
            <h2 className="text-4xl md:text-5xl font-sans font-black text-ink leading-tight tracking-tight uppercase">
              Projetos Desenvolvidos
            </h2>
            <div className="mt-4 h-1 w-12 bg-[#B35E38] mx-auto"></div>

            {/* Pagination Controls (Top) */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button 
                onClick={() => setProjectPage(prev => Math.max(0, prev - 1))}
                disabled={projectPage === 0}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                  projectPage === 0 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2.5">
                {Array.from({ length: totalProjectPages }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 transition-all duration-400 rounded-none border border-ink ${
                      projectPage === i ? 'w-8 bg-[#B35E38]' : 'w-2 bg-subtle-bg/40'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setProjectPage(prev => Math.min(totalProjectPages - 1, prev + 1))}
                disabled={projectPage === totalProjectPages - 1}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                  projectPage === totalProjectPages - 1 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={projectPage}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              >
                {sortedProjects.slice(projectPage * projectsPerPage, (projectPage + 1) * projectsPerPage).map((project, i) => (
                  <motion.div 
                    key={project.id}
                    className="p-6 md:p-8 border-2 border-ink bg-paper rounded-none flex flex-col justify-between gap-5 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#B35E38] hover:-translate-y-1 relative group"
                  >
                    <div className="space-y-4">
                      {/* Top Bar with Logos and Duration */}
                      <div className="flex justify-between items-center gap-4">
                        {/* Logos Container with high prominence */}
                        <div className="flex gap-2.5">
                          {project.logos.map((logoUrl, index) => (
                            <div key={index} className="w-16 h-16 bg-[#B35E38]/5 border-2 border-ink p-2 flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_#111111]/10 group-hover:bg-[#B35E38]/10 group-hover:shadow-[2px_2px_0px_0px_#B35E38] transition-all duration-300">
                              <img 
                                src={logoUrl} 
                                alt={`${project.institution} logo`} 
                                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ))}
                        </div>
                        
                        {/* Duration badge */}
                        <div className="shrink-0 animate-pulse duration-[3s]">
                          <span className="font-mono text-[10px] font-bold text-[#B35E38] bg-[#B35E38]/10 border border-[#B35E38]/20 px-3 py-1 rounded-none uppercase">
                            {project.period}
                          </span>
                        </div>
                      </div>
                      
                      <div className="h-px w-full bg-[#B35E38]/20 group-hover:bg-accent/40 transition-colors"></div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-sans font-bold text-ink leading-tight group-hover:text-[#B35E38] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs md:text-sm text-ink/70 leading-relaxed font-light">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer with Institution */}
                    <div className="border-t border-ink/5 pt-3 mt-auto">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-[#B35E38] font-bold">Instituição</span>
                        <span className="text-xs font-bold text-ink uppercase tracking-wider">{project.institution}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls (Bottom) */}
            <div className="flex justify-center items-center gap-6 mt-16 pb-4">
              <button 
                onClick={() => setProjectPage(prev => Math.max(0, prev - 1))}
                disabled={projectPage === 0}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                  projectPage === 0 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2.5">
                {Array.from({ length: totalProjectPages }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 transition-all duration-400 rounded-none border border-ink ${
                      projectPage === i ? 'w-8 bg-[#B35E38]' : 'w-2 bg-subtle-bg/40'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setProjectPage(prev => Math.min(totalProjectPages - 1, prev + 1))}
                disabled={projectPage === totalProjectPages - 1}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                  projectPage === totalProjectPages - 1 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Publications Section --- */}
      <section id="publications" className="py-32 border-t border-ink/5 bg-paper">
        <div className="max-w-7xl mx-auto px-10">
          
          {/* Título Centralizado */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold opacity-30 tracking-[0.5em] mb-4 block">Pesquisa Científica</span>
            <h2 className="text-4xl md:text-5xl font-sans font-black text-ink leading-tight tracking-tight uppercase">
              Publicações & Artigos
            </h2>
            <div className="mt-4 h-1 w-12 bg-[#B35E38] mx-auto"></div>

            {/* Pagination Controls (Top) */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button 
                onClick={() => setPubPage(prev => Math.max(0, prev - 1))}
                disabled={pubPage === 0}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                  pubPage === 0 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2.5">
                {Array.from({ length: totalPubPages }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 transition-all duration-400 rounded-none border border-ink ${
                      pubPage === i ? 'w-8 bg-[#B35E38]' : 'w-2 bg-subtle-bg/40'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setPubPage(prev => Math.min(totalPubPages - 1, prev + 1))}
                disabled={pubPage === totalPubPages - 1}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                  pubPage === totalPubPages - 1 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="relative min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={pubPage}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              >
                {PUBLICATIONS.slice(pubPage * pubsPerPage, (pubPage + 1) * pubsPerPage).map((pub, index) => (
                  <motion.div 
                    key={pub.id}
                    className="p-6 border-2 border-ink bg-paper rounded-none flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#B35E38] hover:-translate-y-1 relative group cursor-pointer"
                    onClick={() => {
                      if (pub.doi && pub.doi !== '#') {
                        window.open(pub.doi, '_blank');
                      }
                    }}
                  >
                    <div className="space-y-3">
                      {/* Top bar within Card */}
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-1.5 flex-wrap">
                          {pub.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-[9px] uppercase font-mono border border-ink/20 px-2 py-0.5 text-ink/65 rounded-none font-bold bg-subtle-bg/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="font-mono text-[10px] font-bold text-[#B35E38] shrink-0">
                          #{index + 1 + (pubPage * pubsPerPage)}
                        </span>
                      </div>
                      
                      <div className="h-px w-full bg-[#B35E38]/20 group-hover:bg-accent/40 transition-colors"></div>
                      
                      {/* Publication Info */}
                      <div className="space-y-2">
                        <h3 className="text-base md:text-lg font-sans font-bold text-ink leading-tight group-hover:text-[#B35E38] transition-colors line-clamp-2">
                          {pub.title}
                        </h3>
                        {pub.authors && (
                          <p className="text-[11px] text-ink/60 italic font-light line-clamp-1">
                            {pub.authors}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Bottom Metadata */}
                    <div className="border-t border-ink/10 pt-3 mt-auto flex justify-between items-end">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-[#B35E38] font-bold block">
                          Periódico / Evento
                        </span>
                        <span className="text-[11px] font-bold text-ink/80 block uppercase leading-tight line-clamp-1">
                          {pub.journal}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-ink/70">
                          {pub.year}
                        </span>
                        {pub.doi && pub.doi !== '#' && (
                          <ArrowUpRight size={14} className="text-[#B35E38] group-hover:scale-125 transition-transform" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
 
            {/* Pagination Controls (Bottom) */}
            <div className="flex justify-center items-center gap-6 mt-16 pb-4">
              <button 
                onClick={() => setPubPage(prev => Math.max(0, prev - 1))}
                disabled={pubPage === 0}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                    pubPage === 0 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2.5">
                {Array.from({ length: totalPubPages }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 transition-all duration-400 rounded-none border border-ink ${
                      pubPage === i ? 'w-8 bg-[#B35E38]' : 'w-2 bg-subtle-bg/40'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setPubPage(prev => Math.min(totalPubPages - 1, prev + 1))}
                disabled={pubPage === totalPubPages - 1}
                className={`w-10 h-10 border-2 border-ink flex items-center justify-center transition-all rounded-none ${
                  pubPage === totalPubPages - 1 
                    ? 'opacity-25 cursor-not-allowed bg-subtle-bg/10' 
                    : 'bg-paper text-ink hover:bg-[#B35E38] hover:text-paper hover:shadow-[3px_3px_0px_0px_#111111] cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
 
      {/* --- Skills & Education Section --- */}
      <section id="skills" className="py-32 bg-subtle-bg border-t border-ink/5">
        <div className="max-w-5xl mx-auto px-10">
          
          {/* Título Centralizado */}
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold opacity-30 tracking-[0.5em] mb-4 block">Background Acadêmico</span>
            <h2 className="text-4xl md:text-5xl font-sans font-black text-ink leading-tight tracking-tight uppercase">
              Formação Acadêmica
            </h2>
            <div className="mt-4 h-1 w-12 bg-[#B35E38] mx-auto"></div>
          </div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { school: 'Universidade Federal de Goiás', degree: 'Mestrado em Ciências da Computação', period: '2026 — 2027', logo: '/src/assets/images/ufg_logo.png' },
              { school: 'Universidade Federal de Goiás', degree: 'Especialização em Tecnologias Imersivas & IA Generativa', period: '2026 — 2027', logo: '/src/assets/images/ufg_logo.png' },
              { school: 'Faculdade Iguaçu', degree: 'Especialização em Biotecnologia', period: '2026 — 2027', logo: '/src/assets/images/iguacu_logo.png' },
              { school: 'Faculdade Iguaçu', degree: 'Especialização em IA Aplicada', period: '2025 — 2025', logo: '/src/assets/images/iguacu_logo.png' },
              { school: 'Universidade Federal de Goiás', degree: 'Bacharelado em Inteligência Artificial', period: '2021 — 2024', logo: '/src/assets/images/ufg_logo.png' },
            ].map( (edu, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group"
              >
                <div className="p-6 md:p-8 border-2 border-ink bg-paper rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#B35E38] hover:-translate-y-1 relative">
                  
                  {/* Left Side: Logo + Info */}
                  <div className="flex items-center gap-5">
                    {/* Logo Square Frame */}
                    <div className="w-14 h-14 bg-[#B35E38]/5 border border-ink flex items-center justify-center p-2 rounded-none shrink-0 shadow-[2px_2px_0px_0px_#111111]/10 group-hover:bg-[#B35E38]/10 group-hover:shadow-[2px_2px_0px_0px_#B35E38] transition-all duration-300">
                      {edu.logo ? (
                        <img 
                          src={edu.logo} 
                          alt={edu.school} 
                          className="max-h-full max-w-full object-contain opacity-100 group-hover:scale-105 transition-all duration-300" 
                          referrerPolicy="no-referrer" 
                        />
                      ) : (
                        <GraduationCap size={22} className="stroke-[1.5] text-[#B35E38]" />
                      )}
                    </div>
                    
                    {/* Course Titles */}
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-ink group-hover:text-[#B35E38] transition-colors leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-xs uppercase tracking-wider font-mono text-ink/40">
                        {edu.school}
                      </p>
                    </div>
                  </div>
                  
                  {/* Right Side: Timeline Period */}
                  <div className="flex items-center sm:justify-end shrink-0">
                    <span className="font-mono text-xs font-bold text-[#B35E38] bg-[#B35E38]/10 border border-[#B35E38]/20 px-4 py-1.5 rounded-none shadow-[2px_2px_0px_0px_rgba(179,94,56,0.1)] group-hover:bg-[#B35E38] group-hover:text-paper group-hover:border-ink transition-all duration-300">
                      {edu.period}
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-32 bg-ink text-paper overflow-hidden relative border-t border-paper/15">
        <div className="max-w-5xl mx-auto px-10 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Heading and Details */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4 text-left">
                <span className="text-[10px] uppercase font-bold opacity-30 tracking-[0.5em] mb-4 block">Fale Comigo</span>
                <h2 className="text-4xl md:text-5xl font-sans font-black text-paper leading-tight tracking-tight uppercase">
                  Entre em contato
                </h2>
                <div className="h-1 w-12 bg-[#B35E38]"></div>
              </div>
              
              <p className="text-sm text-paper/70 font-light leading-relaxed max-w-md">
                Tem algum projeto em mente, deseja discutir pesquisa acadêmica em IA ou quer apenas mandar um alô? Sinta-se à vontade para entrar em contato.
              </p>

              <div className="space-y-8 pt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#B35E38] font-bold">Email Direto</span>
                  <a href="mailto:kauandpmariano@gmail.com" className="text-lg md:text-2xl font-mono hover:text-[#B35E38] transition-colors break-words">
                    kauandpmariano@gmail.com
                  </a>
                </div>
                
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#B35E38] font-bold block">Redes & Linkages</span>
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/kauan-divino/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-paper/30 bg-paper/5 text-paper flex items-center justify-center hover:bg-[#B35E38] hover:text-paper hover:border-ink hover:shadow-[3px_3px_0px_0px_#111111] transition-all duration-300" title="LinkedIn">
                      <Linkedin size={18} />
                    </a>
                    <a href="https://www.instagram.com/kauandpm" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-paper/30 bg-paper/5 text-paper flex items-center justify-center hover:bg-[#B35E38] hover:text-paper hover:border-ink hover:shadow-[3px_3px_0px_0px_#111111] transition-all duration-300" title="Instagram">
                      <Instagram size={18} />
                    </a>
                    <a href="http://lattes.cnpq.br/5608028014613925" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-paper/30 bg-[#161616] text-paper flex items-center justify-center hover:bg-[#B35E38] hover:text-paper hover:border-ink hover:shadow-[3px_3px_0px_0px_#111111] transition-all duration-300" title="Currículo Lattes">
                      <GraduationCap size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Brutalist Dark Form Card */}
            <div className="lg:col-span-7 w-full">
              <div className="p-8 md:p-10 border-2 border-paper/20 bg-[#161616] rounded-none shadow-[8px_8px_0px_0px_#B35E38] relative">
                <form 
                  className="space-y-8"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setFormStatus('loading');
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      name: formData.get('name'),
                      email: formData.get('email'),
                      message: formData.get('message'),
                    };
                    
                    try {
                      const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                      });
                      if (response.ok) {
                        setFormStatus('success');
                        (e.target as HTMLFormElement).reset();
                      } else {
                        setFormStatus('error');
                      }
                    } catch (error) {
                      console.error("Error sending message:", error);
                      setFormStatus('error');
                    }
                  }}
                >
                  {formStatus === 'success' && (
                    <div className="p-4 border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-none uppercase">
                      ✓ Mensagem enviada com sucesso! Entrarei em contato em breve.
                    </div>
                  )}
                  {formStatus === 'error' && (
                    <div className="p-4 border-2 border-rose-500 bg-rose-500/10 text-rose-400 text-xs font-mono rounded-none uppercase">
                      ✗ Falha ao enviar mensagem. Por favor, envie diretamente por email.
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#B35E38] group-focus-within:text-paper transition-colors">
                        Seu Nome
                      </label>
                      <input 
                        name="name" 
                        type="text" 
                        required 
                        className="w-full bg-transparent border-b-2 border-paper/20 focus:border-[#B35E38] focus:ring-0 outline-none text-base transition-all py-2.5 px-0 font-light placeholder:text-paper/20 text-paper" 
                        placeholder="Ex: João Silva" 
                      />
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#B35E38] group-focus-within:text-paper transition-colors">
                        E-mail de Contato
                      </label>
                      <input 
                        name="email" 
                        type="email" 
                        required 
                        className="w-full bg-transparent border-b-2 border-paper/20 focus:border-[#B35E38] focus:ring-0 outline-none text-base transition-all py-2.5 px-0 font-light placeholder:text-paper/20 text-paper" 
                        placeholder="seu@email.com" 
                      />
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#B35E38] group-focus-within:text-paper transition-colors">
                        Mensagem
                      </label>
                      <textarea 
                        name="message" 
                        required 
                        rows={4} 
                        className="w-full bg-transparent border-b-2 border-paper/20 focus:border-[#B35E38] focus:ring-0 outline-none text-base transition-all py-2.5 px-0 font-light placeholder:text-paper/20 text-paper resize-none" 
                        placeholder="Escreva sua mensagem aqui..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 border-2 border-paper bg-[#B35E38] text-paper font-mono text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_#111111] hover:bg-paper hover:text-ink hover:border-ink active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                    <Send size={13} className="stroke-[2.5]" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Vintage decorative angle */}
        <div className="absolute right-0 bottom-0 w-32 h-32 border-t-2 border-l-2 border-paper/5 z-0 pointer-events-none"></div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-16 bg-ink border-t border-paper/10 px-10 text-paper">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-paper/40 text-[10px] font-mono uppercase tracking-[0.2em] text-center md:text-left">
            © {new Date().getFullYear()} Kauan Divino. Todos os direitos reservados.
          </div>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em]">
            <a href="https://www.instagram.com/kauandpm" target="_blank" rel="noopener noreferrer" className="text-[#B35E38] hover:text-paper transition-colors duration-200">Instagram</a>
            <a href="https://www.linkedin.com/in/kauan-divino/" target="_blank" rel="noopener noreferrer" className="text-[#B35E38] hover:text-paper transition-colors duration-200">Linkedin</a>
            <a href="http://lattes.cnpq.br/5608028014613925" target="_blank" rel="noopener noreferrer" className="text-[#B35E38] hover:text-paper transition-colors duration-200">Lattes</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

