import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../../components/common/SEOHead';
import { Mail, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl="https://festivewala.in/contact"
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
              ? 'त्योहार से जुड़ी सामग्री, ग्रीटिंग कार्ड्स या तकनीकी सहायता के लिए हमारी टीम से संपर्क करें।'
              : 'Whether you have a suggestion for festival guides, need help with Greeting Studio, or want to report an issue, we are here to assist.'}
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
            <span className="text-xs font-mono text-brand-royal font-bold block pt-1">
              contact@festivewala.in
            </span>
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
            <span className="text-xs font-mono text-brand-royal font-bold block pt-1">
              support@festivewala.in
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-brand-deep text-brand-gold flex items-center justify-center mb-3">
              <Clock size={18} />
            </div>
            <h3 className="font-serif text-sm font-bold text-brand-deep">
              {isHindi ? 'प्रतिक्रिया समय' : 'Response Timeline'}
            </h3>
            <p className="text-xs text-brand-dark/70 font-sans">
              {isHindi ? 'कार्यदिवसों में उत्तर:' : 'Standard reply timeframe:'}
            </p>
            <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
              {isHindi ? '२४ से ४८ घंटे' : '24 to 48 Hours'}
            </span>
          </div>
        </div>

        {/* Message Form */}
        <div className="rounded-3xl bg-white border border-brand-gold/30 shadow-md p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-deep">
                {isHindi ? 'आपका संदेश प्राप्त हुआ!' : 'Thank You for Reaching Out!'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/70 font-sans max-w-md mx-auto">
                {isHindi
                  ? 'हमने आपका संदेश सहेज लिया है। हमारी टीम शीघ्र ही आपसे संपर्क करेगी।'
                  : 'Your message has been recorded. Our editorial and support team will review your note and respond promptly.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'general', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-brand-deep text-brand-gold font-bold text-xs"
              >
                {isHindi ? 'नया संदेश भेजें' : 'Send Another Message'}
              </button>
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
                <span className="text-[11px] text-brand-dark/60 font-sans">
                  {isHindi
                    ? '🔒 हम आपकी गोपनीयता का सम्मान करते हैं। आपकी जानकारी कभी साझा नहीं की जाती।'
                    : '🔒 We respect your privacy. Your contact details are never shared with third parties.'}
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-brand-deep hover:bg-brand-royal text-brand-gold font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>{isHindi ? 'संदेश भेजें' : 'Submit Message'}</span>
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
