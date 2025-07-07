import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { useProjects } from "@/contexts/ProjectsContext";
import {
  Play,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Monitor,
  Gamepad2,
  Smartphone,
  Smile,
  Radio,
  ArrowRight,
  Star,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À Propos" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const clients = [
  {
    name: "SOLF",
    role: "Streameur / YouTubeur",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets%2Fd5e35b24d5ca42099050f15c18641cc9%2F0e1b2e3d27cf48479b2b93b48e0ae6b7",
    verified: true,
  },
  {
    name: "VALHALATV",
    role: "Streameur / YouTubeur",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets%2Fd5e35b24d5ca42099050f15c18641cc9%2F7ccd152b90544c3bb8feab9d66e13311",
    verified: true,
  },
];

const services = [
  {
    icon: Monitor,
    title: "VLOG",
    description:
      "Tout en préservant l'authenticité de votre vlog, je crée des montages engageants qui captivent votre audience et racontent votre histoire de manière unique.",
    color: "from-pink-500 to-purple-600",
  },
  {
    icon: Gamepad2,
    title: "GAMING",
    description:
      "Pour vos vidéos gaming, je mets l'accent sur les moments forts, les réactions épiques et les gameplay spectaculaires pour créer du contenu viral.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "SHORTS",
    description:
      "Que ce soit pour une vidéo de quelques secondes ou plusieurs minutes, je maîtrise l'art du format court pour maximiser l'engagement.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Smile,
    title: "DIVERTISSEMENT",
    description:
      "Pour les vidéos divertissantes, j'apporte créativité et dynamisme pour transformer vos idées en contenus mémorables et viraux.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Radio,
    title: "REDIFFUSION STREAM",
    description:
      "Pour les rediffusions de stream, je sélectionne et monte les meilleurs moments pour créer des highlights captivants.",
    color: "from-purple-500 to-pink-500",
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { projects } = useProjects();

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for real-time project updates
  useEffect(() => {
    const handleProjectsUpdate = () => {
      // Force a re-render when projects are updated from admin panel
      // The useProjects hook will automatically provide the updated data
    };

    window.addEventListener("projectsUpdated", handleProjectsUpdate);
    return () =>
      window.removeEventListener("projectsUpdated", handleProjectsUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        if (
          scrollPos >= element.offsetTop &&
          scrollPos < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(element.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <LoadingAnimation isVisible={isLoading} />
      <ScrollProgress />

      <div className="min-h-screen bg-[#161616] text-[#f8f8f8]">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#161616]/80 backdrop-blur-xl border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-[#f983e2] to-[#ff6b9d] bg-clip-text text-transparent"
              >
                iJerce
              </motion.div>

              <div className="hidden md:flex items-center space-x-8">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-sm font-medium transition-colors relative ${
                      activeSection === section.id
                        ? "text-[#f983e2]"
                        : "text-[#f8f8f8]/60 hover:text-[#f8f8f8]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f983e2]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#f8f8f8] hover:text-[#f983e2] transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-[#161616]/95 backdrop-blur-xl border-b border-white/10"
              >
                <div className="px-4 py-4 space-y-2">
                  {sections.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => {
                        scrollToSection(section.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-[#f983e2]/20 text-[#f983e2]"
                          : "text-[#f8f8f8]/60 hover:text-[#f8f8f8] hover:bg-white/5"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {section.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                  >
                    Monteur Vidéo
                    <br />
                    <span className="bg-gradient-to-r from-[#f983e2] to-[#ff6b9d] bg-clip-text text-transparent">
                      depuis 2015
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-xl text-[#f8f8f8]/70 max-w-3xl mx-auto leading-relaxed"
                  >
                    Spécialisé dans le montage vidéo pour YouTubeurs et
                    streameurs. Je transforme vos contenus bruts en histoires
                    captivantes qui engagent votre audience.
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("portfolio")}
                      className="bg-[#f983e2] hover:bg-[#f983e2]/90 text-black font-semibold px-8 py-3 text-lg group"
                    >
                      Voir Mon Portfolio
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => scrollToSection("contact")}
                      className="border-[#f983e2] text-[#f983e2] bg-transparent hover:bg-[#f983e2] hover:text-black px-8 py-3 text-lg"
                    >
                      Me Contacter
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-16">
                    <p className="text-sm font-semibold text-[#f8f8f8]/60 uppercase tracking-wider mb-8">
                      ILS ME FONT CONFIANCE
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      {clients.map((client, index) => (
                        <motion.div
                          key={client.name}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="group"
                        >
                          <Card className="bg-[#292929] border-white/10 hover:border-[#f983e2]/50 transition-all duration-300">
                            <CardContent className="p-6 text-center">
                              <div className="relative mb-4">
                                <img
                                  src={client.avatar}
                                  alt={client.name}
                                  className="w-16 h-16 rounded-full mx-auto object-cover"
                                />
                                {client.verified && (
                                  <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-[#f983e2] bg-[#292929] rounded-full" />
                                )}
                              </div>
                              <h3 className="font-semibold text-[#f8f8f8] mb-1">
                                {client.name}
                              </h3>
                              <p className="text-sm text-[#f8f8f8]/60">
                                {client.role}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-[#f983e2]/20 text-[#f983e2] border-[#f983e2]/30">
                  À Propos
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold">
                  Passionné par
                  <br />
                  <span className="text-[#f983e2]">l'art du montage</span>
                </h2>
                <p className="text-lg text-[#f8f8f8]/70 leading-relaxed">
                  Depuis 2015, je transforme les vidéos brutes en contenus
                  exceptionnels. Mon expertise couvre tous les formats : du vlog
                  intimiste aux montages gaming épiques, en passant par les
                  shorts viraux.
                </p>
                <p className="text-lg text-[#f8f8f8]/70 leading-relaxed">
                  Chaque projet est unique et mérite une approche personnalisée.
                  Je travaille en étroite collaboration avec mes clients pour
                  comprendre leur vision et la concrétiser avec créativité et
                  technique.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Adobe Premiere Pro",
                    "After Effects",
                    "DaVinci Resolve",
                    "Final Cut Pro",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-[#292929] text-[#f8f8f8] border-white/10"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-[#f983e2]/20 to-[#ff6b9d]/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#f983e2]">
                        9+
                      </div>
                      <div className="text-sm text-[#f8f8f8]/60">
                        Années d'expérience
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#f983e2]">
                        {projects.length || 20}+
                      </div>
                      <div className="text-sm text-[#f8f8f8]/60">
                        Projets réalisés
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#f983e2]">
                        5+
                      </div>
                      <div className="text-sm text-[#f8f8f8]/60">
                        Clients satisfaits
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#f983e2]">
                        10,000+
                      </div>
                      <div className="text-sm text-[#f8f8f8]/60">
                        Vues générées
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Portfolio Section */}
        <motion.section
          id="portfolio"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-[#f983e2]/20 text-[#f983e2] border-[#f983e2]/30 mb-4">
                Portfolio
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Mes <span className="text-[#f983e2]">Derniers Projets</span>
              </h2>
              <p className="text-lg text-[#f8f8f8]/70 max-w-3xl mx-auto">
                Découvrez une sélection de mes réalisations récentes. Chaque
                projet reflète mon engagement à créer du contenu de qualité
                exceptionnelle.
              </p>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {projects.slice(0, 6).map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => window.open(item.youtubeUrl, "_blank")}
                  >
                    <Card className="bg-[#292929] border-white/10 hover:border-[#f983e2]/50 transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded text-sm font-medium">
                          {item.duration}
                        </div>
                        <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white">
                          YOUTUBE
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-[#f983e2] rounded-full p-4">
                            <Play className="h-6 w-6 text-black fill-current" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#f983e2] transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-[#f8f8f8]/60">
                          <span>{item.views}</span>
                          <div className="flex items-center space-x-1">
                            <Youtube className="h-4 w-4 text-red-500" />
                            <span>Voir sur YouTube</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Youtube className="h-16 w-16 text-[#f8f8f8]/20 mx-auto mb-4" />
                <p className="text-lg text-[#f8f8f8]/60">
                  Aucun projet disponible pour le moment
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-[#f983e2] text-[#f983e2] bg-transparent hover:bg-[#f983e2] hover:text-black px-8 py-3"
              >
                Voir Plus de Projets
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-[#f983e2]/20 text-[#f983e2] border-[#f983e2]/30 mb-4">
                Services
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                MES <span className="text-[#f983e2]">COMPÉTENCES.</span>
              </h2>
              <p className="text-lg text-[#f8f8f8]/70 max-w-3xl mx-auto">
                Je maîtrise tous les aspects du montage vidéo pour créer du
                contenu adapté à votre audience et à vos objectifs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="group"
                  >
                    <Card className="bg-[#292929] border-white/10 hover:border-[#f983e2]/50 transition-all duration-300 h-full">
                      <CardContent className="p-8">
                        <div
                          className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} mb-6`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 group-hover:text-[#f983e2] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-[#f8f8f8]/70 leading-relaxed">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#f983e2]/20 text-[#f983e2] border-[#f983e2]/30 mb-6">
              Contact
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Et si on racontait
              <br />
              <span className="text-[#f983e2]">votre histoire ensemble</span>
            </h2>
            <p className="text-xl text-[#f8f8f8]/70 mb-12 leading-relaxed">
              Contactez-moi et travaillons sur vos prochaines vidéos. Je suis là
              pour donner vie à vos idées les plus créatives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#292929] rounded-2xl p-6 border border-white/10 hover:border-[#f983e2]/50 transition-all duration-300"
              >
                <Mail className="h-8 w-8 text-[#f983e2] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">EMAIL</h3>
                <p className="text-[#f983e2] font-medium">
                  editing.jayson@gmail.com
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#292929] rounded-2xl p-6 border border-white/10 hover:border-[#f983e2]/50 transition-all duration-300"
              >
                <div className="flex justify-center space-x-4 mb-4">
                  <Instagram className="h-6 w-6 text-[#f983e2]" />
                  <Twitter className="h-6 w-6 text-[#f983e2]" />
                  <Youtube className="h-6 w-6 text-[#f983e2]" />
                </div>
                <h3 className="font-semibold mb-2">RÉSEAUX SOCIAUX</h3>
                <p className="text-[#f8f8f8]/60 text-sm">
                  Suivez mes dernières créations
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#292929] rounded-2xl p-6 border border-white/10 hover:border-[#f983e2]/50 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-[#f983e2] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-black font-bold text-sm">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">RÉPONSE RAPIDE</h3>
                <p className="text-[#f8f8f8]/60 text-sm">Sous 24h en moyenne</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#f983e2] to-[#ff6b9d] bg-clip-text text-transparent mb-4">
                  Editing By iJerce
                </div>
                <p className="text-[#f8f8f8]/60 mb-6 max-w-md">
                  Monteur vidéo professionnel spécialisé dans la création de
                  contenus captivants pour YouTubeurs et streameurs depuis 2015.
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#292929] p-3 rounded-full hover:bg-[#f983e2] hover:text-black transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#292929] p-3 rounded-full hover:bg-[#f983e2] hover:text-black transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#292929] p-3 rounded-full hover:bg-[#f983e2] hover:text-black transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className="text-[#f8f8f8]/60 hover:text-[#f983e2] transition-colors text-left"
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-[#f8f8f8]/60">
                  <li>Montage Vlog</li>
                  <li>Gaming Content</li>
                  <li>Shorts/Reels</li>
                  <li>Stream Highlights</li>
                  <li>Contenu Divertissant</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-[#f8f8f8]/60">
                © 2025 Editing By iJerce.{" "}
                <a
                  href="/admin"
                  className="text-[#f8f8f8]/40 hover:text-[#f983e2] transition-colors text-xs"
                >
                  Admin
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
