import { NextResponse } from 'next/server';
import { print } from 'pdf-to-printer';
import path from 'path';
import { renderToFile, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import badges from '../../../../data/tickets.json'
import { Badge } from '@/app/page';

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
      justifyContent: "space-between",
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

const BadgeDocument = ({ currentBadge }: { currentBadge: Badge }) => (
    <Document>
      <Page size={{ width: 340, height: 500 }} style={styles.page}>
        <View style={styles.badge}>
          {/* Header with logos */}
          <View style={styles.header}>
            <Image src={path.join(process.cwd(), 'public', 'venture-club.png')} style={styles.logo} />
            <Image src={path.join(process.cwd(), 'public', 'startup-contacts.png')} style={styles.logo} />
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
);

export async function POST(request: Request) {
    const { data: { scan: { ticketId }} } = await request.json();
    const currentBadge = badges.find((badge) => badge.id === ticketId) as Badge;
    const outputPath = path.join(process.cwd(), 'public', 'temp.pdf');

    await renderToFile(
        <BadgeDocument currentBadge={currentBadge} />,
        outputPath
    );

    try {
        await print(outputPath);
        console.log('File sent to printer.');
        return NextResponse.json({ message: 'File sent to printer.' });
    } catch (err) {
        console.error('Print error:', err);
        return NextResponse.json({ message: 'Error printing file' }, { status: 500 });
    }
} 