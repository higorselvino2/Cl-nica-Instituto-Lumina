'use client';

import { useState, useEffect } from 'react';
import { supabase, hasValidSupabaseEnv } from '@/lib/supabase';
import { User, Phone, Mail, FileText, Settings, Play, LogOut, Loader2, Plus, Edit, Trash2, AlertTriangle, RefreshCw, MessageSquare } from 'lucide-react';
import {
  checkPasswordAction, fetchLeadsDataAction, deleteLeadAction,
  fetchPatientsDataAction, deletePatientAction, 
  updatePatientAction, createPatientAction
} from './actions';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  date: string;
  appointment_date?: string | null;
}

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  interesse: string;
  mensagem: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'patients' | 'leads'>('patients');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agentPhone, setAgentPhone] = useState("");
  const [agentActivating, setAgentActivating] = useState(false);

  // CRUD states
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Partial<Patient>>({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');
  
  // Filter state
  const [filterAppointment, setFilterAppointment] = useState<'all' | 'today' | 'with' | 'without'>('all');
  const [sortName, setSortName] = useState<'none' | 'asc' | 'desc'>('none');

  const formatForInput = (isoString?: string | null) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setTimeout(() => {
        setIsAuthenticated(true);
        fetchData();
      }, 0);
    }
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await checkPasswordAction(password);
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      sessionStorage.setItem('admin_pass', password);
      fetchData(password);
    } catch (err: any) {
      setError(err.message || 'Senha incorreta.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_pass');
    setPassword('');
  };

  const handleActivateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentPhone) return;
    
    const cleanPhone = agentPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert("Número de telefone inválido.");
      return;
    }

    setAgentActivating(true);
    try {
      await fetch(`https://webhook.higorselvino.art/webhook/reativar?telefone=${cleanPhone}`);
      alert(`Agente ativado com sucesso para o número ${cleanPhone}!`);
      setShowAgentModal(false);
      setAgentPhone("");
    } catch (err) {
      alert("Erro ao ativar o agente. Tente novamente.");
    } finally {
      setAgentActivating(false);
    }
  };

  async function fetchData(overridePassword?: string) {
    setLoading(true);
    setCrudError('');
    const pass = overridePassword || password || sessionStorage.getItem('admin_pass') || '';
    
    try {
      await checkPasswordAction(pass);
    } catch (err) {
       setError('Sessão expirada ou senha incorreta.');
       setIsAuthenticated(false);
       setLoading(false);
       return;
    }

    try {
      if (activeTab === 'patients') {
        const data = await fetchPatientsDataAction(pass);
        setPatients(data || []);
      } else {
        const data = await fetchLeadsDataAction(pass);
        setLeads(data || []);
      }
    } catch (err: any) {
      console.error('Erro ao buscar dados', err);
      if (err.message?.includes('RLS') || err.message?.includes('row-level security')) {
         setCrudError('Acesso negado pelo Supabase. O "Row Level Security (RLS)" está ativo para esta tabela. Acesse seu painel do Supabase > Authentication > Policies, e crie uma política (policy) pública ou desligue o RLS para que possamos ler os dados.');
      } else {
         setCrudError('Erro ao carregar dados. ' + (err.message || 'Verifique as credenciais do Supabase.'));
      }
    } finally {
      setLoading(false);
    }
  }

  const savePatient = async () => {
    if (activeTab !== 'patients') return; // Apenas patients suportam a edição no momento pelo form antigo
    setSaveLoading(true);
    setCrudError('');
    setCrudSuccess('');
    
    try {
      const pass = password || sessionStorage.getItem('admin_pass') || '';
      if (isEditing && currentPatient.id) {
        await updatePatientAction(pass, currentPatient.id, {
          name: currentPatient.name,
          phone: currentPatient.phone,
          email: currentPatient.email,
          notes: currentPatient.notes,
          appointment_date: currentPatient.appointment_date || null
        });
        setCrudSuccess('Paciente atualizado com sucesso!');
      } else {
        await createPatientAction(pass, {
          name: currentPatient.name,
          phone: currentPatient.phone,
          email: currentPatient.email,
          notes: currentPatient.notes,
          appointment_date: currentPatient.appointment_date || null
        });
        setCrudSuccess('Paciente criado com sucesso!');
      }
      setIsEditing(false);
      setIsCreating(false);
      setCurrentPatient({});
      fetchData();
      setTimeout(() => setCrudSuccess(''), 3000);
    } catch (err: any) {
      if (err.message?.includes('RLS') || err.message?.includes('row-level security')) {
        setCrudError('Você precisa desativar o RLS ou criar uma Policy no Supabase para permitir salvar dados!');
      } else {
        setCrudError('Erro ao salvar paciente. Detalhes: ' + err.message);
      }
    } finally {
      setSaveLoading(false);
    }
  };

  const deletePatient = async (id: string) => {
    setCrudError('');
    setCrudSuccess('');
    try {
      const pass = password || sessionStorage.getItem('admin_pass') || '';
      await deletePatientAction(pass, id);
      setCrudSuccess('Paciente excluído com sucesso!');
      fetchData();
      setTimeout(() => setCrudSuccess(''), 3000);
    } catch (err: any) {
      setCrudError('Erro ao deletar paciente: ' + (err.message || ''));
    }
  };
  
  const deleteLead = async (id: string) => {
    setCrudError('');
    setCrudSuccess('');
    try {
      const pass = password || sessionStorage.getItem('admin_pass') || '';
      await deleteLeadAction(pass, id);
      setCrudSuccess('Lead excluído com sucesso!');
      fetchData();
      setTimeout(() => setCrudSuccess(''), 3000);
    } catch (err: any) {
      setCrudError('Erro ao deletar lead: ' + (err.message || ''));
    }
  };

  let filteredPatients = patients.filter(p => {
    if (filterAppointment === 'all') return true;
    if (filterAppointment === 'with') return !!p.appointment_date;
    if (filterAppointment === 'without') return !p.appointment_date;
    if (filterAppointment === 'today') {
      if (!p.appointment_date) return false;
      const today = new Date();
      const ptDate = new Date(p.appointment_date);
      return today.getFullYear() === ptDate.getFullYear() &&
             today.getMonth() === ptDate.getMonth() &&
             today.getDate() === ptDate.getDate();
    }
    return true;
  });

  if (sortName === 'asc') {
    filteredPatients.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } else if (sortName === 'desc') {
    filteredPatients.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
  }
  
  let sortedLeads = [...leads];
  if (sortName === 'asc') {
    sortedLeads.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
  } else if (sortName === 'desc') {
    sortedLeads.sort((a, b) => (b.nome || '').localeCompare(a.nome || ''));
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f12]">
        <div className="bg-lux-card p-8 rounded-[20px] border border-lux-border max-w-sm w-full mx-4 shadow-2xl">
          <div className="flex justify-center mb-6">
            <Settings className="w-12 h-12 text-lux-accent opacity-50" />
          </div>
          <h1 className="text-2xl font-serif text-white text-center mb-6">Acesso Restrito</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Insira a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A2228] border border-lux-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-lux-accent transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-lux-accent hover:bg-lux-accent/90 text-black font-bold uppercase tracking-wide text-sm rounded-md py-3 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f12] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-lux-card p-6 border border-lux-border rounded-[20px]">
          <div>
            <h1 className="text-3xl font-serif text-lux-accent flex items-center gap-3">
              <Settings className="w-8 h-8" />
              Painel Administrativo
            </h1>
            <p className="text-lux-text-s mt-1 text-sm font-light">Gestão de contatos e ferramentas de automação</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowAgentModal(true)}
              className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-lux-accent text-black px-5 py-2.5 rounded-md font-medium text-sm hover:bg-lux-accent/90 transition-colors shadow-[0_0_15px_rgba(197,160,89,0.3)] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)]"
            >
              <Play fill="currentColor" className="w-4 h-4" /> Ativar Agente
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 text-lux-text-s hover:text-white transition-colors text-sm border border-lux-border px-4 py-2.5 rounded-md hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </header>

        {/* Agent Activation Modal */}
        {showAgentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#1A2228] p-8 rounded-[20px] border border-lux-border w-full max-w-md shadow-2xl relative">
              <h3 className="text-2xl font-serif text-white mb-2">Reativar Agente AI</h3>
              <p className="text-lux-text-s text-sm mb-6">Insira o número do telefone com DDD para reativar o agente de IA WhatsApp.</p>
              
              <form onSubmit={handleActivateAgent} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lux-text-s mb-2">Telefone (com DDD)</label>
                  <input
                    type="text"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    placeholder="Ex: 5511999999999"
                    required
                    className="w-full bg-[#0a0f12] border border-lux-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-lux-accent transition-colors"
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAgentModal(false)}
                    className="flex-1 border border-lux-border text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-white/5 transition-colors"
                    disabled={agentActivating}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={agentActivating}
                    className="flex-1 bg-lux-accent text-black px-4 py-3 rounded-md text-sm font-medium hover:bg-lux-accent/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {agentActivating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play fill="currentColor" className="w-4 h-4" />
                    )}
                    {agentActivating ? 'Ativando...' : 'Reativar Agente'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Supabase Config Warning */}
        {!hasValidSupabaseEnv() && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-[20px] flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-yellow-500 font-medium text-lg mb-2">Credenciais do Supabase não configuradas!</h3>
              <p className="text-lux-text-s text-sm mb-4">
                As variáveis de ambiente do Supabase não foram detectadas. Por isso o painel não está conectando com seu banco de dados. Você precisa configurar isso no painel do AI Studio.
              </p>
              <ul className="list-disc list-inside text-sm text-lux-text-s space-y-2">
                <li>Vá no menu do <strong>AI Studio</strong> (geralmente uma ícone de engrenagem/configurações).</li>
                <li>Habilite as chaves (env) <code>NEXT_PUBLIC_SUPABASE_URL</code> e <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.</li>
                <li>Cole nelas a URL e a Anon Key do seu projeto Supabase.</li>
                <li>Recarregue a página (ou reinicie o servidor de desenvolvimento).</li>
              </ul>
            </div>
          </div>
        )}
                 {/* Tabs */}
        <div className="flex bg-lux-card border border-lux-border rounded-[15px] p-1 w-full max-w-sm">
          <button
            onClick={() => setActiveTab('patients')}
            className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-[10px] text-sm font-medium transition-all ${
              activeTab === 'patients'
                ? 'bg-lux-accent text-black shadow-sm'
                : 'text-lux-text-s hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-[10px] text-sm font-medium transition-all ${
              activeTab === 'leads'
                ? 'bg-lux-accent text-black shadow-sm'
                : 'text-lux-text-s hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            Site
          </button>
        </div>

        {/* Patients CRUD */}
        <section className="bg-lux-card border border-lux-border rounded-[20px] p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-lux-border pb-6">
            <div>
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <User className="w-5 h-5 text-lux-accent" />
                {activeTab === 'patients' ? 'Pacientes via WhatsApp' : 'Leads via Site'}
              </h2>
              <p className="text-lux-text-s text-sm font-light mt-1">
                {activeTab === 'patients' ? 'Gerencie os contatos originados pelo WhatsApp' : 'Contatos captados pelo formulário do site'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-end mt-4 sm:mt-0">
              {!isCreating && !isEditing && (
                <button
                  onClick={() => fetchData()}
                  disabled={loading}
                  className="bg-[#1A2228] border border-lux-border text-xs text-white rounded-md px-3 py-2 flex items-center gap-2 hover:border-lux-accent hover:text-lux-accent transition-colors disabled:opacity-50"
                  title="Atualizar Dados"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              )}
              {!isCreating && !isEditing && (
                <select
                  value={sortName}
                  onChange={(e) => setSortName(e.target.value as any)}
                  className="bg-[#1A2228] border border-lux-border text-xs text-white rounded-md px-3 py-2 outline-none focus:border-lux-accent"
                >
                  <option value="none">Ordenação: Padrão</option>
                  <option value="asc">Nome: A-Z</option>
                  <option value="desc">Nome: Z-A</option>
                </select>
              )}
              {!isCreating && !isEditing && activeTab === 'patients' && (
                <select
                  value={filterAppointment}
                  onChange={(e) => setFilterAppointment(e.target.value as any)}
                  className="bg-[#1A2228] border border-lux-border text-xs text-white rounded-md px-3 py-2 outline-none focus:border-lux-accent"
                >
                  <option value="all">Filtro: Todos</option>
                  <option value="today">Agendamento hoje</option>
                  <option value="with">Com agendamento</option>
                  <option value="without">Sem agendamento</option>
                </select>
              )}
              {!isCreating && !isEditing && activeTab === 'patients' && (
                <button
                  onClick={() => {
                    setIsCreating(true);
                    setCurrentPatient({}); // Clear form
                    setCrudError('');
                  }}
                  className="bg-transparent border border-lux-accent text-lux-accent hover:bg-lux-accent hover:text-black font-medium text-sm rounded-md px-4 py-2 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Novo Paciente
                </button>
              )}
            </div>
          </div>
          
          {crudError && (
             <div className="mb-6 p-4 rounded-md bg-red-500/20 text-red-400 border border-red-500/30 text-sm">
               {crudError}
             </div>
          )}
          {crudSuccess && (
             <div className="mb-6 p-4 rounded-md bg-green-500/20 text-green-400 border border-green-500/30 text-sm">
               {crudSuccess}
             </div>
          )}

          {/* Form (Create/Edit) */}
          {(isCreating || isEditing) && activeTab === 'patients' && (
            <div className="bg-[#1A2228] p-6 rounded-[15px] border border-lux-border mb-8">
              <h3 className="text-lg font-serif text-white mb-6">
                {isCreating ? 'Adicionar Novo Paciente' : 'Editar Paciente'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs uppercase text-lux-text-s mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={currentPatient.name || ''}
                    onChange={(e) => setCurrentPatient({...currentPatient, name: e.target.value})}
                    className="w-full bg-[#0a0f12] border border-lux-border rounded-md px-4 py-2 text-white focus:outline-none focus:border-lux-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-lux-text-s mb-1">Telefone (Whatsapp)</label>
                  <input
                    type="text"
                    value={currentPatient.phone || ''}
                    onChange={(e) => setCurrentPatient({...currentPatient, phone: e.target.value})}
                    className="w-full bg-[#0a0f12] border border-lux-border rounded-md px-4 py-2 text-white focus:outline-none focus:border-lux-accent"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs uppercase text-lux-text-s mb-1">E-mail (opcional)</label>
                  <input
                    type="email"
                    value={currentPatient.email || ''}
                    onChange={(e) => setCurrentPatient({...currentPatient, email: e.target.value})}
                    className="w-full bg-[#0a0f12] border border-lux-border rounded-md px-4 py-2 text-white focus:outline-none focus:border-lux-accent"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs uppercase text-lux-text-s mb-1">Data/Hora Agendamento (opcional)</label>
                  <input
                    type="datetime-local"
                    value={formatForInput(currentPatient.appointment_date)}
                    onChange={(e) => setCurrentPatient({...currentPatient, appointment_date: e.target.value ? new Date(e.target.value).toISOString() : null})}
                    className="w-full bg-[#0a0f12] border border-lux-border rounded-md px-4 py-2 text-white focus:outline-none focus:border-lux-accent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase text-lux-text-s mb-1">Observações do Atendimento</label>
                  <textarea
                    value={currentPatient.notes || ''}
                    onChange={(e) => setCurrentPatient({...currentPatient, notes: e.target.value})}
                    rows={3}
                    className="w-full bg-[#0a0f12] border border-lux-border rounded-md px-4 py-2 text-white focus:outline-none focus:border-lux-accent"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-3 justify-end border-t border-lux-border pt-4">
                <button
                  onClick={() => { setIsCreating(false); setIsEditing(false); }}
                  className="px-4 py-2 text-sm text-lux-text-s hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={savePatient}
                  disabled={saveLoading}
                  className="bg-lux-accent hover:bg-lux-accent/90 text-black font-medium text-sm rounded-md px-6 py-2 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {saveLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saveLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          )}

          {/* List */}
          {loading && !isCreating && !isEditing ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 text-lux-accent animate-spin" />
            </div>
          ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-lux-border text-xs uppercase tracking-wider text-lux-text-s">
                      <th className="py-4 px-4 font-medium">Nome</th>
                      <th className="py-4 px-4 font-medium">Contato</th>
                      {activeTab === 'patients' && <th className="py-4 px-4 font-medium">Agendamento</th>}
                      {activeTab === 'leads' && <th className="py-4 px-4 font-medium">Procedimento</th>}
                      {activeTab === 'leads' && <th className="py-4 px-4 font-medium">Mensagem</th>}
                      <th className="py-4 px-4 font-medium">Data Cadastro</th>
                      <th className="py-4 px-4 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'patients' ? (
                      filteredPatients.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-lux-text-s font-light">
                            Nenhum paciente encontrado.
                            <div className="mt-4 p-4 border border-lux-border rounded-md bg-[#1A2228] text-sm max-w-2xl mx-auto text-left">
                              <strong>Aviso Importante sobre o Supabase:</strong><br/>
                              <p className="mt-2 text-lux-text-s">
                                Para que este banco de dados funcione, você precisa criar uma tabela chamada <code>patients</code> no seu projeto do Supabase com as seguintes colunas:
                              </p>
                              <ul className="list-disc list-inside mt-2 text-lux-text-s font-mono text-xs space-y-1">
                                <li>id (uuid, Primary Key)</li>
                                <li>name (text)</li>
                                <li>phone (text)</li>
                                <li>email (text, nullable)</li>
                                <li>notes (text, nullable)</li>
                                <li>appointment_date (timestamptz, nullable)</li>
                                <li>date (timestamptz)</li>
                              </ul>
                              <p className="mt-2 text-yellow-500/80">
                                <b>Importante:</b> Para a edição e visualização de datas funcionarem corretamente, adicione ou renomeie a coluna de agendamentos para <code>appointment_date</code> do tipo <code>timestamp with time zone</code> (ou <code>timestamptz</code>) no Supabase. Se a tabela não existir, os cadastros vão dar erro!
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredPatients.map((p) => (
                          <tr key={p.id} className="border-b border-lux-border/50 hover:bg-white/5 transition-colors group">
                            <td className="py-4 px-4 font-medium">{p.name || 'Sem nome'}</td>
                            <td className="py-4 px-4 text-sm text-lux-text-s tracking-wide">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-lux-accent/50"/>
                                {p.phone ? (
                                  <a 
                                    href={`https://wa.me/${p.phone.replace(/\D/g, '')}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="hover:text-lux-accent transition-colors hover:underline"
                                  >
                                    {p.phone}
                                  </a>
                                ) : '-'}
                              </div>
                              {p.email && <div className="flex items-center gap-2 mt-1"><Mail className="w-3 h-3 text-lux-accent/50"/> <span className="opacity-70">{p.email}</span></div>}
                            </td>
                            <td className="py-4 px-4 text-xs text-lux-text-s">
                              {p.appointment_date ? (
                                <span className="bg-lux-accent/20 text-lux-accent px-2 py-1 rounded-md border border-lux-accent/30 whitespace-nowrap">
                                  {new Date(p.appointment_date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                                </span>
                              ) : (
                                <span className="opacity-50">Sem agenda</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-lux-text-s">
                              {p.date ? new Date(p.date).toLocaleDateString() : '-'}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => { setCurrentPatient(p); setIsEditing(true); setIsCreating(false); }}
                                  className="p-2 border border-lux-border rounded-md hover:bg-white/10 hover:text-white transition-colors text-lux-text-s"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => deletePatient(p.id)}
                                  className="p-2 border border-lux-border rounded-md hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors text-lux-text-s"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )
                    ) : (
                      sortedLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-lux-text-s font-light">
                            Nenhum lead encontrado.
                            <div className="mt-4 p-4 border border-lux-border rounded-md bg-[#1A2228] text-sm max-w-2xl mx-auto text-left">
                              <strong>Aviso sobre o Supabase (Leads):</strong><br/>
                              <p className="mt-2 text-lux-text-s">
                                Como você está com o <strong>RLS ativo</strong> na tabela <code>leads</code> e não quer desativá-lo, o painel precisa da chave <code>service_role</code> para ler os dados.
                              </p>
                              <ul className="list-disc list-inside mt-2 text-lux-text-s space-y-1">
                                <li>Vá no painel do Supabase &gt; Project Settings &gt; API</li>
                                <li>Copie a chave <strong>service_role</strong> (secret)</li>
                                <li>No AI Studio, clique no ícone da engrenagem (Settings)</li>
                                <li>Adicione uma nova Secret chamada <strong>SUPABASE_SERVICE_ROLE_KEY</strong> e cole a chave lá.</li>
                                <li>Recarregue a página para ver os Leads aparecerem!</li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        sortedLeads.map((l) => (
                          <tr key={l.id} className="border-b border-lux-border/50 hover:bg-white/5 transition-colors group">
                            <td className="py-4 px-4 font-medium">{l.nome || 'Sem nome'}</td>
                            <td className="py-4 px-4 text-sm text-lux-text-s tracking-wide">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-lux-accent/50"/>
                                {l.telefone ? (
                                  <a 
                                    href={`https://wa.me/${l.telefone.replace(/\D/g, '')}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="hover:text-lux-accent transition-colors hover:underline"
                                  >
                                    {l.telefone}
                                  </a>
                                ) : '-'}
                              </div>
                              {l.email && <div className="flex items-center gap-2 mt-1"><Mail className="w-3 h-3 text-lux-accent/50"/> <span className="opacity-70">{l.email}</span></div>}
                            </td>
                            <td className="py-4 px-4 text-xs text-lux-text-s">
                              <span className="bg-white/5 text-white/80 px-2 py-1 rounded border border-white/10">
                                {l.interesse || '-'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-xs text-lux-text-s max-w-[200px] truncate" title={l.mensagem}>
                              {l.mensagem || '-'}
                            </td>
                            <td className="py-4 px-4 text-xs text-lux-text-s">
                              {l.created_at ? new Date(l.created_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => deleteLead(l.id)}
                                  className="p-2 border border-lux-border rounded-md hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors text-lux-text-s"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
             </div>
          )}
        </section>

      </div>
    </div>
  );
}
