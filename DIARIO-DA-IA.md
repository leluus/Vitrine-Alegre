# Diário da IA — Vitrine Alegre

## Ferramenta utilizada
Fiz tudo pelo aplicativo do Claude (plano gratuito), usando o modelo Claude Sonnet 5. Enviei o PDF da atividade direto pra IA, fiz um prompt inicial explicando o que precisava, e fui conversando com ela ao longo de todo o desenvolvimento, etapa por etapa.

## Etapa 0 — Configuração do ambiente
Comecei criando o projeto com Vite e instalando as dependências (incluindo o React Router). Tentei rodar os comandos pelo PowerShell, mas ele não estava funcionando, os scripts do npm não executavam. Migrei pro cmd e aí sim consegui seguir em frente sem problemas.

## Etapa 1 — Serviços da API
Pedi a função de serviços da API pra IA, ela sugeriu usar "https://dummyjson.com" como base, testei e deu certo, não apareceu nenhum erro no console. Etapa concluída com apenas um prompt.

Nessa etapa foi criado o arquivo `src/services/api.js`.

## Etapa 2 — Cartão de produto estático
Nessa etapa construímos o visual do produto (`ProductCard`), ainda sem depender da lista real, o foco foi só no layout e no CSS. O card apareceu e funcionou perfeitamente. A IA pediu pra eu trocar `stock: 8` por `stock: 0` pra testar se o comportamento de "esgotado" estava funcionando, e estava.

Nessa etapa foram criados os arquivos `src/components/ProductCard.jsx` e `src/components/ProductCard.css`.

## Etapa 3 — Lista real + os 4 estados obrigatórios
Nessa etapa implementamos a lista real de produtos junto com os 4 estados obrigatórios: carregando, erro, vazio e sucesso. Pra testar o estado de erro, forcei propositalmente um erro trocando a URL da API pra uma que não existe. Todos os estados funcionaram perfeitamente.

Nessa etapa foram criados os arquivos `src/pages/Home.jsx` e `src/pages/Home.css`.

## Etapa 4 — Busca, filtro por categoria e paginação
Fizemos as três funcionalidades juntas, porque elas interagem entre si. Essa foi a etapa onde a maior parte da atividade tomou forma. Realizei todos os testes e tudo funcionou perfeitamente — nessa altura o site ainda estava sem estilização definitiva, em inglês, e os valores ainda em dólar.

Nessa etapa foram criados os arquivos `src/components/SearchBar.jsx`, `src/components/CategoryFilter.jsx` e `src/components/Pagination.jsx`, além de mais código acrescentado em `src/pages/Home.css`.

## Etapa 5 — Rota de detalhe do produto
Usamos o React Router, que já tinha sido instalado lá na Etapa 0. Essa foi a primeira etapa em que deu erro — mas por culpa minha: meu teclado deu problema de digitação e o "." do nome do arquivo `.css` acabou duplicado sem eu perceber. Isso me custou uns 20 minutos procurando o erro. Fora esse detalhe, tudo funcionou perfeitamente.

Nessa etapa, a maioria dos arquivos não foi criada, e sim ajustada: `src/main.jsx`, `src/App.jsx`, `src/components/ProductCard.jsx` e `src/components/ProductCard.css`. Os arquivos novos foram `src/pages/ProductDetail.jsx` e `src/pages/ProductDetail.css`.

## Etapa 6 — Carrinho de compras
Implementamos o carrinho usando Context API, pra não precisar repetir a função de adicionar ao carrinho (`addToCart`) manualmente em cada componente que lida com produtos.

Nessa etapa também tive um erro: esqueci de criar o arquivo `Header.jsx`, e isso quebrou a aplicação inteira com um erro 500 no navegador. Só pelo erro do navegador não deu pra saber a causa — precisei olhar o terminal onde o `npm run dev` estava rodando, e lá a mensagem foi bem mais clara: "Failed to resolve import './components/Header'". Assim que criei o arquivo que faltava, resolveu.

Nessa etapa foram criados: `src/context/CartContext.jsx`, `src/components/Header.jsx`, `src/components/Header.css`, `src/pages/Cart.jsx` e `src/pages/Cart.css`.

## Etapa 7 — Responsividade
Última etapa de construção: adicionamos `@media queries` nos arquivos CSS já existentes pra deixar o site funcional também em celulares e tablets. Testei usando o modo de emulação de dispositivo do DevTools (Ctrl+Shift+M), em tamanhos diferentes (tipo iPhone SE e iPad Air), e tudo funcionou perfeitamente nas três páginas do site (vitrine, detalhe do produto e carrinho).

Foi acrescentado código nos arquivos: `src/components/Header.css`, `src/pages/Home.css`, `src/components/ProductCard.css`, `src/pages/ProductDetail.css` e `src/pages/Cart.css`.

## Considerações finais
Mesmo sendo bastante demorado fazer isso, mesmo utiliando IA, eu achei uma maneira boa de desenvolver, pois voce precisa saber o que esta fazendo, a IA te fala o que fazer mas voce precisa saber como fazer. No começo eu demorei um pouco pra conseguir me expressar, mas depois foi bem fácil.