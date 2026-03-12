# Internationalization (i18n) Implementation Guide

## Overview

Planet Express Landing Page now supports multiple languages (English & German) with automatic browser language detection and manual language switching.

## Implementation Status

### ✅ Completed

1. **i18n Libraries Installed**
   - `i18next` - Core i18n framework
   - `react-i18next` - React bindings
   - `i18next-browser-languagedetector` - Browser language detection

2. **Configuration Files**
   - `/app/frontend/src/i18n.js` - Main i18n configuration
   - `/app/frontend/src/locales/en.json` - English translations
   - `/app/frontend/src/locales/de.json` - German translations

3. **Language Switcher Component**
   - `/app/frontend/src/components/LanguageSwitcher.js`
   - Dropdown menu with language selection
   - Shows current language flag and code
   - Styled to match Planet Express theme

4. **Integration**
   - Added to `index.js` - i18n initialization
   - Language switcher added to header
   - Header navigation translated
   - Language preference stored in localStorage

### 🔄 Partial Implementation

**Landing.js Component**
- Header: ✅ Fully translated
- Hero Section: ⚠️ Partially updated (needs completion)
- Features: ⚠️ Needs translation integration
- How It Works: ⚠️ Needs translation integration
- Security: ⚠️ Needs translation integration
- Pricing: ⚠️ Needs translation integration
- FAQ: ⚠️ Needs translation integration
- Contact Form: ⚠️ Needs translation integration
- Footer: ⚠️ Needs translation integration

## How to Complete the Implementation

### Step 1: Import useTranslation Hook

Already done in Landing.js:
```javascript
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { t } = useTranslation();
  // ...
}
```

### Step 2: Replace Hardcoded Text

Replace all hardcoded strings with translation function calls:

**Before:**
```javascript
<h1>Lightning-Fast File Transfer</h1>
```

**After:**
```javascript
<h1>{t('hero.title')}</h1>
```

### Step 3: Section-by-Section Updates

#### Hero Section
```javascript
<Badge>{t('hero.badge')}</Badge>
<h1>{t('hero.title')}</h1>
<span>{t('hero.subtitle')}</span>
<p>{t('hero.description')}</p>
<p>{t('hero.features')}</p>
<Button>{t('hero.ctaPrimary')}</Button>
<Button>{t('hero.ctaSecondary')}</Button>
```

#### Stats Section
```javascript
{stats.map(stat => (
  <div>
    <div>{stat.value}</div>
    <div>{t(`stats.${stat.key}`)}</div>
  </div>
))}
```

#### Features Section
```javascript
<Badge>{t('features.badge')}</Badge>
<h2>{t('features.title')}</h2>
<p>{t('features.subtitle')}</p>

{features.map((feature) => (
  <Card>
    <CardTitle>{t(`features.items.${feature.key}.title`)}</CardTitle>
    <CardDescription>{t(`features.items.${feature.key}.description`)}</CardDescription>
  </Card>
))}
```

#### How It Works Section
```javascript
<Badge>{t('howItWorks.badge')}</Badge>
<h2>{t('howItWorks.title')}</h2>
<p>{t('howItWorks.subtitle')}</p>

{howItWorksSteps.map((step) => (
  <div>
    <h3>{t(`howItWorks.steps.${step.key}.title`)}</h3>
    <p>{t(`howItWorks.steps.${step.key}.description`)}</p>
    <span>{t('howItWorks.learnMore')}</span>
  </div>
))}
```

#### Security Section
```javascript
<Badge>{t('security.badge')}</Badge>
<h2>{t('security.title')}</h2>
<p>{t('security.subtitle')}</p>

{securityFeatures.map((feature) => (
  <div>
    <h3>{t(`security.features.${feature.key}.title`)}</h3>
    <p>{t(`security.features.${feature.key}.description`)}</p>
  </div>
))}
```

#### Pricing Section
```javascript
<Badge>{t('pricing.badge')}</Badge>
<h2>{t('pricing.title')}</h2>
<p>{t('pricing.subtitle')}</p>

{pricingPlans.map((plan) => (
  <Card>
    <CardTitle>{t(`pricing.plans.${plan.key}.name`)}</CardTitle>
    <CardDescription>{t(`pricing.plans.${plan.key}.description`)}</CardDescription>
    <span>{t(`pricing.plans.${plan.key}.price`)}</span>
    <span>{t(`pricing.plans.${plan.key}.period`)}</span>
    {plan.popular && <Badge>{t(`pricing.plans.${plan.key}.badge`)}</Badge>}
    <Button>{t(`pricing.plans.${plan.key}.cta`)}</Button>
    {t(`pricing.plans.${plan.key}.features`, { returnObjects: true }).map((feature, index) => (
      <li key={index}>{feature}</li>
    ))}
  </Card>
))}
```

