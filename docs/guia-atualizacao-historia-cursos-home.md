# Guia de Atualização — Home, Nossa História e Páginas de Curso
**Faculdade Sofia — para uso com Claude Code**

---

## Como usar este guia

1. Coloque este arquivo em `docs/guia-atualizacao-historia-cursos-home.md` no seu repositório local e faça push para o GitHub.
2. No Claude Code, referencie com `@docs/guia-atualizacao-historia-cursos-home.md`.
3. Recomenda-se trabalhar **uma seção por vez** (ex: primeiro a Home, depois Nossa História, depois cada curso), revisando o resultado antes de seguir para a próxima, em vez de pedir tudo de uma vez.
4. Toda vez que este guia disser `<!-- TODO: ... -->`, é porque a informação real não está confirmada — **não preencher com dado inventado**. Deixar o marcador visível no código até a informação chegar.
5. Fontes usadas para este guia: formulários padrão oficiais dos cursos técnicos (2026), ementários e matrizes curriculares oficiais dos bacharelados, histórico institucional do ISI, e a Portaria MEC nº 821/2025.

---

## 0. Regras gerais válidas para todas as páginas abaixo

- **Nunca inventar número de anos de tradição.** O credenciamento MEC (Portaria nº 821) é de **29/10/2025**. A instituição não deve comunicar "X anos de tradição" enquanto isso não for definido oficialmente pela direção. Onde hoje existe um contador de anos, ele deve ser **removido**, não recalculado.
- **Nunca inventar estatística de empregabilidade, número de alunos formados, depoimentos ou parcerias com empresas/redes** (ex: "86% empregabilidade", "Mariana C.", "Camila Mendes", "rede D'Or", "Drogasil", "Pague Menos"). Essas seções devem ser removidas por completo nesta rodada — ficam de fora até que existam dados/depoimentos/parcerias reais para substituí-los. Não deixar espaço vazio nem placeholder visível ao usuário final; apenas remover a seção.
- **Footer institucional (rodapé, presente em todas as páginas):** o texto atual —
  > "A Faculdade do Trabalhador da Saúde. Formando profissionais de Enfermagem, Psicologia e cursos técnicos em saúde **há 20 anos**, no coração de Campinas."

  deve ser alterado para:
  > "A Faculdade do Trabalhador da Saúde. Formando profissionais de Enfermagem, Psicologia e cursos técnicos em saúde no coração de Campinas."

  (remover "há 20 anos" — não há base documental para esse número).
