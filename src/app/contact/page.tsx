import React from 'react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-warm pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">Let's talk<br />infrastructure.</h1>
          <p className="text-xl text-neutral-500 leading-relaxed mb-12">
            Whether you're looking for early access to NarangOS or need expert help 
            scaling your platform engineering, we're ready to assist.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0 text-xl">📧</div>
              <div>
                <h4 className="font-bold text-text-primary">Direct Email</h4>
                <p className="text-sm text-neutral-500">sushantnarang@narangconsulting.com</p>
              </div >
            </div >
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0 text-xl">🏢</div>
              <div>
                <h4 className="font-bold text-text-primary">Consulting</h4>
                <p className="text-sm text-neutral-500">Enterprise-grade platform architecture</p>
              </div >
            </div >
          </div >
        </div >

        <div className="bg-white p-8 border border-neutral-200 rounded-sm shadow-sm">
          <ContactForm />
        </div >
      </div >
    </div >
  );
}
