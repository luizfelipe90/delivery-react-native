import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  ScrollView,
  useWindowDimensions,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';

const MENU_ITEMS = [
  { id: '1', title: 'Tartufo Nero Pasta', price: 145.00, priceStr: 'R$ 145,00', image: require('../assets/images/tartufo_pasta.png'), desc: 'Massa fresca artesanal banhada em delicado azeite trufado, perfeitamente em emulsionada e finalizada com finas lascas de trufas negras colhidas à mão.' },
  { id: '2', title: 'Carbonara Classica', price: 85.00, priceStr: 'R$ 85,00', image: require('../assets/images/carbonara.png'), desc: 'A rigorosa e verdadeira receita romana, preparada exclusivamente com os autênticos guanciale curado, pecorino romano defumado e pimenta preta moída na hora.' },
  { id: '3', title: 'Risotto au Funghi Porcini', price: 110.00, priceStr: 'R$ 110,00', image: require('../assets/images/risotto_porcini.jpg'), desc: 'Arroz arbório italiano de grão firme amorosamente envolto em um creme sedoso, acompanhado pela textura e sabor terroso dos cogumelos porcini.' },
  { id: '4', title: 'Ossobuco Milanese', price: 160.00, priceStr: 'R$ 160,00', image: require('../assets/images/ossobuco.png'), desc: 'Corte bovino de extrema maciez cozido lentamente ao longo de 12 horas para preservar o máximo de temperos, descansando em cama de polenta cremosa.' },
];

const DESSERT_ITEMS = [
  { id: '5', title: 'Tiramisù Tradizionale', price: 45.00, priceStr: 'R$ 45,00', image: require('../assets/images/tiramisu.png'), desc: 'Biscoitos savoiardi mergulhados em expresso extra-forte por segundos contados. Camadas ricas e espessas de legítimo mascarpone e cacau superior.' },
  { id: '6', title: 'Panna Cotta al Limone', price: 42.00, priceStr: 'R$ 42,00', image: require('../assets/images/panna_cotta.png'), desc: 'Sobremesa de nata sedosa infundida levemente em baunilha de Madagascar recoberta por uma refrescante calda ácida de limão siciliano.' },
  { id: '7', title: 'Cannolli Siciliani', price: 25.80, priceStr: 'R$ 25,80', image: require('../assets/images/cannolli.png'), desc: 'Crocantes tubos de massa frita recheados com um levíssimo creme de ricota, gotas de chocolate e pistache.' },
  { id: '8', title: 'Pignoli Amaretti', price: 23.75, priceStr: 'R$ 23,75', image: require('../assets/images/pignoli.png'), desc: 'Tradicionais biscoitos de amêndoas cobertos com pinolis selecionados, crocantes por fora e macios por dentro.' },
];

const DRINK_ITEMS = [
  { id: 'w1', title: 'Chianti Classico Riserva', price: 180.00, priceStr: 'R$ 180,00', type: 'Tinto', color: '#4a0404', image: require('../assets/images/chianti.png'), desc: 'Frutos vermelhos maduros, especiarias e notas de carvalho. Corpo robusto e taninos sedosos.' },
  { id: 'w2', title: 'Brunello di Montalcino', price: 450.00, priceStr: 'R$ 450,00', type: 'Tinto', color: '#3b0d0c', image: require('../assets/images/brunello.png'), desc: 'Um clássico da Toscana. Aromas complexos de couro, terra e cereja negra. Potencial de guarda extraordinário.' },
  { id: 'w3', title: 'Barolo DOCG', price: 380.00, priceStr: 'R$ 380,00', type: 'Tinto', color: '#590d22', image: require('../assets/images/barolo.png'), desc: 'O "rei dos vinhos". Elegante, com notas de pétalas de rosa, alcatrão e frutas silvestres.' },
];

const JUICE_ITEMS = [
  { id: 'j1', title: 'Limonada Siciliana', price: 12.00, priceStr: 'R$ 12,00', color: '#fef250', desc: 'Refrescante limonada feita com os legítimos limões sicilianos e um toque de hortelã.', image: require('../assets/images/limonada.png') },
  { id: 'j2', title: 'Suco de Laranja Natural', price: 10.00, priceStr: 'R$ 10,00', color: '#ffa500', desc: 'Laranjas selecionadas, espremidas na hora para garantir o máximo de frescor e vitamina C.', image: require('../assets/images/suco_laranja.png') },
];

