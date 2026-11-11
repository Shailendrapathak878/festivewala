import React, { useMemo, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../../components/common/SEOHead';
import { Mail, Send, Clock, ShieldCheck, Copy, Check } from 'lucide-react';

const CONTACT_EMAIL = 'Pandit979212@gmail.com';
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INQUIRY_CATEGORY_LABELS: Record<string, { en: string; hi: string }> = {
  general: { en: 'General Feedback / Inquiries', hi: 'सामान्य सुझाव व प्रश्न' },
  editorial: { en: 'Cultural Content & Festival Lore', hi: 'सांस्कृतिक सामग्री व पंचांग' },
  technical: { en: 'Greeting Studio / Technical Help', hi: 'ग्रीटिंग स्टूडियो या डाउनलोड समस्या' },
  privacy: { en: 'Privacy / Data Inquiries', hi: 'डेटा व गोपनीयता संबंधी प्रश्न' },
};

function buildDraftEmailParts(formData: ContactFormData, isHindi: boolean) {
  const category = INQUIRY_CATEGORY_LABELS[formData.subject] || INQUIRY_CATEGORY_LABELS.general;
  const categoryLabel = isHindi ? category.hi : category.en;
  const trimmedName = formData.name.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedMessage = formData.message.trim();

  const subject = `[FestiveWala Contact] ${categoryLabel}${trimmedName ? ` — ${trimmedName}` : ''}`;
  const body = [
    `Name: ${trimmedName}`,
    `Reply-To Email: ${trimmedEmail}`,
    `Category: ${categoryLabel}`,
    '',
    'Message:',
    trimmedMessage,
  ].join('\n');

  const mailtoUrl = `${CONTACT_MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { categoryLabel, subject, body, mailtoUrl };
}

export const ContactPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const [draftReady, setDraftReady] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const seoTitle = isHindi
    ? 'संपर्क करें — फेस्टिववाला | सहायता, सुझाव व संपादकीय प्रश्न'
    : 'Contact Us — FestiveWala | Support, Inquiries & Editorial Feedback';

  const seoDescription = isHindi
    ? 'फेस्टिववाला संपादकीय टीम से संपर्क करें। सुझाव, प्रतिक्रिया और सांस्कृतिक सहयोग के लिए हमसे जुड़ें।'
    : 'Get in touch with the FestiveWala team. Reach out for editorial inquiries, technical support, cultural contributions, or feedback.';

  const draftEmail = useMemo(() => buildDraftEmailParts(formData, isHindi), [formData, isHindi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setCopiedDraft(false);
    setDraftReady(true);

    // Open the user's default mail client with pre-filled draft details
    const mailLink = document.createElement('a');
    mailLink.href = draftEmail.mailtoUrl;
    mailLink.click();
  };

  const handleCopyDraft = async () => {
    const clipboardText = `To: ${CONTACT_EMAIL}\nSubject: ${draftEmail.subject}\n\n${draftEmail.body}`;
    try {
      await navigator.clipboard.writeText(clipboardText);
      setCopiedDraft(true);
    } catch {
      setCopiedDraft(false);
    }
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl="https://festivewala.in/contact/"
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-semibold uppercase tracking-wider">
            <Mail size={14} className="text-brand-gold-dark" />
            <span>{isHindi ? 'हमसे संपर्क करें' : 'Get in Touch'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-deep">
            {isHindi ? 'हम आपकी सहायता के लिए सदैव तत्पर हैं' : 'We Welcome Your Thoughts & Feedback'}
          </h1>
          <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
            {isHindi
              ? 'त्योहार से जुड़ी सामग्री, ग्रीटिंग कार्ड्स या तकनीकी सहायता के लिए सीधे संपर्क करें।'
              : 'Whether you have a suggestion for festival guides, need help with Greeting Studio, or want to report an issue, reach out directly.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-brand-deep text-brand-gold flex items-center justify-center mb-3">
              <Mail size={18} />
            </div>
            <h3 className="font-serif text-sm font-bold text-brand-deep">
              {isHindi ? 'सामान्य व संपादकीय पूछताछ' : 'Editorial & General'}
            </h3>
            <p className="text-xs text-brand-dark/70 font-sans">
              {isHindi ? 'सामग्री सुधार व सहयोग:' : 'For content feedback and contributions:'}
            </p>
            <a
              href={CONTACT_MAILTO}
              data-testid="contact-email-editorial"
              aria-label={
                isHindi
                  ? `सामान्य व संपादकीय संपर्क के लिए ${CONTACT_EMAIL} पर ईमेल भेजें`
                  : `Send email for general and editorial inquiries to ${CONTACT_EMAIL}`
              }
              className="text-xs font-mono text-brand-royal font-bold inline-block pt-1 break-all hover:text-brand-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal/50 focus-visible:underline rounded-sm transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-brand-deep text-brand-gold flex items-center justify-center mb-3">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-serif text-sm font-bold text-brand-deep">
              {isHindi ? 'गोपनीयता व तकनीकी सहायता' : 'Privacy & Technical Support'}
            </h3>
            <p className="text-xs text-brand-dark/70 font-sans">
              {isHindi ? 'तकनीकी समस्याओं के लिए:' : 'For privacy queries and bug reports:'}
            </p>
            <a
              href={CONTACT_MAILTO}
              data-testid="contact-email-support"
              aria-label={
                isHindi
                  ? `गोपनीयता व तकनीकी सहायता के लिए ${CONTACT_EMAIL} पर ईमेल भेजें`
                  : `Send email for privacy and technical support to ${CONTACT_EMAIL}`
              }
              className="text-xs font-mono text-brand-royal font-bold inline-block pt-1 break-all hover:text-brand-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal/50 focus-visible:underline rounded-sm transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-brand-deep text-brand-gold flex items-center justify-center mb-3">
              <Clock size={18} />
            </div>
            <h3 className="font-serif text-sm font-bold text-brand-deep">
              {isHindi ? 'प्रतिक्रिया समय' : 'Response Timeline'}
            </h3>
            <p className="text-xs text-brand-dark/70 font-sans">
              {isHindi ? 'ईमेल द्वारा उत्तर:' : 'Replies via email:'}
            </p>
            <span
              data-testid="contact-response-timeline"
              className="text-xs font-medium text-brand-royal bg-brand-light px-2.5 py-1 rounded-md inline-block mt-1"
            >
              {isHindi ? 'हम यथाशीघ्र उत्तर देने का प्रयास करते हैं।' : 'We aim to respond as soon as possible.'}
            </span>
          </div>
        </div>

        {/* Message Form */}
        <div className="rounded-3xl bg-white border border-brand-gold/30 shadow-md p-6 sm:p-10">
          {draftReady ? (
            <div data-testid="contact-fallback-panel" className="text-center py-6 sm:py-8 space-y-5">
              <div className="w-14 h-14 rounded-full bg-brand-light text-brand-royal border border-brand-gold/40 flex items-center justify-center mx-auto">
                <Mail size={28} />
              </div>
              <h3 data-testid="contact-fallback-heading" className="font-serif text-xl sm:text-2xl font-bold text-brand-deep">
                {isHindi ? 'संदेश भेजने के लिए अपना ईमेल ऐप खोलें' : 'Open Your Email App to Send'}
              </h3>
              <p data-testid="contact-fallback-notice" className="text-xs sm:text-sm text-brand-dark/75 font-sans max-w-lg mx-auto leading-relaxed">
                {isHindi
                  ? `इस वेबसाइट पर सीधे सर्वर द्वारा फॉर्म सबमिशन सक्रिय नहीं है, इसलिए आपका संदेश अभी स्वतः नहीं भेजा गया है। कृपया नीचे क्लिक करके अपने ईमेल ऐप से ${CONTACT_EMAIL} को यह तैयार ड्राफ्ट भेजें।`
                  : `This static site does not have an automated backend mail server, so your message has not been sent yet. Click below to open your default email app with your pre-filled draft to ${CONTACT_EMAIL}, or copy the details to send manually.`}
              </p>

              <div className="max-w-lg mx-auto p-4 rounded-2xl bg-brand-ivory/70 border border-brand-gold/25 text-left text-xs font-sans space-y-1.5 text-brand-dark/85">
                <div>
                  <span className="font-bold text-brand-deep">{isHindi ? 'प्राप्तकर्ता: ' : 'To: '}</span>
                  <span className="font-mono text-brand-royal">{CONTACT_EMAIL}</span>
                </div>
                <div>
                  <span className="font-bold text-brand-deep">{isHindi ? 'विषय: ' : 'Subject: '}</span>
                  <span>{draftEmail.subject}</span>
                </div>
                <div className="pt-1 border-t border-brand-gold/20 whitespace-pre-wrap break-words text-brand-dark/75">
                  {formData.message.trim()}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={draftEmail.mailtoUrl}
                  data-testid="contact-mailto-fallback"
                  aria-label={
                    isHindi
                      ? `${CONTACT_EMAIL} को पहले से भरा ईमेल ड्राफ्ट खोलें`
                      : `Open pre-filled email draft to ${CONTACT_EMAIL}`
                  }
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-deep hover:bg-brand-royal text-brand-gold font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal/60"
                >
                  <Mail size={15} />
                  <span>{isHindi ? 'ईमेल ड्राफ्ट खोलें' : 'Open Email Draft'}</span>
                </a>

                <button
                  type="button"
                  data-testid="contact-copy-draft"
                  onClick={handleCopyDraft}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-brand-light hover:bg-brand-gold/20 text-brand-deep border border-brand-gold/30 font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal/50"
                >
                  {copiedDraft ? <Check size={15} /> : <Copy size={15} />}
                  <span>
                    {copiedDraft
                      ? isHindi
                        ? 'ड्राफ्ट कॉपी हो गया'
                        : 'Draft Copied'
                      : isHindi
                        ? 'ड्राफ्ट कॉपी करें'
                        : 'Copy Draft Details'}
                  </span>
                </button>

                <button
                  type="button"
                  data-testid="contact-edit-draft"
                  onClick={() => setDraftReady(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-brand-gold/30 text-brand-royal hover:text-brand-deep hover:bg-brand-ivory font-semibold text-xs sm:text-sm transition-all"
                >
                  {isHindi ? 'संदेश संपादित करें' : 'Edit Message'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-brand-deep mb-1.5">
                    {isHindi ? 'आपका नाम *' : 'Your Name *'}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isHindi ? 'उदा: राहुल शर्मा' : 'e.g. Rahul Sharma'}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-brand-ivory/50 border border-brand-gold/30 text-brand-dark focus:outline-none focus:border-brand-royal"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-brand-deep mb-1.5">
                    {isHindi ? 'ईमेल पता *' : 'Email Address *'}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isHindi ? 'उदा: rahul@example.com' : 'e.g. rahul@example.com'}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-brand-ivory/50 border border-brand-gold/30 text-brand-dark focus:outline-none focus:border-brand-royal"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold text-brand-deep mb-1.5">
                  {isHindi ? 'विषय चुनें' : 'Inquiry Category'}
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-brand-ivory/50 border border-brand-gold/30 text-brand-dark focus:outline-none focus:border-brand-royal"
                >
                  <option value="general">{isHindi ? 'सामान्य सुझाव व प्रश्न' : 'General Feedback / Inquiries'}</option>
                  <option value="editorial">{isHindi ? 'सांस्कृतिक सामग्री व पंचांग' : 'Cultural Content & Festival Lore'}</option>
                  <option value="technical">{isHindi ? 'ग्रीटिंग स्टूडियो या डाउनलोड समस्या' : 'Greeting Studio / Technical Help'}</option>
                  <option value="privacy">{isHindi ? 'डेटा व गोपनीयता संबंधी प्रश्न' : 'Privacy / Data Inquiries'}</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-brand-deep mb-1.5">
                  {isHindi ? 'आपका संदेश *' : 'Your Message *'}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isHindi
                      ? 'कृपया अपना संदेश, सुझाव या प्रश्न यहां विस्तार से लिखें...'
                      : 'Share your detailed feedback, questions, or bug reports here...'
                  }
                  className="w-full p-4 rounded-xl text-xs sm:text-sm bg-brand-ivory/50 border border-brand-gold/30 text-brand-dark focus:outline-none focus:border-brand-royal resize-y"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] text-brand-dark/60 font-sans block">
                    {isHindi
                      ? '🔒 हम आपकी गोपनीयता का सम्मान करते हैं। आपकी जानकारी कभी साझा नहीं की जाती।'
                      : '🔒 We respect your privacy. Your contact details are never shared with third parties.'}
                  </span>
                  <span className="text-[11px] text-brand-royal/80 font-sans block">
                    {isHindi
                      ? `नोट: यह वेबसाइट सीधे सर्वर से ईमेल नहीं भेजती — सबमिट करने पर ${CONTACT_EMAIL} के लिए आपका ईमेल ऐप ड्राफ्ट खुलेगा।`
                      : `Note: No backend mail server is connected; submitting prepares a draft in your email app to ${CONTACT_EMAIL}.`}
                  </span>
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit-btn"
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-brand-deep hover:bg-brand-royal text-brand-gold font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Send size={15} />
                  <span>{isHindi ? 'ईमेल ड्राफ्ट खोलें' : 'Open Email Draft'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
