// Mock data for File Transfer Landing Page

export const heroData = {
  title: "Lightning-Fast File Transfer",
  subtitle: "Secure, reliable, and blazingly fast file transfers for modern teams",
  description: "Transfer files of any size with enterprise-grade security. No limits, no hassle.",
  ctaPrimary: "Start Free Trial",
  ctaSecondary: "View Demo",
  heroImage: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwzfHxkYXRhJTIwdHJhbnNmZXJ8ZW58MHx8fHwxNzczMzA3NTUzfDA&ixlib=rb-4.1.0&q=85"
};

export const features = [
  {
    id: 1,
    title: "Unlimited File Size",
    description: "Transfer files of any size without compression or quality loss. From documents to 4K videos.",
    icon: "harddrive"
  },
  {
    id: 2,
    title: "End-to-End Encryption",
    description: "Military-grade encryption ensures your files are secure from upload to download.",
    icon: "shield"
  },
  {
    id: 3,
    title: "Lightning Speed",
    description: "Optimized transfer protocols deliver your files up to 10x faster than traditional methods.",
    icon: "zap"
  },
  {
    id: 4,
    title: "Global CDN",
    description: "Distributed network ensures fast transfers regardless of geographical location.",
    icon: "globe"
  },
  {
    id: 5,
    title: "Team Collaboration",
    description: "Share files with your team, set permissions, and track who accessed what.",
    icon: "users"
  },
  {
    id: 6,
    title: "API Integration",
    description: "Seamlessly integrate with your existing workflow using our powerful API.",
    icon: "code"
  }
];

export const howItWorks = [
  {
    id: 1,
    step: "01",
    title: "Upload Your Files",
    description: "Drag and drop or select files from your device. Support for all file types.",
    image: "https://images.unsplash.com/photo-1632518193201-72278769704a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdHJhbnNmZXJ8ZW58MHx8fHwxNzczMzA3NTUzfDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    step: "02",
    title: "Secure Processing",
    description: "Files are encrypted and optimized for transfer through our global network.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxjbG91ZCUyMHNlcnZlcnxlbnwwfHx8fDE3NzMzMDc1NTZ8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 3,
    step: "03",
    title: "Share & Deliver",
    description: "Generate secure links and share instantly. Recipients download at maximum speed.",
    image: "https://images.unsplash.com/photo-1764053430604-d585d1f1dad6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NzMzMDc1NTl8MA&ixlib=rb-4.1.0&q=85"
  }
];

export const securityFeatures = [
  {
    id: 1,
    title: "256-bit Encryption",
    description: "All files encrypted with AES-256 standard",
    icon: "lock"
  },
  {
    id: 2,
    title: "Zero-Knowledge",
    description: "We can't access your files, only you can",
    icon: "eye-off"
  },
  {
    id: 3,
    title: "Compliance Ready",
    description: "GDPR, HIPAA, and SOC 2 compliant",
    icon: "file-check"
  },
  {
    id: 4,
    title: "Auto-Delete",
    description: "Files automatically deleted after expiry",
    icon: "trash-2"
  }
];

export const pricingPlans = [
  {
    id: 1,
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for personal use",
    features: [
      "Up to 2GB per transfer",
      "5 transfers per day",
      "7-day file retention",
      "Basic encryption",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    id: 2,
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For professionals and small teams",
    features: [
      "Up to 100GB per transfer",
      "Unlimited transfers",
      "30-day file retention",
      "Advanced encryption",
      "Priority support",
      "Custom branding",
      "API access"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations",
    features: [
      "Unlimited file size",
      "Unlimited transfers",
      "Custom retention period",
      "Dedicated infrastructure",
      "24/7 phone support",
      "SSO & SAML",
      "Advanced API",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export const faqs = [
  {
    id: 1,
    question: "How secure is the file transfer?",
    answer: "All files are encrypted using military-grade AES-256 encryption during transfer and at rest. We use a zero-knowledge architecture, meaning only you can access your files. We're also compliant with GDPR, HIPAA, and SOC 2 standards."
  },
  {
    id: 2,
    question: "What's the maximum file size I can transfer?",
    answer: "On the Free plan, you can transfer up to 2GB per transfer. Pro users can transfer up to 100GB, and Enterprise customers have no file size limits."
  },
  {
    id: 3,
    question: "How long are files stored?",
    answer: "Files are stored for 7 days on the Free plan, 30 days on Pro, and custom retention periods for Enterprise. You can also set custom expiry times or delete files manually at any time."
  },
  {
    id: 4,
    question: "Can I integrate this with my existing tools?",
    answer: "Yes! Pro and Enterprise plans include API access. We also offer pre-built integrations with popular tools like Slack, Dropbox, Google Drive, and more."
  },
  {
    id: 5,
    question: "What happens if a transfer fails?",
    answer: "Our system automatically retries failed transfers. If a transfer can't be completed, you'll be notified immediately and can restart the transfer. All successfully uploaded data is preserved."
  },
  {
    id: 6,
    question: "Do you offer a refund policy?",
    answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund."
  }
];

export const stats = [
  {
    id: 1,
    value: "10M+",
    label: "Files Transferred"
  },
  {
    id: 2,
    value: "50K+",
    label: "Active Users"
  },
  {
    id: 3,
    value: "99.9%",
    label: "Uptime SLA"
  },
  {
    id: 4,
    value: "150+",
    label: "Countries Served"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO, TechCorp",
    content: "Switched to this service 6 months ago and never looked back. The speed and reliability are unmatched.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Creative Director, Studio X",
    content: "Transferring large video files used to be a nightmare. Now it's seamless. Game changer for our workflow.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Product Manager, CloudFlow",
    content: "The API integration was straightforward, and the security features give us peace of mind with client data.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  }
];
