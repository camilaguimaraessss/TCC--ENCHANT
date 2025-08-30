document.addEventListener("DOMContentLoaded", function () {
    // Função para controlar o dropdown do perfil
    setupProfileDropdown();
   
    // Configurar evento para detectar o fechamento do menu colapsável
    const navbarCollapse = document.getElementById('navbarNav');
   
    // Se estivermos usando Bootstrap 5
    if (window.bootstrap && navbarCollapse) {
      const collapseInstance = new bootstrap.Collapse(navbarCollapse, {
        toggle: false // Não alternar ao criar a instância
      });
     
      // Adicionar listener para quando o colapso for escondido
      navbarCollapse.addEventListener('hidden.bs.collapse', function () {
        // Garantir que o botão possa ser clicado novamente
        const toggleButton = document.getElementById('icone');
        if (toggleButton) {
          toggleButton.classList.remove('collapsed');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
    // Para Bootstrap 4 (que parece estar sendo usado no seu código)
    else if ($ && navbarCollapse) {
      $(navbarCollapse).on('hidden.bs.collapse', function () {
        const toggleButton = document.getElementById('icone');
        if (toggleButton) {
          toggleButton.classList.remove('collapsed');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
   
 
 
    // Adicionar evento de clique manual ao botão de três pontos
    const toggleButton = document.getElementById('icone');
    if (toggleButton) {
      toggleButton.addEventListener('click', function() {
        // Se Bootstrap 5
        if (window.bootstrap && navbarCollapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            if (navbarCollapse.classList.contains('show')) {
              bsCollapse.hide();
            } else {
              bsCollapse.show();
            }
          } else {
            // Alternar manualmente se não houver instância
            navbarCollapse.classList.toggle('show');
          }
        }
        // Para Bootstrap 4
        else if ($) {
          $(navbarCollapse).collapse('toggle');
        }
        // Alternar manualmente como fallback
        else if (navbarCollapse) {
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
 
 
    // Chamadas para outras funções existentes
    handleHeaderAnimation();
    handleSidebarHover();
  });
 
 
  // Nova função para configurar o dropdown do perfil
  function setupProfileDropdown() {
    const usuarioBtn = document.getElementById("usuario");
    const dropdownMenu = document.getElementById("dropzinho");
   
    if (!usuarioBtn || !dropdownMenu) return;
   
    // Verifica se estamos em dispositivo móvel
    const isMobile = window.innerWidth <= 768;
   
    if (isMobile) {
      // No mobile, o dropdown aparece com clique
      usuarioBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); // Impede propagação do evento
        if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "block";
        }
      });
     
      // Fecha ao clicar fora
      document.addEventListener("click", function(e) {
        if (!usuarioBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.style.display = "none";
        }
      });
    } else {
      // Em desktop, mostra ao passar o mouse
      usuarioBtn.addEventListener("mouseenter", function() {
        dropdownMenu.style.display = "block";
      });
     
      // Container do dropdown para evitar que feche quando mover para os itens
      const profileDropdown = document.querySelector(".profile-dropdown");
      if (profileDropdown) {
        profileDropdown.addEventListener("mouseleave", function() {
          dropdownMenu.style.display = "none";
        });
      }
     
      // Também adicionar clique para melhorar acessibilidade
      usuarioBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); // Impede propagação do evento
        if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "block";
        }
      });
    }
   
    // Adicionar evento de clique nos itens do dropdown para fechar após clicar
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        dropdownMenu.style.display = "none";
      });
    });
  }
 
 
  // Re-configurar em caso de redimensionamento da janela
  window.addEventListener("resize", function() {
    setupProfileDropdown();
    handleHeaderAnimation();
    handleSidebarHover();
    ensureSidebarHeight();
  });
 
 
  // Funções existentes...
  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
 
 
    sidebar.classList.toggle("open");
    body.classList.toggle("sidebar-open"); // Adiciona classe ao body para controlar overflow
 
 
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
      if (window.innerWidth <= 768) {
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
      // Remover quaisquer listeners existentes para evitar duplicações
      const oldMouseEnter = sidebar._mouseenterListener;
      const oldMouseLeave = sidebar._mouseleaveListener;
     
      if (oldMouseEnter) {
        sidebar.removeEventListener("mouseenter", oldMouseEnter);
      }
     
      if (oldMouseLeave) {
        sidebar.removeEventListener("mouseleave", oldMouseLeave);
      }
     
      // É um tablet? (Entre 768px e 992px)
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
     
      // Se for desktop (acima de 992px) ou não for tablet, mantém o comportamento original
      if (!isTablet && window.innerWidth > 768) {
        const mouseenterListener = function() {
          body.classList.add("sidebar-expanded");
         
          // Garante que o botão de upload permaneça visível
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
       
        // Armazenar referências para possibilitar remoção posterior
        sidebar._mouseenterListener = mouseenterListener;
        sidebar._mouseleaveListener = mouseleaveListener;
      }
      // Para tablets, desabilitar o efeito de hover
      else if (isTablet) {
        // Não adiciona novos listeners para mouseenter/mouseleave
        // Isso impede que o botão de upload se mova em tablets quando
        // o mouse passa sobre a sidebar
       
        // Garante que o botão de upload permaneça sempre visível em tablets
        if (imgHeader) {
          imgHeader.style.visibility = "visible";
          imgHeader.style.opacity = "1";
        }
      }
    }
  }
 
 
  // Adicione essa função para garantir que a sidebar tenha altura máxima em celulares
  function ensureSidebarHeight() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && window.innerWidth <= 768) {
      // Define a altura para o viewport height ou para o height da página, o que for maior
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
 
 
  // Função para gerar link do Instagram
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
 
 
  // Função para configurar a prévia de imagem para os inputs de arquivo
  document.addEventListener("DOMContentLoaded", function() {
    // Configurar prévia para a imagem do header
    setupImagePreview("imageUpload", "imgheader", "btnn");
   
    // Configurar prévia para a imagem do footer
    setupImagePreview("imgUpload", "imgfooter", "btnn2");
   
    // Configurar prévia para a foto de perfil do usuário
    const userPhotoInput = document.createElement('input');
    userPhotoInput.type = 'file';
    userPhotoInput.id = 'userPhotoInput';
    userPhotoInput.accept = 'image/*';
    userPhotoInput.style.display = 'none';
    document.body.appendChild(userPhotoInput);
   
    // Adicionar evento de clique no ícone de usuário para abrir o seletor de arquivo
    const userIcon = document.getElementById("userIcon");
    if (userIcon) {
      userIcon.addEventListener("click", function(e) {
        e.preventDefault();
        userPhotoInput.click();
      });
    }
   
    // Adicionar evento de mudança para a foto do usuário
    userPhotoInput.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
       
        reader.onload = function(e) {
          const userPhoto = document.getElementById("userPhoto");
          if (userPhoto) {
            userPhoto.src = e.target.result;
            userPhoto.style.display = "inline-block";
           
            // Esconder o ícone padrão
            const userIcon = document.getElementById("userIcon");
            if (userIcon) {
              userIcon.style.display = "none";
            }
          }
        };
       
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
 
  // Função genérica para configurar a prévia de imagem
  function setupImagePreview(inputId, containerId, buttonIconId) {
    const fileInput = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    const buttonIcon = document.getElementById(buttonIconId);
   
    if (fileInput && container) {
      fileInput.addEventListener("change", function() {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
         
          reader.onload = function(e) {
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
  `;
  document.head.appendChild(style);
 
  // Persistência para as imagens do header e footer
  document.addEventListener("DOMContentLoaded", function() {
    // Configurar persistência para a imagem do header
    setupImagePersistence("imageUpload", "imgheader", "headerLogo", "btnn");
   
    // Configurar persistência para a imagem do footer
    setupImagePersistence("imgUpload", "imgfooter", "footerLogo", "btnn2");
   
    // Carregar imagens salvas anteriormente
    loadSavedImages();
  });
 
  // Função para configurar a persistência das imagens
  function setupImagePersistence(inputId, containerId, storageKey, buttonIconId) {
    const fileInput = document.getElementById(inputId);
   
    if (fileInput) {
      fileInput.addEventListener("change", function() {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
         
          reader.onload = function(e) {
            // Salvar no localStorage
            localStorage.setItem(storageKey, e.target.result);
          };
         
          reader.readAsDataURL(this.files[0]);
        }
      });
    }
  }
 
  // Função para carregar imagens salvas
  function loadSavedImages() {
    // Carregar logo do header
    const headerLogo = localStorage.getItem('headerLogo');
    if (headerLogo) {
      createImagePreview('imgheader', headerLogo, 'btnn');
    }
   
    // Carregar logo do footer
    const footerLogo = localStorage.getItem('footerLogo');
    if (footerLogo) {
      createImagePreview('imgfooter', footerLogo, 'btnn2');
    }
  }
 
  // Função para criar a prévia de uma imagem
  function createImagePreview(containerId, imageData, buttonIconId) {
    const container = document.getElementById(containerId);
    const buttonIcon = document.getElementById(buttonIconId);
   
    if (container && buttonIcon) {
      // Esconder o ícone de plus
      buttonIcon.style.display = "none";
     
      // Verificar se já existe uma prévia e removê-la
      const existingPreview = container.querySelector('.image-preview');
      if (existingPreview) {
        container.removeChild(existingPreview);
      }
     
      // Criar elemento de prévia
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
       
        // Remover do localStorage
        if (containerId === 'imgheader') {
          localStorage.removeItem('headerLogo');
        } else if (containerId === 'imgfooter') {
          localStorage.removeItem('footerLogo');
        }
       
        // Mostrar o ícone novamente
        buttonIcon.style.display = "inline-block";
      });
     
      previewElement.appendChild(removeButton);
      container.appendChild(previewElement);
    }
  }
 
  // Adicione ao evento de mudança da foto do usuário:
  userPhotoInput.addEventListener("change", function() {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
     
      reader.onload = function(e) {
        const userPhoto = document.getElementById("userPhoto");
        if (userPhoto) {
          userPhoto.src = e.target.result;
          userPhoto.style.display = "inline-block";
         
          // Esconder o ícone padrão
          const userIcon = document.getElementById("userIcon");
          if (userIcon) {
            userIcon.style.display = "none";
          }
         
          // Salvar no localStorage para persistência
          localStorage.setItem('userProfilePhoto', e.target.result);
        }
      };
     
      reader.readAsDataURL(this.files[0]);
    }
  });
 
  // Adicione isso à função que carrega as imagens salvas:
  function loadSavedImages() {
    // Código existente para header e footer...
   
    // Carregar foto de perfil
    const savedProfilePhoto = localStorage.getItem('userProfilePhoto');
    if (savedProfilePhoto) {
      const userPhoto = document.getElementById("userPhoto");
      const userIcon = document.getElementById("userIcon");
     
      if (userPhoto) {
        userPhoto.src = savedProfilePhoto;
        userPhoto.style.display = "inline-block";
       
        if (userIcon) {
          userIcon.style.display = "none";
        }
      }
    }
  }
