import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { 
  HardDrive, Shield, Zap, Globe, Users, Code, 
  Lock, EyeOff, FileCheck, Trash2, ArrowRight, 
  Check, ChevronDown, Send, Mail, User, MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {
  stats,
  testimonials
} from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  harddrive: HardDrive,
  shield: Shield,
  zap: Zap,
  globe: Globe,
  users: Users,
  code: Code,
  lock: Lock,
  'eye-off': EyeOff,
  'file-check': FileCheck,
  'trash-2': Trash2
};

const Landing = () => {
  const { t } = useTranslation();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map icon names to components
  const iconMap = {
    harddrive: HardDrive,
    shield: Shield,
    zap: Zap,
    globe: Globe,
    users: Users,
    code: Code,
    lock: Lock,
    'eye-off': EyeOff,
    'file-check': FileCheck,
    'trash-2': Trash2
  };

  // Define features with icon mappings
  const features = [
    { id: 1, icon: 'harddrive', key: 'unlimitedFileSize' },
    { id: 2, icon: 'shield', key: 'encryption' },
    { id: 3, icon: 'zap', key: 'speed' },
    { id: 4, icon: 'globe', key: 'cdn' },
    { id: 5, icon: 'users', key: 'collaboration' },
    { id: 6, icon: 'code', key: 'api' }
  ];

  const securityFeatures = [
    { id: 1, icon: 'lock', key: 'encryption' },
    { id: 2, icon: 'eye-off', key: 'zeroKnowledge' },
    { id: 3, icon: 'file-check', key: 'compliance' },
    { id: 4, icon: 'trash-2', key: 'autoDelete' }
  ];

  const howItWorksSteps = [
    { id: 1, step: "01", key: 'upload', image: "https://images.unsplash.com/photo-1632518193201-72278769704a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdHJhbnNmZXJ8ZW58MHx8fHwxNzczMzA3NTUzfDA&ixlib=rb-4.1.0&q=85" },
    { id: 2, step: "02", key: 'process', image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxjbG91ZCUyMHNlcnZlcnxlbnwwfHx8fDE3NzMzMDc1NTZ8MA&ixlib=rb-4.1.0&q=85" },
    { id: 3, step: "03", key: 'deliver', image: "https://images.unsplash.com/photo-1764053430604-d585d1f1dad6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NzMzMDc1NTl8MA&ixlib=rb-4.1.0&q=85" }
  ];

  const pricingPlans = [
    { id: 1, key: 'free', popular: false },
    { id: 2, key: 'pro', popular: true },
    { id: 3, key: 'enterprise', popular: false }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, contactForm);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setContactForm({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-yellow-500/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center p-3 shadow-xl border-2 border-slate-200/50">
              <img src="/planet-express-logo.png" alt="Planet Express" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{t('header.companyName')}</span>
              <div className="text-xs text-yellow-400 font-semibold">{t('header.tagline')}</div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-yellow-400 transition-colors">{t('header.nav.features')}</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-yellow-400 transition-colors">{t('header.nav.howItWorks')}</a>
            <a href="#pricing" className="text-slate-300 hover:text-yellow-400 transition-colors">{t('header.nav.pricing')}</a>
            <a href="#faq" className="text-slate-300 hover:text-yellow-400 transition-colors">{t('header.nav.faq')}</a>
            <a href="#contact" className="text-slate-300 hover:text-yellow-400 transition-colors">{t('header.nav.contact')}</a>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <a href="https://planet-express-dev.phantomrausch.de/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold shadow-lg">
                {t('header.getStarted')}
              </Button>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full filter blur-[120px]"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500 rounded-full filter blur-[110px]"></div>
        </div>
        
        <div className={`container mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-red-600/30 to-orange-600/30 text-yellow-300 border-yellow-500/50 hover:bg-red-500/40 shadow-lg animate-pulse">
                <Zap className="w-4 h-4 mr-2" /> {t('hero.badge')} 
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t('hero.title')}
                <span className="block text-4xl lg:text-5xl text-yellow-400 mt-2">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                {t('hero.description')}
              </p>
              <p className="text-lg text-yellow-400/80 mb-8">
                ⚡ {t('hero.features')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://planet-express-dev.phantomrausch.de/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-slate-900 font-bold text-lg px-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all">
                    🚀 {t('hero.ctaPrimary')} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="border-2 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 hover:border-yellow-400 text-lg px-8">
                  📺 {t('hero.ctaSecondary')}
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map(stat => (
                  <div key={stat.id} className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-red-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwzfHxkYXRhJTIwdHJhbnNmZXJ8ZW58MHx8fHwxNzczMzA3NTUzfDA&ixlib=rb-4.1.0&q=85" 
                alt="File Transfer Technology" 
                className="relative rounded-2xl shadow-2xl border border-blue-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              {t('features.badge')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card 
                  key={feature.id} 
                  className="bg-slate-900/50 border-slate-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm rounded-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <CardTitle className="text-white text-xl">{t(`features.items.${feature.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400 text-base">
                      {t(`features.items.${feature.key}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              {t('howItWorks.badge')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="space-y-16">
            {howItWorksSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-6xl font-bold text-yellow-500/30 mb-4">{step.step}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{t(`howItWorks.steps.${step.key}.title`)}</h3>
                  <p className="text-lg text-slate-400 mb-6">{t(`howItWorks.steps.${step.key}.description`)}</p>
                  <div className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">
                    <span>{t('howItWorks.learnMore')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-red-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
                    <img 
                      src={step.image} 
                      alt={t(`howItWorks.steps.${step.key}.title`)} 
                      className="relative rounded-3xl shadow-xl border-2 border-yellow-500/20"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500 rounded-full filter blur-[150px]"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/50">
              {t('security.badge')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('security.title')}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('security.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <div 
                  key={feature.id} 
                  className="text-center p-6 rounded-2xl bg-slate-900/30 border-2 border-red-500/30 backdrop-blur-sm hover:border-red-500/60 transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t(`security.features.${feature.key}.title`)}</h3>
                  <p className="text-slate-400">{t(`security.features.${feature.key}.description`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              {t('pricing.badge')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative rounded-2xl ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-yellow-900/30 via-red-900/20 to-slate-900/50 border-2 border-yellow-500 scale-105 shadow-xl shadow-yellow-500/20' 
                    : 'bg-slate-900/50 border-slate-800'
                } hover:border-yellow-500/50 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-slate-900 font-bold shadow-lg animate-pulse">{t(`pricing.plans.${plan.key}.badge`)}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{t(`pricing.plans.${plan.key}.name`)}</CardTitle>
                  <CardDescription className="text-slate-400">{t(`pricing.plans.${plan.key}.description`)}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-white">{t(`pricing.plans.${plan.key}.price`)}</span>
                    {t(`pricing.plans.${plan.key}.price`) !== 'Custom' && t(`pricing.plans.${plan.key}.price`) !== 'Individuell' && (
                      <span className="text-slate-400 ml-2">/ {t(`pricing.plans.${plan.key}.period`)}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {t(`pricing.plans.${plan.key}.features`, { returnObjects: true }).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full rounded-xl transform hover:scale-105 transition-all ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-slate-900 font-bold shadow-lg hover:shadow-yellow-500/50' 
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-yellow-500/30'
                    }`}
                  >
                    {t(`pricing.plans.${plan.key}.cta`)}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-slate-950">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              {t('faq.badge')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-xl text-slate-400">
              {t('faq.subtitle')}
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {t('faq.items', { returnObjects: true }).map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-slate-900/50 border border-slate-800 rounded-xl px-6 backdrop-blur-sm hover:border-yellow-500/30"
              >
                <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              {t('contact.badge')}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-slate-400">
              {t('contact.subtitle')}
            </p>
          </div>
          
          <Card className="bg-slate-900/50 border-2 border-yellow-500/30 backdrop-blur-sm rounded-2xl shadow-xl shadow-yellow-500/10">
            <CardContent className="pt-6">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{t('contact.form.name')}</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{t('contact.form.email')}</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('contact.form.message')}</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-slate-900 font-bold shadow-lg rounded-xl transform hover:scale-105 transition-all hover:shadow-yellow-500/50"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center p-3 shadow-xl border-2 border-slate-200/50">
                  <img src="/planet-express-logo.png" alt="Planet Express" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">{t('header.companyName')}</span>
                  <div className="text-xs text-yellow-400 font-semibold">{t('header.tagline')}</div>
                </div>
              </div>
              <p className="text-slate-400">
                {t('footer.tagline')}
              </p>
              <p className="text-slate-500 text-sm mt-2 italic">
                {t('footer.quote')}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.features')}</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.pricing')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.api')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.documentation')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.about')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.blog')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.careers')}</a></li>
                <li><a href="#contact" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.contact')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.privacy')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.terms')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.security')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">{t('footer.links.compliance')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">GitHub</a>
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
