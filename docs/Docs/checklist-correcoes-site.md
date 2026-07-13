# Checklist de Correções — Site Faculdade Sofia

> Marque `- [x]` conforme for corrigindo. Guia completo com o "antes/depois" de cada item está em `guia-correcoes-site.md`.
>
> 🔴 ALTA · 🟡 MÉDIA · 🟢 BAIXA

## Correções que aparecem em todas as páginas (fazer primeiro — resolve o site inteiro de uma vez)

- [x] 🔴 Trocar o bloco "Santa Sofia Clínica Escola... há mais de 17 anos" no rodapé por um rodapé institucional real da Faculdade Sofia
- [x] 🔴 Padronizar o número de "anos de tradição" em todo o site (rodapé, Home, Técnico em Enfermagem, Técnico em Farmácia, Pós Enfermagem) — **atualizado em 2026-07-13**: fundação real confirmada pelo cliente em **2006** (não 1987). Recalculado para **20 anos**. O "1987" usado antes vinha de uma segunda história institucional fabricada, achada em `Home/VideoInstitucional.html` (ver item abaixo)
- [ ] 🔴 Substituir o Google Forms externo por formulário nativo (um por curso, se possível) — pendente: depende de endpoint de backend, fora deste diretório
- [x] 🔴 Adicionar seção/CTA do Vestibular Social ("bolsas de até 75%") na Home, nas páginas de curso e na página de Vestibular
- [x] 🟡 Corrigir o link do menu "Nossa História / Santa Sofia" na página de Técnico em Farmácia (aponta para caminho errado) — faltava a barra inicial em `href="Home/HInstiEnsino"`
- [x] 🟡 Adicionar botão flutuante de WhatsApp em todas as páginas — verificado: já existia em todas as 16 páginas, item já estava resolvido
- [ ] 🟢 Trocar URLs técnicas por amigáveis (/cursos/bacharelado-enfermagem etc.) — pendente: exige alterar rewrite rules no nginx de produção + atualizar links internos + redirects das URLs antigas
- [x] 🟢 Renomear "Vestibular 2026b" para "Vestibular 2026" — renomeado para "Vestibular 2026 - 2º Semestre" (pedido do cliente)

## 1. Página Inicial (Home)

- [ ] 🔴 Corrigir o texto do selo "Certificação e-MAC" para "Certificação e-MEC"
- [ ] 🔴 Preencher os contadores zerados (alunos formados, anos de tradição, % empregabilidade)
- [ ] 🔴 Trocar as "especialidades médicas" (Oftalmologia, Psiquiatria etc.) pelos 4 cursos reais em destaque
- [x] 🟡 Reforçar a frase "A Faculdade do Trabalhador da Saúde" ao longo da página — adicionado título no hero (que estava sem nenhum texto) e reforçado no rodapé
- [ ] 🟡 Trazer o diferencial do prédio histórico (Unicamp) para logo abaixo do hero, com foto real + depoimentos

## 2. Nossa História / Institucional

- [ ] 🔴 Reescrever a fundação (não é 1987/Pedagogia e Letras) com a história real ligada à Santa Casa
- [ ] 🔴 Remover menção a "São José dos Pinhais" e "120 mil m²" — trocar pela localização real (Centro de Campinas)
- [ ] 🔴 Remover números inventados (6.500 alunos, 18 cursos, mestrado/doutorado, 15 mil alumni, teatro, editora, podcast)
- [ ] 🔴 Remover cursos que não existem (Arquitetura, Ciência da Computação, História, Matemática, Serviço Social)
- [ ] 🔴 Corrigir a faixa "40 anos em 2027" para bater com o número de anos definido na correção sistêmica (agora 20 anos, base 2006)
- [ ] 🟡 Trocar fotos do carrossel genérico por fotos reais do prédio/fachada/salas

## 2b. Nova página institucional fabricada encontrada — `Home/VideoInstitucional.html`

**Achado em 2026-07-13**, ao investigar de onde vinha o "1987" usado no selo do menu. Essa página tem sua **própria linha do tempo institucional inventada**, totalmente diferente da de `Home/HInstiEnsino.html` (item 2 acima) — ou seja, o site tem *duas* histórias fabricadas diferentes. O código traz o comentário `<!-- conteúdo sintetizado ... extraídos da narrativa do site -->`, indicando que foi copiado/gerado a partir de outro site.

Narrativa fictícia atual: fundação em 1987 como "Instituto Sofia de Estudos Superiores" com foco em filosofia/letras/pedagogia (47 alunos na primeira turma), depois "1998 — reconhecimento como Faculdade Sofia, cursos de Administração e Psicologia autorizados", "2005 — núcleo de pesquisa e extensão" — nada disso corresponde à instituição real.

- [x] Selo "FACULDADE SOFIA · DESDE 1987" corrigido para "DESDE 2006" (era só o ano do selo, não a narrativa)
- [ ] 🔴 Reescrever toda a linha do tempo da página com a história real (mesma pendência do item 2 — depende da conversa com o cliente)

## 3. Bacharelado em Enfermagem

