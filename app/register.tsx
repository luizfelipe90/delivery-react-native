import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  ScrollView,
  useWindowDimensions,
  TextInput,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';

export default function RegisterScreen() {
  const { width, height: windowHeight } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const { registerUser, isRegistered, user, logout } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    if (!name || !email || !phone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    registerUser({ name, email, phone });
    // Feedback de sucesso
  };

  if (isRegistered) {
    return (
      <View style={styles.mainWrapper}>
        <Navbar />
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#d4af37" />
          <Text style={[styles.successTitle, { fontSize: isDesktop ? 28 : 22 }]}>Bem-vindo ao Club L'Italiana, {user?.name}!</Text>
          <Text style={styles.successSubtitle}>Seu desconto de 15% já está ativado em todo o cardápio.</Text>
          
          <TouchableOpacity 
            style={styles.mainBtn}
            onPress={() => router.push('/cardapio')}
          >
            <Text style={styles.mainBtnText}>VER CARDÁPIO COM DESCONTO</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutBtn}
            onPress={logout}
          >
            <Text style={styles.logoutBtnText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      <Navbar />

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.scrollContent, { paddingTop: isDesktop ? 70 : 150 }]}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground 
          source={require('../assets/images/italian_bg.png')} 
          style={[styles.heroBackground, { minHeight: windowHeight - 70 }]}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={[styles.formCard, { padding: isDesktop ? 40 : 20 }]}>
              <Text style={[styles.formTitle, { fontSize: isDesktop ? 24 : 18 }]}>GANHE 15% DE DESCONTO</Text>
              <Text style={styles.formSubtitle}>Cadastre-se para desbloquear preços exclusivos de membro em todos os pratos.</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Ex: João Silva"
                  placeholderTextColor="#444"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Ex: joao@email.com"
                  placeholderTextColor="#444"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Telefone / WhatsApp</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Ex: (11) 99999-9999"
                  placeholderTextColor="#444"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <TouchableOpacity 
                style={styles.registerBtn}
                onPress={handleRegister}
              >
                <Text style={styles.registerBtnText}>QUERO MEU DESCONTO AGORA</Text>
              </TouchableOpacity>

              <Text style={styles.termsText}>
                Ao se cadastrar, você concorda com nossa política de privacidade e termos de uso.
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>L'Italiana</Text>
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
  heroBackground: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  formCard: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#d4af37',
    width: '100%',
    maxWidth: 500,
    borderRadius: 4,
  },
  formTitle: {
    color: '#d4af37',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
  },
  formSubtitle: {
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#d4af37',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#050505',
    borderWidth: 1,
    borderColor: '#222',
    color: '#fff',
    padding: 14,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  registerBtn: {
    backgroundColor: '#d4af37',
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  registerBtnText: {
    color: '#050505',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 13,
  },
  termsText: {
    color: '#333',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 24,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successTitle: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 24,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
  },
  successSubtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  },
  mainBtn: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  mainBtnText: {
    color: '#050505',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  logoutBtn: {
    marginTop: 32,
  },
  logoutBtnText: {
    color: '#555',
    textDecorationLine: 'underline',
  },
  footer: {
    backgroundColor: '#000',
    paddingVertical: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#111',
  },
  footerLogo: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    color: '#d4af37',
    marginBottom: 10,
  },
  footerRights: {
    color: '#333',
    fontSize: 12,
  }
});
