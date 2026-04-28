import Image from 'next/image';
import { Navbar } from '@/components/ui/navbar';
import { FloatingWhatsApp } from '@/components/ui/floating-whatsapp';
import { Accordion } from '@/components/ui/accordion';
import { Section, FadeIn } from '@/components/ui/layout-components';
import { ContactForm } from '@/components/ui/contact-form';
import { Check, Star, ShieldCheck, Clock, MapPin, Phone, Mail } from 'lucide-react';

export default function Home() {
  const whatsappUrl = "https://wa.me/5511973940501?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20exclusiva%20no%20Instituto%20Lumina.";

  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(197,160,89,0.1)_0%,transparent_70%)] -z-10 rounded-full blur-[40px] pointer-events-none"></div>
      <Navbar />
      <FloatingWhatsApp />

      {/* 2. Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1920&auto=format&fit=crop"
            alt="Consultório odontológico de alto padrão"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-lux-bg-grad/90 to-lux-bg/80" /> {/* Dark Overlay */}
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-7xl mt-20">
          <FadeIn className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-sm bg-lux-card backdrop-blur-md border border-lux-border">
              <span className="text-lux-accent text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <Star className="w-3 h-3 fill-lux-accent" /> Referência em Reabilitação Oral
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6">
              A Excelência que o seu <span className="text-lux-accent font-style-italic">Sorriso Exige</span>.
            </h1>
            <p className="text-lg md:text-xl text-lux-text-s mb-10 max-w-2xl font-light leading-relaxed">
              Tratamentos de alto padrão em Implantes e Lentes de Contato. Procedimentos ágeis, sem dor e com tecnologia de escaneamento 3D em Santo André.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                id="btn-hero-whatsapp"
                data-track="lead-click"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-lux-accent hover:opacity-90 text-black font-bold uppercase tracking-wide text-sm rounded-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgba(197,160,89,0.3)] hover:-translate-y-1"
              >
                Agendar Avaliação
              </a>
              <a
                href="#tratamentos"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/30 text-white font-medium uppercase tracking-wide text-sm rounded-sm transition-all duration-300 hover:bg-white/10"
              >
                Conhecer Especialidades
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Social Proof Rápido */}
      <section className="border-y border-lux-border bg-lux-card py-10 mt-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 transition-all duration-500">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-lux-accent" />
              <span className="font-serif font-medium text-lux-text-p tracking-wide">Certificação Internacional</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-lux-accent" />
              <span className="font-serif font-medium text-lux-text-p tracking-wide">+15k Sorrisos Criados</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-lux-accent" />
              <span className="font-serif font-medium text-lux-text-p tracking-wide">120+ Tecnologias 3D</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. O Problema vs. A Solução */}
      <Section className="bg-transparent">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Nós sabemos que a cadeira do dentista pode ser <span className="text-lux-accent italic">assustadora.</span>
            </h2>
            <div className="space-y-6 text-lux-text-s text-lg leading-relaxed">
              <p>
                Muitos pacientes adiam o sonho de voltar a sorrir por traumas passados, medo de dor ou aversão às moldagens antigas (massinhas).
              </p>
              <p>
                No <strong className="text-lux-text-p font-medium">Instituto Lumina</strong>, redesenhamos toda a experiência. Substituímos o desconforto por <strong>tecnologia 3D de precisão</strong> e a ansiedade pela <strong>sedação consciente</strong>.
              </p>
            </div>
            <ul className="mt-8 space-y-4">
              {[
                "Procedimentos conduzidos com sedação",
                "Escaneamento intraoral sem massas na boca",
                "Ambiente acolhedor focado no seu relaxamento"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lux-text-p font-medium">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-lux-border flex items-center justify-center text-lux-accent">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.2} className="relative aspect-square md:aspect-[4/5] rounded-[20px] overflow-hidden shadow-2xl border border-lux-border">
            <Image
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop"
              alt="Paciente sorrindo com conforto no consultório"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </FadeIn>
        </div>
      </Section>

      {/* 5. Nossos Tratamentos (Serviços) */}
      <Section id="tratamentos" className="bg-transparent border-t border-lux-border border-dashed mt-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-lux-accent font-bold tracking-widest uppercase text-xs">Exclusividade e Precisão</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mt-4 mb-6">Nossas Especialidades</h2>
          <p className="text-lg text-lux-text-s">
            Focamos naquilo que fazemos de melhor: transformar sua estética dental e devolver sua função mastigatória com excelência.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Implantes de Carga Imediata",
              desc: "Recupere a segurança para mastigar em tempo recorde. Usamos implantes premium para resultados previsíveis e definitivos.",
              imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Lentes de Contato Dental",
              desc: "Sorriso perfeitamente alinhado, branco e com aspecto natural. Facetas ultrafinas desenhadas digitalmente para o seu rosto.",
              imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=400&auto=format&fit=crop"
            },
            {
              title: "Clareamento a Laser",
              desc: "Resultados visíveis e seguros já na primeira sessão. Sensibilidade minimizada com nosso protocolo exclusivo de proteção.",
              imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
            }
          ].map((service, i) => (
            <FadeIn key={i} delay={i * 0.1} className="group relative bg-lux-card p-8 md:p-10 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(197,160,89,0.1)] hover:-translate-y-2 border border-lux-border rounded-[15px]">
              <div className="w-16 h-16 bg-transparent border border-lux-border rounded-full flex items-center justify-center mb-6 text-lux-accent group-hover:scale-110 transition-transform duration-500">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-lux-accent mb-4">{service.title}</h3>
              <p className="text-lux-text-s leading-relaxed mb-8">
                {service.desc}
              </p>
              <div className="h-[200px] relative rounded-md overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
                 <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    priority
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 6. Infraestrutura e Tecnologia */}
      <Section id="infraestrutura" className="bg-transparent overflow-hidden border-y border-lux-border mt-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 md:order-1 relative aspect-[4/3] w-full">
            <div className="absolute inset-0 bg-lux-accent/10 translate-x-4 translate-y-4 rounded-[20px]"></div>
            <Image
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=800&auto=format&fit=crop"
              alt="Tecnologia Odontológica Avançada"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-[20px] border border-lux-border relative z-10"
              referrerPolicy="no-referrer"
            />
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 md:order-2">
            <span className="text-lux-accent font-bold tracking-widest uppercase text-xs">O Padrão Lumina</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-4 mb-6">
              Odontologia Guiada por <span className="italic text-lux-accent">Tecnologia</span>.
            </h2>
            <p className="text-lg text-lux-text-s mb-8 leading-relaxed font-light">
              Nossa clínica foi projetada para que você não sinta que está em um consultório tradicional. Desde a iluminação calculada até o aroma do ambiente, tudo inspira tranquilidade.
            </p>
            <div className="space-y-6">
              <div className="border-l-2 border-lux-accent pl-6">
                <h4 className="text-xl font-medium text-white mb-2">Escaneamento Intraoral 3D</h4>
                <p className="text-lux-text-s text-sm">Eliminamos as antigas massas de moldagem. O escaneamento digital é rápido, indolor e extremamente preciso.</p>
              </div>
              <div className="border-l-2 border-lux-border hover:border-lux-accent transition-colors pl-6">
                <h4 className="text-xl font-medium text-white mb-2">Sedação Consciente</h4>
                <p className="text-lux-text-s text-sm">Durma durante o procedimento e acorde com o seu novo sorriso. Acompanhamento integral da nossa equipe.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Nova Seção: Galeria de Ambiente */}
      <section className="py-20 bg-[#0a0f12]">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-lux-accent font-bold tracking-widest uppercase text-xs">Exclusividade e Conforto</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-4 mb-6">Ambiente Lumina</h2>
            <p className="text-lg text-lux-text-s">Uma clínica desenhada com sofisticação em cada detalhe, proporcionando uma experiência de bem-estar do início ao fim.</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FadeIn delay={0.1} className="relative aspect-square rounded-[15px] overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" 
                alt="Recepção" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <h4 className="text-white font-serif text-xl border-b border-lux-accent/50 pb-2">Recepção Acolhedora</h4>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative aspect-square rounded-[15px] overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" 
                alt="Sala de Atendimento" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <h4 className="text-white font-serif text-xl border-b border-lux-accent/50 pb-2">Salas Equipadas</h4>
              </div>
            </FadeIn>
            <FadeIn delay={0.3} className="relative aspect-square rounded-[15px] overflow-hidden group md:hidden lg:block">
              <Image 
                src="https://images.unsplash.com/photo-1581056771107-157ce7bcbce8?q=80&w=600&auto=format&fit=crop" 
                alt="Tecnologia" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <h4 className="text-white font-serif text-xl border-b border-lux-accent/50 pb-2">Estúdio Fotográfico 3D</h4>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. Corpo Clínico / Autoridade */}
      <Section id="equipe" className="bg-transparent mt-12 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[2fr_3fr] gap-12 items-center bg-lux-card p-8 md:p-12 shadow-xl border border-lux-border rounded-[20px]">
            <FadeIn>
              <div className="relative aspect-[3/4] w-full rounded-[15px] overflow-hidden border border-lux-border">
                <Image
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"
                  alt="Diretor Técnico"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl font-serif text-white mb-2">Dr. Higor Caco</h2>
              <p className="text-lux-accent font-medium mb-6 uppercase tracking-wider text-sm">Diretor Técnico & Especialista</p>
              <div className="prose prose-invert text-lux-text-s mb-8">
                <p>
                  Com mais de uma década de dedicação exclusiva à estética avançada e reabilitação oral com implantes, minha missão é devolver não apenas a função mastigatória, mas a autoestima de pacientes que já haviam desistido de sorrir.
                </p>
                <p className="mt-4">
                  No Instituto Lumina, construímos uma filosofia onde o requinte técnico se apoia no atendimento profundamente humanoizado.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-lux-text-s border-t border-lux-border pt-6">
                <span>CRO-SP 12345</span>
                <span className="w-1.5 h-1.5 rounded-full bg-lux-border"></span>
                <span>Membro da SBOE</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* 8. Depoimentos/Provas Sociais */}
      <Section id="depoimentos" className="bg-transparent border-t border-lux-border">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Histórias Reais</h2>
          <p className="text-lg text-lux-text-s">Pacientes que transformaram sua qualidade de vida e recuperaram a confiança.</p>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Roberta F.", text: "Eu tinha pânico de dentista. A sedação consciente do Instituto Lumina foi um divisor de águas. Fiz meus implantes de forma incrivelmente tranquila.", age: 45 },
            { name: "Carlos M.", text: "O escaneamento 3D é sensacional, nada daquelas massas ruins. Minhas Lentes de Contato ficaram prontas rápido e o resultado me rejuvenesceu 10 anos.", age: 52 },
            { name: "Ana P.", text: "Atendimento impecável desde a recepção. A clínica parece um spa. Recomendo para todos que buscam excelência e não querem sentir dor.", age: 38 }
          ].map((testimonial, i) => (
             <FadeIn key={i} delay={i * 0.1} className="bg-lux-card p-8 rounded-[15px] border border-lux-border flex flex-col justify-between transition-all hover:-translate-y-1">
                <div>
                  <div className="flex gap-1 mb-6 text-lux-accent">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lux-text-p italic leading-relaxed mb-6 font-serif">&quot;{testimonial.text}&quot;</p>
                </div>
                <div className="flex items-center gap-4 border-t border-lux-border pt-6">
                  <div className="w-10 h-10 rounded-full bg-[#1A2228] border border-lux-border flex items-center justify-center font-serif text-lux-accent font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">{testimonial.name}</h5>
                    <span className="text-xs text-lux-text-s">{testimonial.age} anos, paciente</span>
                  </div>
                </div>
             </FadeIn>
          ))}
        </div>
      </Section>

      {/* 9. FAQ (Quebra de Objeções) */}
      <Section className="bg-transparent border-t border-lux-border mt-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Dúvidas Frequentes</h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <Accordion items={[
              {
                question: "O procedimento de implante dói?",
                answer: "Não. Utilizamos técnicas avançadas de anestesia e a opção de sedação consciente, onde o paciente relaxa completamente durante todo o procedimento, sem sentir dor ou desconforto."
              },
              {
                question: "O que é o escaneamento 3D?",
                answer: "É uma tecnologia moderna que substitui as antigas 'massinhas' de molde. Uma câmera captura rapidamente imagens precisas da sua boca, garantindo mais conforto e permitindo a confecção de dentes perfeitos."
              },
              {
                question: "As lentes de contato desgastam muito os dentes?",
                answer: "Nosso foco é a Odontologia Minimamente Invasiva. Utilizamos tecnologia para planejar lentes ultrafinas que, na grande maioria dos casos, requerem nenhum ou pouquíssimo desgaste da estrutura dental."
              },
              {
                question: "Quanto tempo dura o tratamento?",
                answer: "Graças à nossa infraestrutura tecnológica, muitos procedimentos, como a aplicação de implantes de carga imediata ou lentes de contato, podem ser realizados com muito mais agilidade do que em clínicas convencionais, muitas vezes em poucos dias."
              }
            ]} />
          </FadeIn>
          
          <FadeIn delay={0.4} className="mt-12 text-center">
            <p className="text-lux-text-s mb-4">Ainda tem dúvidas?</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lux-accent font-bold hover:opacity-80 border-b border-lux-accent/30 transition-colors"
            >
              Fale diretamente com nossa equipe
            </a>
          </FadeIn>
        </div>
      </Section>

      {/* 10. Agende sua Avaliação */}
      <Section id="contato" className="bg-transparent border-t border-lux-border mt-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-lux-accent font-bold tracking-widest uppercase text-xs">Atendimento Exclusivo</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-4 mb-6">Agende sua Avaliação</h2>
            <p className="text-lg text-lux-text-s max-w-2xl mx-auto font-light leading-relaxed">
              Dê o primeiro passo para o sorriso que você merece. Nossa equipe de especialistas fará um diagnóstico 3D completo da sua saúde bucal, desenhando um plano de tratamento sob medida para os seus objetivos e biotipo facial.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto w-full">
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* 11. Onde Estamos (Localização Separada) */}
      <Section className="bg-transparent border-t border-lux-border mt-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-lux-accent font-bold tracking-widest uppercase text-xs">Acesso Descomplicado</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-4 mb-6">Nossa Localização</h2>
          </FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-stretch">
            <FadeIn>
               <div className="bg-lux-card border border-lux-border p-8 rounded-[20px] h-full flex flex-col justify-center">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 text-lux-text-s">
                      <MapPin className="w-6 h-6 text-lux-accent shrink-0" />
                      <div>
                        <strong className="block text-white mb-2 text-lg">Endereço</strong>
                        <span className="text-sm leading-relaxed font-light block">
                          Rua das Figueiras, 1500<br/>
                          Bairro Jardim, Santo André - SP<br/>
                          CEP: 09080-300
                        </span>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-lux-accent text-sm font-medium hover:underline">Abrir no Google Maps</a>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-lux-border"></div>
                    <div className="flex items-start gap-4 text-lux-text-s">
                      <Clock className="w-6 h-6 text-lux-accent shrink-0" />
                      <div>
                        <strong className="block text-white mb-2 text-lg">Disponibilidade</strong>
                        <span className="text-sm leading-relaxed font-light block">
                          Segunda a Sexta: 08:00 às 19:00<br/>
                          Sábado: 08:00 às 13:00
                        </span>
                        <span className="inline-block mt-4 text-lux-accent text-xs uppercase tracking-wider border border-lux-accent/30 px-3 py-1 rounded-full">Estacionamento com Valet</span>
                      </div>
                    </div>
                  </div>
               </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="h-[400px] md:h-full min-h-[400px] rounded-[20px] overflow-hidden border border-lux-border relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.5106199852233!2d-46.53982992383187!3d-23.655845067272847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce428a1ea572b5%3A0xcfe04dbf55694c92!2sR.%20das%20Figueiras%2C%201500%20-%20Campestre%2C%20Santo%20Andr%C3%A9%20-%20SP%2C%2009080-300!5e0!3m2!1spt-BR!2sbr!4v1714234567890!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '100%' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de localização Instituto Lumina"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 absolute inset-0 object-cover"
                ></iframe>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* 11. Footer Premium */}
      <footer className="bg-lux-card text-lux-text-s py-16 md:py-24 border-t border-lux-border mt-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-1">
               <span className="font-serif font-medium tracking-tight text-2xl text-lux-accent block mb-6 relative">
                INSTITUTO LUMINA<a href="/admin" className="text-white hover:text-lux-accent transition-colors duration-1000">.</a>
              </span>
              <p className="text-sm leading-relaxed mb-6 font-light">
                Excelência em estética dental e reabilitação oral. Um novo conceito de Odontologia premium focado no seu conforto.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Site</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#tratamentos" className="hover:text-lux-accent transition-colors">Nossos Tratamentos</a></li>
                <li><a href="#infraestrutura" className="hover:text-lux-accent transition-colors">Infraestrutura Alta Tecnologia</a></li>
                <li><a href="#equipe" className="hover:text-lux-accent transition-colors">Corpo Clínico</a></li>
                <li><a href="#depoimentos" className="hover:text-lux-accent transition-colors">Pacientes</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Contato & Localização</h4>
              <ul className="space-y-4 text-sm font-light mb-8">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lux-accent shrink-0 mt-0.5" />
                  <span>Rua das Figueiras, 1500<br/>Bairro Jardim, Santo André - SP<br/>09080-300</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-lux-accent shrink-0" />
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    +55 11 97394-0501
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-lux-accent shrink-0" />
                  <a href="mailto:contato@institutolumina.com.br" className="hover:text-white transition-colors">
                    contato@institutolumina.com.br
                  </a>
                </li>
              </ul>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-lux-accent hover:opacity-90 text-black font-medium text-sm rounded-sm transition-colors"
              >
                Agendar Consulta
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-lux-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light">
            <p>
              &copy; 2026 Instituto Lumina Odontologia. Todos os direitos reservados.<br />
              Responsável Técnico: Dr. Higor Caco - CRO-SP 12345
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
