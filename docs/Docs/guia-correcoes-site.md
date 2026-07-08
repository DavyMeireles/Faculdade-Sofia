**GUIA DE CORREÇÕES DO SITE**

**Faculdade SOFIA --- faculdadesofia.edu.br**

*O que alterar em cada página, com base no código-fonte atual do site*

Preparado por Davy Meireles · Julho de 2026

**Como usar este guia**

Este documento traduz a análise feita sobre o site em uma lista prática
do que precisa ser alterado em cada página, para ser usado diretamente
com quem tem acesso ao código-fonte (você ou o time de TI).

Cada seção representa uma página real do site. A coluna da esquerda
mostra o que está publicado hoje; a coluna da direita mostra a versão
corrigida ou o conteúdo que deve entrar no lugar. As prioridades seguem
o padrão:

-   **🔴 ALTA --- compromete credibilidade, conversão ou está
    tecnicamente quebrado. Corrigir primeiro.**

-   **🟡 MÉDIA --- melhora relevante de conversão ou consistência, mas
    não é urgente.**

-   **🟢 BAIXA --- ajuste fino, pode entrar em um segundo momento.**

**⚠ Achado mais importante deste levantamento: o site atual mistura
conteúdo de duas identidades diferentes --- a Faculdade Sofia
(instituição de ensino em Campinas, cursos de Enfermagem, Psicologia e
técnicos) e uma \"Santa Sofia Clínica Escola\" genérica, com textos de
um template comprado que nunca foi customizado (histórico institucional
inventado, cidade errada, números irreais). Isso está presente em
praticamente todas as páginas e é a correção de maior impacto. Está
detalhado na seção \"Correções que aparecem em todas as páginas\" e na
seção \"Nossa História\".**

**Correções que aparecem em todas as páginas**

Estes itens se repetem no rodapé e/ou menu de todas as páginas do site.
Corrigir uma vez, no componente compartilhado (rodapé/header), resolve
em todo o site de uma só vez.

