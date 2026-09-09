# Prompts.md — Vitrine Alegre

Este documento reúne os prompts reais enviados à IA (Claude Sonnet 5, via app gratuito) durante o desenvolvimento do projeto, na ordem em que ocorreram.

## Prompt inicial
> "Boa tarde claude, me foi solicitado um trabalho que pra ser feito com IA e, eu escolhi voce como a melhor ferramenta, me ajude a desenvolver esse trabalho. Esse trabalho será feito em: JS, HTML, CSS e JSX. Segue a instrução sobre o trabalho acima."

(Anexei o PDF com o enunciado da atividade junto com esse prompt.)

A IA perguntou em que ponto do projeto eu estava, e escolhi a opção **"Ainda não criei nada (começar do zero, Etapa 0)"**.

## Etapa 0 — Configuração do ambiente
Recebi o passo a passo pra criar o projeto com Vite, instalar o React Router e organizar as pastas. Depois de tentar rodar os comandos, respondi:

> "Tudo certo, apenas migrei do powershell pro cmd, pis nao esttava dando certo."

## Etapa 1 — Serviços da API
A IA já seguiu direto pra próxima etapa, entregando o código da camada de serviços. Testei e respondi confirmando o resultado com um print do console mostrando o objeto retornado pela API.

## Etapa 2 — Cartão de produto estático
A IA entregou o `ProductCard` e pediu pra eu testar trocando `stock: 8` por `stock: 0`. Respondi com os dois prints:

> "Primeira imagem com 8 e segunda 0, funcionando corretamente."

## Etapa 3 — Lista real + os 4 estados obrigatórios
A IA entregou o código da `Home` com os 4 estados e pediu pra eu testar loading, erro (forçando manualmente), vazio e sucesso. Respondi:

> "o carregando produtos apareceu bem rapido, está funcionando perfeitamente. Os produtos estão aparecendo perfeitamente também. Forcei o erro como solicitado e está funcionando perfeitamente, quando substitui o código pelo certo e cliquei em carregar, também funcionou. Próxima etapa."

## Etapa 4 — Busca, filtro por categoria e paginação
A IA entregou os componentes de busca, filtro e paginação juntos. Testei os quatro cenários pedidos (navegação por página, filtro por categoria, busca com debounce, e busca sem resultado) e respondi:

> "Todos funcionando perfeitamente, a parte de anterior e próximo também funcionando perfeitamente. Os prints do resultado estão acima."

## Etapa 5 — Rota de detalhe do produto
A IA entregou o código da rota de detalhe. Na primeira tentativa, deu erro. Respondi apenas:

> "esta deu erro."

Depois de uma explicação, testei de novo e ainda não funcionou. Colei o código completo do meu arquivo `ProductDetail.jsx` e do `App.jsx` e disse:

> "ainda não deu certo, mesmo fazendo o que foi solicitado."

A IA identificou (pela minha árvore de arquivos) que o CSS estava salvo como `ProductDetail..css` (ponto duplicado). Corrigi e respondi com os prints dos testes:

> "agora ja esta funcionando, segue os testes como solicitado da ultima vez. segue os testes como solicitado, todos seguem funcionando."

## Etapa 6 — Carrinho de compras
A IA entregou o código do Context API, do Header e da página de carrinho. Ao testar, o site quebrou. Respondi com o print do erro no navegador:

> "deu esse erro"

A IA pediu o erro do terminal (não só do navegador). Colei o print com a mensagem completa do Vite (`Failed to resolve import "./components/Header"`). A IA identificou que eu tinha esquecido de criar esse arquivo. Criei o arquivo que faltava e testei tudo (soma de quantidades, subtotal, total, remover, esvaziar, badge do carrinho), respondendo:

> "agora sim. Todos funcionando perfeitamente"

## Etapa 7 — Responsividade
A IA entregou as `@media queries` pra cada CSS já existente. Testei no modo de emulação de dispositivo do DevTools e respondi:

> "todos funcionando perfeitamente."

## Revisão da documentação
Depois de fechar as 8 etapas de código, pedi ajuda pra revisar o `DIARIO-DA-IA.md` que eu tinha escrito sozinho:

> "então reecreva da melhor maneira, mas deixando o que eu escrev"

E, em seguida, pra estruturar este arquivo:

> "vamo seguir com o PROMPTS.md"