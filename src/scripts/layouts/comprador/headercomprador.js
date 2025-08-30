/**
 * Header & Sidebar Complete CSS
 * Versão organizada e otimizada para uso com HeaderSidebarManager.js
 * Compatível com Bootstrap 4 e 5
 */

/* ===== IMPORTS E FONTES ===== */
@import url("https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap");

/* ===== RESET E BASE ===== */
body {
  display: flex;
  flex-direction: column;
  font-family: "Lexend Deca", sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* ===== HEADER E NAVBAR ===== */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 200;
}

.header.animated {
  animation: slideIn 0.5s ease-in-out;
}

.navbar {
  background-color: #ffffff;
  padding-left: 3rem;
  padding-right: 3rem;
  height: 56px;
  box-shadow: #b4b4b4 1px 0 3px 0px;
}

.container-fluid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: padding-left 0.3s ease;
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

/* ===== LOGO DO HEADER ===== */
#imgheader {
  background-color: #D3D3D3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 220px;
  z-index: 800;
  height: 38px;
  transition: margin-left 0.3s ease;
}

#btnn {
  width: 7.5rem;
  display: inline-block;
}

/* ===== PROFILE DROPDOWN ===== */
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
}

.bi-person-circle {
  font-size: 35px;
  color: #ccc;
}

.bi-person {
  font-size: 1.1rem;
}

.bi-box-arrow-right {
  font-size: 1.1rem;
}

/* Dropdown Menu */
.dropdown-menu,
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

.profile-dropdown:hover .dropdown-menu,
.profile-dropdown:hover #dropzinho {
  display: block;
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

/* ===== SIDEBAR ===== */
.sidebar {
  position: fixed;
  left: 0;
  height: 100vh;
  width: 50px;
  background-color: #ECECEC;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 700;
  margin-top: 0;
  top: 0px;
  border-radius: 6px;
}

.sidebar:hover {
  width: 230px;
}

.sidebar nav a {
  display: flex;
  align-items: center;
  color: rgb(0, 0, 0);
  padding: 13px;
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

/* Ícones da sidebar */
.bi-search, .bi-map, .i-geo-alt-fill, .bi-check-circle-fill, 
.bi-geo-alt-fill, .bi-geo, .bi-truck, .bi-journal, 
.bi-file-earmark, .bi-info-circle {
  color: #4e4e4e;
}

/* Overlay da sidebar */
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

/* Estados da sidebar expandida */
.sidebar-expanded .container-fluid {
  padding-left: 180px;
}

.sidebar-expanded .navbar-nav {
  margin-left: 170px;
}

.sidebar-expanded #imgheader {
  margin-left: 20px;
}

/* ===== CONTEÚDO PRINCIPAL ===== */
.page-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 65px;
  margin-left: 60px;
  position: relative;
}

main {
  flex: 1;
  min-height: 200px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

#main {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* ===== MODAIS E CAIXAS ===== */
#caixa-principal,
#caixa-principal2 {
  display: none;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1100;
  background-color: #FFFFFF;
  width: 500px;
  height: 20rem;
  border-radius: 40px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

#instagramgeral,
#facebookgeral {
  display: flex;
  flex-direction: column;
}

#texto-caixa,
#texto-caixa2,
#texto-caixa3,
#texto-caixa4 {
  margin-bottom: 10px;
  font-size: 20px;
  margin-top: 2px;
  text-align: start;
  margin-left: 35px;
}

#texto-caixa3,
#texto-caixa4 {
  font-size: 14px;
  color: #000000;
}

#instagram,
#facebook2 {
  width: 430px;
  height: 45px;
  border-radius: 15px;
  border: #535151 solid 1.5px;
  margin-top: 0.5rem;
  outline: none;
  padding: 0px 0px 0px 15px;
  margin-left: 35px;
}

#instagram::placeholder,
#facebook2::placeholder {
  font-size: 14px;
}

#botaocaixa,
#botaocaixa2 {
  display: flex;
  margin-top: 2rem;
  background-color: rgba(226, 204, 174, 1);
  font-size: 14px;
  border-radius: 15px;
  width: 130px;
  height: 35px;
  border: none;
  text-align: center;
  justify-content: center;
  align-items: center;
}

