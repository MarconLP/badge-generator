import { NextResponse } from 'next/server';
import { print } from 'pdf-to-printer';
import path from 'path';
import { renderToFile, Document, Page, Text } from '@react-pdf/renderer';
import badges from '../../../../data/tickets.json'
import { Badge } from '@/app/page';

const MyDocument = () => (
    <Document>
        <Page>
            <Text>React-pdf</Text>
        </Page>
    </Document>
);

export async function POST(request: Request) {
    const { data: { scan: { ticketId }} } = await request.json();
    const currentBadge = badges.find((badge) => badge.id === ticketId) as Badge;
    const outputPath = path.join(process.cwd(), 'public', 'temp.pdf');

    console.log(currentBadge.name);

    await renderToFile(
        <MyDocument />,
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