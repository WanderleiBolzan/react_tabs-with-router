import React from 'react';
import {
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
  Navigate,
} from 'react-router-dom';

// A lista de abas para o componente TabsPage
const tabs = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

// Componente para a página Home
const HomePage = () => (
  <h1 className="title" data-cy="pageTitle">
    Home page
  </h1>
);

// Componente para a página Tabs
const TabsPage = () => {
  // Pega o parâmetro 'tabId' da URL usando useParams
  const { tabId } = useParams();

  // Encontra a aba selecionada com base no tabId da URL
  const selectedTab = tabs.find(tab => tab.id === tabId);

  return (
    <>
      <h1 className="title" data-cy="pageTitle">
        Tabs page
      </h1>
      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.id}
              data-cy="Tab"
              // Adiciona a classe 'is-active' se o tabId da URL corresponder
              className={selectedTab?.id === tab.id ? 'is-active' : ''}
            >
              {/* Usa o componente Link para navegação sem recarregar a página */}
              <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="block" data-cy="TabContent">
        {/* Se a aba for encontrada, mostra o conteúdo, caso contrário, mostra a mensagem */}
        {selectedTab ? (
          <p>{selectedTab.content}</p>
        ) : (
          <p>Please select a tab</p>
        )}
      </div>
    </>
  );
};

// Componente para a página "Não Encontrado"
const NotFoundPage = () => (
  <h1 className="title" data-cy="pageTitle">
    Page not found
  </h1>
);

// Componente principal da aplicação
export const App = () => {
  // useMatch verifica se o caminho atual corresponde ao padrão
  const isHomePage = useMatch('/');
  const isTabsPage = useMatch('/tabs/*'); // O curinga '*' garante que ele corresponda a /tabs e /tabs/:tabId

  return (
    <>
      {/* Estilos para Bulma e Font Awesome para corrigir erros de importação */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/
        font-awesome/6.1.1/css/all.min.css"
      />

      {/* Estilos personalizados embutidos para corrigir a importação de App.scss */}
      <style>
        {`
        html.has-navbar-fixed-top {
          padding-top: 52px; /* Altura da barra de navegação */
        }
        `}
      </style>

      {/* Requer a classe <html class="has-navbar-fixed-top"> para o navbar fixo */}
      <nav
        className="navbar is-light is-fixed-top is-mobile has-shadow"
        data-cy="Nav"
      >
        <div className="container">
          <div className="navbar-brand">
            {/* Link para a página Home, com a classe 'is-active' condicional */}
            <Link
              to="/"
              className={`navbar-item ${isHomePage ? 'is-active' : ''}`}
            >
              Home
            </Link>
            {/* Link para a página Tabs, com a classe 'is-active' condicional */}
            <Link
              to="/tabs"
              className={`navbar-item ${isTabsPage ? 'is-active' : ''}`}
            >
              Tabs
            </Link>
          </div>
        </div>
      </nav>

      <div className="section">
        <div className="container">
          {/* O Outlet renderiza o componente de rota correspondente */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Redireciona a rota /home para a rota / */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            {/* Rotas aninhadas para a página Tabs */}
            <Route path="/tabs">
              {/* Rota para /tabs, mostra a página Tabs sem uma aba selecionada */}
              <Route index element={<TabsPage />} />
              {/* Rota para /tabs/:tabId, mostra a página Tabs com uma aba selecionada */}
              <Route path=":tabId" element={<TabsPage />} />
            </Route>
            {/* Rota de fallback para lidar com URLs não correspondentes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