#confirmar,
#confirmar2 {
  display: flex;
  justify-content: end;
  margin-right: 30px;
}

#editarLink,
#editarLink2 {
  margin-top: 2rem;
  background-color: rgba(226, 204, 174, 1);
  font-size: 14px;
  border-radius: 15px;
  width: 130px;
  height: 35px;
  justify-self: center;
  align-self: center;
  text-align: center;
  border: none;
}

.botao-sair {
  margin-bottom: 30px;
  background-color: transparent;
  border: none;
}

/* ===== BOTÕES DE REDES SOCIAIS ===== */
#botao,
#facebook {
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: #EC9E07;
}

#botao:hover,
#facebook:hover {
  text-decoration: underline;
  color: #8B7777;
}

#submenu-qrcode {
  background-color: #adacac;
}

/* ===== UPLOAD DE IMAGENS ===== */
.upload-btn {
  position: relative;
}

.upload-btn input {
  display: none;
}

.image-preview {
  border-radius: 5px;
}

/* ===== FOOTER ===== */
footer {
  background-color: #FCF2E8;
  padding: 30px 50px;
  font-family: "Lexend Deca", sans-serif;
  box-sizing: border-box;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.footer-left {
  max-width: 400px;
  font-size: 12px;
}

.footer-left p {
  font-size: 10px;
}

.footer-logo {
  height: 90px;
  margin-bottom: 10px;
}

.footer-right {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.footer-column {
  display: flex;
  flex: 2;
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

.footer-column a {
  color: #EC9E07;
  text-decoration: none;
  font-size: 12px;
  display: block;
  margin-bottom: 5px;
}

.footer-column a:hover {
  color: #8B7777;
  text-decoration: underline;
}

#imgfooter {
  background-color: #D3D3D3;
  border: none;
  height: 60px;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  margin-bottom: 20px;
}

#btnn2 {
  width: 180px;
  padding: 10px;
  display: inline-block;
  align-items: center;
}

/* ===== ÍCONES GERAIS ===== */
i {
  font-size: 23px;
}

/* ===== ANIMAÇÕES ===== */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== MEDIA QUERIES ===== */

/* Fix específico para a faixa problemática 1020-1024px */
@media (min-width: 1020px) and (max-width: 1024px) {
  .navbar-toggler {
    display: block !important;
    border: none !important;
  }
  
  .navbar-toggler:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  
  .navbar-collapse {
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
    display: none !important;
    transition: none !important;
  }
  
  .navbar-collapse.show {
    display: block !important;
    visibility: visible !important;
  }
  
  .navbar-collapse:not(.show) {
    display: none !important;
    visibility: hidden !important;
  }
  
  .navbar-nav {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 5px !important;
    padding-left: 10px !important;
    margin-top: 10px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .profile-dropdown {
    position: relative !important;
    width: 100% !important;
    right: auto !important;
    top: auto !important;
    transform: none !important;
    margin-top: 5px !important;
    display: flex !important;
    justify-content: flex-start !important;
  }
  
  .profile-dropdown button {
    width: 100% !important;
    text-align: left !important;
    padding: 8px 0 !important;
  }
  
  #dropzinho {
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    margin-top: 5px !important;
  }
  
  .sidebar-expanded .container-fluid,
  .sidebar-expanded .navbar-nav,
  .sidebar-expanded #imgheader {
    margin-left: 0 !important;
    padding-left: 0 !important;
  }
  
  #imgheader {
    display: block !important;
    margin: 0 auto !important;
    width: 180px !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: relative !important;
    z-index: 800 !important;
  }
  
  .header {
    animation: none !important;
  }
  
  .navbar {
    height: 50px !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .page-content {
    margin-left: 0 !important;
  }
  
  .nav-item {
    width: 100% !important;
  }
  
  .nav-link {
    padding: 8px 0 !important;
    display: block !important;
    font-size: 14px !important;
  }
  
  #caixa-principal,
  #caixa-principal2 {
    width: 400px !important;
    height: 22rem !important;
  }
  
  #instagram,
  #facebook2 {
    width: 320px !important;
    height: 40px !important;
  }
  
  #botao,
  #facebook {
    font-size: 10px !important;
  }
}