- [ ] 🔴 Trocar botão "Processo seletivo" (Google Forms) por formulário nativo do curso — pendente: depende de endpoint de backend
- [x] 🔴 Corrigir rodapé (ver correção sistêmica)
- [x] 🔴 Adicionar bloco do Vestibular Social ("até 75%") na seção de processo seletivo — adicionado como CTA de página; ainda falta detalhamento de valores (item 🟡 abaixo)
- [ ] 🟡 Adicionar fotos reais (laboratório, fachada, alunos em prática)
- [ ] 🟡 Adicionar 2–3 depoimentos de egressos
- [ ] 🟡 Adicionar faixa de mensalidade/valores

## 4. Bacharelado em Psicologia

- [ ] 🔴 Comprovar a "nota máxima" com nome da avaliação + link para o e-MEC
- [ ] 🔴 Deixar o(s) turno(s) claros e em destaque no hero
- [ ] 🔴 Trocar botão "Pré-inscrição" (Google Forms) por formulário nativo do curso — pendente: depende de endpoint de backend
- [x] 🔴 Adicionar bloco de mensalidade/Vestibular Social ("até 75%") — CTA de Vestibular Social adicionado; detalhamento de mensalidade ainda pendente
- [x] 🟡 Adicionar grade curricular completa por semestre (ou renomear o botão "Estrutura curricular") — botão renomeado para "Eixos formativos" (não temos grade por semestre para publicar)
- [ ] 🟡 Adicionar fotos reais da Clínica-Escola e laboratórios
- [ ] 🟡 Adicionar 2–3 depoimentos de egressos

## 5. Técnico em Enfermagem

- [x] 🔴 Padronizar "12 anos" com o número definido na correção sistêmica — agora 39 anos
- [ ] 🔴 Trocar formulário embutido (Google Forms) por formulário nativo — pendente: depende de endpoint de backend
- [ ] 🟡 Confirmar com a secretaria o indicador "68% ocupadas" (ou remover se não for real)
- [ ] 🟡 Confirmar autenticidade do depoimento "Mariana C." e adicionar foto com consentimento
- [x] 🟡 Adicionar bloco do Vestibular Social ("até 75%") — CTA adicionado; detalhamento de valores ainda pendente

## 6. Técnico em Farmácia

- [x] 🟡 Corrigir link quebrado do menu "Nossa História / Santa Sofia" — mesma correção da seção "todas as páginas"
- [x] 🔴 Padronizar "+12 anos" com o número definido na correção sistêmica — agora +39
- [ ] 🟡 Confirmar se as parcerias citadas (Drogasil, Pague Menos) são reais e vigentes
- [ ] 🔴 Trocar a foto de banco de imagens de "Camila Mendes" por depoimento real com foto autorizada
- [ ] 🔴 Aplicar formulário nativo no CTA "Garanta sua vaga" — pendente: depende de endpoint de backend
- [x] 🟡 Adicionar bloco do Vestibular Social ("até 75%")

## 7. Página de Vestibular

- [ ] 🔴 Transformar a página (só tem 2 PDFs hoje) em página completa: processo seletivo, datas, cursos, Vestibular Social, CTA de WhatsApp — CTA de Vestibular Social adicionado; reformulação completa da página ainda pendente
- [x] 🟢 Renomear item de menu "Vestibular 2026b" para "Vestibular 2026" — renomeado para "Vestibular 2026 - 2º Semestre" (pedido do cliente)
- [x] 🔴 Corrigir rodapé (ver correção sistêmica)

## Achados extras (páginas de Pós-graduação, fora do escopo original do guia)

Durante o mapeamento das 6 páginas de curso para uma futura padronização, encontramos bugs reais nas páginas de Pós-graduação (não cobertas pelo guia original):

- [x] 🔴 Técnico em Farmácia: botão "Garanta sua vaga" apontava para `#contato`, que não existe na página (clique não fazia nada) — corrigido para link de WhatsApp
- [x] 🔴 Pós-graduação em Psicologia: botão "Garanta sua vaga 2026" apontava para `#inscricao`, que não existe na página — corrigido para link de WhatsApp
- [x] 🔴 Pós-graduação em Enfermagem: botão "Quero me inscrever" tinha `href="#"` (vazio) — corrigido para link de WhatsApp
- [x] 🔴 Pós-graduação em Enfermagem: ainda mostrava "+12 Anos de tradição", divergente da padronização feita em 39 anos — corrigido

## Padronização das páginas de curso (pendente — planejamento futuro)

As 6 páginas de curso (BEnfermagem, BPsicologia, TEnfermagem, TFarmacia, PosEnfermagem, PosPsicologia) usam estruturas HTML/CSS diferentes entre si: classes de hero distintas, ids de seção diferentes, blocos de estatística em 3 formatos distintos com valores de empregabilidade divergentes (86%/92%/93%/94%), e cobertura desigual de depoimentos (BEnfermagem e BPsicologia não têm nenhum). Definir uma estrutura única fica para uma etapa futura — decisão registrada em conversa, ainda não iniciada.