- **Vestibular Social**: manter a oferta "até 75%" (nunca como faixa "50 à 75%") em todas as páginas — isso já está correto no site atual e deve ser preservado.
- **Dados de benchmark/concorrentes**: os formulários padrão dos cursos técnicos trazem uma seção "Benchmark/Concorrentes" com preços e condições de outras instituições (Senac, Bentinho, CETEC etc.). Isso é material interno de marketing/precificação — **nunca publicar no site**, mesmo que apareça no mesmo documento das informações oficiais do curso.
- **Cores/identidade**: manter a paleta azul institucional (~#0D47A1–#1B5FAE) e dourado (#DCAB4F) já usada no site; não alterar o design visual, apenas o conteúdo e a estrutura de seções descritas aqui.

---

## 1. Home (`home.html`)

| # | Atual | Correção | Prioridade |
|---|---|---|---|
| 1.1 | Três contadores com valor `0`: "Alunos formados na Escola Técnica", "Anos de tradição em Ensino Técnico", "Empregabilidade dos formados" | Remover os três contadores por completo (não deixar em `0`, não inventar valor). Se a seção ficar vazia, remover a seção inteira do hero. | 🔴 Alta |
| 1.2 | Rodapé: "...cursos técnicos em saúde **há 20 anos**, no coração de Campinas." | Aplicar a regra da seção 0 (remover "há 20 anos"). | 🔴 Alta |
| 1.3 | Blocos "Serviços Especializados" (Oftalmologia, Psiquiatria, Clínica Geral, Endocrinologia, Nutrição, Cirurgia Vascular) com botão "Saiba mais" apontando para `#` (link morto) | Fora do escopo deste guia (pertence à Santa Sofia Clínica Escola, não aos cursos). Apenas **corrigir os links quebrados** `[Saiba mais](#)` para apontar para a página real correspondente, se existir, ou remover o botão se não houver página de destino. | 🟡 Média |
| 1.4 | Menu "ENSINO" já lista corretamente Técnicos, Graduação e Pós-Graduação | Manter como está — estrutura de navegação correta. | — |

---

## 2. Nossa História (`Home/HInstiEnsino.html`)

### Diagnóstico
A página atual é **inteiramente fabricada** e não corresponde à Faculdade Sofia: menciona fundação em "15 de março de 1987", cursos de "Pedagogia e Letras", campus em "São José dos Pinhais" (cidade do Paraná — a Sofia fica em Campinas/SP), "18 cursos de graduação", "mestrados e doutorado", "15 mil alumni" etc. Nada disso existe. Esse conteúdo deve ser **substituído por completo**, não editado ponto a ponto.

### Texto de substituição (usar exatamente este conteúdo, adaptando apenas a marcação HTML/CSS existente do tema)

```
[selo/tag] Credenciada pelo MEC — Portaria nº 821, de 29/10/2025

# Nossa História

## Uma trajetória que começa no cuidado com quem cuida

A Faculdade Sofia nasce da trajetória do Instituto de Saúde Integrada
(ISI), instituído em 2006 pelo Sindicato dos Empregados em
Estabelecimentos de Serviços de Saúde de Campinas e Região (SINSAÚDE),
com a missão de promover educação, cultura, pesquisa, ação social e
formação profissional voltadas aos trabalhadores da área da saúde e à
comunidade em geral.

Desde sua criação, o ISI se dedicou à qualificação de profissionais de
saúde por meio de cursos de formação inicial, qualificação profissional
e Educação Profissional Técnica de Nível Médio, consolidando-se como
referência regional na formação de técnicos em Enfermagem e Farmácia.

### Uma nova etapa institucional

Em 2024, o Instituto passou por uma reorganização institucional, com a
alteração de sua entidade mantenedora, que passou a ser a Sofia
Faculdade de Saúde Ltda. A unidade educacional adotou então a
denominação **ISI-SOFIA — A Faculdade do Trabalhador da Saúde**,
preservando sua identidade e seu compromisso histórico com a formação
de profissionais da área da saúde, ao mesmo tempo em que ampliou sua
atuação para o ensino superior.

### Credenciamento e ensino superior

Em 29 de outubro de 2025, a Faculdade Sofia foi credenciada pelo
Ministério da Educação por meio da Portaria nº 821 (D.O.U. de
30/10/2025), passando a oferecer os bacharelados em Enfermagem e em
Psicologia, além dos cursos técnicos em Enfermagem e Farmácia.

A instituição está localizada na Rua Barreto Leme, 1552, no Centro de
Campinas/SP, em um complexo historicamente ligado à Santa Casa de
Misericórdia de Campinas — ambiente que integra a rotina de ensino e
prática dos alunos à rede de saúde da região.

### Hoje

A Faculdade Sofia mantém o compromisso com uma educação transformadora,
baseada na integração entre ensino, prática profissional e
responsabilidade social, formando profissionais de Enfermagem,
Psicologia e das habilitações técnicas em Enfermagem e Farmácia para
atuar com ética, competência técnica e sensibilidade humana no cuidado
em saúde.
```

### Checklist de remoção obrigatória nesta página
- [ ] Remover toda a linha do tempo fabricada (1987 · 1995 · 2004 · 2012 · 2025 · hoje) e as imagens/legendas associadas a ela (ex: "Laboratório de inovação pedagógica da região, 2004", "Núcleo de Apoio Psicopedagógico 2012", "Campus atual — 120 mil m²")
- [ ] Remover a frase "Nesse contexto nasce, em agosto de 1860, a Santa Casa de Misericórdia de Campinas" **como se fosse a origem da Faculdade Sofia** — a Santa Casa é uma instituição parceira/vizinha, não a fundadora da Sofia. Se quiser manter a menção à Santa Casa, isso deve vir contextualizado como no texto de substituição acima (localização/parceria), nunca como ano de fundação da faculdade.
- [ ] Remover "40 anos de história em 2027" e qualquer contador de tempo similar
- [ ] Remover menção a cursos que a Sofia não oferece (Pedagogia, Letras, História, Matemática, Serviço Social, Arquitetura e Urbanismo, Ciência da Computação, pós stricto sensu, mestrado, doutorado)
- [ ] Aplicar a correção do rodapé (regra 0)

---

## 3. Novo formato unificado de página de curso

As 4 páginas de curso (2 técnicos + 2 bacharelados) devem seguir a mesma estrutura de seções abaixo. O conteúdo interno de cada seção muda por curso (dados reais de cada um, nas seções 4 a 7 deste guia), mas a **ordem, os títulos de seção e o tipo de bloco** devem ser os mesmos nas 4 páginas.

| Ordem | Seção | O que entra |
|---|---|---|
| 1 | **Hero** | Selo/tag contextual + H1 (Nome do curso + "SOFIA") + subtítulo de 1–2 linhas factual + faixa de dados rápidos (Duração · Carga horária · Modalidade · Local) + 2 CTAs ("Conhecer curso" âncora interna, "Processo seletivo" link externo) |
| 2 | **Sobre o curso** | Parágrafo de apresentação + lista de competências/perfil do egresso, baseados nos objetivos oficiais do curso |
| 3 | **Coordenação** | Nome, formação e 1–2 linhas de trajetória do coordenador — **somente se confirmado**. Se não houver essa informação disponível para o curso, deixar `<!-- TODO: coordenador -->` e não exibir a seção publicamente até ser preenchida |
| 4 | **Estrutura curricular** | Módulos (técnicos) ou eixos/semestres agrupados (bacharelados) com as disciplinas reais e a carga horária total oficial |
| 5 | **Metodologia e diferenciais** | Lista de metodologias e diferenciais **reais**, extraída dos documentos oficiais do curso (não frases genéricas de marketing) |
| 6 | **Estágio / Prática profissional** | Carga horária real de estágio/prática e onde ela ocorre |
| 7 | **Mercado de trabalho** | Faixa salarial oficial (quando existir no documento fonte) e áreas de atuação reais — sem inventar percentuais de empregabilidade ou número de vagas |
| 8 | **Infraestrutura** | Descrição factual da estrutura física/pedagógica já validada (laboratórios, biblioteca, plataforma digital) — sem números não confirmados |
| 9 | **Certificação e processo seletivo** | Órgãos certificadores reais (COREN, SISTEC/MEC, SED-SP, Diretoria de Ensino, conforme o caso) + forma de ingresso |
| 10 | **Vestibular Social (CTA final)** | Bloco já existente no site — manter como está, ajustando apenas o nome do curso na mensagem do WhatsApp |

---

## 4. Bacharelado em Enfermagem (`Cursos/BEnfermagem.html`)

A página atual já está estruturalmente próxima do formato acima e tem bom conteúdo real (metodologias ativas, parcerias de estágio, coordenação). Ajustes necessários:

| # | Atual | Correção | Prioridade |
|---|---|---|---|
| 4.1 | Subtítulo do hero diz "**4.392 horas**" | A carga horária total oficial da matriz curricular é **4.452 horas** (2.286h teóricas + 1.546h práticas + 420h de extensão, em 10 semestres) — **confirmado em `Matriz Enfermagem 2026.2.pdf`**, soma exata por semestre (380+440×7+496×2=4.452). Corrigir em todos os lugares da página onde a carga horária total aparece. | 🔴 Alta |
| 4.2 | Estágio Supervisionado citado como "880h" | Confirmado pela matriz: Estágio Supervisionado I (440h, 9º semestre) + Estágio Supervisionado II (440h, 10º semestre) = **880h**. Está correto, manter. | — |
| 4.3 | Reestruturar a página seguindo a ordem de seções da tabela da seção 3 deste guia (a maior parte do conteúdo já existe na página — é principalmente questão de reordenar e nomear as seções de forma consistente com os outros 3 cursos) | Ordem sugerida usando o conteúdo já existente: Hero → Sobre o programa (já existe) → Coordenação (mover o card "Coordenadora: Profa. Me. Marcia Cristina Aparecida Thomaz" para logo após "Sobre o programa", como bloco próprio) → Estrutura curricular ("Os Pilares da sua formação") → Metodologia e diferenciais ("Metodologias Ativas e Inovação Pedagógica") → Estágio ("Estágio Supervisionado 880h") → Mercado de trabalho ("Áreas de Atuação e Mercado Promissor") → Infraestrutura → Certificação e processo seletivo → Vestibular Social | 🟢 Baixa |
| 4.4 | Frase "Prédio histórico tombado" aparece como diferencial em 2 pontos da página | **Confirmado pela instituição (2026-07-15):** o tombamento é real. Manter a alegação "prédio histórico tombado" nos dois pontos da página. | ✅ Confirmado |

---

## 5. Bacharelado em Psicologia (`Cursos/BPsicologia.html`)

| # | Atual | Correção | Prioridade |
|---|---|---|---|
| 5.1 | Carga horária total "4.760h" | Confirmado pela matriz curricular oficial — **4.760h está correto** (soma exata por semestre: 374+374+514+452+464+500+536+510+530+506=4.760, `Matriz Psicologia 2026.2.pdf`), manter. | — |
| 5.2 | Estágios "800h + Extensão: 476h" | **Confirmado pela matriz oficial** — ambos os números estão corretos e podem ser publicados fechados. Estágios Supervisionados I a IV (Núcleo Básico) somam 100h cada = 400h; Estágios V a VIII (Núcleo Específico) também valem 100h cada **independente da ênfase escolhida** (A-Processos Clínicos / B-Prevenção e Promoção da Saúde / C-Investigação Científica são sempre 100h) = mais 400h. Total: **800h de estágio**. Carga horária de extensão soma **476h** ao longo do curso (soma da coluna "CH Extensão" nos 10 semestres). | — |
| 5.3 | Não há nenhuma seção de coordenação nesta página (diferente da de Enfermagem, que cita a coordenadora) | Adicionar seção "Coordenação" — **somente com dado confirmado**. Se ainda não houver nome definido, usar `<!-- TODO: coordenador Psicologia -->` e não publicar a seção vazia. | 🟡 Média |
| 5.4 | "66,6% Doutores \| 33,3% Mestres" do corpo docente | Confirmar se esse dado é atual (parece corresponder a uma equipe muito pequena — 2 de 3 professores). Se não for possível confirmar o número exato com a coordenação, remover a estatística e usar linguagem qualitativa: "corpo docente qualificado, com mestres e doutores atuando no curso". | 🟡 Média |
| 5.5 | Reestruturar seguindo a ordem da seção 3 | Conteúdo já existente na página mapeia bem: Hero → "Missão do Curso" (Sobre o curso) → Coordenação (nova, ver 5.3) → "Eixos Estruturantes da Formação" (Estrutura curricular) → "Ênfases Curriculares Avançadas" (pode ficar dentro de Estrutura curricular ou Metodologia) → Estágio (extrair de dentro do texto atual) → "Campos de Atuação Profissional" (Mercado de trabalho) → "Infraestrutura de ponta" → Processo seletivo → Vestibular Social | 🟢 Baixa |

---

## 6. Técnico em Enfermagem (`Cursos/TEnfermagem.html`)

### Diagnóstico
A página atual usa dados completamente diferentes dos oficiais: diz "18 meses", "1.200h + 400h de estágio", 3 módulos com nomes genéricos ("1º Módulo", "2º Módulo", "3º Módulo") e disciplinas que não batem com a matriz real. Também tem estatística fabricada (86% empregabilidade, +2.300 vagas, +1.200 alunos formados, 20 anos de tradição) e um depoimento fictício ("Mariana C."). Tudo isso deve ser reconstruído com os dados reais abaixo.

### Dados oficiais (fonte: Formulário Padrão — Curso Técnico em Enfermagem, atualizado 2026)

- **Duração:** 2 anos e meio (30 meses)
- **Carga horária total:** 1.840 horas (1.240h teóricas/práticas + 600h de estágio)
- **Modalidade:** Híbrido
- **Frequência mínima:** 75% nos módulos teórico-práticos e 100% no Estágio Supervisionado
- **Certificações intermediárias:** ao final do Módulo II, o aluno já tem direito à qualificação de **Auxiliar de Enfermagem**; ao final do Módulo III, ao diploma de **Técnico em Enfermagem**
- **Registro/validade:** Sistec (Sistema Nacional de Informações da Educação Profissional e Tecnológica), Diretoria de Ensino Campinas Leste, e registro profissional no COREN após conclusão
- **Coordenação:** Karina Diniz Tavares Medina — Bacharel em Enfermagem pela PUC-Campinas (2013); especialização em Enfermagem em Saúde Mental (360h, Faculdade Holística); mestrado em andamento em Saúde Coletiva (Faculdade São Leopoldo Mandic); experiência em serviços especializados de saúde mental, incluindo CAPS Infantojuvenil (2014–2016) e CAPS Adulto (2020–2022); atualmente coordenadora na Secretaria Municipal de Gestão e Desenvolvimento de Pessoas de Campinas — *confirmado em `Formulário Padrão - Curso Técnico em Enfermagem-atualizado 2026.pdf`*
- **Faixa salarial (2026):** entre R$ 2.800,00 (piso) e R$ 5.500,00 (teto), variando por região, segmento e experiência

### Estrutura curricular real (Matriz Curricular)

**Módulo I — Carga horária: 500h (160h teóricas + 80h práticas + 60h EaD + 200h estágio)**
- Eixo Enfermagem na Atenção à Saúde do Adulto: Assistência de Enfermagem nas Patologias Cardiovasculares, Respiratórias e Endócrinas · Assistência de Enfermagem nas Patologias Gastrointestinais, Urinárias e Neurológicas
- Eixo Saúde da Mulher, do Homem, da Criança e do Adolescente: Enfermagem na Saúde da Mulher e do Homem · Enfermagem na Saúde da Criança e do Adolescente
- Estágio Supervisionado (200h)

**Módulo II — Carga horária: 650h (240h teóricas + 120h práticas + 90h EaD + 200h estágio) — ao final, certificação de Auxiliar de Enfermagem**
- Eixo Enfermagem na Saúde Coletiva: Saúde Pública · Programas de Atenção à Saúde
- Eixo Enfermagem na Atenção Domiciliar: Atenção Domiciliar Infanto-Juvenil · Atenção Domiciliar do Adulto e do Idoso
- Eixo Enfermagem na Clínica Cirúrgica e Central de Materiais Estéreis (CME): Assistência de Enfermagem em Clínica Cirúrgica · Central de Material Estéril
- Estágio Supervisionado (200h)

**Módulo III — Carga horária: 690h (240h teóricas + 120h práticas + 90h EaD + 40h de projeto integrador + 200h estágio) — ao final, diploma de Técnico em Enfermagem**
- Eixo Assistência ao Paciente Crítico Adulto: Suporte Básico de Vida Adulto · Suporte Avançado de Vida Adulto
- Eixo Assistência ao Paciente Crítico Neo e Pediátrico: Suporte Básico de Vida Neonatal e Pediátrico · Suporte Avançado de Vida Neonatal e Pediátrico
- Eixo Enfermagem na Qualidade e Segurança do Paciente: Processos de Qualidade e Segurança do Paciente · Competências Digitais
- Projeto Integrador (40h) + Estágio Profissional Supervisionado (200h)

**Carga horária total do curso: 1.840h**

### Diferenciais reais do programa (usar estes, não os fabricados)
- Conteúdo com mais atividades práticas do que teóricas
- Currículo elaborado a partir das necessidades reais do mercado de trabalho da região
- Ensino em laboratórios de simulação realística e técnicas especiais que reproduzem situações reais de trabalho
- Corpo docente com experiência de mercado, promovendo discussão de casos reais
- Treinamento em simuladores e phantoms
- Laboratório de Informática com acesso à internet
- Biblioteca com acervo físico e área de estudo
- Ambiente Virtual de Aprendizagem (AVA), vídeos e seminários
- Estágio supervisionado em instituições parceiras reais

### Ações obrigatórias nesta página
- [ ] Substituir duração "18 meses" → **30 meses (2 anos e meio)**
- [ ] Substituir carga horária "1.200h + 400h estágio" → **1.840h (1.240h teórico-prático + 600h estágio)**
- [ ] Substituir os 3 módulos genéricos pela matriz curricular real acima
- [ ] Remover: "+1.200 Alunos formados", "20 anos de tradição", "94% empregabilidade", "+2.300 vagas abertas na região", "22% expansão anual" — nenhum desses números tem fonte confirmada
- [ ] Remover o depoimento fictício de "Mariana C."
- [ ] Adicionar seção de Coordenação com os dados reais de Karina Diniz Tavares Medina
- [ ] Adicionar faixa salarial real (R$ 2.800 a R$ 5.500 em 2026) na seção de Mercado de Trabalho, no lugar das estatísticas fabricadas
- [ ] Reestruturar a página seguindo a ordem de seções da tabela da seção 3

---

## 7. Técnico em Farmácia (`Cursos/TFarmacia.html`)

### Diagnóstico
Mesma situação do Técnico em Enfermagem: dados de duração/carga horária incorretos, módulos com nomes que não batem com a matriz oficial, estatísticas fabricadas (86% empregabilidade, +1.200 alunos, 20 anos de tradição), parcerias não confirmadas (Drogasil, São Paulo [drogaria], Pague Menos) e depoimento fictício ("Camila Mendes").

### Dados oficiais (fonte: Formulário Padrão — Curso Técnico em Farmácia, atualizado 2026)

- **Duração:** 2 anos (24 meses)
- **Carga horária total:** 1.600 horas (960h teóricas + 400h de prática profissional + 240h EaD)
- **Modalidade:** Híbrido
- **Frequência mínima:** 75% nos módulos teórico-práticos
- **Certificações intermediárias:** ao final dos Módulos I e II, qualificação de **Auxiliar de Farmácia**; ao final do Módulo III, **Diploma de Técnico de Nível Médio em Farmácia**, Eixo Tecnológico Ambiente e Saúde (exige apresentação do certificado de conclusão do Ensino Médio)
- **Registro/validade:** SED-SP (Secretaria Escolar Digital do Estado de São Paulo) e SISTEC/MEC
- **Coordenação:** Cristina Tanikawa — Farmácia e Bioquímica (UNIP), especialização em Fitoterapia; trajetória em UNICAMP, USP, Hospital Sírio-Libanês e Fundação André Tosello; atuação no CRF-SP (Vice Delegada Regional e Vice Coordenadora do GTT Plantas Medicinais e Fitoterápicos)
- **Faixa salarial (2026):** entre R$ 2.503,97 (piso) e R$ 4.421,04 (teto)
- **CBO:** 3251-15 — atua sob supervisão do farmacêutico

### Estrutura curricular real (Matriz Curricular)

**Módulo I — Carga horária: 545h (360h teóricas + 100h prática profissional + 85h EaD)**
- Eixo Gestão e Tecnologia: Competências Digitais · Educação Corporativa e Comportamental · Empreendedorismo e Inovação Sustentável
- Eixo Conhecimentos em Saúde Aplicados à Farmácia: Morfofisiologia Humana · Saúde Coletiva · Patologia
- Eixo Atendimento Farmacêutico: Atendimento em Farmácia · Legislação Farmacêutica

**Módulo II — Carga horária: 485h (305h teóricas + 100h prática profissional + 80h EaD) — ao final, junto com o Módulo I, certificação de Auxiliar de Farmácia**
- Eixo Gestão e Tecnologia: Marketing e Propaganda de Produtos Farmacêuticos
- Eixo Assistência Farmacêutica: Assistência Farmacêutica
- Eixo Técnicas Farmacêuticas: Biossegurança e Boas Práticas Farmacêuticas · Produção de Medicamentos (Controle e Garantia da Qualidade)
- Eixo Fundamentos Farmacológicos: Farmacologia · Tópicos Especiais em Farmácia

**Módulo III — Carga horária: 570h (295h teóricas + 200h prática profissional + 75h EaD) — ao final, Diploma de Técnico em Farmácia**
- Eixo Assistência Farmacêutica: Farmácia Hospitalar
- Eixo Manipulação de Medicamentos: Farmacotécnica · Cosmetologia
- Eixo Produtos Naturais: Homeopatia · Farmacobotânica · Fitoterapia e Produtos Naturais

**Carga horária total do curso: 1.600h** (960h teóricas + 400h de prática profissional distribuída ao longo do curso + 240h EaD)

### Diferenciais reais do programa (usar estes, não os fabricados)
- Conteúdo com muitas atividades práticas
- Currículo elaborado a partir das necessidades reais do mercado de trabalho
- Laboratórios de práticas e métodos especiais, reproduzindo situações reais de trabalho
- Corpo docente com experiência de mercado
- Treinamento em equipamentos e materiais didáticos reais
- Laboratório de Informática com acesso à internet
- Biblioteca com acervo físico específico
- Ambiente Virtual de Aprendizagem (AVA), vídeos, seminários e palestras
- Visitas técnicas monitoradas a instituições parceiras reais

### Ações obrigatórias nesta página
- [ ] Substituir duração — a página atual não fixa claramente a duração, mas os "1.200 horas" citados na seção "Informações importantes" estão incorretos → **24 meses / 1.600h (960h teóricas + 400h prática profissional + 240h EaD)**
- [ ] Substituir os 4 blocos de módulos ("Eixo Base", "Assistência e Dispensação", "Manipulação", "Estágios") pela matriz curricular real de 3 módulos acima
- [ ] Remover: "+1.200 Alunos formados", "+20 Anos de tradição", "86% Empregabilidade em até 6 meses", "30+ Laboratórios e parceiros de estágio", e a frase "Empregabilidade 86% — dados dos egressos 2024/2025. Salários iniciais de R$ 2.200 a R$ 3.500" — nenhum desses números tem fonte confirmada
- [ ] Remover o depoimento fictício de "Camila Mendes"
- [ ] Remover menções a parcerias não confirmadas: "Drogasil, São Paulo, Pague Menos e hospitais regionais", "Projeto Farmácia Solidária" (a menos que este projeto exista de fato e possa ser confirmado)
- [ ] Adicionar seção de Coordenação com os dados reais de Cristina Tanikawa
- [ ] Substituir faixa salarial fabricada pela real: **R$ 2.503,97 a R$ 4.421,04 (2026)**
- [ ] Reestruturar a página seguindo a ordem de seções da tabela da seção 3

---

## 8. Checklist final consolidado

### Home
- [ ] Remover contadores zerados
- [ ] Corrigir rodapé (remover "há 20 anos")
- [ ] Corrigir links `#` mortos em "Saiba mais"

### Nossa História
- [ ] Substituir texto integralmente pelo conteúdo da seção 2
- [ ] Remover linha do tempo fabricada e todas as imagens/legendas associadas
- [ ] Corrigir rodapé

### Bacharelado em Enfermagem
- [x] Corrigir carga horária total para 4.452h
- [x] Reestruturar seções na ordem padrão (coordenação em bloco próprio)
- [x] Tombamento confirmado — manter "prédio histórico tombado"
- [x] Corrigir rodapé

### Bacharelado em Psicologia
- [ ] Adicionar seção de coordenação (com dado real ou TODO)
- [ ] Confirmar ou remover estatística "66,6% doutores / 33,3% mestres"
- [ ] Confirmar ou suavizar total de horas de estágio (800h)
- [ ] Reestruturar seções na ordem padrão
- [ ] Corrigir rodapé

### Técnico em Enfermagem
- [ ] Corrigir duração e carga horária (30 meses / 1.840h)
- [ ] Substituir matriz curricular pela real (3 módulos)
- [ ] Remover estatísticas fabricadas e depoimento fictício
- [ ] Adicionar coordenação real (Karina Diniz Tavares Medina)
- [ ] Adicionar faixa salarial real
- [ ] Reestruturar seções na ordem padrão
- [ ] Corrigir rodapé

### Técnico em Farmácia
- [ ] Corrigir duração e carga horária (24 meses / 1.600h)
- [ ] Substituir matriz curricular pela real (3 módulos)
- [ ] Remover estatísticas fabricadas, depoimento fictício e parcerias não confirmadas
- [ ] Adicionar coordenação real (Cristina Tanikawa)
- [ ] Adicionar faixa salarial real
- [ ] Reestruturar seções na ordem padrão
- [ ] Corrigir rodapé
