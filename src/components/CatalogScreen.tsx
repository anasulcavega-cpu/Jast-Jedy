import React, { useState, useMemo } from 'react';
import { Search, Sparkles, CakeSlice, Cookie, PartyPopper, Utensils, Clock, ChevronRight, Palette, Tag } from 'lucide-react';
import { Product, UserProfile, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { FeaturedCard } from './FeaturedCard';

interface CatalogScreenProps {
  user: UserProfile | null;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenRules: () => void;
}

type FilterOption = 'todos' | ProductCategory;

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  user,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onOpenRules,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterOption>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // The featured product: Torta de Chocolate & Fudge Casero
  const featuredProduct = useMemo(() => {
    return PRODUCTS.find((p) => p.id === 'torta-chocolate') || PRODUCTS[0];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'todos' || product.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories: { id: FilterOption; label: string; icon: React.ReactNode }[] = [
    { id: 'todos', label: 'Todo el Menú', icon: <span>🧁</span> },
    { id: 'tortas', label: 'Tortas Decorativas', icon: <CakeSlice className="w-4 h-4 text-[#E05A68]" /> },
    { id: 'alfajores', label: 'Alfajores Caseros', icon: <Cookie className="w-4 h-4 text-[#B45309]" /> },
    { id: 'bocaditos', label: 'Bocaditos & Fiestas', icon: <PartyPopper className="w-4 h-4 text-[#8B5CF6]" /> },
    { id: 'salados', label: 'Pizzas & Salados', icon: <Utensils className="w-4 h-4 text-[#10B981]" /> },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-24">
      {/* Creative Welcome Banner */}
      <section className="mb-4 bg-gradient-to-r from-[#FFE4E8]/60 via-white to-[#F3E8FF]/60 rounded-3xl p-4 sm:p-5 border-2 border-[#FFE4E8] shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-[#2C1810]">
                  Tortas Decorativas & Ideas Creativas
                </h1>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                  Precios Económicos
                </span>
              </div>
              <p className="text-xs text-[#5C453C] font-medium mt-0.5">
                ¡Personalizamos cualquier diseño con tus colores, fotos o personajes favoritos!
              </p>
            </div>
          </div>

          <div
            onClick={onOpenRules}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#E05A68] text-xs font-bold border border-[#FFE4E8] hover:bg-[#FFE4E8] transition-colors cursor-pointer shrink-0"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Horarios de Entrega</span>
          </div>
        </div>
      </section>

      {/* Buscador: Una barra de búsqueda redondeada con texto "Buscar tortas, postres..." */}
      <section className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8C6D62]">
            <Search className="w-5 h-5 text-[#E05A68]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tortas, postres..."
            className="w-full pl-12 pr-10 py-3.5 bg-white text-xs sm:text-sm rounded-full border-2 border-[#FFE4E8] text-[#2C1810] placeholder-[#8C6D62]/70 focus:outline-none focus:border-[#E05A68] shadow-xs transition-all font-semibold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#E05A68] hover:underline"
            >
              Limpiar
            </button>
          )}
        </div>
      </section>

      {/* Categorías (Botones circulares o píldoras): Tortas Decorativas, Alfajores, Bocaditos, Salados */}
      <section className="mb-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white shadow-md shadow-[#E05A68]/25 scale-102'
                    : 'bg-white text-[#2C1810] border-2 border-[#FFE4E8] hover:border-[#E05A68]/40'
                }`}
              >
                <span className="shrink-0">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sección "Destacados": Una tarjeta grande con imagen, título "Torta de Chocolate", precio económico y botón de "Agregar" */}
      {activeCategory === 'todos' && !searchQuery && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E05A68]" />
              <h2 className="text-base sm:text-lg font-extrabold text-[#2C1810]">
                Postre Destacado de la Casa
              </h2>
            </div>
            <span className="text-xs font-bold text-[#E05A68] bg-[#FFE4E8] px-2.5 py-0.5 rounded-full">
              ¡Recomendado al 100%!
            </span>
          </div>

          <FeaturedCard
            product={featuredProduct}
            user={user}
            onAddToCart={onAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
          />
        </section>
      )}

      {/* Main Grid: All Requested Creative & Decorative Real Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-[#2C1810]">
              {activeCategory === 'todos'
                ? 'Catálogo de Postres & Ideas Creativas'
                : `Categoría: ${categories.find((c) => c.id === activeCategory)?.label}`}
            </h2>
          </div>
          <span className="text-xs text-[#8C6D62] font-bold">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'delicia' : 'delicias'}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border-2 border-[#FFE4E8] shadow-xs max-w-md mx-auto my-6">
            <span className="text-4xl mb-2 block">🧁</span>
            <h3 className="text-base font-bold text-[#2C1810]">
              No se encontraron postres
            </h3>
            <p className="text-xs text-[#8C6D62] mt-1 mb-4 font-medium">
              Prueba buscando con otro término o seleccionando otra categoría.
            </p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#E05A68] text-white text-xs font-bold rounded-xl hover:opacity-90 cursor-pointer"
            >
              Ver todos los postres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                user={user}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        user={user}
        onAddToCart={onAddToCart}
      />
    </main>
  );
};
