import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Paper,
  TextareaAutosize
} from '@mui/material';

function App() {
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [result, setResult] = useState(null);

  // Función para estimar raciones basada en la descripción de la comida
  const estimateRations = (description) => {
    const description_lower = description.toLowerCase();
    let raciones = 0;

    // Análisis básico de la descripción
    // Harinas/Carbohidratos
    if (description_lower.includes('arroz')) raciones += 2;
    if (description_lower.includes('pasta')) raciones += 2;
    if (description_lower.includes('pan')) raciones += 1;
    if (description_lower.includes('patata')) raciones += 1;
    if (description_lower.includes('maiz') || description_lower.includes('mazorca')) raciones += 1.5;
    
    // Verduras (tienen menos impacto en las raciones)
    if (description_lower.includes('lechuga')) raciones += 0.2;
    if (description_lower.includes('tomate')) raciones += 0.3;
    if (description_lower.includes('cebolla')) raciones += 0.2;
    
    // Frutas
    if (description_lower.includes('manzana')) raciones += 1;
    if (description_lower.includes('plátano')) raciones += 1;
    if (description_lower.includes('naranja')) raciones += 1;

    // Lácteos
    if (description_lower.includes('leche')) raciones += 1;
    if (description_lower.includes('yogur')) raciones += 1;

    return Math.round(raciones * 10) / 10;
  };

  const calculateInsulin = () => {
    // Convertir nivel de glucosa a número
    const currentGlucose = parseFloat(glucoseLevel);
    
    // Objetivo de glucosa
    const targetGlucose = 100; // Basado en el ejemplo proporcionado
    
    // Cálculo de corrección de glucosa
    const correctionNeeded = Math.max(currentGlucose - targetGlucose, 0);
    const correctionUnits = Math.round((correctionNeeded / 40) * 10) / 10;
    
    // Cálculo de raciones basado en la descripción de la comida
    const estimatedRations = estimateRations(mealDescription);
    const carbUnits = estimatedRations; // 1:1 ratio
    
    // Total de unidades
    const totalUnits = correctionUnits + carbUnits;

    setResult({
      totalUnits: Math.round(totalUnits * 10) / 10,
      correctionUnits,
      carbUnits,
      estimatedRations
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculadora de Insulina
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Describe tu comida
          </Typography>
          <TextareaAutosize
            minRows={3}
            placeholder="Describe tu comida de forma general (ejemplo: ensalada de lechuga con tomate, atún, cebolla, huevo cocido y una mazorca de maíz)"
            style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
          />
          
          <TextField
            fullWidth
            label="Nivel de glucosa actual (mg/dL)"
            type="number"
            value={glucoseLevel}
            onChange={(e) => setGlucoseLevel(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Paper>

        <Button
          variant="contained"
          color="primary"
          onClick={calculateInsulin}
          fullWidth
          sx={{ mb: 3 }}
        >
          Calcular Insulina
        </Button>

        {result && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resultado del cálculo:
            </Typography>
            <Typography>
              Raciones estimadas de la comida: {result.estimatedRations} raciones
            </Typography>
            <Typography>
              Corrección por nivel de glucosa: {result.correctionUnits} unidades
            </Typography>
            <Typography>
              Unidades por carbohidratos: {result.carbUnits} unidades
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
              Dosis total recomendada: {result.totalUnits} unidades de insulina
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              ⚠️ Estos cálculos son aproximados. Consulta siempre con tu médico para ajustar las dosis.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App; 