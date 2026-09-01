import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';

type ServiceInfo = {
    version: string;
    app: string;
};

function App() {
    const [info, setInfo] = useState<ServiceInfo | null>(null);
    const [error] = useState<string>("");

    useEffect(() => {
        fetch("https://d3ujwk09smrk9z.cloudfront.net/info")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo conectar a la api");
                }
                return response.json();
            })
            .then((data) => setInfo(data))

    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>

            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#efe5b1' }}>
                TaskFlow API
            </Typography>

            {info ? (
                <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 3, backgroundColor: '#fde9f7' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Endpoint: /info
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem' }}>
                            <strong>App:</strong> {info?.app}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, fontSize: '1.1rem' }}>
                            <strong>Versión:</strong> {info.version}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (

                !error && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                        <CircularProgress />
                    </Box>
                )
            )}
        </Container>
    );
}

export default App;