"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import STARTUP_CONTACTS_LOGO from "../../public/startup-contacts.png";
import { Badge } from "@/app/page";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#222",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    display: "flex",
    width: 320,
    height: 480,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    backgroundColor: "#4B6B67",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 12,
    paddingBottom: 12,
    height: 70,
  },
  logo: {
    width: 80,
    height: 32,
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 2,
  },
  surname: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  affiliation: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 16,
  },
  qr: {
    width: 90,
    height: 90,
    marginTop: 8,
    marginBottom: 8,
  },
  roleBanner: {
    display: "flex",
    backgroundColor: "#9B7676",
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  roleText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 1,
  },
  footer: {
    backgroundColor: "#4B6B67",
    height: 36,
    width: "100%",
  },
});

export const BadgePreview = ({
  currentBadge,
}: {
  currentBadge: Badge | null;
}) => (
  <PDFViewer height={500} width={340}>
    <Document>
      <Page size={{ width: 340, height: 500 }} style={styles.page}>
        <View style={styles.badge}>
          {/* Header with logos */}
          <View style={styles.header}>
            <Image src={STARTUP_CONTACTS_LOGO.src} style={styles.logo} />
          </View>
          {/* Main content */}
          <View style={styles.contentWrapper}>
            <Text style={styles.name}>{currentBadge?.firstname}</Text>
            <Text style={styles.surname}>{currentBadge?.lastname}</Text>
            <Text style={styles.affiliation}>
              {currentBadge?.["extraFields.affiliation"]}
            </Text>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://linkedin.com/in/${currentBadge?.["extraFields.linkedin"]}`}
              style={styles.qr}
            />
          </View>
          {/* Role banner */}
          <View style={styles.roleBanner}>
            <Text style={styles.roleText}>
              {currentBadge?.["extraFields.role"]}
            </Text>
          </View>
          {/* Footer color bar */}
          <View style={styles.footer} />
        </View>
      </Page>
    </Document>
  </PDFViewer>
);
