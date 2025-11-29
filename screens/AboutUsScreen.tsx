import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Banner */}
      <Image
        source={require('../assets/images/productImg/bannerhand.jpg')}
        style={styles.banner}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.title}>Craft by Duyên Hà</Text>
        <Text style={styles.subtitle}>Chạm vào tay là chạm vào yêu thương ✨</Text>

        {/* Giới thiệu */}
        <Text style={styles.sectionTitle}>Giới thiệu</Text>
        <Text style={styles.paragraph}>
          Craft by Duyên là nơi những món đồ nhỏ xinh được tạo nên từ tình yêu,
          sự tỉ mỉ và đôi tay khéo léo. Mỗi sản phẩm là một câu chuyện,
          một món quà dành cho những khoảnh khắc đặc biệt.
        </Text>

        {/* Giá trị */}
        <Text style={styles.sectionTitle}>Giá trị của chúng mình</Text>
        <View style={styles.list}>
          <Text style={styles.bullet}>• Thủ công 100%</Text>
          <Text style={styles.bullet}>• Sản phẩm độc bản</Text>
          <Text style={styles.bullet}>• Chất liệu an toàn, thân thiện môi trường</Text>
          <Text style={styles.bullet}>• Đóng gói cẩn thận, kèm thiệp</Text>
        </View>

        {/* Sản phẩm */}
        <Text style={styles.sectionTitle}>Sản phẩm tiêu biểu</Text>
        <View style={styles.list}>
          <Text style={styles.bullet}>• Thiệp handmade</Text>
          <Text style={styles.bullet}>• Ví vải, túi tote</Text>
          <Text style={styles.bullet}>• Gấu len amigurumi</Text>
          <Text style={styles.bullet}>• Trang sức resin</Text>
          <Text style={styles.bullet}>• Nến thơm trang trí</Text>
        </View>

        {/* Liên hệ */}
        <Text style={styles.sectionTitle}>Liên hệ</Text>
        <Text style={styles.contactText}>📞 09xx xxx xxx</Text>
        <Text style={styles.contactText}>✉️ craftbyduyen@gmail.com</Text>
        <Text style={styles.contactText}>📷 Instagram: @craftbyduyen</Text>
        <Text style={styles.contactText}>📘 Facebook: Craft by Duyên</Text>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Craft by Duyên Hà — Made with ❤
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFD9E1',  // 💗 Nền hồng pastel
    alignItems: 'center',
  },

  banner: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
    color: '#D44872',   // hồng đậm sang
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#A86A7A',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    color: '#C14F74',
  },

  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#5A3C45',
  },

  list: {
    marginLeft: 8,
  },

  bullet: {
    fontSize: 14,
    marginVertical: 4,
    color: '#5A3C45',
  },

  contactText: {
    fontSize: 14,
    marginTop: 4,
    color: '#5A3C45',
  },

  footer: {
    marginTop: 22,
    fontSize: 12,
    color: '#876A74',
    textAlign: 'center',
  },
});
