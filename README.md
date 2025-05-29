# Movie Recommender

Bem-vindo ao Movie Recommender! Uma aplicação web desenvolvida para ajudar entusiastas de cinema e séries a descobrir novos títulos, explorar lançamentos e obter recomendações personalizadas.

## Visão Geral

Este projeto é uma plataforma intuitiva com um tema escuro e minimalista, inspirado na experiência de uma sala de cinema. Ele permite aos usuários navegar por filmes e séries, visualizar informações detalhadas e encontrar sugestões baseadas em um sistema de recomendação de conteúdo.

## Screenshots

<p align="center">
  <strong>Página Inicial</strong><br>
  <img src="Captura de Tela 2025-05-29 às 20.06.47.png" alt="Página Home do Movie Recommender" width="700"/>
</p>
<p align="center">
  <strong>Listagem de Filmes Lançamento</strong><br>
  <img src="Captura de Tela 2025-05-29 às 20.07.06.png" alt="Listagem de Filmes Lançamento" width="700"/>
</p>
<p align="center">
  <strong>Modal de Detalhes do Filme - Informações</strong><br>
  <img src="Captura de Tela 2025-05-29 às 20.07.35.png" alt="Modal de Detalhes do Filme - Informações" width="700"/>
</p>
<p align="center">
  <strong>Modal de Detalhes do Filme - Elenco e Trailer</strong><br>
  <img src="Captura de Tela 2025-05-29 às 20.07.52.png" alt="Modal de Detalhes do Filme - Elenco e Trailer" width="700"/>
</p>
<p align="center">
  <strong>Página de Recomendações de Filmes</strong><br>
  <img src="Captura de Tela 2025-05-29 às 20.08.19.png" alt="Página de Recomendações de Filmes" width="700"/>
</p>

## Funcionalidades Principais

* **Página Home:** Apresenta a aplicação, seu propósito e funcionalidades.
* **Descoberta de Filmes:**
    * Visualização dos últimos lançamentos de filmes com scroll infinito.
* **Descoberta de Séries de TV:**
    * Visualização dos últimos lançamentos de séries com scroll infinito.
* **Detalhes de Filmes e Séries:**
    * Modal interativo com informações completas: sinopse, gêneros, diretor/criadores, elenco principal, avaliações (média de votos e contagem).
    * Player de trailer oficial embutido (YouTube).
    * Informações de "Onde Assistir" (provedores de streaming, aluguel e compra para o Brasil - BR).
    * Palavras-chave associadas (para filmes e séries).
* **Recomendações Baseadas em Conteúdo:**
    * Usuários podem buscar por um filme.
    * O sistema recomenda outros filmes com base na similaridade de conteúdo (sinopse, gêneros, elenco, palavras-chave).
    * (Planejado: Extensão para recomendações de séries).
* **Interface Moderna:** Tema escuro "cinema style", design minimalista e responsivo.

## Tecnologias Utilizadas

**Frontend:**
* React.js
* React Query (para gerenciamento de estado do servidor, caching e data fetching)
* React Router DOM (para navegação e rotas)
* Axios (ou `fetch` nativo, para chamadas à API própria)
* CSS Customizado (+ potencialmente Tailwind CSS para utilitários)
* Vite (como ferramenta de build e servidor de desenvolvimento)

**Backend:**
* Python 3
* FastAPI (framework web)
* Uvicorn (servidor ASGI)
* Scikit-learn (para `CountVectorizer`, `cosine_similarity` no motor de recomendação)
* Pandas (para manipulação de dados no motor de recomendação)
* NLTK (para processamento de texto no motor de recomendação)
* Requests (para buscar dados da API externa TMDB)

**Fonte de Dados Principal:**
* [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)

## Estrutura do Projeto (Principais Componentes)

* **Backend (`app/api/`):**
    * `api.py`: Define os endpoints da API FastAPI.
    * `models.py`: Contém os modelos Pydantic para validação de dados e schemas de resposta.
    * `processing/client.py`: Funções cliente para interagir com a API do TMDB.
    * `processing/preprocess.py`: Lógica do motor de recomendação (`TMDBRecommender`).
* **Frontend (`app/interface/src/`):**
    * `pages/`: Componentes de página (HomePage, ReleaseMoviesPage, TVSeriesReleasePage, RecommendationFinderPage).
    * `components/`: Componentes reutilizáveis (App, InfoModal, MovieCard, PosterGrid).
    * `hooks/`: Hooks customizados React (useMovies, useDetails, useSearch, useRecommend, useDebounce, etc.).
    * `api.js`: Configuração do cliente Axios/fetch para a API backend.

## Configuração e Instalação (Exemplo)

**Pré-requisitos:**
* Node.js e npm/yarn
* Python 3.8+ e pip

**Backend:**
1.  Clone o repositório.
2.  Navegue até a pasta do backend: `cd app/api`
3.  Crie e ative um ambiente virtual:
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```
4.  Instale as dependências: `pip install -r requirements.txt`
5.  Configure sua chave da API TMDB como uma variável de ambiente:
    ```bash
    export TMDB_API_KEY="SUA_CHAVE_AQUI"
    ```
6.  Rode o servidor FastAPI/Uvicorn:
    ```bash
    uvicorn api:app --reload --port 8000
    ```

**Frontend:**
1.  Navegue até a pasta do frontend: `cd app/interface`
2.  Instale as dependências: `npm install` (ou `yarn install`)
3.  Inicie o servidor de desenvolvimento: `npm run dev` (ou `yarn dev`)
4.  Acesse o aplicativo no seu navegador (geralmente `http://localhost:5173`).

## Próximos Passos e Melhorias Futuras

* Implementar o motor de recomendação de conteúdo para Séries de TV.
* Adicionar paginação ou scroll infinito para os resultados da página "Me Recomende".
* Páginas dedicadas para Atores e Diretores com suas filmografias.
* Filtros avançados (gênero, ano, etc.) nas páginas de descoberta.
* Funcionalidades de usuário: Contas, avaliações, listas "Para Assistir", levando a recomendações personalizadas (ex: filtragem colaborativa).
* Testes unitários e de integração.
* Internacionalização (i18n) completa da interface.

---

Desenvolvido por Luan Mantegazine