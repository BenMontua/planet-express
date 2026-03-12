import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import {
  heroData,
  features,
  howItWorks,
  securityFeatures,
  pricingPlans,
  faqs,
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
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/planet-express-logo.png" alt="Planet Express" className="w-12 h-12 object-contain" />
            <span className="text-xl font-bold text-white">Planet Express</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-blue-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#pricing" className="text-slate-300 hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#faq" className="text-slate-300 hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#contact" className="text-slate-300 hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-blue-500/10">
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px]"></div>
        </div>
        
        <div className={`container mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
                <Zap className="w-4 h-4 mr-2" /> Now with 10x faster transfers
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {heroData.title}
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                {heroData.subtitle}
              </p>
              <p className="text-lg text-slate-400 mb-8">
                {heroData.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8">
                  {heroData.ctaPrimary} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 text-lg px-8">
                  {heroData.ctaSecondary}
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-2xl"></div>
              <img 
                src={heroData.heroImage} 
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need for secure, fast, and reliable file transfers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card 
                  key={feature.id} 
                  className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400 text-base">
                      {feature.description}
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three simple steps to transfer your files securely
            </p>
          </div>
          
          <div className="space-y-16">
            {howItWorks.map((step, index) => (
              <div 
                key={step.id} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-6xl font-bold text-blue-500/20 mb-4">{step.step}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-lg text-slate-400 mb-6">{step.description}</p>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl"></div>
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="relative rounded-2xl shadow-xl border border-blue-500/20"
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full filter blur-[150px]"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Security First
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Your data security is our top priority
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <div 
                  key={feature.id} 
                  className="text-center p-6 rounded-xl bg-slate-900/30 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/50 transition-all"
                >
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-blue-900/50 to-slate-900/50 border-blue-500 scale-105' 
                    : 'bg-slate-900/50 border-slate-800'
                } hover:border-blue-500/50 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-slate-400 ml-2">/ {plan.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {plan.cta}
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to know
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={`item-${faq.id}`}
                className="bg-slate-900/50 border border-slate-800 rounded-lg px-6 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-white hover:text-blue-400 text-left">
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-slate-400">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Name</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
              <div className="flex items-center space-x-2 mb-4">
                <img src="/planet-express-logo.png" alt="Planet Express" className="w-12 h-12 object-contain" />
                <span className="text-xl font-bold text-white">Planet Express</span>
              </div>
              <p className="text-slate-400">
                Lightning-fast, secure file transfers for modern teams.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-400 hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">API</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Security</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 Planet Express. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">GitHub</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
