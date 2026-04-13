import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Platform,
  ScrollView,
  Dimensions,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Navbar } from '@/components/Navbar';

const { height: windowHeight } = Dimensions.get('window');

export default function LItalianaSite() {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();

  const handleExploreMenu = () => {
    router.push('/cardapio');
  };

  const handleQuemSomos = () => {
    // Rola mais pra baixo até a seção A Tradição
    scrollRef.current?.scrollTo({ y: windowHeight, animated: true });
  };

  return (
    <View style={styles.mainWrapper}>
      
      <Navbar />

      {/* CONTEÚDO SCROLLÁVEL */}

      <ScrollView 
        ref={scrollRef}
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HERO SECTION */}
        <View style={{ height: windowHeight, width: '100%' }}>
          <ImageBackground 
            source={require('../assets/images/italian_bg.png')} 
            style={styles.heroBackground}
            resizeMode="cover"
          >
            <View style={[styles.heroOverlay, { padding: isDesktop ? 32 : 16, paddingBottom: isDesktop ? 80 : 40 }]}>
              <View style={styles.heroContent}>
                <Text style={[styles.heroTitle, { fontSize: isDesktop ? 64 : 40, letterSpacing: isDesktop ? 6 : 3 }]}>L'Italiana</Text>
                <Text style={[styles.heroSubtitle, { fontSize: isDesktop ? 18 : 14, letterSpacing: isDesktop ? 6 : 3 }]}>Cucina Autentica</Text>
              </View>

              <TouchableOpacity 
                style={[styles.heroButton, { paddingVertical: isDesktop ? 18 : 14, paddingHorizontal: isDesktop ? 40 : 24 }]} 
                activeOpacity={0.8}
                onPress={handleExploreMenu}
              >
                <Text style={[styles.heroButtonText, { fontSize: isDesktop ? 13 : 11 }]}>EXPLORAR O MENU</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.sectionBlack}>
          <Text style={styles.sectionTitle}>A TRADIÇÃO</Text>
          <View style={styles.separator} />
          
          <Text style={styles.aboutText}>
            Nascida de uma tradição familiar que remonta às colinas intocáveis da Toscana, 
            a L'Italiana traz para você a essência da gastronomia ancestral. Cada ingrediente 
            que toca o nosso fogão foi selecionado e transportado com o mais rigoroso respeito 
            às raízes e à terra. Desfrute de uma viagem sensorial inesquecível, onde o tempo 
            parece parar a cada meticulosa garfada. O clássico italiano reimaginado em sua versão mais elevada.
          </Text>
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
       web: { overflow: 'hidden' } // Mantém a window limpa no web desktop
    })
  },
  /* ESTILOS DA PÁGINA */
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 5, 5, 0.70)', 
    justifyContent: 'space-between',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    color: '#d4af37', 
    fontWeight: '400',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    color: '#e0e0e0',
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  heroButton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#d4af37',
    alignSelf: 'center',
  },
  heroButtonText: {
    color: '#d4af37',
    fontWeight: '600',
    letterSpacing: 2,
  },
  sectionDark: {
    backgroundColor: '#0a0a0a',
    paddingVertical: 100,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionBlack: {
    backgroundColor: '#050505',
    paddingVertical: 100,
    paddingHorizontal: 24,
    alignItems: 'center',
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
    marginBottom: 64,
  },
  menuGrid: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  menuCard: {
    backgroundColor: '#0a0a0a',
    padding: 32,
    borderWidth: 1,
    borderColor: '#1a1814',
    minWidth: '100%',
    flex: 1,
    ...(Platform.OS === 'web' && { 
        minWidth: '45%' 
    })
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  aboutText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    lineHeight: 32,
    maxWidth: 700,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
    fontStyle: 'italic',
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
