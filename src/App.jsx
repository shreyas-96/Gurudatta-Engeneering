import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Cpu,
  Truck,
  Car,
  Bike,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Menu,
  X
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // Replace this with your actual Google Apps Script Web App URL after deployment
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyAoulOyWoOP2EMnz7yD2kVVMVbf0uK8ySF1yhUiCxEHVG94CMpreB8BRj9GQPFaYJq/exec';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      'full-name': 'name',
      'phone-number': 'phone',
      'requirement': 'requirement'
    };
    setFormData(prev => ({ ...prev, [fieldMap[id]]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_SCRIPT_WEB_APP_URL')) {
      alert("Please configure your Google Script URL first!");
      return;
    }

    setStatus('loading');

    try {
      // Use Query Parameters - This is the most reliable way to ensure Google Script receives the data
      const formUrl = `${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(formData.phone)}&requirement=${encodeURIComponent(formData.requirement)}`;

      console.log("Submitting to URL:", formUrl);

      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        // No body needed when sending via URL params
      });

      setStatus('success');
      setFormData({ name: '', phone: '', requirement: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const services = [
    {
      title: "CNC Machining",
      desc: "High-precision computer numerical control machining for complex geometric parts with micron-level accuracy.",
      icon: <Cpu className="w-8 h-8 text-amber-500" />
    },
    {
      title: "VMC Centers",
      desc: "Advanced Vertical Machining Centers (VMC) for high-speed milling and drilling operations.",
      icon: <Settings className="w-8 h-8 text-amber-500" />
    },
    {
      title: "Lathe Operations",
      desc: "Traditional and CNC Lathe services for rotational parts development and finishing.",
      icon: <Clock3 className="w-8 h-8 text-amber-500" />
    }
  ];

  const categories = [
    { title: "Motorcycle Parts", icon: <Bike />, image: "/parts.png" },
    { title: "Car Components", icon: <Car />, image: "/process.png" },
    { title: "Truck Assemblies", icon: <Truck />, image: "/hero.png" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                <Settings className="text-amber-500 animate-spin-slow rotate-45" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">Gurudatta</span>
                <span className="block text-xs font-bold text-amber-600 tracking-widest uppercase">Engineering</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Products', 'Process', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors">
                  {item}
                </a>
              ))}
              <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                Get a Quote
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {['Services', 'Products', 'Process', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="block text-lg font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-10 blur-3xl">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500 rounded-full"></div>
          <div className="absolute bottom-20 right-40 w-80 h-80 bg-slate-900 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Precision Redefined</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
                Excellence in <br />
                <span className="text-amber-500">Industrial</span> Machining
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Advanced Workshop specializing in CNC, VMC, and Lathe machining. We deliver high-precision parts for motorcycles, cars, and trucks through expertise in casting and roughing.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl flex items-center space-x-2 hover:bg-amber-500 transition-all group">
                  <span>Explore Our Workshop</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="client" />
                    </div>
                  ))}
                  <div className="pl-6 text-sm">
                    <span className="block font-bold">500+ Projects</span>
                    <span className="text-slate-500 text-xs">Delivered across Maharashtra</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full"></div>
              <img
                src="/hero.png"
                alt="Workshop"
                className="relative rounded-[2.5rem] shadow-2xl border-8 border-white object-cover aspect-[4/5] lg:aspect-auto"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden sm:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">Vishal A Salokhe</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Owner</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">Cutting-Edge <br />Machining Solutions</h2>
              <p className="text-lg text-slate-500">We utilize state-of-the-art machinery to bring your technical designs to life with unparalleled accuracy.</p>
            </div>
            <div className="flex lg:justify-end space-x-12">
              <div className="text-center">
                <div className="text-4xl font-black text-amber-500">20+</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Machines</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-slate-900">0.01mm</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Precision</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 hover:border-amber-500/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{service.desc}</p>
                <a href="#" className="inline-flex items-center space-x-2 text-sm font-extrabold text-slate-900 hover:text-amber-600 uppercase tracking-widest">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section id="products" className="section-padding bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Expert Component Development</h2>
            <p className="text-slate-400">Specializing in critical parts for the automotive industry, from concept to finished product.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group rounded-[3rem] overflow-hidden aspect-[3/4]"
              >
                <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt={cat.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 backdrop-blur-md flex items-center justify-center mb-4 text-amber-500 border border-amber-500/30">
                    {cat.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-2">{cat.title}</h3>
                  <div className="flex items-center space-x-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
                    <span>Manufacturing</span>
                    <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                    <span>Analysis</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden relative">
                <img src="/process.png" className="w-full h-full object-cover" alt="Process" />
                <div className="absolute inset-0 bg-amber-500/10 mix-blend-multiply"></div>
              </div>
              <div className="absolute -top-10 -right-10 bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl animate-float">
                <div className="text-center">
                  <div className="text-3xl font-black text-amber-500">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-2 whitespace-nowrap">Accuracy Rate</div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-4xl font-black text-slate-900">Advanced Manufacturing <br />Flow & Techniques</h2>
              <div className="space-y-8">
                {[
                  { title: "Casting Precision", desc: "Expert mold design and material casting for robust base components.", icon: <CheckCircle2 className="text-amber-500" /> },
                  { title: "Professional Roughing", desc: "Heavy-duty material removal with precision speed for optimal shape drafting.", icon: <CheckCircle2 className="text-amber-500" /> },
                  { title: "Final Finishing", desc: "Ultra-high precision machining and surface treatment for ready-to-use parts.", icon: <CheckCircle2 className="text-amber-500" /> }
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="mt-1">{step.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[4rem] p-10 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black mb-8">Let's Build Something <br /><span className="text-amber-500">Exceptional</span> Together</h2>
                <p className="text-slate-400 text-lg mb-12">Visit our workshop or reach out for a technical consultation and pricing.</p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 border border-white/10">
                      <MapPin />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Our Location</div>
                      <address className="not-italic font-bold text-xl leading-snug">
                        Indarayani Chowk, Mouje Agar, Shirol. <br />
                        Tal Shirol, Dist Kolhapur - 416120
                      </address>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 border border-white/10">
                      <Phone />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Call Vishal A Salokhe</div>
                      <div className="font-bold text-xl text-amber-500">+91 91689 48856</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-12 border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                      <input
                        id="full-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                      <input
                        id="phone-number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="+91..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Requirement</label>
                    <textarea
                      id="requirement"
                      required
                      value={formData.requirement}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors h-32"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-4 font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 ${status === 'loading' ? 'bg-slate-700 cursor-not-allowed' :
                      status === 'success' ? 'bg-green-500' : 'bg-amber-500 text-slate-900 hover:bg-white'
                      }`}
                  >
                    {status === 'loading' ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : status === 'success' ? (
                      <span className="flex items-center"><CheckCircle2 className="mr-2 h-5 w-5" /> Inquiry Sent Successfully!</span>
                    ) : status === 'error' ? (
                      <span>Error! Try Again.</span>
                    ) : (
                      <span>Send Inquiry</span>
                    )}
                  </button>

                  {status === 'success' && (
                    <p className="text-green-400 text-center text-sm font-bold animate-pulse">
                      Thank you! Your inquiry has been logged in our Google Sheet.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Settings className="text-amber-500 w-5 h-5 shadow-inner" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Gurudatta Engineering</span>
            </div>
            <p className="text-slate-400 text-sm max-w-lg">Advanced industrial workshop providing high-precision machining services for automotive excellence across Kolhapur and beyond.</p>
            <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© 2026 Gurudatta Engineering | Managed by Vishal A Salokhe | Developed by Shreyas Chudmunge</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