export default function CardapioSite() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { isRegistered } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'pratos' | 'bebidas' | 'sobremesas' | 'sucos'>('pratos');

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image
    });
  };


  const handleNavigateHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.mainWrapper}>
      
      <Navbar />

      {/* CONTEÚDO SCROLLÁVEL */}

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.scrollContent, { paddingTop: isDesktop ? 70 : 150 }]}
        showsVerticalScrollIndicator={false}
      >
        
        {/* MENU SECTION */}
        <View style={styles.sectionDark}>
          <Text style={styles.sectionTitle}>IL NOSTRO MENU</Text>
          <View style={styles.separator} />

          {/* CATEGORY SELECTOR */}
          <View style={[styles.categorySelector, !isDesktop && styles.categorySelectorMobile]}>
            <TouchableOpacity 
              style={[styles.categoryBtn, activeCategory === 'pratos' && styles.categoryBtnActive, !isDesktop && styles.categoryBtnMobile]}
              onPress={() => setActiveCategory('pratos')}
            >
              <Text style={[styles.categoryBtnText, activeCategory === 'pratos' && styles.categoryBtnTextActive]}>PRATOS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.categoryBtn, activeCategory === 'sobremesas' && styles.categoryBtnActive, !isDesktop && styles.categoryBtnMobile]}
              onPress={() => setActiveCategory('sobremesas')}
            >
              <Text style={[styles.categoryBtnText, activeCategory === 'sobremesas' && styles.categoryBtnTextActive]}>SOBREMESAS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.categoryBtn, activeCategory === 'bebidas' && styles.categoryBtnActive, !isDesktop && styles.categoryBtnMobile]}
              onPress={() => setActiveCategory('bebidas')}
            >
              <Text style={[styles.categoryBtnText, activeCategory === 'bebidas' && styles.categoryBtnTextActive]}>VINHOS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.categoryBtn, activeCategory === 'sucos' && styles.categoryBtnActive, !isDesktop && styles.categoryBtnMobile]}
              onPress={() => setActiveCategory('sucos')}
            >
              <Text style={[styles.categoryBtnText, activeCategory === 'sucos' && styles.categoryBtnTextActive]}>SUCOS</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.menuGrid}>
            {activeCategory === 'pratos' ? (
              MENU_ITEMS.map((item) => {
                const cartItem = cartItems.find(ci => ci.id === item.id);
                const isSelected = !!cartItem;
                return (
                  <View 
                    key={item.id} 
                    style={[styles.menuCard, isSelected && styles.menuCardSelected, { width: isDesktop ? '48.6%' : '100%', padding: isDesktop ? 32 : 16 }]}
                  >
                    {item.image ? (
                    <Image source={item.image} style={styles.menuImage} />
                  ) : (
                    <View style={[styles.menuImage, { backgroundColor: item.color, justifyContent: 'center', alignItems: 'center' }]}>
                      <Ionicons name={item.icon || "restaurant"} size={60} color="#d4af37" />
                    </View>
                  )}
                    <View style={styles.cardHeader}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <View style={styles.priceContainer}>
                        {isRegistered ? (
                          <>
                            <Text style={styles.oldPrice}>{item.priceStr}</Text>
                            <Text style={styles.menuPrice}>R$ {(item.price * 0.85).toFixed(2)}</Text>
                          </>
                        ) : (
                          <Text style={styles.menuPrice}>{item.priceStr}</Text>
                        )}
                      </View>
                    </View>
                    <Text style={styles.menuDesc}>{item.desc}</Text>
                    
                    {isSelected ? (
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity 
                          style={styles.qtyBtn} 
                          onPress={() => updateQuantity(item.id, cartItem.quantity - 1)}
                        >
                          <Ionicons name="remove" size={20} color="#d4af37" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                        <TouchableOpacity 
                          style={styles.qtyBtn} 
                          onPress={() => updateQuantity(item.id, cartItem.quantity + 1)}
                        >
                          <Ionicons name="add" size={20} color="#d4af37" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        style={styles.selectBtn}
                        onPress={() => handleAddToCart(item)}
                      >
                        <Text style={styles.selectBtnText}>ADICIONAR AO CARRINHO</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            ) : activeCategory === 'sobremesas' ? (
              DESSERT_ITEMS.map((item) => {
                const cartItem = cartItems.find(ci => ci.id === item.id);
                const isSelected = !!cartItem;
                return (
                  <View 
                    key={item.id} 
                    style={[styles.menuCard, isSelected && styles.menuCardSelected, { width: isDesktop ? '48.6%' : '100%', padding: isDesktop ? 32 : 16 }]}
                  >
                    {item.image ? (
                      <Image source={item.image} style={styles.menuImage} />
                    ) : (
                      <View style={[styles.menuImage, { backgroundColor: item.color, justifyContent: 'center', alignItems: 'center' }]}>
                        <Ionicons name={item.icon || "restaurant"} size={60} color="#d4af37" />
                      </View>
                    )}
                    <View style={styles.cardHeader}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <View style={styles.priceContainer}>
                        {isRegistered ? (
                          <>
                            <Text style={styles.oldPrice}>{item.priceStr}</Text>
                            <Text style={styles.menuPrice}>R$ {(item.price * 0.85).toFixed(2)}</Text>
                          </>
                        ) : (
                          <Text style={styles.menuPrice}>{item.priceStr}</Text>
                        )}
                      </View>
                    </View>
                    <Text style={styles.menuDesc}>{item.desc}</Text>
                    
                    {isSelected ? (
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity 
                          style={styles.qtyBtn} 
                          onPress={() => updateQuantity(item.id, cartItem.quantity - 1)}
                        >
                          <Ionicons name="remove" size={20} color="#d4af37" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                        <TouchableOpacity 
                          style={styles.qtyBtn} 
                          onPress={() => updateQuantity(item.id, cartItem.quantity + 1)}
                        >
                          <Ionicons name="add" size={20} color="#d4af37" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        style={styles.selectBtn}
                        onPress={() => handleAddToCart(item)}
                      >
                        <Text style={styles.selectBtnText}>ADICIONAR AO CARRINHO</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            ) : activeCategory === 'bebidas' ? (
              <View style={{ width: '100%' }}>
                {['Tinto'].map((type) => (
                  <View key={type} style={styles.drinkCategoryContainer}>
                    <View style={styles.drinkHeaderLine}>
                      <View style={styles.line} />
                      <Text style={styles.drinkCategoryTitle}>{type.toUpperCase()}</Text>
                      <View style={styles.line} />
                    </View>
                    
                    <View style={styles.menuGrid}>
                      {DRINK_ITEMS.filter(d => d.type === type).map((item) => {
                        const cartItem = cartItems.find(ci => ci.id === item.id);
                        const isSelected = !!cartItem;
                        return (
                          <View 
                            key={item.id} 
                            style={[styles.menuCard, isSelected && styles.menuCardSelected, { width: isDesktop ? '48.6%' : '100%', padding: isDesktop ? 32 : 16, minHeight: 250 }]}
                          >
                            {/* Wine Image or Placeholder */}
                            {item.image ? (
                              <Image 
                                source={item.image} 
                                style={[styles.wineIconPlaceholder, { backgroundColor: 'transparent' }]} 
                                resizeMode="contain" 
                              />
                            ) : (
                              <View style={[styles.wineIconPlaceholder, { backgroundColor: item.color }]}>
                                <Ionicons name="wine" size={40} color={type === 'Branco' ? '#333' : '#fff'} />
                              </View>
                            )}

                            <View style={styles.cardHeader}>
                              <Text style={styles.menuTitle}>{item.title}</Text>
                              <View style={styles.priceContainer}>
                                {isRegistered ? (
                                  <>
                                    <Text style={styles.oldPrice}>{item.priceStr}</Text>
                                    <Text style={styles.menuPrice}>R$ {(item.price * 0.85).toFixed(2)}</Text>
                                  </>
                                ) : (
                                  <Text style={styles.menuPrice}>{item.priceStr}</Text>
                                )}
                              </View>
                            </View>
                            <Text style={styles.menuDesc}>{item.desc}</Text>
                            
                            {isSelected ? (
                              <View style={styles.quantityContainer}>
                                <TouchableOpacity 
                                  style={styles.qtyBtn} 
                                  onPress={() => updateQuantity(item.id, cartItem.quantity - 1)}
                                >
                                  <Ionicons name="remove" size={20} color="#d4af37" />
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                                <TouchableOpacity 
                                  style={styles.qtyBtn} 
                                  onPress={() => updateQuantity(item.id, cartItem.quantity + 1)}
                                >
                                  <Ionicons name="add" size={20} color="#d4af37" />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <TouchableOpacity 
                                style={styles.selectBtn}
                                onPress={() => handleAddToCart(item)}
                              >
                                <Text style={styles.selectBtnText}>ADICIONAR AO CARRINHO</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.menuGrid}>
                {JUICE_ITEMS.map((item) => {
                  const cartItem = cartItems.find(ci => ci.id === item.id);
                  const isSelected = !!cartItem;
                  return (
                    <View 
                      key={item.id} 
                      style={[styles.menuCard, isSelected && styles.menuCardSelected, { width: isDesktop ? '48.6%' : '100%', padding: isDesktop ? 32 : 16, minHeight: 250 }]}
                    >
                      {/* Juice Image or Placeholder */}
                      {item.image ? (
                        <Image 
                          source={item.image} 
                          style={[styles.wineIconPlaceholder, { backgroundColor: 'transparent' }]} 
                          resizeMode="contain" 
                        />
                      ) : (
                        <View style={[styles.wineIconPlaceholder, { backgroundColor: item.color }]}>
                          <Ionicons name="cafe-outline" size={40} color="#050505" />
                        </View>
                      )}

                      <View style={styles.cardHeader}>
                        <Text style={styles.menuTitle}>{item.title}</Text>
                        <View style={styles.priceContainer}>
                          {isRegistered ? (
                            <>
                              <Text style={styles.oldPrice}>{item.priceStr}</Text>
                              <Text style={styles.menuPrice}>R$ {(item.price * 0.85).toFixed(2)}</Text>
                            </>
                          ) : (
                            <Text style={styles.menuPrice}>{item.priceStr}</Text>
                          )}
                        </View>
                      </View>
                      <Text style={styles.menuDesc}>{item.desc}</Text>
                      
                      {isSelected ? (
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity 
                            style={styles.qtyBtn} 
                            onPress={() => updateQuantity(item.id, cartItem.quantity - 1)}
                          >
                            <Ionicons name="remove" size={20} color="#d4af37" />
                          </TouchableOpacity>
                          <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                          <TouchableOpacity 
                            style={styles.qtyBtn} 
                            onPress={() => updateQuantity(item.id, cartItem.quantity + 1)}
                          >
                            <Ionicons name="add" size={20} color="#d4af37" />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity 
                          style={styles.selectBtn}
                          onPress={() => handleAddToCart(item)}
                        >
                          <Text style={styles.selectBtnText}>ADICIONAR AO CARRINHO</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>L'Italiana</Text>
          <Text style={styles.footerText}>Piazza di Lusso, 71 - Jardim Europa</Text>
          <Text style={styles.footerText}>Reservas exclusivas: concierge@litaliana.com.br</Text>
          <View style={[styles.separator, { width: 30, marginVertical: 24 }]} />
          <Text style={styles.footerRights}>© 2026 L'Italiana - Todos os direitos reservados.</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#050505',
    ...Platform.select({
       web: { overflow: 'hidden' }
    })
  },
  /* ESTILOS DA PÁGINA */
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionDark: {
    backgroundColor: '#0a0a0a',
    paddingVertical: 100,
    paddingHorizontal: 24,
    alignItems: 'center',
    minHeight: '80%',
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    color: '#d4af37',
    letterSpacing: 6,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  separator: {
    width: 60,
    height: 1,
    backgroundColor: '#332915', 
    marginTop: 24,
    marginBottom: 40,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
    width: '100%',
    paddingHorizontal: 24,
  },
  categorySelectorMobile: {
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBtnMobile: {
    width: '46%',
    paddingHorizontal: 8,
  },
  categoryBtnActive: {
    borderColor: '#d4af37',
    backgroundColor: '#d4af37',
  },
  categoryBtnText: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  categoryBtnTextActive: {
    color: '#050505',
  },
  drinkCategoryContainer: {
    width: '100%',
    marginBottom: 60,
  },
  drinkHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#1a1814',
  },
  drinkCategoryTitle: {
    color: '#d4af37',
    fontSize: 16,
    letterSpacing: 3,
    fontWeight: '600',
  },
  wineIconPlaceholder: {
    width: '100%',
    height: 280,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  menuGrid: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 24,
  },
  menuCard: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1814',
  },
  menuCardSelected: {
    borderColor: '#d4af37',
    backgroundColor: '#110e08',
  },
  menuImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  selectBtn: {
    marginTop: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    borderRadius: 4,
  },
  selectBtnActive: {
    borderColor: '#d4af37',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  selectBtnText: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 20,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
    minWidth: 20,
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  oldPrice: {
    color: '#555',
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
  },
  menuTitle: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    color: '#f0f0f0',
    flex: 1,
    paddingRight: 16,
  },
  menuPrice: {
    fontSize: 20,
    color: '#d4af37',
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
  },
  menuDesc: {
    fontSize: 15,
    color: '#777',
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  footer: {
    backgroundColor: '#000',
    paddingVertical: 64,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#111',
  },
  footerLogo: {
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    color: '#d4af37',
    marginBottom: 20,
    letterSpacing: 2,
  },
  footerText: {
    color: '#555',
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  footerRights: {
    color: '#333',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  }
});
