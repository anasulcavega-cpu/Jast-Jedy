import React, { useState, useEffect } from 'react';
import { UserProfile, CartItem, Product, MainViewTab } from './types';
import { PRODUCTS } from './data/products';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { CatalogScreen } from './components/CatalogScreen';
import { FavoritesView } from './components/FavoritesView';
import { CotizadorView } from './components/CotizadorView';
import { ContactView } from './components/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BottomNav } from './components/BottomNav';
import { DeliveryRulesModal } from './components/DeliveryRulesModal';
import { ProfileView } from './components/ProfileView';

const USER_STORAGE_KEY = 'dulce_tentacion_user';
const CART_STORAGE_KEY = 'dulce_tentacion_cart';
const FAVORITES_STORAGE_KEY = 'dulce_tentacion_favorites';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'main'>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? 'main' : 'welcome';
    } catch {
      return 'welcome';
    }
  });

  const [activeTab, setActiveTab] = useState<MainViewTab>('postres');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['torta-chocolate', 'alfajores-coco'];
    } catch {
      return ['torta-chocolate', 'alfajores-coco'];
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

  // Sync cart & favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
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
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // ignore
    }
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
            favoritesCount={favorites.length}
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
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                onOpenRules={() => setIsRulesModalOpen(true)}
              />
            ) : activeTab === 'favoritos' ? (
              <FavoritesView
                favorites={favorites}
                allProducts={PRODUCTS}
                user={user}
                onAddToCart={handleAddToCart}
                onQuickView={() => {}}
                onGoToCatalog={() => setActiveTab('postres')}
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
            favoritesCount={favorites.length}
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
