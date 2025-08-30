/**
 * Trapp Full-Stack Solutions
 * Arquivo: layout-dinamico.js (v1.1 - Corrigido)
 * Descrição: Componente de layout completo (Header, Sidebar, Footer, Modals)
 * que injeta dinamicamente HTML, CSS e JavaScript em qualquer página.
 * Instruções: Adicione <script src="layout-dinamico.js" defer></script> ao seu arquivo HTML.
 */

(function() {
    // Garante que o script só rode após o carregamento completo do DOM.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLayout);
    } else {
        initializeLayout();
    }

    function initializeLayout() {
        /**
         * Classe principal que gerencia a injeção do layout na página.
         */
        class DynamicLayoutManager {
            constructor() {
                this.injectStyles();
                this.injectHTML();
                this.initializeScripts();
            }

            /**
             * Injeta todo o CSS necessário dentro de uma tag <style> no <head> do documento.
             */
            injectStyles() {
                const css = `
                    /* ===== VARIÁVEIS E RESET ===== */
                    :root {
                        --primary-color: #693B11;
                        --accent-color: #EC9E07;
                        --text-color: #333;
                        --light-bg: #ECECEC;
                        --white: #FFFFFF;
                        --shadow: rgba(180, 180, 180, 0.3);
                        --sidebar-width: 230px;
                        --sidebar-collapsed: 50px;
                        --header-height: 56px;
                        --transition: 0.3s ease;
                    }

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        font-family: "Lexend Deca", sans-serif;
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        background-color: var(--white);
                    }

                    /* ===== HEADER ===== */
                    .main-header {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: var(--header-height);
                        background-color: var(--white);
                        box-shadow: 0 1px 3px var(--shadow);
                        z-index: 1000;
                        transition: var(--transition);
                    }

                    .header-content {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        padding: 0 1rem;
                        transition: var(--transition);
                    }

                    .sidebar-toggle {
                        background: none;
                        border: none;
                        font-size: 1.2rem;
                        cursor: pointer;
                        padding: 0.5rem;
                        color: var(--text-color);
                        margin-right: 15px;
                        display: none; /* Escondido no desktop */
                    }

                    .logo-upload {
                        position: relative;
                        background-color: #D3D3D3;
                        border: none;
                        border-radius: 5px;
                        width: 220px;
                        height: 38px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: var(--transition);
                        margin-right: auto;
                    }

                    .logo-upload input {
                        display: none;
                    }

                    .logo-upload i {
                        font-size: 1.5rem;
                        color: var(--text-color);
                    }

                    .logo-preview {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                        border-radius: 5px;
                        display: none;
                    }

                    .remove-logo {
                        position: absolute;
                        top: 2px;
                        right: 2px;
                        background: rgba(255, 255, 255, 0.8);
                        border: none;
                        border-radius: 50%;
                        width: 16px;
                        height: 16px;
                        font-size: 10px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        line-height: 1;
                    }

                    /* ===== NAVEGAÇÃO DESKTOP ===== */
                    .desktop-nav {
                        display: flex;
                        align-items: center;
                        gap: 2rem;
                        margin-right: 2rem;
                    }

                    .desktop-nav a {
                        color: var(--text-color);
                        text-decoration: none;
                        font-size: 14px;
                        font-weight: 400;
                        transition: color 0.2s;
                    }


                    .right-section {
                        display: flex;
                        align-items: center;
                        margin-left: auto;
                    }

                    .mobile-menu-toggle {
                        background: none;
                        border: none;
                        font-size: 1.2rem;
                        cursor: pointer;
                        padding: 0.5rem;
                        color: var(--text-color);
                        display: none;
                    }

                    /* ===== NAVBAR MÓVEL ===== */
                    .mobile-navbar {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background-color: var(--white);
                        box-shadow: 0 3px 10px var(--shadow);
                        border-radius: 15px;
                        margin: 0.5rem 1rem;
                        padding: 1rem;
                        display: none;
                        z-index: 999;
                    }

                    .mobile-navbar.show {
                        display: block;
                    }

                    .mobile-nav-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .mobile-nav-item a {
                        color: var(--text-color);
                        text-decoration: none;
                        padding: 0.5rem 0;
                        display: block;
                        font-size: 14px;
                    }

                    .mobile-nav-item a:hover {
                        color: var(--accent-color);
                    }
                    
                    /* ===== PERFIL DROPDOWN ===== */
                    .profile-section {
                        position: relative;
                    }

                    .profile-button {
                        background: none;
                        border: none;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        cursor: pointer;
                        font-size: 14px;
                        color: var(--text-color);
                        padding: 0; /* Reset padding */
                    }

                    .profile-photo {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 2px solid #CCC;
                        display: none;
                    }

                    .profile-icon {
                        font-size: 35px;
                        color: #CCC;
                    }

                    .profile-dropdown {
                        position: absolute;
                        top: 120%; /* Posição ajustada */
                        right: 0;
                        background: var(--light-bg);
                        border-radius: 8px;
                        padding: 10px;
                        min-width: 150px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        display: none;
                        z-index: 1001;
                    }
                    
                    .profile-dropdown.show {
                        display: block;
                    }

                    .dropdown-item {
                        display: flex;
                        align-items: center;
                        padding: 8px 15px;
                        text-decoration: none;
                        color: var(--text-color);
                        border-radius: 6px;
                        transition: background-color 0.2s;
                        font-size: 14px; /* Tamanho da fonte consistente */
                    }

                    .dropdown-item:hover {
                        background-color: #e0e0e0;
                        color: var(--text-color);
                    }

                    .dropdown-item i {
                        margin-right: 10px;
                        font-size: 16px;
                    }

                    /* ===== SIDEBAR ===== */
                    .sidebar {
                        position: fixed;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: var(--sidebar-collapsed);
                        background-color: var(--light-bg);
                        transition: var(--transition);
                        overflow: hidden;
                        z-index: 800;
                        border-radius: 0 6px 6px 0;
                    }
                    
                    @media (min-width: 1025px) {
                        .sidebar {
                            display: block;
                            width: var(--sidebar-collapsed);
                        }
                        .sidebar:hover {
                            width: var(--sidebar-width);
                        }
                        .sidebar:hover .sidebar-nav a span {
                            opacity: 1;
                            visibility: visible;
                        }
                    }

                    .sidebar-nav {
                        padding-top: var(--header-height);
                    }

                    .sidebar-nav a {
                        display: flex;
                        align-items: center;
                        color: var(--text-color);
                        padding: 13px;
                        text-decoration: none;
                        white-space: nowrap;
                        transition: var(--transition);
                    }

                    .sidebar-nav a:hover {
                        background-color: rgba(0, 0, 0, 0.05);
                    }

                    .sidebar-nav i {
                        font-size: 1.2rem;
                        margin-right: 20px;
                        color: #4e4e4e;
                        min-width: 20px;
                        text-align: center;
                    }

                    .sidebar-nav span {
                        font-size: 14px;
                        opacity: 0;
                        visibility: hidden;
                        transition: opacity 0.2s, visibility 0.2s;
                    }

                    /* ===== CONTEÚDO PRINCIPAL ===== */
                    .main-content {
                        margin-left: var(--sidebar-collapsed);
                        padding-top: var(--header-height);
                        transition: var(--transition);
                        min-height: calc(100vh - var(--header-height));
                    }

                    .content-area {
                        padding: 20px;
                    }

                    /* ===== MODAIS SOCIAIS ===== */
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.7);
                        z-index: 1100;
                        display: none;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    .modal-overlay.show {
                        display: block;
                        opacity: 1;
                    }

                    .social-modal {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(0.9);
                        background-color: var(--white);
                        width: 500px;
                        max-width: 90vw;
                        border-radius: 40px;
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
                        padding: 30px;
                        z-index: 1101;
                        display: none;
                        opacity: 0;
                        transition: opacity 0.3s ease, transform 0.3s ease;
                    }

                    .social-modal.show {
                        display: block;
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }

                    .modal-header {
                        display: flex;
                        justify-content: flex-end;
                        margin-bottom: 20px;
                    }

                    .modal-close {
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: var(--text-color);
                    }

                    .modal-title {
                        font-size: 20px;
                        margin-bottom: 10px;
                        text-align: left;
                    }

                    .modal-subtitle {
                        font-size: 14px;
                        color: var(--text-color);
                        margin-bottom: 20px;
                    }

                    .social-input {
                        width: 100%;
                        height: 45px;
                        border-radius: 15px;
                        border: 1.5px solid #535151;
                        padding: 0 15px;
                        margin-bottom: 20px;
                        outline: none;
                        font-size: 14px;
                    }

                    .modal-buttons {
                        display: flex;
                        justify-content: flex-end;
                        gap: 10px;
                    }

                    .btn-confirm, .btn-edit {
                        background-color: rgba(226, 204, 174, 1);
                        border: none;
                        border-radius: 15px;
                        padding: 10px 20px;
                        font-size: 14px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .btn-confirm:hover, .btn-edit:hover {
                         background-color: #d8b894;
                    }
                    .btn-edit { display: none; }

                    .social-link {
                        text-align: center;
                        margin: 20px 0;
                    }

                    .social-link a {
                        color: var(--accent-color);
                        font-size: 16px;
                        word-wrap: break-word;
                    }

                    /* ===== FOOTER ===== */
                    .main-footer {
                        background-color: #FCF2E8;
                        padding: 30px 50px;
                        margin-left: var(--sidebar-collapsed);
                        transition: var(--transition);
                    }

                    .footer-content {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 40px;
                        flex-wrap: wrap;
                    }

                    .footer-left { max-width: 400px; }

                    .footer-logo-upload {
                        background-color: #D3D3D3;
                        border: none;
                        height: 60px;
                        border-radius: 5px;
                        cursor: pointer;
                        width: 200px;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    .footer-logo-upload input { display: none; }
                    .footer-text {
                        font-size: 10px;
                        line-height: 1.5;
                        margin-bottom: 10px;
                    }

                    .footer-right {
                        display: flex;
                        gap: 40px;
                        margin-top: 20px;
                    }

                    .footer-column {
                        display: flex;
                        flex-direction: column;
                        min-width: 200px;
                        text-align: center;
                    }

                    .footer-column h3 {
                        font-weight: 400;
                        font-size: 16px;
                        color: #535151;
                        margin-bottom: 10px;
                    }

                    .footer-column a, .footer-column button {
                        color: var(--accent-color);
                        text-decoration: none;
                        font-size: 12px;
                        display: block;
                        margin-bottom: 5px;
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0; /* Reset padding */
                        text-align: center; /* Garantir alinhamento */
                    }

                    .footer-column a:hover, .footer-column button:hover {
                        text-decoration: underline;
                        color: #8B7777;
                    }
                    
                    /* ===== OVERLAY PARA MOBILE ===== */
                    .sidebar-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 799; /* Abaixo da sidebar */
                        display: none;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .sidebar-overlay.show {
                        display: block;
                        opacity: 1;
                    }

                    /* ===== RESPONSIVIDADE ===== */
                    @media (max-width: 1024px) {
                        .desktop-nav, .right-section { display: none; }
                        .mobile-menu-toggle, .sidebar-toggle { display: block; }
                        
                        .sidebar {
                            left: -100%;
                            width: var(--sidebar-width);
                            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
                        }
                        .sidebar.open { left: 0; }
                        .sidebar-nav span { opacity: 1; visibility: visible; }
                        
                        .logo-upload { width: 180px; margin-right: 0; }
                        .main-content, .main-footer { margin-left: 0; }
                        
                        .header-content {
                            padding: 0 0.5rem;
                            justify-content: space-between;
                        }
                        
                        .main-header { height: 50px; }
                        .main-content { padding-top: 50px; }
                        .sidebar-nav { padding-top: 50px; }
                        
                        .social-modal {
                            width: 400px;
                            border-radius: 30px;
                            padding: 20px;
                        }
                        .social-input { height: 40px; }
                    }

                    @media (max-width: 768px) {
                        .logo-upload { width: 130px; }
                        .social-modal { width: 320px; }

                        .footer-content {
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                            gap: 20px;
                            padding: 0 10px;
                        }
                        .footer-left {
                            max-width: 100%;
                            width: 100%;
                        }
                        .footer-logo-upload {
                            width: 150px;
                            height: 50px;
                            margin: 0 auto 15px auto;
                        }
                        .footer-right {
                            flex-direction: column;
                            gap: 15px;
                            width: 100%;
                            margin-top: 0;
                        }
                        .footer-column { min-width: auto; width: 100%; }
                        .footer-column h3 { font-size: 14px; margin-bottom: 8px; }
                        .footer-column a, .footer-column button { font-size: 12px; margin-bottom: 3px; }
                        .footer-text { font-size: 9px; margin-bottom: 8px; text-align: center; }
                        .main-footer { padding: 15px 10px; }

                        .profile-dropdown { right: -50px; margin-top: 10px; }
                        .mobile-navbar { margin: 0.5rem; }
                    }

                    @media (min-width: 769px) and (max-width: 1024px) {
                        .footer-content {
                            flex-wrap: wrap;
                            justify-content: center;
                            gap: 30px;
                        }
                        .footer-left {
                            max-width: 100%;
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .footer-right {
                            justify-content: center;
                            gap: 30px;
                            width: 100%;
                        }
                        .footer-column { min-width: 180px; }
                        .footer-column h3 { font-size: 15px; }
                        .footer-column a, .footer-column button { font-size: 11px; }
                        .footer-text { font-size: 10px; }
                        .main-footer { padding: 25px 20px; }
                    }
                `;
                const styleElement = document.createElement('style');
                styleElement.innerHTML = css;

                const bootstrapIcons = document.createElement('link');
                bootstrapIcons.rel = 'stylesheet';
                bootstrapIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
                
                const passionOneFont = document.createElement('link');
                passionOneFont.rel = 'stylesheet';
                passionOneFont.href = 'https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap';

                const lexendDecaFont = document.createElement('link');
                lexendDecaFont.rel = 'stylesheet';
                lexendDecaFont.href = 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap';
                
                document.head.appendChild(bootstrapIcons);
                document.head.appendChild(passionOneFont);
                document.head.appendChild(lexendDecaFont);
                document.head.appendChild(styleElement);
            }

            /**
             * Injeta toda a estrutura HTML dentro de um container no <body> do documento.
             */
            injectHTML() {
                const html = `
                    <header class="main-header">
                        <div class="header-content">
                            <button class="sidebar-toggle" id="sidebarToggle"><i class="bi bi-list"></i></button>
                            <div class="logo-upload" id="logoUpload">
                                <label for="logoInput"><i class="bi bi-plus"></i></label>
                                <input type="file" id="logoInput" accept="image/*">
                                <div class="logo-preview" id="logoPreview">
                                    <button class="remove-logo" id="removeLogo">×</button>
                                </div>
                            </div>
                            <div class="right-section">
                                <nav class="desktop-nav">
                                    <a href="#quem-somos">Quem somos?</a>
                                    <a href="#saiba-mais">Saiba mais</a>
                                </nav>
                                <div class="profile-section">
                                    <button class="profile-button" id="profileButton">
                                        <img id="profilePhoto" class="profile-photo" src="" alt="Foto do Usuário">
                                        <i id="profileIcon" class="bi bi-person-circle profile-icon"></i>
                                        <span>Nome do Usuário</span>
                                    </button>
                                    <div class="profile-dropdown" id="profileDropdown">
                                        <a class="dropdown-item" href="#perfil"><i class="bi bi-person"></i> Perfil</a>
                                        <a class="dropdown-item" href="#sair"><i class="bi bi-box-arrow-right"></i> Sair</a>
                                    </div>
                                </div>
                            </div>
                            <button class="mobile-menu-toggle" id="mobileMenuToggle"><i class="bi bi-three-dots"></i></button>
                            <nav class="mobile-navbar" id="mobileNavbar">
                                <ul class="mobile-nav-list">
                                    <li class="mobile-nav-item"><a href="#quem-somos">Quem somos?</a></li>
                                    <li class="mobile-nav-item"><a href="#saiba-mais">Saiba mais</a></li>
                                    <li class="mobile-nav-item">
                                        <div class="profile-section">
                                            <button class="profile-button" id="profileButtonMobile">
                                                <img id="profilePhotoMobile" class="profile-photo" src="" alt="Foto do Usuário">
                                                <i id="profileIconMobile" class="bi bi-person-circle profile-icon"></i>
                                                <span>Nome do Usuário</span>
                                            </button>
                                            <div class="profile-dropdown" id="profileDropdownMobile">
                                                <a class="dropdown-item" href="#perfil"><i class="bi bi-person"></i> Perfil</a>
                                                <a class="dropdown-item" href="#sair"><i class="bi bi-box-arrow-right"></i> Sair</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                    <aside class="sidebar" id="sidebar">
                        <nav class="sidebar-nav">
                            <a href="#mapa"><i class="bi bi-map"></i><span>Mapa</span></a>
                            <a href="#abrigo"><i class="bi bi-geo"></i><span>Pontos de abrigo</span></a>
                            <a href="#ajuda-medica"><i class="bi bi-truck"></i><span>Ajuda médica</span></a>
                            <a href="#doacao"><i class="bi bi-box"></i><span>Doação</span></a>
                            <a href="#coleta"><i class="bi bi-geo-alt-fill"></i><span>Pontos de coleta</span></a>
                            <a href="#historico"><i class="bi bi-journal"></i><span>Histórico de doação</span></a>
                            <a href="#politica"><i class="bi bi-file-earmark"></i><span>Política de privacidade</span></a>
                            <a href="#transparencia"><i class="bi bi-search"></i><span>Transparência</span></a>
                            <a href="#verificacao"><i class="bi bi-check-circle-fill"></i><span>Verificação de doações</span></a>
                            <a href="#ajuda"><i class="bi bi-info-circle"></i><span>Ajuda</span></a>
                        </nav>
                    </aside>
                    <div class="sidebar-overlay" id="sidebarOverlay"></div>
                    <main class="main-content">
                        <div class="content-area">
                            </div>
                    </main>
                    <footer class="main-footer">
                        <div class="footer-content">
                            <div class="footer-left">
                                <div class="footer-logo-upload" id="footerLogoUpload">
                                    <label for="footerLogoInput"><i class="bi bi-plus" style="font-size: 1.5rem;"></i></label>
                                    <input type="file" id="footerLogoInput" accept="image/*">
                                </div>
                                <p class="footer-text">De forma alguma o site foi criado com o intuito de desviar os termos relacionados à política de privacidade do cadastrante. O site está disponível para toda e qualquer ajuda em relação aos contatos.</p>
                                <p class="footer-text">© 2025 ENCHANT Brasil</p>
                            </div>
                            <div class="footer-right">
                                <div class="footer-column"><h3>MAIS INFORMAÇÕES</h3><a href="#saiba-mais">Conheça mais sobre o site</a></div>
                                <div class="footer-column"><h3>PROTEÇÃO DE DADOS</h3><a href="#politica">Política de privacidade</a></div>
                                <div class="footer-column"><h3>ACOMPANHE NOSSAS REDES</h3><button id="instagramBtn">Instagram</button><button id="facebookBtn">Facebook</button></div>
                            </div>
                        </div>
                    </footer>
                    <div class="modal-overlay" id="modalOverlay"></div>
                    <div class="social-modal" id="instagramModal">
                        <div class="modal-header"><button class="modal-close" id="closeInstagramModal"><i class="bi bi-x-circle"></i></button></div>
                        <h2 class="modal-title">Insira aqui o Instagram da sua empresa</h2>
                        <p class="modal-subtitle">Aqui você pode inserir o Instagram da sua empresa!</p><hr>
                        <input type="text" class="social-input" id="instagramInput" placeholder="Digite seu @ ou nome de usuário">
                        <div class="social-link" id="instagramLink"></div>
                        <div class="modal-buttons">
                            <button class="btn-confirm" id="confirmInstagram">Confirmar</button>
                            <button class="btn-edit" id="editInstagram">Editar</button>
                        </div>
                    </div>
                    <div class="social-modal" id="facebookModal">
                        <div class="modal-header"><button class="modal-close" id="closeFacebookModal"><i class="bi bi-x-circle"></i></button></div>
                        <h2 class="modal-title">Insira aqui o Facebook da sua empresa</h2>
                        <p class="modal-subtitle">Aqui você pode inserir o Facebook da sua empresa!</p><hr>
                        <input type="text" class="social-input" id="facebookInput" placeholder="Digite seu @ ou nome de usuário">
                        <div class="social-link" id="facebookLink"></div>
                        <div class="modal-buttons">
                            <button class="btn-confirm" id="confirmFacebook">Confirmar</button>
                            <button class="btn-edit" id="editFacebook">Editar</button>
                        </div>
                    </div>
                `;

                // ✅ SOLUÇÃO:
                // 1. Guarda os nós filhos do body (elementos, scripts, etc.)
                const originalBodyNodes = [...document.body.childNodes];

                // 2. Limpa o body
                document.body.innerHTML = '';
                
                // 3. Cria um container para o nosso layout e injeta o HTML nele
                const appContainer = document.createElement('div');
                appContainer.id = 'trapp-layout-container';
                appContainer.innerHTML = html;

                // 4. Adiciona o novo container ao body
                document.body.appendChild(appContainer);
                
                // 5. Encontra a área de conteúdo dentro do nosso layout
                const contentArea = appContainer.querySelector('.content-area');
                
                // 6. Move os nós originais para dentro da área de conteúdo, garantindo que o script continue funcionando
                if (contentArea) {
                    originalBodyNodes.forEach(node => {
                        // Evita mover o próprio script para dentro do conteúdo
                        if (node.tagName !== 'SCRIPT' || !node.src.includes('layout-dinamico.js')) {
                             contentArea.appendChild(node);
                        }
                    });
                }
            }

            /**
             * Inicializa todos os scripts e listeners de eventos após a injeção do HTML.
             */
            initializeScripts() {
                class ResponsiveNavigation {
                    constructor() {
                        this.sidebar = document.getElementById('sidebar');
                        this.sidebarToggle = document.getElementById('sidebarToggle');
                        this.sidebarOverlay = document.getElementById('sidebarOverlay');
                        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
                        this.mobileNavbar = document.getElementById('mobileNavbar');
                        this.profileButton = document.getElementById('profileButton');
                        this.profileDropdown = document.getElementById('profileDropdown');
                        this.modalOverlay = document.getElementById('modalOverlay');
                        
                        this.init();
                    }

                    init() {
                        this.bindEvents();
                        this.setupImageUploads();
                        this.setupSocialModals();
                    }

                    bindEvents() {
                        this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
                        this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
                        
                        this.mobileMenuToggle.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.toggleMobileMenu();
                        });
                        
                        this.profileButton.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.toggleProfileDropdown();
                        });

                        const profileButtonMobile = document.getElementById('profileButtonMobile');
                        const profileDropdownMobile = document.getElementById('profileDropdownMobile');
                        
                        if (profileButtonMobile) {
                            profileButtonMobile.addEventListener('click', (e) => {
                                e.stopPropagation();
                                profileDropdownMobile.classList.toggle('show');
                            });
                        }
                        
                        document.addEventListener('click', (e) => {
                            if (!this.profileButton.contains(e.target) && !this.profileDropdown.contains(e.target)) {
                                this.profileDropdown.classList.remove('show');
                            }
                            if (profileDropdownMobile && !profileButtonMobile.contains(e.target) && !profileDropdownMobile.contains(e.target)) {
                                profileDropdownMobile.classList.remove('show');
                            }
                            if (!this.mobileMenuToggle.contains(e.target) && !this.mobileNavbar.contains(e.target)) {
                                this.mobileNavbar.classList.remove('show');
                            }
                        });

                        window.addEventListener('resize', () => this.handleResize());
                    }

                    toggleSidebar() {
                        if (window.innerWidth <= 1024) {
                            this.sidebar.classList.toggle('open');
                            this.sidebarOverlay.classList.toggle('show');
                            document.body.style.overflow = this.sidebar.classList.contains('open') ? 'hidden' : '';
                        }
                    }

                    closeSidebar() {
                        this.sidebar.classList.remove('open');
                        this.sidebarOverlay.classList.remove('show');
                        document.body.style.overflow = '';
                    }

                    toggleMobileMenu() {
                        this.mobileNavbar.classList.toggle('show');
                    }

                    toggleProfileDropdown() {
                        this.profileDropdown.classList.toggle('show');
                    }

                    handleResize() {
                        if (window.innerWidth > 1024) {
                            this.closeSidebar();
                            this.mobileNavbar.classList.remove('show');
                            document.getElementById('profileDropdownMobile').classList.remove('show');
                        }
                    }

                    setupImageUploads() {
                        const logoInput = document.getElementById('logoInput');
                        const logoPreview = document.getElementById('logoPreview');
                        const removeLogo = document.getElementById('removeLogo');
                        const footerLogoInput = document.getElementById('footerLogoInput');

                        logoInput.addEventListener('change', (e) => this.handleImageUpload(e.target, logoPreview));
                        removeLogo.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.removeImage(logoInput, logoPreview);
                        });
                        footerLogoInput.addEventListener('change', (e) => this.handleFooterImageUpload(e.target));
                    }

                    handleImageUpload(input, preview) {
                        if (input.files && input.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                preview.style.backgroundImage = `url(${e.target.result})`;
                                preview.style.display = 'block';
                                preview.parentElement.querySelector('i').style.display = 'none';
                            };
                            reader.readAsDataURL(input.files[0]);
                        }
                    }
                    
                    handleFooterImageUpload(input) {
                        if (input.files && input.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const container = input.closest('.footer-logo-upload');
                                container.style.backgroundImage = `url(${e.target.result})`;
                                container.querySelector('i').style.display = 'none';
                            };
                            reader.readAsDataURL(input.files[0]);
                        }
                    }

                    removeImage(input, preview) {
                        input.value = '';
                        preview.style.display = 'none';
                        preview.style.backgroundImage = '';
                        preview.parentElement.querySelector('i').style.display = 'block';
                    }

                    setupSocialModals() {
                        const socialConfigs = [
                            { platform: 'instagram', btnId: 'instagramBtn', modalId: 'instagramModal', closeId: 'closeInstagramModal', confirmId: 'confirmInstagram', editId: 'editInstagram', inputId: 'instagramInput', linkId: 'instagramLink' },
                            { platform: 'facebook', btnId: 'facebookBtn', modalId: 'facebookModal', closeId: 'closeFacebookModal', confirmId: 'confirmFacebook', editId: 'editFacebook', inputId: 'facebookInput', linkId: 'facebookLink' }
                        ];

                        socialConfigs.forEach(config => {
                            const btn = document.getElementById(config.btnId);
                            const modal = document.getElementById(config.modalId);
                            const closeBtn = document.getElementById(config.closeId);
                            const confirmBtn = document.getElementById(config.confirmId);
                            const editBtn = document.getElementById(config.editId);
                            const input = document.getElementById(config.inputId);
                            const linkContainer = document.getElementById(config.linkId);

                            btn.addEventListener('click', () => this.openModal(modal));
                            closeBtn.addEventListener('click', () => this.closeModal(modal));
                            confirmBtn.addEventListener('click', () => this.handleSocialConfirm(config.platform, input, linkContainer, confirmBtn, editBtn, btn));
                            editBtn.addEventListener('click', () => this.handleSocialEdit(config.platform, input, linkContainer, confirmBtn, editBtn));
                        });

                        this.modalOverlay.addEventListener('click', () => this.closeAllModals());
                    }

                    openModal(modal) {
                        this.modalOverlay.classList.add('show');
                        modal.classList.add('show');
                        document.body.style.overflow = 'hidden';
                    }

                    closeModal(modal) {
                        this.modalOverlay.classList.remove('show');
                        modal.classList.remove('show');
                        document.body.style.overflow = '';
                    }

                    closeAllModals() {
                        document.querySelectorAll('.social-modal').forEach(m => m.classList.remove('show'));
                        this.modalOverlay.classList.remove('show');
                        document.body.style.overflow = '';
                    }

                    handleSocialConfirm(platform, input, linkContainer, confirmBtn, editBtn, mainBtn) {
                        const value = input.value.trim();
                        if (value) {
                            const username = value.replace(/^@/, '');
                            const url = platform === 'instagram' ? `https://www.instagram.com/${username}` : `https://www.facebook.com/${username}`;
                            
                            linkContainer.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
                            input.style.display = 'none';
                            confirmBtn.style.display = 'none';
                            editBtn.style.display = 'block';
                            
                            const subtitle = input.closest('.social-modal').querySelector('.modal-subtitle');
                            subtitle.textContent = `Aqui você pode editar o ${platform} da sua empresa!`;
                        } else {
                            alert(`Por favor, insira um nome de usuário válido.`);
                        }
                    }

                    handleSocialEdit(platform, input, linkContainer, confirmBtn, editBtn) {
                        input.style.display = 'block';
                        confirmBtn.style.display = 'block';
                        linkContainer.innerHTML = '';
                        editBtn.style.display = 'none';

                        const subtitle = input.closest('.social-modal').querySelector('.modal-subtitle');
                        subtitle.textContent = `Aqui você pode inserir o ${platform} da sua empresa!`;
                    }
                }
                new ResponsiveNavigation();

                // Profile photo functionality
                const profileIcon = document.getElementById('profileIcon');
                const profilePhoto = document.getElementById('profilePhoto');
                const profileIconMobile = document.getElementById('profileIconMobile');
                const profilePhotoMobile = document.getElementById('profilePhotoMobile');

                const profilePhotoInput = document.createElement('input');
                profilePhotoInput.type = 'file';
                profilePhotoInput.accept = 'image/*';
                profilePhotoInput.style.display = 'none';
                document.body.appendChild(profilePhotoInput);

                const setupProfileIconClick = (icon, input) => {
                    if(icon) icon.addEventListener('click', (e) => {
                        e.stopPropagation();
                        input.click();
                    });
                }
                
                setupProfileIconClick(profileIcon, profilePhotoInput);
                setupProfileIconClick(profileIconMobile, profilePhotoInput);

                profilePhotoInput.addEventListener('change', function() {
                    if (this.files && this.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const imageUrl = e.target.result;
                            if (profilePhoto) {
                                profilePhoto.src = imageUrl;
                                profilePhoto.style.display = 'inline-block';
                            }
                            if (profilePhotoMobile) {
                                profilePhotoMobile.src = imageUrl;
                                profilePhotoMobile.style.display = 'inline-block';
                            }
                            if (profileIcon) profileIcon.style.display = 'none';
                            if (profileIconMobile) profileIconMobile.style.display = 'none';
                        };
                        reader.readAsDataURL(this.files[0]);
                    }
                });
            }
        }
        
        // Inicia todo o processo
        new DynamicLayoutManager();
    }
})();