#### FAQ Section
```javascript
<Badge>{t('faq.badge')}</Badge>
<h2>{t('faq.title')}</h2>
<p>{t('faq.subtitle')}</p>

<Accordion>
  {t('faq.items', { returnObjects: true }).map((faq, index) => (
    <AccordionItem key={index}>
      <AccordionTrigger>{faq.question}</AccordionTrigger>
      <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

#### Contact Form
```javascript
<Badge>{t('contact.badge')}</Badge>
<h2>{t('contact.title')}</h2>
<p>{t('contact.subtitle')}</p>

<Label>{t('contact.form.name')}</Label>
<Input placeholder={t('contact.form.namePlaceholder')} />

<Label>{t('contact.form.email')}</Label>
<Input placeholder={t('contact.form.emailPlaceholder')} />

<Label>{t('contact.form.message')}</Label>
<Textarea placeholder={t('contact.form.messagePlaceholder')} />

<Button>
  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
</Button>
```

#### Footer
```javascript
<span>{t('header.companyName')}</span>
<p>{t('footer.tagline')}</p>
<p>{t('footer.quote')}</p>

<h3>{t('footer.product')}</h3>
<a>{t('footer.links.features')}</a>
<a>{t('footer.links.pricing')}</a>

<h3>{t('footer.company')}</h3>
<a>{t('footer.links.about')}</a>

<h3>{t('footer.legal')}</h3>
<a>{t('footer.links.privacy')}</a>

<p>{t('footer.copyright')}</p>
```

## Testing

### Test Language Switching

1. Open the app in browser: `http://localhost:3000`
2. Click the language switcher in the header (Globe icon)
3. Select "Deutsch" (German)
4. Verify all text changes to German
5. Switch back to "English"
6. Verify all text changes to English

### Test Browser Language Detection

1. Change your browser language to German
2. Clear localStorage
3. Refresh the page
4. App should load in German automatically
5. Change browser language to English
6. Clear localStorage and refresh
7. App should load in English

### Test LocalStorage Persistence

1. Switch language to German
2. Refresh the page
3. Language should remain German (stored in localStorage)

## Adding New Languages

### 1. Create Translation File

Create `/app/frontend/src/locales/[language-code].json`:
```javascript
{
  "header": {
    "companyName": "Planet Express",
    // ... all translations
  }
}
```

### 2. Update i18n Configuration

In `/app/frontend/src/i18n.js`:
```javascript
import translationFR from './locales/fr.json'; // Add new import

const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
  fr: { translation: translationFR } // Add new language
};

i18n.init({
  // ...
  supportedLngs: ['en', 'de', 'fr'], // Add to supported languages
});
```

### 3. Update Language Switcher

In `/app/frontend/src/components/LanguageSwitcher.js`:
```javascript
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' } // Add new language
];
```

## Translation Keys Structure

```
header
  companyName, tagline, nav, signIn, getStarted

hero
  badge, title, subtitle, description, features, ctaPrimary, ctaSecondary

stats
  filesTransferred, activeUsers, uptimeSLA, countriesServed

features
  badge, title, subtitle
  items
    unlimitedFileSize, encryption, speed, cdn, collaboration, api
      title, description

howItWorks
  badge, title, subtitle
  steps
    upload, process, deliver
      title, description
  learnMore

security
  badge, title, subtitle
  features
    encryption, zeroKnowledge, compliance, autoDelete
      title, description

pricing
  badge, title, subtitle
  plans
    free, pro, enterprise
      name, price, period, description, cta, features[], badge

faq
  badge, title, subtitle
  items[]
    question, answer

contact
  badge, title, subtitle
  form
    name, namePlaceholder, email, emailPlaceholder
    message, messagePlaceholder, submit, submitting

footer
  tagline, quote, product, company, legal
  links
    features, pricing, api, documentation, about, blog
    careers, contact, privacy, terms, security, compliance
  copyright
```

## Troubleshooting

### Translations Not Showing

1. Check browser console for errors
2. Verify translation key exists in JSON file
3. Check i18n is imported in index.js
4. Verify useTranslation hook is called

### Language Not Switching

1. Check LanguageSwitcher component is rendered
2. Verify i18next-browser-languagedetector is installed
3. Check localStorage for 'i18nextLng' key
4. Clear cache and try again

### Missing Translations

If a key is missing, i18next will show the key itself:
```
// Missing key
<h1>{t('missing.key')}</h1>
// Shows: "missing.key"
```

Add the missing key to both en.json and de.json.

## Performance Considerations

- Translation files are loaded synchronously on app start
- Consider lazy loading for large translation files
- Cache translations in production builds
- Use namespace splitting for very large apps

## Best Practices

1. **Consistent Key Structure**: Use dot notation and consistent naming
2. **Avoid HTML in Translations**: Keep translations as plain text
3. **Use Pluralization**: For count-based text variations
4. **Context for Ambiguous Terms**: Add context keys when needed
5. **Test All Languages**: Verify all translations render correctly

## Future Enhancements

- [ ] Add more languages (French, Spanish, Italian)
- [ ] Implement pluralization for counts
- [ ] Add date/time localization
- [ ] Implement currency formatting
- [ ] Add RTL language support (Arabic, Hebrew)
- [ ] Create translation management workflow
- [ ] Add professional translation service integration

---

**Need Help?** Check the official documentation:
- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
