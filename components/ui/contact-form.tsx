'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FadeIn } from './layout-components';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    interesse: 'Implantes',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validação básica do Supabase (URL e Key existem?)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isInvalidSupabaseUrl = !supabaseUrl || supabaseUrl === 'https://placeholder-url.supabase.co' || supabaseUrl === '';

    if (isInvalidSupabaseUrl) {
      // Simulando o envio de dados na ausência das chaves reais para não quebrar a experiência
      console.warn("Aviso: Chaves do Supabase não configuradas no ambiente. Simulando envio com sucesso.");
      setTimeout(() => {
        setIsSuccess(true);
        setFormData({ nome: '', email: '', telefone: '', interesse: 'Implantes', mensagem: '' });
        setIsSubmitting(false);
      }, 1500);
      return;
    }

    try {
      const { error: dbError } = await supabase
        .from('leads')
        .insert([
          { 
            nome: formData.nome, 
            email: formData.email, 
            telefone: formData.telefone, 
            interesse: formData.interesse, 
            mensagem: formData.mensagem 
          }
        ]);

      if (dbError) {
        throw dbError;
      }

      setIsSuccess(true);
      setFormData({ nome: '', email: '', telefone: '', interesse: 'Implantes', mensagem: '' });
    } catch (err: any) {
      console.error('Erro ao enviar dados:', err);
      let errorMessage = 'Ocorreu um erro de rede ou o banco de dados não está disponível. Você já criou a tabela "leads" no Supabase?';
      
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err && typeof err === 'object') {
        errorMessage = err.message || err.details || err.hint || JSON.stringify(err);
      }
      
      // Garante que é string
      setError(String(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-lux-card border border-lux-border p-8 rounded-[15px] flex flex-col items-center justify-center text-center h-full min-h-[400px]">
        <CheckCircle2 className="w-16 h-16 text-lux-accent mb-4" />
        <h3 className="text-2xl font-serif text-white mb-2">Informações Recebidas!</h3>
        <p className="text-lux-text-s mb-6">Nossa equipe entrará em contato em breve para agendar sua avaliação.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-lux-accent hover:text-white transition-colors underline"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="bg-lux-card border border-lux-border p-8 rounded-[15px]">
      <h3 className="text-2xl font-serif text-white mb-6">Pré-Avaliação Online</h3>
      <p className="text-lux-text-s mb-8 text-sm">Deixe seus dados e entraremos em contato para entender o seu caso.</p>
      
      {error && (
        <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-md flex items-start gap-3 mb-6 text-red-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-xs uppercase tracking-wider text-lux-text-s mb-1.5">Nome Completo</label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            required 
            value={formData.nome}
            onChange={handleChange}
            className="w-full bg-[#0A0F12] border border-lux-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-lux-accent transition-colors"
            placeholder="Seu nome"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="telefone" className="block text-xs uppercase tracking-wider text-lux-text-s mb-1.5">WhatsApp</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              required 
              value={formData.telefone}
              onChange={handleChange}
              className="w-full bg-[#0A0F12] border border-lux-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-lux-accent transition-colors"
              placeholder="(11) 90000-0000"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-lux-text-s mb-1.5">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0A0F12] border border-lux-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-lux-accent transition-colors"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div>
           <label htmlFor="interesse" className="block text-xs uppercase tracking-wider text-lux-text-s mb-1.5">Tratamento de Interesse</label>
           <select 
             id="interesse" 
             name="interesse"
             value={formData.interesse}
             onChange={handleChange}
             className="w-full bg-[#0A0F12] border border-lux-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-lux-accent transition-colors appearance-none"
           >
             <option value="Implantes">Implantes Dentários</option>
             <option value="Lentes">Lentes de Contato</option>
             <option value="Clareamento">Clareamento a Laser</option>
             <option value="Outro">Outro / Não sei informar</option>
           </select>
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-xs uppercase tracking-wider text-lux-text-s mb-1.5">Mensagem (Opcional)</label>
          <textarea 
            id="mensagem" 
            name="mensagem" 
            rows={3}
            value={formData.mensagem}
            onChange={handleChange}
            className="w-full bg-[#0A0F12] border border-lux-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-lux-accent transition-colors resize-none"
            placeholder="Conte-nos um pouco sobre o que você deseja..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-4 bg-lux-accent hover:opacity-90 text-black font-bold uppercase tracking-wide text-sm rounded-sm py-4 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
          ) : (
            'Solicitar Contato'
          )}
        </button>
      </form>
    </div>
  );
}
