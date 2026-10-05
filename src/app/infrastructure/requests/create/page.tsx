"use client";
import React, { useState, Suspense } from 'react';
import { INFRASTRUCTURE_CATALOG } from '@/types/infrastructure/catalog';
import { useRouter, useSearchParams } from 'next/navigation';

function CreateRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');
  
  const template = INFRASTRUCTURE_CATALOG.find(t => t.id === templateId);
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!template) {
    return <div className="p-8 text-neutral-500">Template not found.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting request:", { templateId, formData });
    router.push(`/infrastructure/requests/view/${Math.floor(Math.random() * 10000)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Environment</label>
          <select 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm"
            onChange={(e) => setFormData({...formData, environment: e.target.value})}
            required
          >
            <option value="">Select Environment</option>
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div >
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Region</label>
          <select 
            className="w-full p-3 border border-neutral-200 bg-white rounded-sm"
            onChange={(e) => setFormData({...formData, region: e.target.value})}
            required
          >
            <option value="">Select Region</option>
            <option value="eastus">East US</option>
            <option value="westus">West US</option>
            <option value="northeurope">North Europe</option>
          </select>
        </div >
      </div >

      <div className="space-y-6 p-6 border border-neutral-200 bg-neutral-50 rounded-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Resource Configuration</h3>
        {template.requiredInputs.map((input) => (
          <div key={input.id} className="space-y-2">
            <label className="text-sm font-medium text-text-primary">{input.label}</label>
            {input.type === 'select' ? (
              <select 
                className="w-full p-3 border border-neutral-200 bg-white rounded-sm"
                onChange={(e) => setFormData({...formData, [input.id]: e.target.value})}
                defaultValue={input.defaultValue}
                required={input.required}
              >
                {input.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : input.type === 'boolean' ? (
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-accent-orange" 
                  onChange={(e) => setFormData({...formData, [input.id]: e.target.checked})}
                  defaultChecked={input.defaultValue === 'true'}
                  required={input.required}
                />
                <span className="text-sm text-neutral-600">Enable {input.label}</span>
              </div >
            ) : (
              <input 
                type="text" 
                className="w-full p-3 border border-neutral-200 bg-white rounded-sm"
                onChange={(e) => setFormData({...formData, [input.id]: e.target.value})}
                defaultValue={input.defaultValue}
                required={input.required}
              />
            )}
          </div >
        ))}
      </div >

      <div className="flex justify-end gap-4">
        <button type="button" className="px-6 py-3 text-sm font-medium text-neutral-500 hover:text-text-primary">Cancel</button>
        <button type="submit" className="bg-bg-dark text-text-inverse px-8 py-3 rounded-sm font-bold hover:bg-neutral-800 transition-all">
          Review Infrastructure
        </button>
      </div >
    </form>
  );
}

export default function CreateRequestPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Create Resource</h1>
        <p className="text-neutral-500">Requesting a resource in the infrastructure layer.</p>
      </div >
      <Suspense fallback={<div className="p-8 text-neutral-400 animate-pulse">Loading configuration...</div>}>
        <CreateRequestForm />
      </Suspense>
    </div >
  );
}
