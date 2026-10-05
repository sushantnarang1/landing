"use client";
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    companySize: '',
    areaOfInterest: '',
    message: '',
    agreement: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 border border-neutral-200 bg-white text-center rounded-sm animate-in fade-in zoom-in duration-300">
        <div className="text-accent-green text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold mb-2">Thanks. Your message has been sent.</h3>
        <p className="text-neutral-500">We'll review your enquiry and get back to you shortly.</p>
      </div >
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Name</label>
          <input 
            type="text" required 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm focus:border-accent-orange outline-none transition-colors"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div >
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Company</label>
          <input 
            type="text" required 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm focus:border-accent-orange outline-none transition-colors"
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
        </div >
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Work Email</label>
          <input 
            type="email" required 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm focus:border-accent-orange outline-none transition-colors"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div >
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Phone (Optional)</label>
          <input 
            type="tel" 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm focus:border-accent-orange outline-none transition-colors"
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div >
      </div >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Company Size</label>
          <select 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm focus:border-accent-orange outline-none transition-colors"
            onChange={(e) => setFormData({...formData, companySize: e.target.value})}
          >
            <option value="">Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div >
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Area of Interest</label>
          <select 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm focus:border-accent-orange outline-none transition-colors"
            onChange={(e) => setFormData({...formData, areaOfInterest: e.target.value})}
          >
            <option value="">Select interest</option>
            <option value="NarangOS Early Access">NarangOS Early Access</option>
            <option value="Infrastructure Assessment">Infrastructure Assessment</option>
            <option value="Platform Engineering">Platform Engineering</option>
            <option value="Kubernetes">Kubernetes</option>
            <option value="Cloud Architecture">Cloud Architecture</option>
            <option value="Observability">Observability</option>
            <option value="Network Visibility">Network Visibility</option>
            <option value="Terraform / Infrastructure Automation">Terraform / Infrastructure Automation</option>
            <option value="AI Infrastructure">AI Infrastructure</option>
            <option value="Enterprise Discussion">Enterprise Discussion</option>
            <option value="Other">Other</option>
          </select>
        </div >
      </div >

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Message</label>
        <textarea 
          rows={5} required 
          className="w-full p-3 border border-neutral-200 bg-white rounded-sm focus:border-accent-orange outline-none transition-colors"
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div >

      <div className="flex items-start gap-3">
        <input 
          type="checkbox" required 
          className="mt-1 w-4 h-4 accent-accent-orange" 
          onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
        />
        <span className="text-xs text-neutral-500 leading-relaxed">
          I understand that I should not submit passwords, credentials, API keys, or sensitive infrastructure configuration through this form.
        </span>
      </div >

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-xs font-medium border border-red-100 rounded-sm">
          {error}
        </div >
      )}

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full py-4 bg-bg-dark text-text-inverse font-bold rounded-sm hover:bg-neutral-800 transition-all disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  );
};

export default ContactForm;
