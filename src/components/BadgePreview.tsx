import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const LOGO_LEFT = 'https://via.placeholder.com/100x40?text=Logo+1'; // Replace with actual logo URL or base64
const LOGO_RIGHT = 'https://via.placeholder.com/100x40?text=Logo+2'; // Replace with actual logo URL or base64
const QR_CODE = 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=MaxMustermann'; // Replace with actual QR code

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#222',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 320,
    height: 480,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#222',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#4B6B67',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    height: 70,
  },
  logo: {
    width: 80,
    height: 32,
    objectFit: 'contain',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  surname: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 2,
  },
  affiliation: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  qr: {
    width: 90,
    height: 90,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
  },
  roleBanner: {
    backgroundColor: '#9B7676',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  roleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  footer: {
    backgroundColor: '#4B6B67',
    height: 36,
    width: '100%',
  },
});

export const BadgePreview = () => (
  <Document>
    <Page size={{ width: 340, height: 500 }} style={styles.page}>
      <View style={styles.badge}>
        {/* Header with logos */}
        <View style={styles.header}>
          <Image src={LOGO_LEFT} style={styles.logo} />
          <Image src={LOGO_RIGHT} style={styles.logo} />
        </View>
        {/* Main content */}
        <View style={styles.contentWrapper}>
          <Text style={styles.name}>Max</Text>
          <Text style={styles.surname}>Mustermann</Text>
          <Text style={styles.affiliation}>WWU Münster</Text>
          <Image src={QR_CODE} style={styles.qr} />
        </View>
        {/* Role banner */}
        <View style={styles.roleBanner}>
          <Text style={styles.roleText}>SPEAKER</Text>
        </View>
        {/* Footer color bar */}
        <View style={styles.footer} />
      </View>
    </Page>
  </Document>
);