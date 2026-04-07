import StoreProvider from '@/lib/StoreProvider'; // Import the connector
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {/* Everything inside StoreProvider can now "hear" Redux */}
                <StoreProvider>
                    <Navbar />
                    <main>{children}</main>
                </StoreProvider>
            </body>
        </html>
    );
}