// ==========================================
// SCRIPT COMPLETO - HEADER, SIDEBAR E FUNCIONALIDADES
// ==========================================

class HeaderSidebarManager {
  constructor() {
    this.init();
  }

  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================
  init() {
    this.injectStyles();
    this.injectHTML();
    this.setupEventListeners();
    this.setupImageHandling();
    this.loadSavedData();
  }

  // ==========================================
  // INJEÇÃO DE ESTILOS CSS
  // ==========================================
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @import url("https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap");
      @import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap");

      body {
        display: flex;
        flex-direction: column;
        font-family: "Lexend Deca", sans-serif;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }

      /* Sidebar Expanded Classes */
      .sidebar-expanded .container-fluid {
        padding-left: 180px;
      }

      .sidebar-expanded .navbar-nav {
        margin-left: 170px;
      }

      #imgheader {
        transition: margin-left 0.3s ease;
      }

      .sidebar-expanded #imgheader {
        margin-left: 20px;
      }

      .header.animated {
        animation: slideIn 0.5s ease-in-out;
      }

      .container-fluid {
        position: relative;
        transition: padding-left 0.3s ease;
      }

      .page-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-top: 65px;
        margin-left: 60px;
        position: relative;
      }

      /* NAVBAR STYLES */
      .navbar {
        background-color: #ffffff;
        padding-left: 3rem;
        padding-right: 3rem;
        height: 56px;
        box-shadow: #b4b4b4 1px 0 3px 0px;
      }

      .navbar-nav {
        display: flex;
        justify-content: start;
        padding-left: 3rem;
        align-items: center;
        flex-grow: 1;
        list-style: none;
        margin-right: 3rem;
        gap: 3rem;
        font-size: 14px;
      }

      .container-fluid {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      /* PROFILE DROPDOWN */
      .profile-dropdown {
        position: absolute;
        display: flex;
        align-items: center;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }

      .profile-dropdown button {
        display: flex;
        align-items: center;
        gap: 10px;
        border: none;
        background: none;
        font-size: 16px;
        color: black;
      }

      .dropdown-item {
        display: flex;
        align-items: center;
        padding: 8px 15px;
        text-decoration: none;
        color: #333;
        transition: background-color 0.2s;
      }

      .dropdown-item:hover {
        background-color: #e0e0e0;
        border-radius: 6px;
      }

      .dropdown-item i {
        margin-right: 10px;
        font-size: 16px;
      }

      .profile-dropdown img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #CCC;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        display: none;
        background: #ECECEC;
        border: none;
        padding: 10px;
      }

      .profile-dropdown:hover .dropdown-menu {
        display: block;
      }

      /* UPLOAD BUTTON */
      #imgheader {
        background-color: #D3D3D3;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 220px;
        z-index: 800;
        height: 38px;
        position: relative;
      }

      .upload-btn input {
        display: none;
      }

      .upload-btn {
        position: relative;
      }

      .image-preview {
        border-radius: 5px;
      }

      /* USER PHOTO */
      .profile-dropdown img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #CCC;
        display: none;
      }

      #userIcon {
        font-size: 40px;
        color: #CCC;
        display: inline;
        cursor: pointer;
      }

      /* SIDEBAR STYLES */
      .sidebar {
        position: fixed;
        left: 0;
        height: 100vh;
        width: 60px;
        background-color: #ECECEC;
        transition: width 0.3s ease;
        overflow: hidden;
        z-index: 700;
        margin-top: 0;
        top: 0px;
        border-radius: 6px;
      }

      .sidebar-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 650;
      }

      .sidebar:hover {
        width: 230px;
      }

      .sidebar nav a {
        display: flex;
        align-items: center;
        color: rgb(0, 0, 0);
        padding: 15px;
        text-decoration: none;
        white-space: nowrap;
      }

      .sidebar nav a i {
        font-size: 1.2rem;
        margin-right: 20px;
      }

      .sidebar nav a span {
        display: none;
      }

      .sidebar:hover nav a span {
        display: inline;
      }

      /* HEADER */
      header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 200;
      }

      main {
        flex: 1;
        min-height: 200px;
        padding: 20px;
        transition: margin-left 0.3s ease;
      }

      #btnn {
        width: 7.5rem;
        display: inline-block;
      }

      #btnn2 {
        width: 180px;
        padding: 10px;
        display: inline-block;
        align-items: center;
      }

      i {
        font-size: 23px;
      }

      #dropzinho {
        position: absolute;
        top: 100%;
        right: 0;
        display: none;
        background: #ECECEC;
        border: none;
        border-radius: 8px;
        padding: 10px;
        min-width: 150px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }

      .bi-person {
        font-size: 1.1rem;
      }

      .bi-box-arrow-right {
        font-size: 1.1rem;
      }

      /* RESPONSIVE - TABLETS */
      @media (max-width: 1023px) {
        .sidebar-expanded #imgheader {
          margin-left: 0 !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 800;
          position: relative;
        }

        #imgheader {
          transition: all 0.3s ease;
          z-index: 800;
          position: relative;
        }

        .sidebar-expanded .container-fluid {
          padding-left: 0 !important;
        }

        #navbarNav {
          background-color: #ffffff;
          box-shadow: #b4b4b4 1px 0 3px 0px;
          border-radius: 15px;
          margin-top: 0.4rem;
          padding: 15px;
          width: 100%;
        }

        #abcd {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 10px;
          margin-top: 10px;
          width: 100%;
          gap: 5px;
        }

        .nav-item {
          width: 100%;
        }

        .nav-link {
          padding: 8px 0;
          display: block;
        }

        .profile-dropdown {
          position: relative;
          width: 100%;
          right: auto;
          top: auto;
          transform: none;
          margin-top: 5px;
          display: flex;
          justify-content: flex-start;
        }

        .profile-dropdown button {
          width: 100%;
          text-align: left;
          padding: 8px 0;
        }

        #dropzinho {
          position: absolute;
          top: 100%;
          left: 0;
          display: none;
          background: #ECECEC;
          border: none;
          border-radius: 8px;
          padding: 10px;
          width: 150px;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-top: 60px;
        }

        .profile-dropdown:hover #dropzinho,
        .profile-dropdown:focus-within #dropzinho {
          display: block;
        }

        .dropdown-item {
          padding: 8px 10px;
        }

        .perfill {
          display: flex;
          flex-direction: column;
        }

        .header {
          animation: none;
        }

        .navbar-collapse {
          transition: 0;
        }

        .sidebar-expanded .container-fluid,
        .sidebar-expanded .navbar-nav,
        .sidebar-expanded #imgheader {
          margin-left: 0;
          padding-left: 0;
        }

        .bi-list {
          display: none;
        }

        .sidebar nav a span {
          display: inline;
        }

        .navbar-nav {
          gap: 0;
        }

        .page-content {
          margin-left: 0;
        }

        #usuario {
          font-size: 14px;
          text-decoration: none;
        }

        #usuario:hover {
          color: black;
        }

        #icone {
          border: none;
        }

        #icone2 {
          border: none;
          outline: none !important;
        }

        #icone:focus,
        #icone2:focus {
          outline: none;
          box-shadow: none;
        }

        #imgheader {
          display: block;
          margin: 0 auto;
          width: 130px;
        }

        .sidebar {
          top: 0;
          left: -230px;
          transition: left 0.3s ease;
          width: 230px;
          height: 100vh;
        }

        .sidebar.open {
          left: 0;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
          height: 100vh;
        }

        .navbar {
          background-color: #ffffff;
          box-shadow: #b4b4b4 1px 0 3px 0px;
          padding-left: 0.00001rem;
          padding-right: 0.00001rem;
          height: 50px;
        }

        span {
          font-size: 14px;
        }

        .dropdown-menu {
          position: absolute;
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          display: none;
          background: #ECECEC;
          border: none;
          border-radius: 8px;
          padding: 10px;
          min-width: 150px;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      }

      /* RESPONSIVE - MOBILE */
      @media (max-width: 768px) {
        .sidebar {
          height: 100% !important;
          position: fixed;
          top: 0;
          left: -230px;
          transition: left 0.3s ease;
          width: 230px;
          z-index: 700;
        }

        #btnn2 {
          width: 190px;
          padding: 10px;
          display: inline-block;
          align-items: center;
        }
      }

      /* RESPONSIVE - DESKTOP SMALL */
      @media (min-width:1024px) and (max-width:1400px) {
        .navbar {
          height: 42px;
        }

        .sidebar {
          width: 48px;
        }

        #bb {
          font-size: 16px;
        }

        .footer-left {
          margin-left: 30px;
        }

        .bi-person-circle {
          font-size: 15px;
          color: #ccc;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // INJEÇÃO DE HTML
  // ==========================================
  injectHTML() {
    const headerHTML = `
      <!-- Header com Navbar -->
      <header>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <!-- Botão esquerdo para controlar a sidebar -->
            <button id="icone2" class="navbar-toggler" type="button">
              <i style="font-size: 12px" class="navbar-toggler-icon"></i>
            </button>

            <!-- Input File -->
            <button class="upload-btn" id="imgheader">
              <label for="imageUpload"><i class="bi bi-plus" id="btnn"></i></label>
              <input type="file" id="imageUpload" accept="image/*" placeholder="Insira sua logo" />
            </button>

            <!-- Botão direito para outras funcionalidades -->
            <button id="icone" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span style="font-size: 20px" class="bi bi-three-dots"></span>
            </button>

            <!-- Navbar collapse - modificado para mobile -->
            <div class="collapse navbar-collapse item" id="navbarNav">
              <ul id="abcd" class="navbar-nav mx-auto">
                <li class="nav-item">
                  <a class="nav-link" href="quemsomos2.html">Quem somos?</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="saibamais2.html">Saiba mais</a>
                </li>
                <li class="nav-item profile-dropdown">
                  <button class="btn btn-link" id="usuario" style="font-size: 14px; text-decoration: none">
                    <img id="userPhoto" src="" alt="Foto do Usuário" style="
                      width: 30px;
                      height: 30px;
                      border-radius: 50%;
                      object-fit: cover;
                      display: none;
                    " />
                    <i id="userIcon" class="bi bi-person-circle" style="
                    font-size: 250%;
                    color: #ccc"></i>
                    <span>Nome do Usuário</span>
                  </button>
                  <!-- Dropdown menu -->
                  <div id="dropzinho" class="dropdown-menu">
                    <a class="dropdown-item" href="perfildoadorppessoal.html"><i class="bi bi-person"></i> Perfil</a>
                    <a class="dropdown-item" href="inicio1.html"><i class="bi bi-box-arrow-right"></i> Sair</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <!-- Page Content Container -->
      <div class="page-content">
        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
          <nav>
            <a href="#"><i class="bi bi-list" id="bb"></i><span></span></a>
            <a href="mapadopessoa.html"><i class="bi bi-map" id="bb"></i><span style="font-size: 14px">Mapa</span></a>
            <a href="ajudamedicapessoa.html"><i class="bi bi-truck" id="bb"></i><span style="font-size: 14px">Ajuda médica</span></a>
            <a href="doacaopessoa.html"><i class="bi bi-box" id="bb"></i><span style="font-size: 14px">Doação</span></a>
            <a href="pontosdecoletapssoa.html"><i class="bi bi-geo-alt-fill" id="bb"></i><span style="font-size: 14px">Pontos de coleta</span></a>
            <a href="ajudapessoa.html"><i class="bi bi-info-circle" id="bb"></i><span style="font-size: 14px">Ajuda</span></a>
          </nav>
        </aside>

        <!-- Modal de Erro -->
        <div class="modal fade" id="erroSenhaModal" tabindex="-1" aria-labelledby="erroSenhaModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="erroSenhaModalLabel">Atenção</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
              </div>
              <div class="modal-body" id="erroSenhaModalBody">
                <!-- Mensagem de erro será inserida aqui -->
              </div>
              <div class="modal-footer">
                <button id="botao-validar" type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Inserir o HTML no início do body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // ==========================================
  // CONFIGURAÇÃO DE EVENT LISTENERS
  // ==========================================
  setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupProfileDropdown();
      this.setupNavbarCollapse();
      this.setupSidebarToggle();
      this.handleHeaderAnimation();
      this.handleSidebarHover();
    });

    // Configurar eventos de redimensionamento
    window.addEventListener("resize", () => {
      this.setupProfileDropdown();
      this.handleHeaderAnimation();
      this.handleSidebarHover();
      this.ensureSidebarHeight();
    });
  }

  // ==========================================
  // CONFIGURAÇÃO DO DROPDOWN DO PERFIL
  // ==========================================
  setupProfileDropdown() {
    const usuarioBtn = document.getElementById("usuario");
    const dropdownMenu = document.getElementById("dropzinho");
   
    if (!usuarioBtn || !dropdownMenu) return;
   
    // Remove listeners existentes
    const oldClickListener = usuarioBtn._clickListener;
    if (oldClickListener) {
      usuarioBtn.removeEventListener("click", oldClickListener);
    }

    const isMobile = window.innerWidth <= 768;
   
    const clickListener = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
      } else {
        dropdownMenu.style.display = "block";
      }
    };

    usuarioBtn.addEventListener("click", clickListener);
    usuarioBtn._clickListener = clickListener;

    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
      if (!usuarioBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.style.display = "none";
      }
    });

    if (!isMobile) {
      // Em desktop, mostra ao passar o mouse
      usuarioBtn.addEventListener("mouseenter", () => {
        dropdownMenu.style.display = "block";
      });
     
      const profileDropdown = document.querySelector(".profile-dropdown");
      if (profileDropdown) {
        profileDropdown.addEventListener("mouseleave", () => {
          dropdownMenu.style.display = "none";
        });
      }
    }

    // Fechar dropdown ao clicar nos itens
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        dropdownMenu.style.display = "none";
      });
    });
  }

  // ==========================================
  // CONFIGURAÇÃO DO NAVBAR COLLAPSE
  // ==========================================
  setupNavbarCollapse() {
    const navbarCollapse = document.getElementById('navbarNav');
    const toggleButton = document.getElementById('icone');
   
    if (!navbarCollapse || !toggleButton) return;

    // Bootstrap 5 handling
    if (window.bootstrap && navbarCollapse) {
      const collapseInstance = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
     
      navbarCollapse.addEventListener('hidden.bs.collapse', () => {
        toggleButton.classList.remove('collapsed');
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    }

    // Manual toggle handler
    toggleButton.addEventListener('click', () => {
      if (window.bootstrap && navbarCollapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          if (navbarCollapse.classList.contains('show')) {
            bsCollapse.hide();
          } else {
            bsCollapse.show();
          }
        } else {
          navbarCollapse.classList.toggle('show');
        }
      } else {
        // Fallback manual toggle
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          toggleButton.setAttribute('aria-expanded', 'false');
        } else {
          navbarCollapse.classList.add('show');
          toggleButton.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  // ==========================================
  // CONFIGURAÇÃO DO TOGGLE DA SIDEBAR
  // ==========================================
  setupSidebarToggle() {
    const toggleButton = document.getElementById("icone2");
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        this.toggleSidebar();
      });
    }
  }

  toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    if (!sidebar) return;

    sidebar.classList.toggle("open");
    body.classList.toggle("sidebar-open");

    let overlay = document.getElementById("sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sidebar-overlay";
      overlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 650;
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        this.toggleSidebar();
      });
    }

    const imgHeader = document.getElementById("imgheader");
    
    if (sidebar.classList.contains("open")) {
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
      
      if (imgHeader) {
        imgHeader.style.visibility = "visible";
        imgHeader.style.opacity = "1";
      }
    } else {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // ==========================================
  // ANIMAÇÃO DO HEADER
  // ==========================================
  handleHeaderAnimation() {
    const header = document.getElementById("header");
    if (header) {
      if (window.innerWidth <= 768) {
        header.style.transition = "none";
      } else {
        header.style.transition = "all 0.3s ease-in-out";
      }
    }
  }

  // ==========================================
  // HOVER DA SIDEBAR
  // ==========================================
  handleSidebarHover() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
    const imgHeader = document.getElementById("imgheader");

    if (!sidebar) return;

    // Remove listeners existentes
    const oldMouseEnter = sidebar._mouseenterListener;
    const oldMouseLeave = sidebar._mouseleaveListener;
   
    if (oldMouseEnter) {
      sidebar.removeEventListener("mouseenter", oldMouseEnter);
    }
   
    if (oldMouseLeave) {
      sidebar.removeEventListener("mouseleave", oldMouseLeave);
    }
   
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
   
    if (!isTablet && window.innerWidth > 768) {
      const mouseenterListener = () => {
        body.classList.add("sidebar-expanded");
        if (imgHeader) {
          imgHeader.style.visibility = "visible";
          imgHeader.style.opacity = "1";
        }
      };
     
      const mouseleaveListener = () => {
        body.classList.remove("sidebar-expanded");
      };
     
      sidebar.addEventListener("mouseenter", mouseenterListener);
      sidebar.addEventListener("mouseleave", mouseleaveListener);
     
      sidebar._mouseenterListener = mouseenterListener;
      sidebar._mouseleaveListener = mouseleaveListener;
    } else if (isTablet) {
      if (imgHeader) {
        imgHeader.style.visibility = "visible";
        imgHeader.style.opacity = "1";
      }
    }
  }

  // ==========================================
  // ALTURA DA SIDEBAR
  // ==========================================
  ensureSidebarHeight() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && window.innerWidth <= 768) {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      sidebar.style.height = Math.max(docHeight, window.innerHeight) + "px";
    }
  }

  // ==========================================
  // CONFIGURAÇÃO DE IMAGENS
  // ==========================================
  setupImageHandling() {
    document.addEventListener("DOMContentLoaded", () => {
      // Configurar prévia para a imagem do header
      this.setupImagePreview("imageUpload", "imgheader", "btnn");
      
      // Configurar foto de perfil do usuário
      this.setupUserPhoto();
    });
  }

  setupImagePreview(inputId, containerId, buttonIconId) {
    const fileInput = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    const buttonIcon = document.getElementById(buttonIconId);
   
    if (fileInput && container) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files && fileInput.files[0]) {
          const reader = new FileReader();
         
          reader.onload = (e) => {
            // Salvar no sessionStorage (não localStorage)
            sessionStorage.setItem('headerLogo', e.target.result);
            
            // Remover o ícone de plus
            if (buttonIcon) {
              buttonIcon.style.display = "none";
            }
           
            // Verificar se já existe uma prévia e removê-la
            const existingPreview = container.querySelector('.image-preview');
            if (existingPreview) {
              container.removeChild(existingPreview);
            }
           
            // Criar elemento de prévia
            this.createImagePreviewElement(container, e.target.result, buttonIcon, 'headerLogo');
          };
         
          reader.readAsDataURL(fileInput.files[0]);
        }
      });
    }
  }

  createImagePreviewElement(container, imageData, buttonIcon, storageKey) {
    const previewElement = document.createElement('div');
    previewElement.className = 'image-preview';
    previewElement.style.cssText = `
      width: 100%;
      height: 100%;
      background-image: url(${imageData});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    `;
    
    container.style.position = "relative";
    container.style.overflow = "hidden";
    
    // Botão de remoção
    const removeButton = document.createElement('button');
    removeButton.textContent = "✕";
    removeButton.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 2;
      background: rgba(255, 255, 255, 0.7);
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      cursor: pointer;
      padding: 0;
      font-size: 12px;
    `;
    
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      container.removeChild(previewElement);
      sessionStorage.removeItem(storageKey);
      
      if (buttonIcon) {
        buttonIcon.style.display = "inline-block";
      }
    });