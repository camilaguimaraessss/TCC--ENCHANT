/**
 * Trapp Full-Stack Solutions
 * Arquivo: header-component.js
 * Descrição: Componente isolado do Header com funcionalidades completas
 * Instruções: Adicione <script src="header-component.js" defer></script> ao seu arquivo HTML.
 */

(function() {
    // Garante que o script só rode após o carregamento completo do DOM.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHeader);
    } else {
        initializeHeader();
    }

    function initializeHeader() {
        /**
         * Classe responsável pela injeção e gerenciamento do Header
         */
        class HeaderManager {
            constructor() {
                this.injectHeaderStyles();
                this.injectHeaderHTML();
                this.initializeHeaderScripts();
            }

            /**
             * Injeta apenas os estilos CSS relacionados ao Header
             */
            injectHeaderStyles() {
                const css = `
                    /* ===== VARIÁVEIS GLOBAIS ===== */
                    :root {
                        --primary-color: #693B11;
                        --accent-color: #EC9E07;
                        --text-color: #333;
                        --light-bg: #ECECEC;
                        --white: #FFFFFF;
                        --shadow: rgba(180, 180, 180, 0.3);
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
                        padding: 0;
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
                        top: 120%;
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
                        font-size: 14px;
                    }

                    .dropdown-item:hover {
                        background-color: #e0e0e0;
                        color: var(--text-color);
                    }

                    .dropdown-item i {
                        margin-right: 10px;
                        font-size: 16px;
                    }

                    /* ===== RESPONSIVIDADE ===== */
                    @media (max-width: 1024px) {
                        .desktop-nav, .right-section { display: none; }
                        .mobile-menu-toggle, .sidebar-toggle { display: block; }
                        
                        .logo-upload { width: 180px; margin-right: 0; }
                        
                        .header-content {
                            padding: 0 0.5rem;
                            justify-content: space-between;
                        }
                        
                        .main-header { height: 50px; }
                    }

                    @media (max-width: 768px) {
                        .logo-upload { width: 130px; }

                        .profile-dropdown { right: -50px; margin-top: 10px; }
                        .mobile-navbar { margin: 0.5rem; }
                    }

                    /* ===== ESPAÇAMENTO PARA CONTEÚDO ===== */
                    body {
                        padding-top: var(--header-height);
                    }

                    @media (max-width: 1024px) {
                        body {
                            padding-top: 50px;
                        }
                    }
                `;
                
                const styleElement = document.createElement('style');
                styleElement.innerHTML = css;

                // Adiciona as fontes necessárias
                const bootstrapIcons = document.createElement('link');
                bootstrapIcons.rel = 'stylesheet';
                bootstrapIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
                
                const lexendDecaFont = document.createElement('link');
                lexendDecaFont.rel = 'stylesheet';
                lexendDecaFont.href = 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap';
                
                document.head.appendChild(bootstrapIcons);
                document.head.appendChild(lexendDecaFont);
                document.head.appendChild(styleElement);
            }

            /**
             * Injeta apenas a estrutura HTML do Header
             */
            injectHeaderHTML() {
                const headerHTML = `
                    <header class="main-header">
                        <div class="header-content">
                            <a href="/src/views/comprador/dashboard.html"><div class="logo-upload" id="logoUpload"></a>
                                <div class="logo-preview" id="logoPreview">
                                </div>
                            </div>
                            <div class="right-section">
                                <nav class="desktop-nav">
                                    <a href="/src/views/comprador/quemsomos2.html">Quem somos?</a>
                                    <a href="/src/views/comprador/saibamais2.html">Saiba mais</a>
                                </nav>
                                <div class="profile-section">
                                    <button class="profile-button" id="profileButton">
                                        <img id="profilePhoto" class="profile-photo" src="" alt="Foto do Usuário">
                                        <i id="profileIcon" class="bi bi-person-circle profile-icon"></i>
                                        <span>Nome do Usuário</span>
                                    </button>
                                    <div class="profile-dropdown" id="profileDropdown">
                                        <a class="dropdown-item" href="/src/views/comprador/perfilcomprador.html"><i class="bi bi-person"></i> Perfil</a>
                                        <a class="dropdown-item" href="/src/views/comprador/telainicialparaocomprador.html"><i class="bi bi-box-arrow-right"></i> Sair</a>
                                    </div>
                                </div>
                            </div>
                            <button class="mobile-menu-toggle" id="mobileMenuToggle"><i class="bi bi-three-dots"></i></button>
                            <nav class="mobile-navbar" id="mobileNavbar">
                                <ul class="mobile-nav-list">
                                    <li class="mobile-nav-item"><a href="/src/views/comprador/quemsomos2.html">Quem somos?</a></li>
                                    <li class="mobile-nav-item"><a href="/src/views/comprador/saibamais2.html.html">Saiba mais</a></li>
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
                `;

                // Cria um container para o header e injeta o HTML
                const headerContainer = document.createElement('div');
                headerContainer.id = 'trapp-header-container';
                headerContainer.innerHTML = headerHTML;
                
                // Adiciona o header no início do body
                document.body.insertBefore(headerContainer, document.body.firstChild);
            }

            /**
             * Inicializa apenas os scripts relacionados ao Header
             */
            initializeHeaderScripts() {
                class HeaderNavigation {
                    constructor() {
                        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
                        this.mobileNavbar = document.getElementById('mobileNavbar');
                        this.profileButton = document.getElementById('profileButton');
                        this.profileDropdown = document.getElementById('profileDropdown');
                        this.profileButtonMobile = document.getElementById('profileButtonMobile');
                        this.profileDropdownMobile = document.getElementById('profileDropdownMobile');
                        
                        this.init();
                    }

                    init() {
                        this.bindEvents();
                        this.setupImageUploads();
                        this.setupProfilePhoto();
                    }

                    bindEvents() {
                        // Toggle do menu móvel
                        this.mobileMenuToggle.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.toggleMobileMenu();
                        });
                        
                        // Dropdown do perfil (desktop)
                        this.profileButton.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.toggleProfileDropdown();
                        });

                        // Dropdown do perfil (mobile)
                        if (this.profileButtonMobile) {
                            this.profileButtonMobile.addEventListener('click', (e) => {
                                e.stopPropagation();
                                this.profileDropdownMobile.classList.toggle('show');
                            });
                        }
                        
                        // Fecha dropdowns ao clicar fora
                        document.addEventListener('click', (e) => {
                            if (!this.profileButton.contains(e.target) && !this.profileDropdown.contains(e.target)) {
                                this.profileDropdown.classList.remove('show');
                            }
                            if (this.profileDropdownMobile && !this.profileButtonMobile.contains(e.target) && !this.profileDropdownMobile.contains(e.target)) {
                                this.profileDropdownMobile.classList.remove('show');
                            }
                            if (!this.mobileMenuToggle.contains(e.target) && !this.mobileNavbar.contains(e.target)) {
                                this.mobileNavbar.classList.remove('show');
                            }
                        });

                        // Responsividade
                        window.addEventListener('resize', () => this.handleResize());
                    }

                    toggleMobileMenu() {
                        this.mobileNavbar.classList.toggle('show');
                    }

                    toggleProfileDropdown() {
                        this.profileDropdown.classList.toggle('show');
                    }

                    handleResize() {
                        if (window.innerWidth > 1024) {
                            this.mobileNavbar.classList.remove('show');
                            this.profileDropdownMobile.classList.remove('show');
                        }
                    }

                    setupImageUploads() {
                        const logoInput = document.getElementById('logoInput');
                        const logoPreview = document.getElementById('logoPreview');
                        const removeLogo = document.getElementById('removeLogo');

                        logoInput.addEventListener('change', (e) => this.handleImageUpload(e.target, logoPreview));
                        removeLogo.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.removeImage(logoInput, logoPreview);
                        });
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

                    removeImage(input, preview) {
                        input.value = '';
                        preview.style.display = 'none';
                        preview.style.backgroundImage = '';
                        preview.parentElement.querySelector('i').style.display = 'block';
                    }

                    setupProfilePhoto() {
                        const profileIcon = document.getElementById('profileIcon');
                        const profilePhoto = document.getElementById('profilePhoto');
                        const profileIconMobile = document.getElementById('profileIconMobile');
                        const profilePhotoMobile = document.getElementById('profilePhotoMobile');

                        // Cria input oculto para upload da foto de perfil
                        const profilePhotoInput = document.createElement('input');
                        profilePhotoInput.type = 'file';
                        profilePhotoInput.accept = 'image/*';
                        profilePhotoInput.style.display = 'none';
                        document.body.appendChild(profilePhotoInput);

                        // Setup dos cliques nos ícones de perfil
                        const setupProfileIconClick = (icon, input) => {
                            if(icon) icon.addEventListener('click', (e) => {
                                e.stopPropagation();
                                input.click();
                            });
                        }
                        
                        setupProfileIconClick(profileIcon, profilePhotoInput);
                        setupProfileIconClick(profileIconMobile, profilePhotoInput);

                        // Handler para mudança da foto de perfil
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
                
                // Inicializa o header
                new HeaderNavigation();
            }
        }
        
        // Inicia o processo de criação do header
        new HeaderManager();
    }
})();