+----------------------------+----------------------------+------------+
| **O que está no site       | **O que precisa virar**    | **Pr       |
| hoje**                     |                            | ioridade** |
+============================+============================+============+
| O rodapé de TODAS as       | Substituir por um rodapé   | **🔴       |
| páginas (Home, Enfermagem, | institucional real da      | ALTA**     |
| Psicologia, Técnicos,      | Faculdade Sofia: nome da   |            |
| Vestibular) exibe o bloco: | instituição, uma frase     |            |
| \"Santa Sofia Clínica      | curta de posicionamento    |            |
| Escola --- Liderança       | (ex: \"Faculdade do        |            |
| mundial em cuidados de     | Trabalhador da Saúde\", já |            |
| saúde, pesquisa e educação | usada em outras páginas) e |            |
| médica há mais de 17 anos. | o mesmo número de anos de  |            |
| Transformando a medicina   | tradição usado no resto do |            |
| para um mundo mais         | site.                      |            |
| saudável.\"                |                            |            |
|                            | Remover qualquer menção a  |            |
| Esse texto descreve uma    | \'Clínica Escola\' e       |            |
| clínica médica de padrão   | \'liderança mundial\' do   |            |
| internacional, não uma     | rodapé --- não é o         |            |
| faculdade de ensino        | discurso da instituição.   |            |
| superior em Campinas. É    |                            |            |
| conteúdo de template       |                            |            |
| genérico que ficou no      |                            |            |
| site.                      |                            |            |
+----------------------------+----------------------------+------------+
| Número de anos de tradição | Definir com a direção da   | **🔴       |
| inconsistente: rodapé diz  | faculdade uma única        | ALTA**     |
| \"mais de 17 anos\", a     | data-base (provavelmente   |            |
| página de Técnico em       | 1987, já usada no menu) e  |            |
| Enfermagem e Técnico em    | um único número de \"anos  |            |
| Farmácia mostram \"12      | de tradição\" e aplicar de |            |
| anos\" no contador, e o    | forma idêntica em: rodapé  |            |
| menu superior traz o selo  | de todas as páginas,       |            |
| \"FACULDADE SOFIA · DESDE  | contadores da Home,        |            |
| 1987\" (que daria a mais   | contadores de Técnico em   |            |
| de 35 anos).               | Enfermagem e Técnico em    |            |
|                            | Farmácia.                  |            |
+----------------------------+----------------------------+------------+
| Botões de                  | Substituir por formulário  | **🔴       |
| inscrição/processo         | nativo dentro do próprio   | ALTA**     |
| seletivo (\"Processo       | site (ou, no mínimo, um    |            |
| seletivo\",                | formulário por curso, para |            |
| \"Pré-inscrição\", \"Quero | saber de qual página veio  |            |
| me inscrever\") em         | o lead). Isso também       |            |
| Bacharelado Enfermagem,    | permite integrar com       |            |
| Bacharelado Psicologia e   | WhatsApp/CRM e rastrear    |            |
| Técnico em Enfermagem      | origem da inscrição por    |            |
| apontam todos para o MESMO | campanha.                  |            |
| link de Google Forms       |                            |            |
| externo                    |                            |            |
| (do                        |                            |            |
| cs.google.com/forms/\...). |                            |            |
+----------------------------+----------------------------+------------+
| URLs técnicas expostas em  | Pedir ao time de TI/dev    | **🟢       |
| todas as páginas de curso: | URLs amigáveis:            | BAIXA**    |
| /Cursos/BEnfermagem,       | /curs                      |            |
| /Cursos/BPsicologia,       | os/bacharelado-enfermagem, |            |
| /Cursos/TEnfermagem,       | /curs                      |            |
| /Cursos/TFarmacia (e o     | os/bacharelado-psicologia, |            |
| link \"Vestibular 2026b\"  | /                          |            |
| no menu, que ainda traz o  | cursos/tecnico-enfermagem, |            |
| sufixo de rascunho \"b\"). | /cursos/tecnico-farmacia,  |            |
|                            | e renomear o item de menu  |            |
|                            | \"Vestibular 2026b\" para  |            |
|                            | \"Vestibular 2026\".       |            |
+----------------------------+----------------------------+------------+
| Na página de Técnico em    | Corrigir o link para       | **🟡       |
| Farmácia, o link do menu   | /Home/HInstiEnsino nesta   | MÉDIA**    |
| \"Nossa História / Santa   | página específica.         |            |
| Sofia\" está quebrado:     |                            |            |
| aponta para                |                            |            |
| /Cursos/Home/HInstiEnsino  |                            |            |
| (caminho errado, com       |                            |            |
| /Cursos/ duplicado) em vez |                            |            |
| de /Home/HInstiEnsino como |                            |            |
| em todas as outras         |                            |            |
| páginas.                   |                            |            |
+----------------------------+----------------------------+------------+
| Nenhuma página tem botão   | Adicionar botão flutuante  | **🟡       |
| flutuante de WhatsApp ---  | de WhatsApp (visível       | MÉDIA**    |
| o contato fica só no       | durante a rolagem) em      |            |
| rodapé, exigindo rolagem   | todas as páginas,          |            |
| até o fim da página.       | apontando para o número    |            |
|                            | comercial (19) 99960-1237. |            |
+----------------------------+----------------------------+------------+
| Nenhuma menção ao          | Adicionar seção/CTA do     | **🔴       |
| \"Vestibular Social\"      | Vestibular Social com a    | ALTA**     |
| (bolsa de até 75%) em      | frase padrão \"bolsas de   |            |
| nenhuma página pública do  | até 75%\" (nunca como      |            |
| site --- nem na Home, nem  | faixa) na Home, em todas   |            |
| nas páginas de curso, nem  | as páginas de curso e na   |            |
| na página de Vestibular    | própria página de          |            |
| (que hoje só tem dois      | Vestibular, com botão de   |            |
| links em PDF: edital e     | contato via WhatsApp.      |            |
| lista de classificados).   |                            |            |
+----------------------------+----------------------------+------------+

**1. Página Inicial (Home)**

**URL atual:** *faculdadesofia.edu.br/home*

  --------------------------------------------------------------------------
  **O que está no site hoje**  **O que precisa virar**      **Prioridade**
  ---------------------------- ---------------------------- ----------------
  Hero da Home usa um vídeo    Corrigir o texto do selo     **🔴 ALTA**
  genérico de fundo e o selo   para \"Certificação e-MEC\"  
  \"Certificação e-MAC\" ---   (nome oficial do sistema do  
  mas o link do selo aponta    MEC), mantendo o link, que   
  para o e-MEC do MEC (nome do já está correto.             
  selo escrito errado,                                      
  \"e-MAC\" em vez de                                       
  \"e-MEC\").                                               

  Contadores da Home aparecem  Preencher os três contadores **🔴 ALTA**
  zerados: \"0 Alunos formados com números reais e          
  na Escola Técnica\", \"0     consistentes com o resto do  
  Anos de tradição em Ensino   site (mesmos números usados  
  Técnico\", \"0%              em Técnico em                
  Empregabilidade dos          Enfermagem/Farmácia: +1.200  
  formados\".                  alunos formados, mesmo nº de 
                               anos definido na correção    
                               sistêmica, 94%               
                               empregabilidade).            

  Seção \"Serviços             Se essas especialidades      **🔴 ALTA**
  Especializados\" e           forem, de fato, serviços da  
  \"Especialidades em          Clínica-Escola Sofia         
  Destaque\" apresentam a Home (atendimento à comunidade),  
  como uma clínica médica:     elas devem ficar na área     
  Oftalmologia Avançada,       \"SOFIA - CLÍNICA ESCOLA\"   
  Psiquiatria e Saúde Mental,  do menu, claramente          
  Clínica Geral Integral,      separadas da oferta          
  Endocrinologia, Nutrição     acadêmica. Na Home, o        
  Clínica, Cirurgia Vascular   destaque principal deve ser  
  --- nenhuma dessas é um      os 4 cursos reais:           
  curso oferecido pela         Bacharelado em Enfermagem,   
  faculdade.                   Bacharelado em Psicologia,   
                               Técnico em Enfermagem,       
                               Técnico em Farmácia --- com  
                               foto, resumo e CTA de cada   
                               um.                          

  Frase de posicionamento no   Manter essa frase como       **🟡 MÉDIA**
  topo: \"FACULDADE SOFIA ---  identidade central e         
  A FACULDADE DO TRABALHADOR   reforçá-la ao longo da       
  DA SAÚDE\" (boa, mas some no página, garantindo que todo  
  restante da página, que      o conteúdo abaixo do hero    
  passa a falar de clínica     reforce a mesma mensagem     
  médica).                     (formação de profissionais   
                               de saúde), sem migrar para   
                               linguagem de clínica.        

  Não há nenhuma seção de      Trazer o diferencial         **🟡 MÉDIA**
  depoimentos, fotos reais do  \"prédio histórico, berço da 
  campus/alunos, nem menção ao Faculdade de Medicina da     
  diferencial do prédio        Unicamp\" para logo abaixo   
  histórico (primeiro hospital do hero, com foto real da    
  da Unicamp) na Home --- esse fachada, e adicionar 2--3    
  diferencial só aparece em    depoimentos de               
  texto pequeno mais abaixo.   alunos/egressos com foto.    
  --------------------------------------------------------------------------

