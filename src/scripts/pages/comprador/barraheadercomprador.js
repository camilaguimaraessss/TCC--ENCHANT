document.addEventListener("DOMContentLoaded", function () {
   
    setupProfileDropdown();
   
   
    const navbarCollapse = document.getElementById('navbarNav');
   
   
    if (window.bootstrap && navbarCollapse) {
      const collapseInstance = new bootstrap.Collapse(navbarCollapse, {
        toggle: false // Não alternar ao criar a instância
      });
     
    
      navbarCollapse.addEventListener('hidden.bs.collapse', function () {
     
        const toggleButton = document.getElementById('icone');
        if (toggleButton) {
          toggleButton.classList.remove('collapsed');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
 
    else if ($ && navbarCollapse) {
      $(navbarCollapse).on('hidden.bs.collapse', function () {
        const toggleButton = document.getElementById('icone');
        if (toggleButton) {
          toggleButton.classList.remove('collapsed');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
   
   
    const instagramBtn = document.getElementById("botao");
    const instagramCaixa = document.getElementById("caixa-principal");
    const instagramSairBtn = document.getElementById("botao-sair");
    const instagramInput = document.getElementById("instagram");
    const instagramLinkContainer = document.getElementById("linkContainer");
    const instagramEditarBtn = document.getElementById("editarLink");
    const instagramConfirmarBtn = document.getElementById("botaocaixa");
    const modalOverlay = createModalOverlay();
  
  
   
    const facebookBtn = document.getElementById("facebook");
    const facebookCaixa = document.getElementById("caixa-principal2");
    const facebookSairBtn = document.getElementById("botao-sair2");
   
    if (facebookBtn && facebookCaixa && facebookSairBtn) {
      facebookBtn.addEventListener("click", () => {
        facebookCaixa.style.display = "flex";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden";
      });
     
      facebookSairBtn.addEventListener("click", () => {
        facebookCaixa.style.display = "none";
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  
  
    if (instagramBtn) {
      instagramBtn.addEventListener("click", () => {
        instagramCaixa.style.display = "flex";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    }
  
  
    if (instagramSairBtn) {
      instagramSairBtn.addEventListener("click", () => {
        instagramCaixa.style.display = "none";
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  
  
    
    const toggleButton = document.getElementById('icone');
    if (toggleButton) {
      toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const windowWidth = window.innerWidth;
        console.log('Window width:', windowWidth); // Debug
        
        // Para a faixa problemática 990-1023px, usar sempre controle manual
        if (windowWidth >= 990 && windowWidth <= 1024) {
          console.log('Using manual control for 990-1024px range'); // Debug
          handleCollapseManually(navbarCollapse, toggleButton);
          return;
        }
        
        // Para outras resoluções, usar a lógica padrão
        if (window.bootstrap && navbarCollapse && windowWidth < 990) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            if (navbarCollapse.classList.contains('show')) {
              bsCollapse.hide();
            } else {
              bsCollapse.show();
            }
          } else {
            navbarCollapse.classList.toggle('show');
            updateToggleButton(toggleButton, navbarCollapse.classList.contains('show'));
          }
        }
        else if ($ && navbarCollapse && windowWidth < 990) {
          $(navbarCollapse).collapse('toggle');
        }
        else if (navbarCollapse) {
          handleCollapseManually(navbarCollapse, toggleButton);
        }
      });
    }
  
    // Adicionar listener para resize para lidar com mudanças de breakpoint
    window.addEventListener('resize', function() {
      handleResizeCollapse();
    });
    
    // Adicionar um debounce para o resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        handleResizeCollapse();
      }, 100);
    });
  
   
    handleHeaderAnimation();
    handleSidebarHover();
  });
  
  // Função para lidar com o collapse manualmente
  function handleCollapseManually(navbarCollapse, toggleButton) {
    const isOpen = navbarCollapse.classList.contains('show');
    const windowWidth = window.innerWidth;
    
    console.log('Manual collapse - isOpen:', isOpen, 'width:', windowWidth); // Debug
    
    if (isOpen) {
      navbarCollapse.classList.remove('show');
      // Para a faixa 990-1024px, forçar display none para sobrescrever CSS
      if (windowWidth >= 990 && windowWidth <= 1024) {
        navbarCollapse.style.display = 'none !important';
      } else {
        navbarCollapse.style.display = 'none';
      }
      updateToggleButton(toggleButton, false);
    } else {
      navbarCollapse.classList.add('show');
      // Para a faixa 990-1024px, forçar display block
      if (windowWidth >= 990 && windowWidth <= 1024) {
        navbarCollapse.style.display = 'block !important';
        navbarCollapse.style.position = 'absolute';
        navbarCollapse.style.top = '100%';
        navbarCollapse.style.left = '0';
        navbarCollapse.style.right = '0';
        navbarCollapse.style.zIndex = '1050';
      } else {
        navbarCollapse.style.display = 'block';
      }
      updateToggleButton(toggleButton, true);
    }
  }
  
  // Função para atualizar o estado do botão toggle
  function updateToggleButton(toggleButton, isOpen) {
    if (isOpen) {
      toggleButton.setAttribute('aria-expanded', 'true');
      toggleButton.classList.remove('collapsed');
    } else {
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.classList.add('collapsed');
    }
  }
  
  // Função para lidar com resize e resetar o collapse se necessário
  function handleResizeCollapse() {
    const navbarCollapse = document.getElementById('navbarNav');
    const toggleButton = document.getElementById('icone');
    const windowWidth = window.innerWidth;
    
    console.log('Resize event - width:', windowWidth); // Debug
    
    if (navbarCollapse && toggleButton) {
      // Resetar estado do menu ao mudar de breakpoint
      const wasOpen = navbarCollapse.classList.contains('show');
      
      // Se sair da faixa problemática para desktop (>1024px), fechar o menu e limpar estilos
      if (windowWidth > 1024 && wasOpen) {
        navbarCollapse.classList.remove('show');
        navbarCollapse.style.display = '';
        navbarCollapse.style.position = '';
        navbarCollapse.style.top = '';
        navbarCollapse.style.left = '';
        navbarCollapse.style.right = '';
        navbarCollapse.style.zIndex = '';
        updateToggleButton(toggleButton, false);
      }
      
      // Para a faixa problemática, garantir que não há interferência do Bootstrap
      if (windowWidth >= 990 && windowWidth <= 1024) {
        // Remover qualquer instância do Bootstrap collapse
        if (window.bootstrap) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.dispose();
          }
        }
        
        // Forçar reset do estado se estava aberto
        if (wasOpen) {
          navbarCollapse.classList.remove('show');
          navbarCollapse.style.display = 'none !important';
          updateToggleButton(toggleButton, false);
        }
        
        // Adicionar classe especial para esta faixa
        navbarCollapse.classList.add('collapse-manual-control');
      }
      // Para outras faixas, recriar a instância do Bootstrap se necessário
      else {
        navbarCollapse.classList.remove('collapse-manual-control');
        
        if (window.bootstrap && windowWidth <= 989) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (!bsCollapse) {
            new bootstrap.Collapse(navbarCollapse, {
              toggle: false
            });
          }
        }
      }
    }
  }
  
  function setupProfileDropdown() {
    const usuarioBtn = document.getElementById("usuario");
    const dropdownMenu = document.getElementById("dropzinho");
   
    if (!usuarioBtn || !dropdownMenu) return;
   
    // Ajuste para considerar o range problemático
    const isMobile = window.innerWidth <= 1023; // Expandido para incluir o range problemático
   
    if (isMobile) {
  
      usuarioBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); 
        if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "block";
        }
      });
     
  
      document.addEventListener("click", function(e) {
        if (!usuarioBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.style.display = "none";
        }
      });
    } else {

      usuarioBtn.addEventListener("mouseenter", function() {
        dropdownMenu.style.display = "block";
      });
     
  
      const profileDropdown = document.querySelector(".profile-dropdown");
      if (profileDropdown) {
        profileDropdown.addEventListener("mouseleave", function() {
          dropdownMenu.style.display = "none";
        });
      }
     

      usuarioBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); 
        if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "block";
        }
      });
    }
   

    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        dropdownMenu.style.display = "none";
      });
    });
  }
  

  window.addEventListener("resize", function() {
    setupProfileDropdown();
    handleHeaderAnimation();
    handleSidebarHover();
    ensureSidebarHeight();
    handleResizeCollapse(); // Adicionar a nova função
  });
  

  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
  
  
    sidebar.classList.toggle("open");
    body.classList.toggle("sidebar-open"); 
  
  
    let overlay = document.getElementById("sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sidebar-overlay";
      overlay.style.display = "none";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.right = "0";
      overlay.style.bottom = "0";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.zIndex = "650";
      document.body.appendChild(overlay);
  
  
      overlay.addEventListener("click", function () {
        toggleSidebar();
      });
    }
  
  
    if (sidebar.classList.contains("open")) {
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
  
  
      // Garante que o botão de upload permaneça visível
      const imgHeader = document.getElementById("imgheader");
      if (imgHeader) {
        imgHeader.style.visibility = "visible";
        imgHeader.style.opacity = "1";
      }
    } else {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
  
  
  function createModalOverlay() {
    let modalOverlay = document.getElementById("modal-overlay");
    if (!modalOverlay) {
      modalOverlay = document.createElement("div");
      modalOverlay.id = "modal-overlay";
      modalOverlay.style.display = "none";
      modalOverlay.style.position = "fixed";
      modalOverlay.style.top = "0";
      modalOverlay.style.left = "0";
      modalOverlay.style.right = "0";
      modalOverlay.style.bottom = "0";
      modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modalOverlay.style.zIndex = "1000";
      document.body.appendChild(modalOverlay);
    }
    return modalOverlay;
  }
  
  
  function handleHeaderAnimation() {
    const header = document.getElementById("header");
  
    if (header) {
      // Ajustar para incluir o range problemático
      if (window.innerWidth <= 1023) {
        header.style.transition = "none";
      } else {
        header.style.transition = "all 0.3s ease-in-out";
      }
    }
  }
  
  
  function handleSidebarHover() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
    const imgHeader = document.getElementById("imgheader");
  
  
    if (sidebar) {

      const oldMouseEnter = sidebar._mouseenterListener;
      const oldMouseLeave = sidebar._mouseleaveListener;
     
      if (oldMouseEnter) {
        sidebar.removeEventListener("mouseenter", oldMouseEnter);
      }
     
      if (oldMouseLeave) {
        sidebar.removeEventListener("mouseleave", oldMouseLeave);
      }
     

      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
     

      if (!isTablet && window.innerWidth > 1024) {
        const mouseenterListener = function() {
          body.classList.add("sidebar-expanded");

          if (imgHeader) {
            imgHeader.style.visibility = "visible";
            imgHeader.style.opacity = "1";
          }
        };
       
        const mouseleaveListener = function() {
          body.classList.remove("sidebar-expanded");
        };
       
        sidebar.addEventListener("mouseenter", mouseenterListener);
        sidebar.addEventListener("mouseleave", mouseleaveListener);
       

        sidebar._mouseenterListener = mouseenterListener;
        sidebar._mouseleaveListener = mouseleaveListener;
      }

      else if (isTablet) {

        if (imgHeader) {
          imgHeader.style.visibility = "visible";
          imgHeader.style.opacity = "1";
        }
      }
    }
  }
  
  

  function ensureSidebarHeight() {
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
  
  function gerarLinkInstagram() {
    const instagram = document.getElementById("instagram").value.trim();
    const instagramLinkContainer = document.getElementById("linkContainer");
    const instagramEditarBtn = document.getElementById("editarLink");
    const instagramConfirmarBtn = document.getElementById("botaocaixa");
    const instagramInput = document.getElementById("instagram");
    const instagramBtn = document.getElementById("botao");
   
    const regexInstagram = /^[a-zA-Z0-9._]+$/;
  
  
    if (instagram && regexInstagram.test(instagram.replace(/^@/, ""))) {
      const padrao = instagram.startsWith("@") ? instagram.slice(1) : instagram;
      const link = `https://www.instagram.com/${padrao}`;
  
  
      instagramLinkContainer.innerHTML = `
        <div style="text-align: center;">
          <a href="${link}" target="_blank" style="color:#EC9E07; font-size:16px; word-wrap:break-word;">
            ${link}
          </a>
        </div>
      `;
      instagramBtn.setAttribute("href", link);
      instagramBtn.innerHTML = "Instagram";
  
  
      instagramInput.style.display = "none";
      instagramConfirmarBtn.style.display = "none";
      instagramEditarBtn.style.display = "inline-block";
      instagramInput.value = "";
      document.getElementById("texto-caixa3").textContent = "Aqui você pode editar o Instagram da sua empresa!";
    } else {
      alert("Por favor, insira um Instagram válido (somente letras, números, pontos e underlines).");
      instagramLinkContainer.innerHTML = "";
    }
  }
  
  
  // Função para gerar link do Facebook
  function gerarLinkFacebook() {
    const facebook = document.getElementById("facebook2").value.trim();
    const facebookLinkContainer = document.getElementById("linkContainer2");
    const facebookEditarBtn = document.getElementById("editarLink2");
    const facebookConfirmarBtn = document.getElementById("botaocaixa2");
    const facebookInput = document.getElementById("facebook2");
    const facebookBtn = document.getElementById("facebook");
   
    const regexFacebook = /^[a-zA-Z0-9._]+$/;
  
  
    if (facebook && regexFacebook.test(facebook.replace(/^@/, ""))) {
      const padrao = facebook.startsWith("@") ? facebook.slice(1) : facebook;
      const link = `https://www.facebook.com/${padrao}`;
  
  
      facebookLinkContainer.innerHTML = `
        <div style="text-align: center;">
          <a href="${link}" target="_blank" style="color:#EC9E07; font-size:16px; word-wrap:break-word;">
            ${link}
          </a>
        </div>
      `;
      facebookBtn.setAttribute("href", link);
      facebookBtn.innerHTML = "Facebook";
  
  
      facebookInput.style.display = "none";
      facebookConfirmarBtn.style.display = "none";
      facebookEditarBtn.style.display = "inline-block";
      facebookInput.value = "";
      document.getElementById("texto-caixa4").textContent = "Aqui você pode editar o Facebook da sua empresa!";
    } else {
      alert("Por favor, insira um Facebook válido (somente letras, números, pontos e underlines).");
      facebookLinkContainer.innerHTML = "";
    }
  }
  

  document.addEventListener("DOMContentLoaded", function() {
    const editarInstagramBtn = document.getElementById("editarLink");
    if (editarInstagramBtn) {
      editarInstagramBtn.addEventListener("click", function() {
        const instagramInput = document.getElementById("instagram");
        const instagramLinkContainer = document.getElementById("linkContainer");
        const instagramConfirmarBtn = document.getElementById("botaocaixa");
       
        instagramInput.style.display = "block";
        instagramConfirmarBtn.style.display = "block";
        instagramLinkContainer.innerHTML = "";
        editarInstagramBtn.style.display = "none";
      });
    }
   
    const editarFacebookBtn = document.getElementById("editarLink2");
    if (editarFacebookBtn) {
      editarFacebookBtn.addEventListener("click", function() {
        const facebookInput = document.getElementById("facebook2");
        const facebookLinkContainer = document.getElementById("linkContainer2");
        const facebookConfirmarBtn = document.getElementById("botaocaixa2");
       
        facebookInput.style.display = "block";
        facebookConfirmarBtn.style.display = "block";
        facebookLinkContainer.innerHTML = "";
        editarFacebookBtn.style.display = "none";
      });
    }
  });


document.addEventListener("DOMContentLoaded", function() {

    setupImagePreview("imageUpload", "imgheader", "btnn");
    

    setupImagePreview("imgUpload", "imgfooter", "btnn2");
    

    const userPhotoInput = document.createElement('input');
    userPhotoInput.type = 'file';
    userPhotoInput.id = 'userPhotoInput';
    userPhotoInput.accept = 'image/*';
    userPhotoInput.style.display = 'none';
    document.body.appendChild(userPhotoInput);
    

    const userIcon = document.getElementById("userIcon");
    if (userIcon) {
      userIcon.addEventListener("click", function(e) {
        e.preventDefault();
        userPhotoInput.click();
      });
    }
    

    userPhotoInput.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const userPhoto = document.getElementById("userPhoto");
          if (userPhoto) {
            userPhoto.src = e.target.result;
            userPhoto.style.display = "inline-block";
            

            const userIcon = document.getElementById("userIcon");
            if (userIcon) {
              userIcon.style.display = "none";
            }
            
            // Salvar no localStorage para persistência - REMOVIDO localStorage
            // localStorage.setItem('userProfilePhoto', e.target.result);
          }
        };
        
        reader.readAsDataURL(this.files[0]);
      }
    });
  });

  function setupImagePreview(inputId, containerId, buttonIconId) {
    const fileInput = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    const buttonIcon = document.getElementById(buttonIconId);
    
    if (fileInput && container) {
      fileInput.addEventListener("change", function() {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
       
            if (buttonIcon) {
              buttonIcon.style.display = "none";
            }
          
            const existingPreview = container.querySelector('.image-preview');
            if (existingPreview) {
              container.removeChild(existingPreview);
            }
            
           
            const previewElement = document.createElement('div');
            previewElement.className = 'image-preview';
            previewElement.style.width = "100%";
            previewElement.style.height = "100%";
            previewElement.style.backgroundImage = `url(${e.target.result})`;
            previewElement.style.backgroundSize = "contain";
            previewElement.style.backgroundPosition = "center";
            previewElement.style.backgroundRepeat = "no-repeat";
            previewElement.style.position = "absolute";
            previewElement.style.top = "0";
            previewElement.style.left = "0";
            previewElement.style.zIndex = "1";
            
            // Ajustar o estilo do contêiner
            container.style.position = "relative";
            container.style.overflow = "hidden";
            
            // Adicionar opção para remover a imagem
            const removeButton = document.createElement('button');
            removeButton.textContent = "✕";
            removeButton.style.position = "absolute";
            removeButton.style.top = "5px";
            removeButton.style.right = "5px";
            removeButton.style.zIndex = "2";
            removeButton.style.background = "rgba(255, 255, 255, 0.7)";
            removeButton.style.border = "none";
            removeButton.style.borderRadius = "50%";
            removeButton.style.width = "20px";
            removeButton.style.height = "20px";
            removeButton.style.cursor = "pointer";
            removeButton.style.padding = "0";
            removeButton.style.fontSize = "12px";
            
            removeButton.addEventListener("click", function(e) {
              e.stopPropagation();
              container.removeChild(previewElement);
              fileInput.value = "";
              if (buttonIcon) {
                buttonIcon.style.display = "inline-block";
              }
            });
            
            previewElement.appendChild(removeButton);
            container.appendChild(previewElement);
          };
          
          reader.readAsDataURL(this.files[0]);
        }
      });
    }
  }
  
  // Adicionar estilos CSS para a prévia
  const style = document.createElement('style');
  style.textContent = `
    .upload-btn {
      position: relative;
    }
    
    .image-preview {
      border-radius: 5px;
    }
    
    /* Fix específico para a faixa 990-1024px */
    @media (min-width: 990px) and (max-width: 1024px) {
      .navbar-collapse.collapse-manual-control {
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 1050 !important;
        background-color: #ffffff !important;
        box-shadow: #b4b4b4 1px 0 3px 0px !important;
        border-radius: 15px !important;
        margin-top: 0.4rem !important;
        padding: 15px !important;
        width: 100% !important;
      }
      
      .navbar-collapse.collapse-manual-control.show {
        display: block !important;
      }
      
      .navbar-collapse.collapse-manual-control:not(.show) {
        display: none !important;
      }
      
      /* Forçar que o botão toggle funcione nesta faixa */
      .navbar-toggler {
        display: block !important;
      }
      
      /* Garantir que o navbar nav se comporte corretamente */
      .navbar-collapse.collapse-manual-control .navbar-nav {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 5px !important;
        padding-left: 10px !important;
        margin-top: 10px !important;
      }
    }
  `;
  document.head.appendChild(style);

  
