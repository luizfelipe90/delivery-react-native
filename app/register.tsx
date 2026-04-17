import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

export default function RegisterScreen() {
  const { width, height: windowHeight } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const {
    registerUser,
    updateUser,
    addDeliveryAddress,
    isRegistered,
    user,
    logout,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [newDeliveryLocation, setNewDeliveryLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setCpf(user.cpf ?? "");
      setAddress(user.address ?? "");
    }
  }, [user]);

  const handleRegister = () => {
    if (!name || !email || !phone || !cpf || !address) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    registerUser({
      name,
      email,
      phone,
      cpf,
      address,
      deliveryAddresses: [],
    });
  };

  const handleSaveProfile = () => {
    if (!name || !email || !phone || !cpf || !address) {
      alert("Por favor, preencha todos os campos do perfil.");
      return;
    }

    updateUser({ name, email, phone, cpf, address });
    setIsEditing(false);
  };

  const handleAddDeliveryLocation = () => {
    if (!newDeliveryLocation.trim()) {
      alert("Digite o local de entrega antes de adicionar.");
      return;
    }

    addDeliveryAddress(newDeliveryLocation.trim());
    setNewDeliveryLocation("");
  };

  if (isRegistered && user) {
    return (
      <View style={styles.mainWrapper}>
        <Navbar />

        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: isDesktop ? 80 : 140 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.profileCard, { padding: isDesktop ? 40 : 24 }]}>
            <Text style={[styles.formTitle, { fontSize: isDesktop ? 28 : 22 }]}>
              Meu Perfil
            </Text>
            <Text style={styles.profileSubtitle}>
              Informações salvas do usuário e locais de entrega.
            </Text>

            {isEditing ? (
              <>
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
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CPF</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="000.000.000-00"
                    placeholderTextColor="#444"
                    keyboardType="numeric"
                    value={cpf}
                    onChangeText={setCpf}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Endereço principal</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Rua, número, bairro"
                    placeholderTextColor="#444"
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={handleSaveProfile}
                  >
                    <Text style={styles.registerBtnText}>
                      Salvar alterações
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => setIsEditing(false)}
                  >
                    <Text style={styles.secondaryBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.profileInfoRow}>
                  <Text style={styles.profileLabel}>Nome completo</Text>
                  <Text style={styles.profileValue}>{user.name}</Text>
                </View>
                <View style={styles.profileInfoRow}>
                  <Text style={styles.profileLabel}>E-mail</Text>
                  <Text style={styles.profileValue}>{user.email}</Text>
                </View>
                <View style={styles.profileInfoRow}>
                  <Text style={styles.profileLabel}>Telefone</Text>
                  <Text style={styles.profileValue}>{user.phone}</Text>
                </View>
                <View style={styles.profileInfoRow}>
                  <Text style={styles.profileLabel}>CPF</Text>
                  <Text style={styles.profileValue}>
                    {user.cpf ?? "Não informado"}
                  </Text>
                </View>
                <View style={styles.profileInfoRow}>
                  <Text style={styles.profileLabel}>Endereço principal</Text>
                  <Text style={styles.profileValue}>
                    {user.address ?? "Não informado"}
                  </Text>
                </View>

                <View style={styles.deliverySection}>
                  <Text style={styles.sectionTitle}>Locais de entrega</Text>
                  {user.deliveryAddresses &&
                  user.deliveryAddresses.length > 0 ? (
                    user.deliveryAddresses.map((location, index) => (
                      <View
                        key={`${location}-${index}`}
                        style={styles.deliveryItem}
                      >
                        <Text style={styles.deliveryText}>{location}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.emptyText}>
                      Nenhum local de entrega registrado.
                    </Text>
                  )}

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Adicionar local de entrega</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Ex: Rua das Flores, 123"
                      placeholderTextColor="#444"
                      value={newDeliveryLocation}
                      onChangeText={setNewDeliveryLocation}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={handleAddDeliveryLocation}
                  >
                    <Text style={styles.registerBtnText}>
                      Adicionar local de entrega
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={() => setIsEditing(true)}
                  >
                    <Text style={styles.registerBtnText}>Editar perfil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={logout}
                  >
                    <Text style={styles.secondaryBtnText}>Sair da conta</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      <Navbar />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: isDesktop ? 70 : 150 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../assets/images/italian_bg.png")}
          style={[styles.heroBackground, { minHeight: windowHeight - 70 }]}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={[styles.formCard, { padding: isDesktop ? 40 : 20 }]}>
              <Text
                style={[styles.formTitle, { fontSize: isDesktop ? 24 : 18 }]}
              >
                GANHE 15% DE DESCONTO
              </Text>
              <Text style={styles.formSubtitle}>
                Cadastre-se para desbloquear preços exclusivos de membro em
                todos os pratos.
              </Text>

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

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000.000.000-00"
                  placeholderTextColor="#444"
                  keyboardType="numeric"
                  value={cpf}
                  onChangeText={setCpf}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Endereço principal</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Rua, número, bairro"
                  placeholderTextColor="#444"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              <TouchableOpacity
                style={styles.registerBtn}
                onPress={handleRegister}
              >
                <Text style={styles.registerBtnText}>
                  QUERO MEU DESCONTO AGORA
                </Text>
              </TouchableOpacity>

              <Text style={styles.termsText}>
                Ao se cadastrar, você concorda com nossa política de privacidade
                e termos de uso.
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>L'Italiana</Text>
          <Text style={styles.footerRights}>
            © 2026 L'Italiana - Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#050505",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroBackground: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(5, 5, 5, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  formCard: {
    backgroundColor: "#0a0a0a",
    borderWidth: 1,
    borderColor: "#d4af37",
    width: "100%",
    maxWidth: 500,
    borderRadius: 4,
  },
  profileCard: {
    backgroundColor: "#0a0a0a",
    borderWidth: 1,
    borderColor: "#d4af37",
    width: "100%",
    maxWidth: 760,
    borderRadius: 4,
    alignSelf: "center",
  },
  formTitle: {
    color: "#d4af37",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Baskerville" : "serif",
  },
  formSubtitle: {
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
    fontFamily: Platform.OS === "ios" ? "Palatino" : "serif",
  },
  profileSubtitle: {
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
    fontFamily: Platform.OS === "ios" ? "Palatino" : "serif",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#d4af37",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#050505",
    borderWidth: 1,
    borderColor: "#222",
    color: "#fff",
    padding: 14,
    fontFamily: Platform.OS === "ios" ? "Palatino" : "serif",
  },
  registerBtn: {
    backgroundColor: "#d4af37",
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 12,
  },
  registerBtnText: {
    color: "#050505",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 13,
  },
  secondaryBtn: {
    marginTop: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#d4af37",
    fontWeight: "700",
    letterSpacing: 1,
    fontSize: 13,
  },
  termsText: {
    color: "#333",
    fontSize: 10,
    textAlign: "center",
    marginTop: 24,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  successTitle: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 24,
    fontFamily: Platform.OS === "ios" ? "Baskerville" : "serif",
  },
  successSubtitle: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    fontFamily: Platform.OS === "ios" ? "Palatino" : "serif",
  },
  mainBtn: {
    backgroundColor: "#d4af37",
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  mainBtnText: {
    color: "#050505",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  logoutBtn: {
    marginTop: 32,
  },
  logoutBtnText: {
    color: "#555",
    textDecorationLine: "underline",
  },
  footer: {
    backgroundColor: "#000",
    paddingVertical: 40,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#111",
  },
  footerLogo: {
    fontSize: 24,
    fontFamily: Platform.OS === "ios" ? "Baskerville" : "serif",
    color: "#d4af37",
    marginBottom: 10,
  },
  footerRights: {
    color: "#333",
    fontSize: 12,
  },
  profileInfoRow: {
    marginBottom: 18,
  },
  profileLabel: {
    color: "#d4af37",
    fontWeight: "600",
    letterSpacing: 1,
    fontSize: 11,
    marginBottom: 6,
  },
  profileValue: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  deliverySection: {
    marginTop: 24,
  },
  sectionTitle: {
    color: "#d4af37",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 16,
  },
  deliveryItem: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 14,
    borderRadius: 4,
    marginBottom: 12,
  },
  deliveryText: {
    color: "#fff",
    fontSize: 15,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    marginBottom: 12,
  },
  actionsRow: {
    marginTop: 24,
  },
});