**2. Nossa História / Institucional**

**URL atual:** *faculdadesofia.edu.br/Home/HInstiEnsino*

**Esta é a página que mais precisa de atenção imediata. O texto
publicado hoje é, do início ao fim, uma história institucional genérica
que não corresponde à Faculdade Sofia --- provavelmente conteúdo de
exemplo de um template que nunca foi substituído.**

  --------------------------------------------------------------------------
  **O que está no site hoje**  **O que precisa virar**      **Prioridade**
  ---------------------------- ---------------------------- ----------------
  Texto diz que a faculdade    Substituir pela história     **🔴 ALTA**
  foi \"fundada oficialmente   real da instituição: origem  
  em 15 de março de 1987\" por ligada ao Complexo da Santa  
  um \"grupo de educadores\",  Casa de Misericórdia de      
  começando com os cursos de   Campinas (fundada em 1860) e 
  \"Pedagogia e Letras\", em   ao prédio que abrigou o      
  \"uma casa histórica no      primeiro hospital/faculdade  
  centro da cidade\".          de medicina da Unicamp --- e 
                               pelos cursos que a Sofia     
                               realmente oferece            
                               (Enfermagem, Psicologia,     
                               técnicos em saúde), não      
                               Pedagogia e Letras.          

  Menciona um campus em \"São  Remover essa cidade e a      **🔴 ALTA**
  José dos Pinhais\" com \"120 métrica de área e substituir 
  mil m²\" --- essa cidade     pela localização real:       
  fica no Paraná; a Faculdade  Centro de Campinas, complexo 
  Sofia fica na Rua Barreto    da Santa Casa de             
  Leme, 1552, Centro,          Misericórdia, prédio         
  Campinas/SP.                 histórico tombado.           

  Alega \"mais de 6.500        Remover todas essas          **🔴 ALTA**
  estudantes distribuídos em   afirmações --- não           
  18 cursos de graduação, 12   correspondem à oferta real   
  especializações lato sensu,  da instituição (2            
  dois mestrados e um          bacharelados, 2 técnicos,    
  doutorado\", programa de pós pós-graduações lato sensu).  
  stricto sensu \"recomendado  Substituir por números reais 
  pela CAPES com nota 4\",     e verificáveis (nº de alunos 
  \"15 mil alumni\", grupo de  formados, nº de cursos       
  teatro, editora própria e    ativos) fornecidos pela      
  canal de podcast.            secretaria.                  

  Cita a criação de cursos que Remover. Manter apenas os    **🔴 ALTA**
  não existem na Sofia:        cursos reais: Enfermagem,    
  Arquitetura e Urbanismo,     Psicologia, Técnico em       
  Ciência da Computação,       Enfermagem, Técnico em       
  História, Matemática,        Farmácia (e Farmácia/outros  
  Serviço Social.              técnicos, se aplicável).     

  Faixa final do texto: \"🏅   Alinhar esse número com a    **🔴 ALTA**
  40 anos de história em 2027  definição única de anos de   
  --- uma tradição que se      tradição resolvida na        
  renova\", inconsistente com  correção sistêmica (ver      
  \"desde 1987\" do menu (que  seção \'Correções que        
  já daria 39 anos em 2026,    aparecem em todas as         
  não 40 em 2027) e com o      páginas\').                  
  \"+12 anos\"/\"+17 anos\"                                 
  usados no resto do site.                                  

  Não há nenhuma imagem real   Substituir por fotos reais   **🟡 MÉDIA**
  da instituição --- as fotos  do prédio histórico, da      
  do carrossel (\"Primeira     fachada, de salas de aula e, 
  sede\", \"Laboratório        se possível, de registros    
  2004\", \"Biblioteca 1995\", históricos do complexo da    
  \"Campus 1992\", \"Campus    Santa Casa relacionados à    
  atual\") ilustram a história origem da instituição.       
  genérica descrita acima, não                              
  a Faculdade Sofia.                                        
  --------------------------------------------------------------------------

**3. Bacharelado em Enfermagem**

**URL atual:** *faculdadesofia.edu.br/Cursos/BEnfermagem*

Esta é, hoje, a página mais completa e bem estruturada do site em termos
de conteúdo acadêmico (metodologias ativas, parcerias de estágio,
coordenadora identificada). Os ajustes abaixo são pontuais.

  --------------------------------------------------------------------------
  **O que está no site hoje**  **O que precisa virar**      **Prioridade**
  ---------------------------- ---------------------------- ----------------
  Botão \"Processo seletivo\"  Ver correção sistêmica ---   **🔴 ALTA**
  no hero direciona para       substituir por formulário    
  Google Forms externo, saindo nativo, específico para o    
  do domínio da faculdade.     curso de Enfermagem.         

  Rodapé desta página também   Ver correção sistêmica de    **🔴 ALTA**
  carrega o bloco \"Santa      rodapé.                      
  Sofia Clínica Escola\... há                               
  mais de 17 anos\",                                        
  incoerente com o restante do                              
  conteúdo do curso.                                        

  Nenhuma foto real de         Adicionar fotos reais:       **🟡 MÉDIA**
  laboratório, sala de aula ou laboratório de simulação     
  alunos --- página            realística, fachada do       
  inteiramente em texto.       prédio histórico, alunos em  
                               atividade prática.           

  Nenhum depoimento de egresso Inserir 2--3 depoimentos com **🟡 MÉDIA**
  ou aluno atual.              nome, foto e situação atual  
                               (ex: onde atua hoje).        

  Seção \"Processo Seletivo e  Adicionar bloco específico   **🔴 ALTA**
  Apoio ao Estudante\" cita    do Vestibular Social com a   
  FIES, PROUNI e bolsas        frase \"bolsas de até 75%\"  
  institucionais, mas não      e uma faixa de valor de      
  menciona valores, nem o      mensalidade (mesmo que \"a   
  Vestibular Social (até 75%). partir de R\$ X\").          

  Não há bloco de              Adicionar faixa de           **🟡 MÉDIA**
  mensalidade/valores ---      mensalidade ou simulador de  
  candidato precisa entrar em  bolsa, ainda que aproximado  
  contato para saber se pode   (\"a partir de R\$ X,        
  pagar.                       consulte condições\").       
  --------------------------------------------------------------------------

**4. Bacharelado em Psicologia**

**URL atual:** *faculdadesofia.edu.br/Cursos/BPsicologia*

  --------------------------------------------------------------------------
  **O que está no site hoje**  **O que precisa virar**      **Prioridade**
  ---------------------------- ---------------------------- ----------------
  Tag no hero: \"Bacharelado   Adicionar o nome da          **🔴 ALTA**
  Presencial - Nota máxima\",  avaliação e o conceito       
  sem indicar em qual          específico (ex: \"CPC 4 no   
  avaliação (MEC, ENADE, CPC)  MEC\") com link para a       
  nem link de comprovação ---  página pública do e-MEC,     
  o candidato não consegue     igual ao selo já usado na    
  verificar a afirmação.       Home.                        

  O turno do curso não é       Definir e exibir com         **🔴 ALTA**
  informado com clareza: o     destaque no hero (igual ao   
  hero diz apenas              feito em Enfermagem) o(s)    
  \"Bacharelado Presencial\",  turno(s) reais oferecidos    
  e mais abaixo aparece \"120  para Psicologia.             
  vagas anuais, turno                                       
  integral\" --- mas o curso                                
  de Enfermagem, no mesmo                                   
  prédio, é noturno, o que                                  
  gera dúvida real sobre o                                  
  horário das aulas.                                        

  Botão \"Estrutura            Adicionar grade curricular   **🟡 MÉDIA**
  curricular\" leva à âncora   completa por                 
  #curriculo e \"Áreas de      semestre/disciplina (o       
  atuação\" à âncora #campos,  conteúdo mais buscado por    
  mas a página não tem uma     candidato de graduação), ou  
  grade curricular detalhada   renomear o botão para não    
  por semestre --- só os 6     prometer algo que a página   
  eixos estruturantes gerais.  não entrega.                 

  Botão \"Pré-inscrição\" no   Ver correção sistêmica ---   **🔴 ALTA**
  rodapé da página aponta para formulário nativo específico 
  o mesmo Google Forms externo do curso de Psicologia.      
  usado em todos os outros                                  
  cursos.                                                   

  Nenhuma foto real da         Adicionar fotos reais da     **🟡 MÉDIA**
  Clínica-Escola, dos          Clínica-Escola Sofia e dos   
  laboratórios de avaliação    laboratórios citados no      
  psicológica ou de alunos --- texto.                       
  especialmente crítico em                                  
  Psicologia, curso de decisão                              
  mais emocional.                                           

  Nenhum depoimento de         Inserir 2--3 depoimentos de  **🟡 MÉDIA**
  egresso.                     egressos de Psicologia, com  
                               área de atuação atual.       

  Nenhuma informação de        Adicionar bloco de           **🔴 ALTA**
  mensalidade ou do Vestibular valores/Vestibular Social,   
  Social (até 75%).            igual ao proposto para       
                               Enfermagem.                  
  --------------------------------------------------------------------------

**5. Técnico em Enfermagem**

**URL atual:** *faculdadesofia.edu.br/Cursos/TEnfermagem*

  --------------------------------------------------------------------------
  **O que está no site hoje**  **O que precisa virar**      **Prioridade**
  ---------------------------- ---------------------------- ----------------
  Contador no rodapé da página Ver correção sistêmica ---   **🔴 ALTA**
  mostra \"12 anos de tradição padronizar o número de anos. 
  em ensino técnico\",                                      
  diferente dos \"17 anos\" do                              
  bloco Clínica Escola logo                                 
  abaixo, na mesma página.                                  

  Indicador \"68% ocupadas\"   Confirmar com a secretaria o **🟡 MÉDIA**
  nas vagas --- não é possível percentual real de vagas     
  confirmar se esse número é   ocupadas antes de manter     
  real ou um valor de exemplo  esse dado publicado; se não  
  deixado no template.         houver dado confiável,       
                               remover o indicador.         

  Formulário de pré-inscrição  Ver correção sistêmica ---   **🔴 ALTA**
  embutido é um Google Forms   formulário nativo específico 
  externo (mesmo link usado    para o Técnico em            
  nos bacharelados).           Enfermagem.                  

  Depoimento único no fim da   Confirmar se o depoimento é  **🟡 MÉDIA**
  página (\"Mariana C.,        real e obter autorização de  
  Técnica em Enfermagem\") sem uso de nome/imagem; se for   
  foto e sem verificação de    real, adicionar foto (com    
  autenticidade.               consentimento). Se não puder 
                               ser confirmado, substituir   
                               por depoimento validado.     

  Não há menção ao Vestibular  Adicionar bloco do           **🟡 MÉDIA**
  Social (até 75%) --- a       Vestibular Social com a      
  página fala apenas em \"taxa frase padrão \"até 75%\" e   
  de matrícula promocional +   detalhar as condições reais  
  desconto para pagamento      de desconto por antecipação. 
  antecipado\", sem detalhar                                
  valores.                                                  
  --------------------------------------------------------------------------

**6. Técnico em Farmácia**

**URL atual:** *faculdadesofia.edu.br/Cursos/TFarmacia*

  --------------------------------------------------------------------------
  **O que está no site hoje**  **O que precisa virar**      **Prioridade**
  ---------------------------- ---------------------------- ----------------
  Link do menu \"Nossa         Corrigir o caminho do link.  **🟡 MÉDIA**
  História / Santa Sofia\"                                  
  está quebrado nesta página                                
  específica: aponta para                                   
  /Cursos/Home/HInstiEnsino em                              
  vez de /Home/HInstiEnsino.                                

  Contador mostra \"+12 Anos   Ver correção sistêmica ---   **🔴 ALTA**
  de tradição em ensino        padronizar.                  
  técnico\", coerente com                                   
  Técnico em Enfermagem, mas                                
  ainda divergente do \"17                                  
  anos\" do bloco Clínica                                   
  Escola logo abaixo na mesma                               
  página.                                                   

  Cita parceria de             Confirmar com a coordenação  **🟡 MÉDIA**
  empregabilidade com \"rede   se as parcerias citadas      
  D\'Or, Santa Casa e          (Drogasil, Pague Menos)      
  hospitais regionais\" (esse  existem de fato antes de     
  trecho é da página de        manter a citação nominal de  
  Enfermagem, mas aqui aparece marcas de terceiros no site. 
  a menção a farmácias                                      
  \"Drogasil, São Paulo, Pague                              
  Menos\" --- confirmar se                                  
  essas parcerias são reais e                               
  vigentes.                                                 

  Depoimento de \"Camila       Substituir por depoimento    **🔴 ALTA**
  Mendes\" usa uma foto de     real com foto autorizada da  
  banco de imagens genérico    própria aluna/egressa, ou    
  (randomuser.me), o que é     remover a foto se o          
  facilmente identificável     depoimento for mantido       
  como foto de stock, não de   apenas como texto.           
  uma aluna real.                                           

  Não há CTA de formulário     Aplicar a mesma correção     **🔴 ALTA**
  nativo --- a seção de        sistêmica de formulário      
  contato (\"Garanta sua       nativo.                      
  vaga\") não foi inspecionada                              
  em detalhe, mas segue o                                   
  mesmo padrão das demais                                   
  páginas de curso.                                         

  Nenhuma menção ao Vestibular Adicionar bloco do           **🟡 MÉDIA**
  Social (até 75%).            Vestibular Social.           
  --------------------------------------------------------------------------

**7. Página de Vestibular**

**URL atual:** *faculdadesofia.edu.br/vestibular/index*

  --------------------------------------------------------------------------
  **O que está no site hoje**  **O que precisa virar**      **Prioridade**
  ---------------------------- ---------------------------- ----------------
  A página inteira contém      Transformar em uma página    **🔴 ALTA**
  apenas dois links: \"Ver     completa de processo         
  Edital\" (PDF) e \"Ver       seletivo: como funciona o    
  Lista\" (PDF de              vestibular, datas, cursos    
  classificados). Não há       disponíveis, bloco do        
  nenhum texto, nenhuma        Vestibular Social (bolsas de 
  explicação do processo,      até 75%) e CTA de contato    
  nenhuma menção a bolsas.     via WhatsApp --- hoje ela    
                               funciona só como repositório 
                               de PDF.                      

  Nome do item de menu é       Renomear para \"Vestibular   **🟢 BAIXA**
  \"Vestibular 2026b\" --- o   2026\" (ou \"Vestibular 2026 
  sufixo \"b\" indica que é    --- 2ª chamada\", se essa    
  uma versão de rascunho ou    distinção for intencional).  
  segunda chamada que nunca                                 
  foi renomeada para                                        
  publicação.                                               

  Rodapé desta página também   Ver correção sistêmica de    **🔴 ALTA**
  exibe o bloco \"Santa Sofia  rodapé.                      
  Clínica Escola\... 17                                     
  anos\".                                                   
  --------------------------------------------------------------------------

**Próximos passos sugeridos**

-   1\. Resolver primeiro os itens 🔴 ALTA que são compartilhados
    (rodapé, anos de tradição, formulário nativo, Vestibular Social) ---
    um único ajuste no componente compartilhado corrige o site inteiro
    de uma vez.

-   2\. Reescrever a página \"Nossa História\" com o time de comunicação
    da faculdade, usando fatos reais (origem na Santa Casa, prédio
    histórico ligado à Unicamp, ano de fundação real).

-   3\. Depois, tratar os ajustes específicos de cada página de curso
    (fotos, depoimentos, grade curricular, valores).

-   4\. Por último, os itens de SEO/URL amigável e pequenos bugs de
    link, que não afetam a experiência imediata do candidato.

*Qualquer um desses blocos pode virar um card, ticket ou e-mail separado
para o time de TI, se for mais prático dividir o trabalho por
responsável.*