document.addEventListener("DOMContentLoaded", function() {
    
    setupImagePersistence("imageUpload", "imgheader", "headerLogo", "btnn");
    
    // Configurar persistência para a imagem do footer
    setupImagePersistence("imgUpload", "imgfooter", "footerLogo", "btnn2");
    
  
    loadSavedImages();
  });
  

  function setupImagePersistence(inputId, containerId, storageKey, buttonIconId) {
    const fileInput = document.getElementById(inputId);
    
    if (fileInput) {
      fileInput.addEventListener("change", function() {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            // REMOVIDO localStorage - use variáveis em memória ou outro sistema de persistência
            // localStorage.setItem(storageKey, e.target.result);
          };
          
          reader.readAsDataURL(this.files[0]);
        }
      });
    }
  }
  

  function loadSavedImages() {
    // REMOVIDO localStorage - implementar sistema alternativo de persistência
    // const headerLogo = localStorage.getItem('headerLogo');
    // if (headerLogo) {
    //   createImagePreview('imgheader', headerLogo, 'btnn');
    // }
    
    // const footerLogo = localStorage.getItem('footerLogo');
    // if (footerLogo) {
    //   createImagePreview('imgfooter', footerLogo, 'btnn2');
    // }
  }
  

  function createImagePreview(containerId, imageData, buttonIconId) {
    const container = document.getElementById(containerId);
    const buttonIcon = document.getElementById(buttonIconId);
    
    if (container && buttonIcon) {

      buttonIcon.style.display = "none";
      

      const existingPreview = container.querySelector('.image-preview');
      if (existingPreview) {
        container.removeChild(existingPreview);
      }
      

      const previewElement = document.createElement('div');
      previewElement.className = 'image-preview';
      previewElement.style.width = "100%";
      previewElement.style.height = "100%";
      previewElement.style.backgroundImage = `url(${imageData})`;
      previewElement.style.backgroundSize = "contain";
      previewElement.style.backgroundPosition = "center";
      previewElement.style.backgroundRepeat = "no-repeat";
      previewElement.style.position = "absolute";
      previewElement.style.top = "0";
      previewElement.style.left = "0";
      previewElement.style.zIndex = "1";
   
      container.style.position = "relative";
      container.style.overflow = "hidden";
      
      const removeButton = document.createElement('button');
      removeButton.textContent = "✕";
      removeButton.style.position = "absolute";
      removeButton.style.top = "5px";
      removeButton.style.right = "5px";
      removeButton.style.zIndex = "2";
      removeButton.style.background = "rgba(255, 255, 255, 0.7)";
      removeButton.style.border = "none";
      removeButton.style.borderRadius = "50%";
      removeButton.style.width = "20px";
      removeButton.style.height = "20px";
      removeButton.style.cursor = "pointer";
      removeButton.style.padding = "0";
      removeButton.style.fontSize = "12px";
      
      removeButton.addEventListener("click", function(e) {
        e.stopPropagation();
        container.removeChild(previewElement);
        
        // REMOVIDO localStorage
        // if (containerId === 'imgheader') {
        //   localStorage.removeItem('headerLogo');
        // } else if (containerId === 'imgfooter') {
        //   localStorage.removeItem('footerLogo');
        // }
        
        buttonIcon.style.display = "inline-block";
      });
      
      previewElement.appendChild(removeButton);
      container.appendChild(previewElement);
    }
  }
