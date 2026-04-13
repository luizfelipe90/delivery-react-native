import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  useWindowDimensions,
  Modal,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { isRegistered, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path as any);
    setIsMenuOpen(false);
  };

  const NavItems = () => (
    <>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => handleNavigate('/')}
      >
        <Text style={[styles.navLinkText, pathname === '/' && styles.navLinkActive]}>Quem Somos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => handleNavigate('/cardapio')}
      >
        <Text style={[styles.navLinkText, pathname === '/cardapio' && styles.navLinkActive]}>Cardápio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => handleNavigate('/cart')}
      >
        <View style={styles.cartContainer}>
          <Text style={[styles.navLinkText, pathname === '/cart' && styles.navLinkActive]}>Carrinho de Compra</Text>
          {itemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{itemCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {isDesktop && <View style={styles.navSeparator} />}

      <TouchableOpacity 
        style={styles.navCouponContainer}
        onPress={() => handleNavigate('/register')}
      >
        <Text style={[styles.navCouponText, pathname === '/register' && styles.navLinkActive]}>
          {isRegistered ? `Olá, ${user?.name.split(' ')[0]}` : 'Cupom de Desconto'}
        </Text>
        <Ionicons 
          name={isRegistered ? "person-circle" : "person"} 
          size={18} 
          color="#d4af37" 
          style={{ marginLeft: 8 }} 
        />
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.navBar}>
      <View style={styles.navLeft}>
        <TouchableOpacity onPress={() => handleNavigate('/')}>
          <Text style={styles.navLogo}>L'Italiana</Text>
        </TouchableOpacity>
      </View>

      {isDesktop ? (
        <View style={styles.navRight}>
          <NavItems />
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.hamburgerBtn}
          onPress={() => setIsMenuOpen(true)}
        >
          <Ionicons name="menu-outline" size={32} color="#d4af37" />
        </TouchableOpacity>
      )}

      {/* MOBILE MENU MODAL */}
      <Modal
        visible={isMenuOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <SafeAreaView style={styles.mobileMenuOverlay}>
          <View style={styles.mobileMenuHeader}>
            <Text style={styles.navLogo}>L'Italiana</Text>
            <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
              <Ionicons name="close-outline" size={36} color="#d4af37" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.mobileMenuItems}>
            <TouchableOpacity style={styles.mobileNavItem} onPress={() => handleNavigate('/')}>
              <Text style={[styles.mobileNavLinkText, pathname === '/' && styles.navLinkActive]}>Quem Somos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mobileNavItem} onPress={() => handleNavigate('/cardapio')}>
              <Text style={[styles.mobileNavLinkText, pathname === '/cardapio' && styles.navLinkActive]}>Cardápio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mobileNavItem} onPress={() => handleNavigate('/cart')}>
              <View style={styles.cartContainer}>
                <Text style={[styles.mobileNavLinkText, pathname === '/cart' && styles.navLinkActive]}>Carrinho de Compra</Text>
                {itemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mobileNavItem} onPress={() => handleNavigate('/register')}>
              <Text style={[styles.mobileNavLinkText, pathname === '/register' && styles.navLinkActive, { color: '#d4af37' }]}>
                {isRegistered ? `Olá, ${user?.name}` : 'Cupom de Desconto'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mobileMenuFooter}>
            <Text style={styles.footerText}>Piazza di Lusso, 71</Text>
            <Text style={styles.footerText}>© 2026 L'Italiana</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(5, 5, 5, 0.95)',
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1814',
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(10px)',
    })
  },
  navLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navLogo: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    color: '#d4af37',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  navItem: {
    marginHorizontal: 12,
  },
  navLinkText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'sans-serif',
  },
  navLinkActive: {
    color: '#d4af37',
  },
  navSeparator: {
    height: 24,
    width: 1,
    backgroundColor: '#333',
    marginHorizontal: 12,
  },
  navCouponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  navCouponText: {
    color: '#d4af37',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#d4af37',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#050505',
    fontSize: 10,
    fontWeight: 'bold',
  },
  hamburgerBtn: {
    padding: 8,
  },
  mobileMenuOverlay: {
    flex: 1,
    backgroundColor: '#050505',
    padding: 24,
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  mobileMenuItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  mobileNavItem: {
    width: '100%',
    alignItems: 'center',
  },
  mobileNavLinkText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  mobileMenuFooter: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: '#444',
    fontSize: 12,
    marginBottom: 4,
  }
});