/* Tablets e dispositivos móveis */
@media (max-width: 1024px) {
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
    display: block;
    margin: 0 auto;
    width: 130px;
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

  #icone,
  #icone2 {
    border: none;
    outline: none !important;
  }

  #icone:focus,
  #icone2:focus {
    outline: none;
    box-shadow: none;
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

  #caixa-principal,
  #caixa-principal2 {
    width: 320px;
    height: 22rem;
    border-radius: 30px;
  }

  #instagram,
  #facebook2 {
    width: 250px;
    height: 40px;
    margin-left: 35px;
  }

  #texto-caixa,
  #texto-caixa2,
  #texto-caixa3,
  #texto-caixa4 {
    font-size: 16px;
  }

  #texto-caixa3,
  #texto-caixa4 {
    font-size: 12px;
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

  #btnn2 {
    width: 190px;
    padding: 10px;
    display: inline-block;
    align-items: center;
  }

  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
  }

  .footer-left {
    max-width: 100%;
  }

  .footer-logo {
    height: 70px;
  }

  .footer-right {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .footer-column {
    min-width: auto;
  }

  footer {
    margin-left: 0;
    width: 100%;
    padding: 20px 30px;
    z-index: 500;
  }

  .footer-column h3 {
    font-weight: 400;
    font-size: 12px;
    color: #535151;
    margin-bottom: 10px;
  }

  .footer-column a {
    text-decoration: none;
    font-size: 10px;
    display: block;
    margin-bottom: 5px;
  }

  #botao,
  #facebook {
    border: none;
    background-color: transparent;
    font-size: 10px;
    color: #EC9E07;
  }

  .sidebar {
    height: 100% !important;
    position: fixed;
    top: 0;
    left: -230px;
    transition: left 0.3s ease;
    width: 230px;
    z-index: 700;
  }
}

/* Tablets médios */
@media (min-width: 769px) and (max-width: 1030px) {
  footer {
    padding: 20px 40px;
  }

  .footer-container {
    gap: 30px;
  }

  .footer-left {
    max-width: 250px;
  }

  .footer-left p {
    font-size: 10px;
  }

  .footer-right {
    gap: 10px;
  }

  .footer-column {
    min-width: 150px;
  }

  .footer-column h3 {
    font-size: 10px;
  }

  .footer-column a {
    font-size: 8px;
  }

  #botao, #facebook {
    font-size: 8px;
  }

  #caixa-principal, #caixa-principal2 {
    width: 400px;
    height: 20rem;
  }

  #instagram, #facebook2 {
    width: 330px;
  }
}

/* Desktop médio */
@media (min-width: 990px) and (max-width: 1400px) {
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

/* Telas grandes */
@media (min-width: 1500px) {
  #btnn2 {
    background-color: transparent;
    width: 210px;
    padding: 10px;
    display: inline-block;
    align-items: center;
  }

  #botao,
  #facebook {
    border: none;
    background-color: transparent;
    font-size: 12px;
    color: #EC9E07;
  }

  #imgfooter {
    background-color: #D3D3D3;
    border: none;
    height: 60px;
    border-radius: 5px;
    cursor: pointer;
    width: 220px;
    margin-bottom: 20px;
  }

  footer {
    padding: 20px 50px;
    font-family: "Lexend Deca", sans-serif;
  }

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
  }

  .footer-left {
    max-width: 400px;
    font-size: 12px;
  }

  .footer-logo {
    height: 70px;
    margin-bottom: 10px;
  }

  .footer-right {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  .footer-column {
    flex: 2;
    min-width: 200px;
    text-align: center;
  }

  .footer-column h3 {
    font-weight: 400;
    font-size: 14px;
    color: #535151;
    margin-bottom: 10px;
  }

  .footer-column a {
    color: #EC9E07;
    text-decoration: none;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .footer-column a:hover {
    text-decoration: underline;
  }
}