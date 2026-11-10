import React, { useState, useEffect } from 'react';
import { UserProfile, CartItem, Product, MainViewTab, ProductRating } from './types';
import { PRODUCTS } from './data/products';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { CatalogScreen } from './components/CatalogScreen';
import { RatingAndFavoritesView } from './components/RatingAndFavoritesView';
import { CotizadorView } from './components/CotizadorView';
import { ContactView } from './components/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BottomNav } from './components/BottomNav';
import { DeliveryRulesModal } from './components/DeliveryRulesModal';
import { ProfileView } from './components/ProfileView';
import { trackPageView, trackEvent, initGA } from './utils/analytics';

const USER_STORAGE_KEY = 'dulce_tentacion_user';
const CART_STORAGE_KEY = 'dulce_tentacion_cart';
const FAVORITE_PRODUCT_STORAGE_KEY = 'dulce_tentacion_top_favorite';
const RATINGS_STORAGE_KEY = 'dulce_tentacion_ratings';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Always start on welcome screen so user sees the welcome & "Instalar App" option
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'main'>('welcome');

  const [activeTab, setActiveTab] = useState<MainViewTab>('postres');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User's chosen #1 favorite dessert
  const [favoriteProductId, setFavoriteProductId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(FAVORITE_PRODUCT_STORAGE_KEY);
      return saved !== null ? saved : 'torta-chocolate';
    } catch {
      return 'torta-chocolate';
    }
  });

  // User's dessert ratings: productId -> ProductRating
  const [ratings, setRatings] = useState<Record<string, ProductRating>>(() => {
    try {
      const saved = localStorage.getItem(RATINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Default initial rating for top favorite
      return {
        'torta-chocolate': {
          productId: 'torta-chocolate',
          rating: 5,
          comment: '¡Nuestra torta favorita! Húmeda, esponjosa y con fudge casero insuperable.',
          date: '2026-11-08',
        },
      };
    } catch {
      return {};
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize GA4 once on mount
  useEffect(() => {
    initGA();
  }, []);

  // GA4 SPA Page View Tracking Hook: Tracks every internal view / tab transition
  useEffect(() => {
    let currentPath = '/catalogo';
    let pageTitle = 'Catálogo de Postres';

    if (currentScreen === 'welcome') {
      currentPath = '/login';
      pageTitle = 'Bienvenida e Inicio de Sesión - Dulce Tentación Jast🧁Jedy';
    } else if (isProfileModalOpen) {
      currentPath = '/perfil';
      pageTitle = 'Mi Perfil de Cliente';
    } else if (activeTab === 'postres') {
      currentPath = '/catalogo';
      pageTitle = 'Catálogo de Tortas & Postres';
    } else if (activeTab === 'calificar') {
      currentPath = '/calificar';
      pageTitle = 'Escoge tu Favorito & Califica';
    } else if (activeTab === 'cotizador') {
      currentPath = '/cotizador';
      pageTitle = 'Cotizador de Tortas & Eventos';
    } else if (activeTab === 'contacto') {
      currentPath = '/contacto';
      pageTitle = 'Contacto & Horarios';
    }

    trackPageView(currentPath, pageTitle);
  }, [currentScreen, activeTab, isProfileModalOpen]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sync favorite & ratings to localStorage
  useEffect(() => {
    try {
      if (favoriteProductId) {
        localStorage.setItem(FAVORITE_PRODUCT_STORAGE_KEY, favoriteProductId);
      }
    } catch {
      // ignore
    }
  }, [favoriteProductId]);

  useEffect(() => {
    try {
      localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
    } catch {
      // ignore
    }
  }, [ratings]);

  const handleSelectFavorite = (productId: string) => {
    setFavoriteProductId(productId);
    const prod = PRODUCTS.find((p) => p.id === productId);
    trackEvent('set_top_favorite', 'User Preference', prod?.name || productId);
  };

  const handleSaveRating = (
    productId: string,
    rating: number,
    comment?: string,
    setAsFavorite?: boolean
  ) => {
    const newRatingObj: ProductRating = {
      productId,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };

    setRatings((prev) => ({
      ...prev,
      [productId]: newRatingObj,
    }));

    if (setAsFavorite) {
      setFavoriteProductId(productId);
    }

    const prod = PRODUCTS.find((p) => p.id === productId);
    trackEvent(
      'rate_product',
      'User Ratings',
      `${prod?.name || productId} - ${rating} stars`,
      rating
    );
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
    trackEvent('login_complete', 'User', profile.name);
    setCurrentScreen('main');
    setActiveTab('postres');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch {
      // ignore
    }
    trackEvent('update_profile', 'User', updatedProfile.name);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // ignore
    }
    trackEvent('logout', 'User');
    setUser(null);
    setCurrentScreen('welcome');
    setIsProfileModalOpen(false);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });

    trackEvent('add_to_cart', 'Ecommerce', product.name, product.price * quantity);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleTabChange = (tab: MainViewTab) => {
    setActiveTab(tab);
    setIsProfileModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2C1810] font-sans flex flex-col selection:bg-[#FFE4E8] selection:text-[#E05A68] pb-16">
      {currentScreen === 'welcome' ? (
        <WelcomeScreen
          onSuccess={handleLoginSuccess}
          initialProfile={user}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Top Bar with "¡Hola, [Nombre]!" & Top Navigation Strip from Image 1 */}
          <Header
            user={user}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            cartCount={totalCartCount}
            favoriteProductCount={favoriteProductId ? 1 : 0}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenRules={() => setIsRulesModalOpen(true)}
          />

          {/* Main View Area */}
          <div className="flex-1">
            {isProfileModalOpen ? (
              <ProfileView
                user={user}
                onUpdateUser={handleUpdateUser}
                onOpenRules={() => setIsRulesModalOpen(true)}
                onLogout={handleLogout}
              />
            ) : activeTab === 'postres' ? (
              <CatalogScreen
                user={user}
                favoriteProductId={favoriteProductId}
                ratings={ratings}
                onSaveRating={handleSaveRating}
                onAddToCart={handleAddToCart}
                onOpenRules={() => setIsRulesModalOpen(true)}
                onGoToRatingTab={() => setActiveTab('calificar')}
              />
            ) : activeTab === 'calificar' ? (
              <RatingAndFavoritesView
                allProducts={PRODUCTS}
                user={user}
                favoriteProductId={favoriteProductId}
                ratings={ratings}
                onSelectFavorite={handleSelectFavorite}
                onRateProduct={handleSaveRating}
                onGoToCatalog={() => setActiveTab('postres')}
                onAddToCart={handleAddToCart}
              />
            ) : activeTab === 'cotizador' ? (
              <CotizadorView user={user} />
            ) : (
              <ContactView
                user={user}
                onOpenRules={() => setIsRulesModalOpen(true)}
              />
            )}
          </div>

          {/* Floating WhatsApp Action Button */}
          <FloatingWhatsApp user={user} />

          {/* Bottom Navigation Bar exactly matching user Image 2 */}
          <BottomNav
            activeTab={activeTab}
            onTabChange={handleTabChange}
            hasFavoriteSelected={Boolean(favoriteProductId)}
          />

          {/* Sliding Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            user={user}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onRequestLogin={() => {
              setIsCartOpen(false);
              setIsProfileModalOpen(true);
            }}
          />

          {/* Delivery Rules Modal */}
          <DeliveryRulesModal
            isOpen={isRulesModalOpen}
            onClose={() => setIsRulesModalOpen(false)}
            user={user}
          />
        </div>
      )}
    </div>
  );
}
