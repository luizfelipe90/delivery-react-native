import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  ScrollView,
  useWindowDimensions,
  Image,
  TextInput,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';

export default function CartScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');

  const handleFinalizeOrder = () => {
    if (!name || !address) {
      alert('Por favor, preencha seu nome e endereço de entrega.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    const restaurantPhone = '5511999999999'; // Exemplo de número
    
    let message = `*Novo Pedido - L'Italiana*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Endereço:* ${address}\n`;
    message += `*Pagamento:* ${paymentMethod}\n\n`;
    message += `*Itens:*\n`;

    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.title} (R$ ${(item.price * item.quantity).toFixed(2)})\n`;
    });

    message += `\n*TOTAL: R$ ${cartTotal.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${encodedMessage}`;

    Linking.openURL(whatsappUrl);
    clearCart();
    router.push('/');
  };

  return (
    <View style={styles.mainWrapper}>
      <Navbar />

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.scrollContent, { paddingTop: isDesktop ? 100 : 180 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 32 : 24, letterSpacing: isDesktop ? 4 : 2 }]}>SEU CARRINHO</Text>
          <View style={styles.separator} />

          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={64} color="#333" />
              <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
              <TouchableOpacity 
                style={styles.backBtn}
                onPress={() => router.push('/cardapio')}
              >
                <Text style={styles.backBtnText}>VER CARDÁPIO</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.mainGrid, !isDesktop && styles.mainGridMobile]}>
              {/* LISTA DE ITENS */}
              <View style={[styles.itemsSection, { flex: isDesktop ? 1.5 : 1 }]}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItemCard}>
                    <Image source={item.image} style={[styles.itemImage, { width: isDesktop ? 80 : 60, height: isDesktop ? 80 : 60 }]} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
                      
                      <View style={styles.qtyContainer}>
                        <TouchableOpacity 
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Ionicons name="remove" size={16} color="#d4af37" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity 
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Ionicons name="add" size={16} color="#d4af37" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                          style={styles.removeBtn}
                          onPress={() => removeFromCart(item.id)}
                        >
                          <Ionicons name="trash-outline" size={18} color="#ff4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* FORMULÁRIO DE CHECKOUT */}
              <View style={[styles.checkoutSection, { flex: isDesktop ? 1 : 1 }]}>
                <View style={styles.checkoutCard}>
                  <Text style={styles.checkoutTitle}>DADOS DE ENTREGA</Text>
                  
                  <Text style={styles.label}>Nome Completo</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Seu nome"
                    placeholderTextColor="#555"
                    value={name}
                    onChangeText={setName}
                  />

                  <Text style={styles.label}>Endereço Completo</Text>
                  <TextInput 
                    style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                    placeholder="Rua, número, bairro..."
                    placeholderTextColor="#555"
                    multiline
                    value={address}
                    onChangeText={setAddress}
                  />

                  <Text style={styles.label}>Forma de Pagamento</Text>
                  <View style={styles.paymentOptions}>
                    {['PIX', 'Cartão', 'Dinheiro'].map((method) => (
                      <TouchableOpacity 
                        key={method}
                        style={[styles.paymentBtn, paymentMethod === method && styles.paymentBtnActive]}
                        onPress={() => setPaymentMethod(method)}
                      >
                        <Text style={[styles.paymentBtnText, paymentMethod === method && styles.paymentBtnTextActive]}>
                          {method}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Subtotal</Text>
                    <Text style={styles.totalValue}>R$ {cartTotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Taxa de Entrega</Text>
                    <Text style={styles.totalValue}>Grátis</Text>
                  </View>
                  <View style={[styles.totalContainer, { marginTop: 16, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 16 }]}>
                    <Text style={[styles.totalLabel, { color: '#d4af37', fontSize: 20 }]}>Total</Text>
                    <Text style={[styles.totalValue, { color: '#d4af37', fontSize: 20 }]}>R$ {cartTotal.toFixed(2)}</Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.finalizeBtn}
                    onPress={handleFinalizeOrder}
                  >
                    <Ionicons name="logo-whatsapp" size={20} color="#050505" style={{ marginRight: 10 }} />
                    <Text style={styles.finalizeBtnText}>FINALIZAR NO WHATSAPP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>L'Italiana</Text>
          <Text style={styles.footerText}>Piazza di Lusso, 71 - Jardim Europa</Text>
          <Text style={[styles.separator, { width: 30, marginVertical: 24 }]} />
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
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 60,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    color: '#d4af37',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  separator: {
    width: 60,
    height: 1,
    backgroundColor: '#332915', 
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    color: '#555',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 40,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  backBtn: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  backBtnText: {
    color: '#d4af37',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  mainGrid: {
    flexDirection: 'row',
    gap: 40,
  },
  mainGridMobile: {
    flexDirection: 'column',
  },
  itemsSection: {
  },
  checkoutSection: {
  },
  cartItemCard: {
    flexDirection: 'row',
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1814',
    padding: 16,
    marginBottom: 16,
  },
  itemImage: {
    borderRadius: 4,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  itemTitle: {
    color: '#f0f0f0',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#d4af37',
    fontSize: 16,
    marginBottom: 12,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    color: '#fff',
    marginHorizontal: 12,
    fontSize: 16,
  },
  removeBtn: {
    marginLeft: 'auto',
    padding: 4,
  },
  checkoutCard: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1814',
    padding: 24,
    borderRadius: 8,
  },
  checkoutTitle: {
    color: '#d4af37',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    letterSpacing: 2,
  },
  label: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#050505',
    borderWidth: 1,
    borderColor: '#222',
    color: '#fff',
    padding: 12,
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  paymentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
  },
  paymentBtnActive: {
    borderColor: '#d4af37',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  paymentBtnText: {
    color: '#555',
    fontSize: 12,
  },
  paymentBtnTextActive: {
    color: '#d4af37',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    color: '#888',
    fontSize: 14,
  },
  totalValue: {
    color: '#f0f0f0',
    fontSize: 14,
  },
  finalizeBtn: {
    backgroundColor: '#d4af37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginTop: 30,
  },
  finalizeBtnText: {
    color: '#050505',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 14,
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
