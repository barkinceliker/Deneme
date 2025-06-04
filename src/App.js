import React, { useState, useEffect } from 'react';

// Admin credentials (for demonstration purposes - in a real app, manage securely)
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'adminpassword'; // Use a strong password in production!

// Custom Message Box Component
const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === 'error' ? 'red' : 'green';
  const textColor = 'white';

  const messageBoxStyle = {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: bgColor,
    color: textColor,
    zIndex: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const closeButtonStyle = {
    marginLeft: '1rem',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
  };

  return (
    <div style={messageBoxStyle}>
      <span>{message}</span>
      <button onClick={onClose} style={closeButtonStyle}>
        &times;
      </button>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid #dc2626', // Red color
      borderRadius: '50%',
      width: '3rem',
      height: '3rem',
      animation: 'spin 1s linear infinite',
    }}></div>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial dummy data for projects and blog posts
  const [projects, setProjects] = useState([
    { id: '1', title: 'Gizli Operasyon Takip Sistemi', description: 'Karmaşık ağları izlemek ve hedefleri belirlemek için geliştirilmiş özel yazılım.', imageUrl: 'https://placehold.co/600x400/444/eee?text=Operation+System', link: '#' },
    { id: '2', title: 'Finansal Kara Para Aklama Analizi', description: 'Şüpheli finansal hareketleri tespit etmek ve yeraltı ekonomisini analiz etmek için kullanılan bir platform.', imageUrl: 'https://placehold.co/600x400/444/eee?text=Financial+Analysis', link: '#' },
    { id: '3', title: 'Güvenli İletişim Ağı', description: 'Bilgilerin sızmasını önlemek için tasarlanmış şifreli iletişim altyapısı.', imageUrl: 'https://placehold.co/600x400/444/eee?text=Secure+Comms', link: '#' },
  ]);
  const [blogPosts, setBlogPosts] = useState([
    { id: 'b1', title: 'Dijital Gölge Ekonomisi', content: 'Modern dünyada dijitalleşmenin yeraltı ekonomileri üzerindeki etkisi.', date: '2023-10-26T10:00:00Z' },
    { id: 'b2', title: 'Veri Casusluğu ve Korunma Yöntemleri', content: 'Hassas verilerin nasıl ele geçirildiği ve bunlara karşı nasıl korunulacağı.', date: '2023-11-15T14:30:00Z' },
  ]);
  const [messageBox, setMessageBox] = useState({ message: '', type: '' });

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  const handleAdminLogin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setMessageBox({ message: 'Admin girişi başarılı!', type: 'success' });
      setCurrentPage('admin');
    } else {
      setMessageBox({ message: 'Giriş başarısız: Yanlış e-posta veya şifre.', type: 'error' });
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setMessageBox({ message: 'Admin çıkışı yapıldı.', type: 'success' });
    setCurrentPage('home'); // Redirect to home after logout
  };

  const closeMessageBox = () => {
    setMessageBox({ message: '', type: '' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1a202c, #000000)',
      color: '#f7fafc',
      fontFamily: 'Inter, sans-serif',
    }}>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
          }
          .container {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .rounded-xl {
            border-radius: 0.75rem;
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .rounded-full {
            border-radius: 9999px;
          }
          .transition-colors {
            transition-property: background-color, border-color, color, fill, stroke;
            transition-duration: 300ms;
          }
          .transition-transform {
            transition-property: transform;
            transition-duration: 300ms;
          }
          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
          /* General button styles */
          .btn {
            padding: 0.75rem 1.25rem;
            font-weight: 600;
            border-radius: 0.5rem;
            transition: background-color 0.3s ease, color 0.3s ease;
            cursor: pointer;
            border: none;
            display: inline-block;
            text-align: center;
          }
          .btn-primary {
            background-color: #dc2626; /* red-700 */
            color: white;
          }
          .btn-primary:hover {
            background-color: #b91c1c; /* red-800 */
          }
          .btn-secondary {
            background-color: #4b5563; /* gray-600 */
            color: white;
          }
          .btn-secondary:hover {
            background-color: #374151; /* gray-700 */
          }
          .btn-green {
            background-color: #047857; /* green-700 */
            color: white;
          }
          .btn-green:hover {
            background-color: #065f46; /* green-800 */
          }
          .btn-blue {
            background-color: #2563eb; /* blue-700 */
            color: white;
          }
          .btn-blue:hover {
            background-color: #1d4ed8; /* blue-800 */
          }
          .btn-red {
            background-color: #dc2626; /* red-700 */
            color: white;
          }
          .btn-red:hover {
            background-color: #b91c1c; /* red-800 */
          }

          /* Input/Textarea styles */
          input[type="text"],
          input[type="email"],
          input[type="password"],
          input[type="url"],
          textarea {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.5rem;
            background-color: #374151; /* gray-700 */
            border: 1px solid #4b5563; /* gray-600 */
            color: #f7fafc; /* gray-100 */
          }
          input[type="text"]::placeholder,
          input[type="email"]::placeholder,
          input[type="password"]::placeholder,
          input[type="url"]::placeholder,
          textarea::placeholder {
            color: #9ca3af; /* gray-400 */
          }
          input[type="text"]:focus,
          input[type="email"]:focus,
          input[type="password"]:focus,
          input[type="url"]:focus,
          textarea:focus {
            border-color: #dc2626; /* red-700 */
            outline: none;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.5); /* focus ring */
          }

          /* Responsive grid for projects/blog */
          .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
          @media (min-width: 768px) { /* md breakpoint */
            .md\\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .md\\:flex-row {
                flex-direction: row;
            }
            .md\\:w-1\\/3 {
                width: 33.333333%;
            }
            .md\\:w-2\\/3 {
                width: 66.666667%;
            }
            .md\\:mb-0 {
                margin-bottom: 0;
            }
            .md\\:space-x-8 > *:not(:first-child) {
                margin-left: 2rem;
            }
          }
          @media (min-width: 1024px) { /* lg breakpoint */
            .lg\\:grid-cols-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
        `}
      </style>

      <MessageBox message={messageBox.message} type={messageBox.type} onClose={closeMessageBox} />

      {/* Navbar */}
      <nav style={{
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(26, 32, 44, 0.7)', // gray-900 with opacity
        backdropFilter: 'blur(4px)',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#dc2626', letterSpacing: '0.05em' }}>
            <span style={{ color: '#ef4444' }}>M</span>afya <span style={{ color: '#ef4444' }}>P</span>ortföyü
          </h1>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '1.5rem' }}>
            <li>
              <button
                onClick={() => setCurrentPage('home')}
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: currentPage === 'home' ? '#ef4444' : '#d1d5db',
                  transition: 'color 0.3s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Hakkımda
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('projects')}
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: currentPage === 'projects' ? '#ef4444' : '#d1d5db',
                  transition: 'color 0.3s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Projeler
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('blog')}
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: currentPage === 'blog' ? '#ef4444' : '#d1d5db',
                  transition: 'color 0.3s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Blog
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('contact')}
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: currentPage === 'contact' ? '#ef4444' : '#d1d5db',
                  transition: 'color 0.3s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                İletişim
              </button>
            </li>
            {isAdmin ? (
              <>
                <li>
                  <button
                    onClick={() => setCurrentPage('admin')}
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: currentPage === 'admin' ? '#ef4444' : '#d1d5db',
                      transition: 'color 0.3s ease',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Admin Paneli
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleAdminLogout}
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#dc2626',
                      transition: 'color 0.3s ease',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Çıkış Yap
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => setCurrentPage('adminLogin')}
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: currentPage === 'adminLogin' ? '#ef4444' : '#d1d5db',
                    transition: 'color 0.3s ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Admin Girişi
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container" style={{ padding: '2rem 0', paddingTop: '3rem' }}>
        {currentPage === 'home' && (
          <section id="home" style={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)', // gray-800 with opacity
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #7f1d1d', // red-900
            backdropFilter: 'blur(4px)',
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#dc2626', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '0.025em' }}>Hakkımda</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }} className="md:flex-row md:space-x-8">
              <div style={{ marginBottom: '1.5rem' }} className="md:w-1/3 md:mb-0">
                <img
                  src="https://placehold.co/400x400/333/eee?text=Your+Image"
                  alt="Profil Resmi"
                  style={{ borderRadius: '9999px', border: '4px solid #b91c1c', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', width: '16rem', height: '16rem', objectFit: 'cover', margin: '0 auto' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/333/eee?text=Placeholder"; }}
                />
              </div>
              <div style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: '#e2e8f0' }} className="md:w-2/3">
                <p style={{ marginBottom: '1rem' }}>
                  Merhaba, ben [Adınız Soyadınız]. Bu dijital sığınakta, yeteneklerimi ve projelerimi gözler önüne seriyorum. Gölgede kalarak inşa ettiğim her bir proje, disiplinimin ve detaylara olan bağlılığımın bir göstergesidir.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  Yazılım dünyasında [Alanınız, örn: web geliştirme, veri analizi] alanında uzmanlaşmış, her zaman en karmaşık sorunlara bile zarif çözümler bulmaya adanmış bir profesyonelim. Kodlarım, tıpkı iyi bir strateji gibi, sağlam ve etkilidir.
                </p>
                <p>
                  Burada, geçmişteki başarılarımdan ve geleceğe yönelik hedeflerimden bir kesit bulacaksınız. Benimle iletişime geçmekten çekinmeyin; her zaman yeni işbirliklerine ve meydan okumalara açığım.
                </p>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'projects' && (
          <section id="projects" style={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #7f1d1d',
            backdropFilter: 'blur(4px)',
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#dc2626', marginBottom: '2rem', textAlign: 'center', letterSpacing: '0.025em' }}>Projelerim</h2>
            {projects.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '1.25rem' }}>Henüz hiç proje eklenmedi.</p>
            ) : (
              <div style={{ display: 'grid', gap: '2rem' }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                  <div key={project.id} style={{
                    backgroundColor: '#111827', // gray-900
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                    border: '1px solid #450a0a', // red-800
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img
                      src={project.imageUrl || `https://placehold.co/600x400/444/eee?text=${encodeURIComponent(project.title)}`}
                      alt={project.title}
                      style={{ width: '100%', height: '12rem', objectFit: 'cover', borderBottom: '1px solid #450a0a' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/444/eee?text=${encodeURIComponent(project.title)}`; }}
                    />
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.75rem' }}>{project.title}</h3>
                      <p style={{ color: '#d1d5db', marginBottom: '1rem', fontSize: '1.125rem' }}>{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ padding: '0.5rem 1.25rem', fontSize: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                        >
                          Projeyi Gör
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {currentPage === 'blog' && (
          <section id="blog" style={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #7f1d1d',
            backdropFilter: 'blur(4px)',
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#dc2626', marginBottom: '2rem', textAlign: 'center', letterSpacing: '0.025em' }}>Blog & Makaleler</h2>
            {blogPosts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '1.25rem' }}>Henüz hiç blog yazısı eklenmedi.</p>
            ) : (
              <div style={{ display: 'grid', gap: '2rem' }} className="grid-cols-1 md:grid-cols-2">
                {blogPosts.map(post => (
                  <div key={post.id} style={{
                    backgroundColor: '#111827',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                    border: '1px solid #450a0a',
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.75rem' }}>{post.title}</h3>
                      <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
                        {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p style={{ color: '#d1d5db', marginBottom: '1rem', fontSize: '1.125rem' }}>{post.content.substring(0, 150)}...</p>
                      <button
                        onClick={() => setMessageBox({ message: `"${post.title}" blog yazısı detayları burada gösterilecek.`, type: 'success' })}
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1.25rem', fontSize: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                      >
                        Devamını Oku
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {currentPage === 'contact' && (
          <section id="contact" style={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #7f1d1d',
            backdropFilter: 'blur(4px)',
            maxWidth: '42rem', // max-w-2xl
            margin: '0 auto',
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#dc2626', marginBottom: '2rem', textAlign: 'center', letterSpacing: '0.025em' }}>İletişim</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Adınız</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Adınızı girin..."
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-posta adresinizi girin..."
                />
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem 0', fontSize: '1.25rem', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                onClick={(e) => { e.preventDefault(); setMessageBox({ message: 'Mesajınız başarıyla gönderildi!', type: 'success' }); }}
              >
                Gönder
              </button>
            </form>
          </section>
        )}

        {currentPage === 'adminLogin' && !isAdmin && (
          <section id="admin-login" style={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #7f1d1d',
            backdropFilter: 'blur(4px)',
            maxWidth: '28rem', // max-w-md
            margin: '0 auto',
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#dc2626', marginBottom: '2rem', textAlign: 'center', letterSpacing: '0.025em' }}>Admin Girişi</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAdminLogin(e.target.email.value, e.target.password.value);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="admin-email" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>E-posta</label>
                <input
                  type="email"
                  id="admin-email"
                  name="email"
                  placeholder="Admin e-posta adresinizi girin"
                  defaultValue={ADMIN_EMAIL} // Pre-fill for convenience
                  required
                />
              </div>
              <div>
                <label htmlFor="admin-password" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Şifre</label>
                <input
                  type="password"
                  id="admin-password"
                  name="password"
                  placeholder="Şifrenizi girin"
                  defaultValue={ADMIN_PASSWORD} // Pre-fill for convenience
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem 0', fontSize: '1.25rem', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              >
                Giriş Yap
              </button>
            </form>
          </section>
        )}

        {currentPage === 'admin' && isAdmin && (
          <AdminPanel
            projects={projects}
            setProjects={setProjects}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            setMessageBox={setMessageBox}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '1.5rem',
        textAlign: 'center',
        color: '#a0aec0', // gray-500
        backgroundColor: 'rgba(26, 32, 44, 0.7)',
        backdropFilter: 'blur(4px)',
        marginTop: '3rem',
      }}>
        <p>&copy; {new Date().getFullYear()} Mafya Portföyü. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ projects, setProjects, blogPosts, setBlogPosts, setMessageBox }) => {
  const [adminSection, setAdminSection] = useState('projects'); // 'projects' or 'blog'
  const [editingProject, setEditingProject] = useState(null);
  const [editingBlogPost, setEditingBlogPost] = useState(null);

  // Project CRUD Operations (using local state)
  const addProject = (projectData) => {
    const newProject = { id: Date.now().toString(), ...projectData, createdAt: new Date().toISOString() };
    setProjects(prevProjects => [...prevProjects, newProject]);
    setMessageBox({ message: 'Proje başarıyla eklendi!', type: 'success' });
    setEditingProject(null); // Exit editing mode
  };

  const updateProject = (projectId, projectData) => {
    setProjects(prevProjects =>
      prevProjects.map(p => (p.id === projectId ? { ...p, ...projectData } : p))
    );
    setMessageBox({ message: 'Proje başarıyla güncellendi!', type: 'success' });
    setEditingProject(null); // Exit editing mode
  };

  const deleteProject = (projectId) => {
    if (!window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      return;
    }
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    setMessageBox({ message: 'Proje başarıyla silindi!', type: 'success' });
  };

  // Blog Post CRUD Operations (using local state)
  const addBlogPost = (postData) => {
    const newPost = { id: Date.now().toString(), ...postData, date: new Date().toISOString() };
    setBlogPosts(prevPosts => [...prevPosts, newPost]);
    setMessageBox({ message: 'Blog yazısı başarıyla eklendi!', type: 'success' });
    setEditingBlogPost(null); // Exit editing mode
  };

  const updateBlogPost = (postId, postData) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, ...postData } : p))
    );
    setMessageBox({ message: 'Blog yazısı başarıyla güncellendi!', type: 'success' });
    setEditingBlogPost(null); // Exit editing mode
  };

  const deleteBlogPost = (postId) => {
    if (!window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }
    setBlogPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    setMessageBox({ message: 'Blog yazısı başarıyla silindi!', type: 'success' });
  };

  return (
    <section id="admin-panel" style={{
      backgroundColor: 'rgba(31, 41, 55, 0.8)',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid #7f1d1d',
      backdropFilter: 'blur(4px)',
    }}>
      <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#dc2626', marginBottom: '2rem', textAlign: 'center', letterSpacing: '0.025em' }}>Admin Paneli</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button
          onClick={() => { setAdminSection('projects'); setEditingProject(null); }}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '1.25rem',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            backgroundColor: adminSection === 'projects' ? '#dc2626' : '#374151',
            color: adminSection === 'projects' ? 'white' : '#e2e8f0',
            boxShadow: adminSection === 'projects' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => { if (adminSection !== 'projects') e.currentTarget.style.backgroundColor = '#4b5563'; }}
          onMouseOut={(e) => { if (adminSection !== 'projects') e.currentTarget.style.backgroundColor = '#374151'; }}
        >
          Projeleri Yönet
        </button>
        <button
          onClick={() => { setAdminSection('blog'); setEditingBlogPost(null); }}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '1.25rem',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            backgroundColor: adminSection === 'blog' ? '#dc2626' : '#374151',
            color: adminSection === 'blog' ? 'white' : '#e2e8f0',
            boxShadow: adminSection === 'blog' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => { if (adminSection !== 'blog') e.currentTarget.style.backgroundColor = '#4b5563'; }}
          onMouseOut={(e) => { if (adminSection !== 'blog') e.currentTarget.style.backgroundColor = '#374151'; }}
        >
          Blog Yazılarını Yönet
        </button>
      </div>

      {/* Project Management Section */}
      {adminSection === 'projects' && (
        <div>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center' }}>Projeler</h3>
          <button
            onClick={() => setEditingProject({})} // Empty object for new project
            className="btn btn-green"
            style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold', display: 'block', margin: '0 auto 1.5rem auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            Yeni Proje Ekle
          </button>

          {editingProject && (
            <ProjectForm
              project={editingProject}
              onSave={editingProject.id ? updateProject : addProject}
              onCancel={() => setEditingProject(null)}
            />
          )}

          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }} className="grid-cols-1 md:grid-cols-2">
            {projects.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '1.25rem', gridColumn: '1 / -1' }}>Henüz hiç proje eklenmedi.</p>
            ) : (
              projects.map(project => (
                <div key={project.id} style={{
                  backgroundColor: '#111827',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #450a0a',
                }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f87171', marginBottom: '0.5rem' }}>{project.title}</h4>
                  <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => setEditingProject(project)}
                      className="btn btn-blue"
                      style={{ padding: '0.5rem 1rem', fontWeight: '600' }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="btn btn-red"
                      style={{ padding: '0.5rem 1rem', fontWeight: '600' }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Blog Management Section */}
      {adminSection === 'blog' && (
        <div>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center' }}>Blog Yazıları</h3>
          <button
            onClick={() => setEditingBlogPost({})} // Empty object for new blog post
            className="btn btn-green"
            style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold', display: 'block', margin: '0 auto 1.5rem auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            Yeni Blog Yazısı Ekle
          </button>

          {editingBlogPost && (
            <BlogForm
              post={editingBlogPost}
              onSave={editingBlogPost.id ? updateBlogPost : addBlogPost}
              onCancel={() => setEditingBlogPost(null)}
            />
          )}

          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }} className="grid-cols-1 md:grid-cols-2">
            {blogPosts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '1.25rem', gridColumn: '1 / -1' }}>Henüz hiç blog yazısı eklenmedi.</p>
            ) : (
              blogPosts.map(post => (
                <div key={post.id} style={{
                  backgroundColor: '#111827',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #450a0a',
                }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f87171', marginBottom: '0.5rem' }}>{post.title}</h4>
                  <p style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>{post.content.substring(0, 100)}...</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => setEditingBlogPost(post)}
                      className="btn btn-blue"
                      style={{ padding: '0.5rem 1rem', fontWeight: '600' }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="btn btn-red"
                      style={{ padding: '0.5rem 1rem', fontWeight: '600' }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};

// Project Form Component
const ProjectForm = ({ project, onSave, onCancel }) => {
  const [title, setTitle] = useState(project.title || '');
  const [description, setDescription] = useState(project.description || '');
  const [imageUrl, setImageUrl] = useState(project.imageUrl || '');
  const [link, setLink] = useState(project.link || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(project.id, { title, description, imageUrl, link });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 40,
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: '#111827', // gray-900
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #b91c1c', // red-700
        width: '100%',
        maxWidth: '32rem', // max-w-lg
      }}>
        <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center' }}>{project.id ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="project-title" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Başlık</label>
            <input
              type="text"
              id="project-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="project-description" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Açıklama</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="project-image" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Görsel URL</label>
            <input
              type="url"
              id="project-image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label htmlFor="project-link" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Proje Linki (URL)</label>
            <input
              type="url"
              id="project-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com/project"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              İptal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Blog Form Component
const BlogForm = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(post.id, { title, content });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 40,
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: '#111827',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #b91c1c',
        width: '100%',
        maxWidth: '32rem',
      }}>
        <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center' }}>{post.id ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Ekle'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="blog-title" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Başlık</label>
            <input
              type="text"
              id="blog-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="blog-content" style={{ display: 'block', color: '#d1d5db', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>İçerik</label>
            <textarea
              id="blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              required
            ></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              İptal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
