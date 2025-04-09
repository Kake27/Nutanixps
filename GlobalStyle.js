import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  html,
  body {
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    background: url('https://images.unsplash.com/photo-1603522830343-3c330ab81542?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed;
    background-size: cover;
    overflow-x: hidden;
    padding-bottom: 8rem;
  }

  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(8px);
    background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    z-index: 0;
    pointer-events: none;
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes pulseBg {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.4;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }
`;

export default GlobalStyle; 