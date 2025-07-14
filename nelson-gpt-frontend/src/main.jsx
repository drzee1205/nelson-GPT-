import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/mobile.css'
import App from './App.jsx'

// PWA installation prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button or banner
  const installBanner = document.createElement('div');
  installBanner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #1E1E1E;
      color: white;
      padding: 16px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    ">
      <div>
        <div style="font-weight: bold; margin-bottom: 4px;">Install Nelson-GPT</div>
        <div style="font-size: 14px; color: #B0B0B0;">Add to your home screen for quick access</div>
      </div>
      <button id="install-btn" style="
        background: #007AFF;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
      ">Install</button>
      <button id="dismiss-btn" style="
        background: transparent;
        color: #B0B0B0;
        border: none;
        padding: 8px;
        margin-left: 8px;
        cursor: pointer;
        font-size: 18px;
      ">×</button>
    </div>
  `;
  
  document.body.appendChild(installBanner);
  
  // Handle install button click
  document.getElementById('install-btn').addEventListener('click', () => {
    installBanner.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
    });
  });
  
  // Handle dismiss button click
  document.getElementById('dismiss-btn').addEventListener('click', () => {
    installBanner.remove();
  });
  
  // Auto-dismiss after 10 seconds
  setTimeout(() => {
    if (document.body.contains(installBanner)) {
      installBanner.remove();
    }
  }, 10000);
});

// Handle app installation
window.addEventListener('appinstalled', (evt) => {
  console.log('Nelson-GPT was installed successfully');
});

// Viewport height fix for mobile browsers
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 100);
});

// Prevent pull-to-refresh on mobile
document.body.style.overscrollBehavior = 'none';

// Initialize app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

