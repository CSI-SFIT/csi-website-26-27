// Fiza


import React, { useState, useEffect, useRef, useCallback } from 'react';
import './MagazinePage.css';

const COVER_IMAGE_DATA_URI = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCARjAxoDASIAAhEBAxEB/8QAHQABAAAHAQEAAAAAAAAAAAAAAAEDBAUGBwgCCf/EAGgQAAEDAwIDAwYGCwoKBwYBDQECAwQABREGEhMhMQciQQgUMlFhcRUjQnSBkRYYNjdSVZShsbKzJDNicnWCwdHS0xclNENTVFZzkpM1OJWitMLhJmSDhMPwY6PiJyhERUZXdpbxR4b/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUDBgcCAf/EAEERAQABAgMEBgYJAgYBBQAAAAABAgMEBREGEiExE0FRYXGxM3KBkaHRFCIyNUJSweHwIzQWU2KCstIVJENUovH/2gAMAw2Block";

export default function MagazinePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // PDF Modal State
  const [pdfState, setPdfState] = useState({
    isOpen: false,
    url: '',
    title: '',
    pageNum: 1,
    pageCount: 0,
    scale: 1.2,
    isLoading: false,
    error: false,
  });

  const pdfDocRef = useRef(null);
  const isRenderingRef = useRef(false);
  const pendingPageRef = useRef(null);

  // DOM Refs
  const asciiCanvasRef = useRef(null);
  const threeContainerRef = useRef(null);
  const pdfCanvasRef = useRef(null);

  // Load External Scripts (Three.js & PDF.js)
  useEffect(() => {
    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'three-js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', 'pdf-js')
    ]).then(() => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      initThreeJS();
    }).catch(console.error);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  // ASCII Rain Effect
  useEffect(() => {
    const canvas = asciiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let asciiWidth = (canvas.width = window.innerWidth);
    let asciiHeight = (canvas.height = window.innerHeight);
    const chars = "01CSI_SFIT_PARADIGM_<>/*+~#@%";
    const fontSize = 14;
    let columns = Math.floor(asciiWidth / fontSize);
    let drops = Array(columns).fill(1);

    const handleResize = () => {
      asciiWidth = canvas.width = window.innerWidth;
      asciiHeight = canvas.height = window.innerHeight;
      columns = Math.floor(asciiWidth / fontSize);
      drops = Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const drawAscii = () => {
      ctx.fillStyle = 'rgba(8, 3, 5, 0.08)';
      ctx.fillRect(0, 0, asciiWidth, asciiHeight);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.fillStyle = dist < 120 ? '#ff4500' : '#2b0c12';
        ctx.fillText(char, x, y);

        if (y > asciiHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(drawAscii);
    };

    drawAscii();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Three.js 3D Background Setup
  const initThreeJS = () => {
    const container = threeContainerRef.current;
    if (!container || !window.THREE) return;
    container.innerHTML = '';

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 4);
    scene.add(dirLight);

    // 3D Animated Plane/Mesh
    const geometry = new THREE.PlaneGeometry(2.2, 3.1);
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(COVER_IMAGE_DATA_URI, (texture) => {
      const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(1.5, 0, 0);
      scene.add(mesh);

      let animId;
      const animate = () => {
        mesh.rotation.y += 0.005;
        mesh.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
  };

  // PDF Render Page Helper
  const renderPdfPage = useCallback((num, scale) => {
    if (!pdfDocRef.current || !pdfCanvasRef.current) return;

    isRenderingRef.current = true;
    pdfDocRef.current.getPage(num).then((page) => {
      const canvas = pdfCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const viewport = page.getViewport({ scale });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = { canvasContext: ctx, viewport };
      const renderTask = page.render(renderContext);

      renderTask.promise.then(() => {
        isRenderingRef.current = false;
        if (pendingPageRef.current !== null) {
          const next = pendingPageRef.current;
          pendingPageRef.current = null;
          renderPdfPage(next, scale);
        }
      });
    });
  }, []);

  const queueRenderPage = useCallback((num, scale) => {
    if (isRenderingRef.current) {
      pendingPageRef.current = num;
    } else {
      renderPdfPage(num, scale);
    }
  }, [renderPdfPage]);

  // Handle PDF Open
  const openPdfModal = (pdfUrl, title) => {
    setPdfState({
      isOpen: true,
      url: pdfUrl,
      title: title,
      pageNum: 1,
      pageCount: 0,
      scale: 1.2,
      isLoading: true,
      error: false,
    });
    setIsArchiveOpen(false);

    if (!window.pdfjsLib) {
      setPdfState((prev) => ({ ...prev, isLoading: false, error: true }));
      return;
    }

    window.pdfjsLib.getDocument(pdfUrl).promise.then((doc) => {
      pdfDocRef.current = doc;
      setPdfState((prev) => ({
        ...prev,
        pageCount: doc.numPages,
        isLoading: false,
      }));
    }).catch(() => {
      setPdfState((prev) => ({ ...prev, isLoading: false, error: true }));
    });
  };

  // Trigger PDF page rendering after loading state updates
  useEffect(() => {
    if (pdfState.isOpen && !pdfState.isLoading && !pdfState.error && pdfDocRef.current) {
      queueRenderPage(pdfState.pageNum, pdfState.scale);
    }
  }, [pdfState.isOpen, pdfState.isLoading, pdfState.error, pdfState.pageNum, pdfState.scale, queueRenderPage]);

  const closePdfViewer = () => {
    pdfDocRef.current = null;
    setPdfState((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePrevPage = () => {
    if (pdfState.pageNum <= 1) return;
    setPdfState((prev) => ({ ...prev, pageNum: prev.pageNum - 1 }));
  };

  const handleNextPage = () => {
    if (pdfState.pageNum >= pdfState.pageCount) return;
    setPdfState((prev) => ({ ...prev, pageNum: prev.pageNum + 1 }));
  };

  const handleZoom = (delta) => {
    setPdfState((prev) => ({
      ...prev,
      scale: Math.max(0.4, Math.min(3, prev.scale + delta)),
    }));
  };

  // Keyboard navigation for PDF modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!pdfState.isOpen) return;
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
      if (e.key === 'Escape') closePdfViewer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pdfState.isOpen, pdfState.pageNum, pdfState.pageCount]);

  return (
    <div className={isLoaded ? 'loaded' : ''}>
      {/* Intro Loading Screen */}
      <div id="intro-screen" className={isLoaded ? 'fade-out' : ''}>
        <div className="intro-content">
          <div className="intro-subtitle">CSI SFIT PRESENTS</div>
          <div className="intro-title">OUR <span>MAGAZINE</span></div>
          <div className="intro-loader-bar">
            <div className="intro-loader-progress"></div>
          </div>
        </div>
      </div>

      {/* Background ASCII Canvas */}
      <canvas id="ascii-canvas" ref={asciiCanvasRef}></canvas>

      {/* Main Page Layout */}
      <div className="page-wrapper">
        <div className="glow-bg"></div>
        <div id="canvas-container" ref={threeContainerRef}></div>

        <header className="site-header">
          <div className="nav-logo">CSI <span>SFIT</span></div>
        </header>

        <main className="hero-container">
          <div className="hero-text-side">
            <div className="main-heading-container">
              <h1 className="page-title">OUR <span>MAGAZINE</span></h1>
            </div>

            <div className="hero-content" id="hero-card">
              <p className="tag">2026 EDITION</p>
              <p className="description">
                Explore the creativity, innovation, and technical achievements of CSI SFIT through our flagship annual publication.
              </p>

              <div className="btn-group">
                <button
                  className="btn-primary"
                  onClick={() => openPdfModal('./assets/magazine-2026.pdf', 'Magazine 2026')}
                >
                  Read Magazine 2026
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setIsArchiveOpen(true)}
                >
                  Explore Archive
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <div className="footer-container">
            <div className="footer-brand">
              <h3>Computer Society Of India, St Francis Institute Of Technology</h3>
              <p>We Make It Happen</p>
            </div>

            <div className="footer-actions">
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">📷</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">🐙</a>
              </div>
              <button className="btn-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                ↑ Top
              </button>
            </div>
          </div>

          <div className="copyright-bar">
            © 2026 SFIT CSI. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Archive Drawer Panel */}
      <div className={`archive-panel ${isArchiveOpen ? 'open' : ''}`}>
        <div className="archive-header">
          <h2>MAGAZINE ARCHIVE</h2>
          <button className="close-btn" onClick={() => setIsArchiveOpen(false)}>&times;</button>
        </div>

        <div className="archive-list">
          <div onClick={() => openPdfModal('./assets/magazine-2025.pdf', 'Read Edition 2025')} className="archive-card">
            <div className="title">Read Edition 2025</div>
          </div>

          <div onClick={() => openPdfModal('./assets/magazine-2024.pdf', 'Read Edition 2024')} className="archive-card">
            <div className="title">Read Edition 2024</div>
          </div>

          <div onClick={() => openPdfModal('./assets/magazine-2022.pdf', 'Read Edition 2022')} className="archive-card">
            <div className="title">Read Edition 2022</div>
          </div>
        </div>
      </div>

      {/* PDF Modal Viewer Overlay */}
      <div
        className={`pdf-modal-overlay ${pdfState.isOpen ? 'active' : ''}`}
        onClick={(e) => e.target.classList.contains('pdf-modal-overlay') && closePdfViewer()}
      >
        <div className="pdf-modal-container">
          <div className="pdf-modal-header">
            <h3>{pdfState.title || 'Reading Magazine'}</h3>
            <div className="pdf-modal-actions">
              <a
                href={pdfState.url}
                download={pdfState.url.split('/').pop()}
                target="_blank"
                rel="noreferrer"
                className="pdf-download-link"
              >
                Open PDF Directly / Download
              </a>
              <button className="close-btn" onClick={closePdfViewer}>&times;</button>
            </div>
          </div>

          <div className="pdf-modal-body">
            <div className="pdf-toolbar">
              <button onClick={handlePrevPage} disabled={pdfState.pageNum <= 1} title="Previous page">
                &#8592;
              </button>
              <span className="pdf-page-info">
                <span>{pdfState.pageNum}</span> / <span>{pdfState.pageCount || '–'}</span>
              </span>
              <button onClick={handleNextPage} disabled={pdfState.pageNum >= pdfState.pageCount} title="Next page">
                &#8594;
              </button>
              <span className="pdf-divider"></span>
              <button onClick={() => handleZoom(-0.2)} title="Zoom out">&minus;</button>
              <span className="pdf-zoom-info">{Math.round((pdfState.scale / 1.2) * 100)}%</span>
              <button onClick={() => handleZoom(0.2)} title="Zoom in">+</button>
            </div>

            <div className="pdf-canvas-wrap">
              {pdfState.isLoading && (
                <div className="pdf-loading-state">
                  <div className="pdf-spinner"></div>
                  <p>Loading magazine…</p>
                </div>
              )}

              {pdfState.error && (
                <div className="pdf-error-state">
                  <p style={{ color: '#ff6b35' }}>Unable to display this PDF inline.</p>
                  <a href={pdfState.url} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                    Open or Download {pdfState.title}
                  </a>
                </div>
              )}

              {!pdfState.isLoading && !pdfState.error && (
                <canvas ref={pdfCanvasRef}></canvas>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
