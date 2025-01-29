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

  // Base de datos mejorada con raciones específicas
  const foodDatabase = {
    harinas: {
      pan: { raciones: 2, descripcion: 'Una rebanada de pan (40g)' },
      bocadillo: { raciones: 2, descripcion: 'Pan de bocadillo' },
      arroz: { raciones: 2, descripcion: 'Un plato de arroz (60g)' },
      pasta: { raciones: 2, descripcion: 'Un plato de pasta (60g)' },
      patatas: { raciones: 1, descripcion: 'Una patata mediana (100g)' },
      cereales: { raciones: 1.5, descripcion: 'Un bol de cereales' },
      galletas: { raciones: 1, descripcion: '4 galletas tipo María' },
      tarta: { raciones: 3, descripcion: 'Una porción de tarta' },
      hamburguesa: { raciones: 2, descripcion: 'Pan de hamburguesa' },
    },
    
    frutas: {
      platano: { raciones: 1, descripcion: 'Un plátano mediano' },
      manzana: { raciones: 1, descripcion: 'Una manzana mediana' },
      pera: { raciones: 1, descripcion: 'Una pera mediana' },
      naranja: { raciones: 1, descripcion: 'Una naranja mediana' },
      mandarina: { raciones: 0.5, descripcion: 'Una mandarina' },
      sandia: { raciones: 0.5, descripcion: 'Una porción de sandía' },
      melon: { raciones: 0.5, descripcion: 'Una porción de melón' },
    },
    
    lacteos: {
      leche: { raciones: 1, descripcion: 'Un vaso de leche (200ml)' },
      yogur: { raciones: 1, descripcion: 'Un yogur natural' },
      yogur_frutas: { raciones: 1.5, descripcion: 'Un yogur de frutas' },
    }
  };

  const estimateRations = (description) => {
    const description_lower = description.toLowerCase();
    let racionesDetalladas = [];
    let totalRaciones = 0;

    Object.entries(foodDatabase).forEach(([grupo, alimentos]) => {
      Object.entries(alimentos).forEach(([alimento, data]) => {
        if (description_lower.includes(alimento)) {
          racionesDetalladas.push({
            alimento: data.descripcion,
            raciones: data.raciones,
            grupo: grupo
          });
          totalRaciones += data.raciones;
        }
      });
    });

    return {
      total: Math.round(totalRaciones * 10) / 10,
      desglose: racionesDetalladas
    };
  };

  const calculateInsulin = () => {
    const currentGlucose = parseFloat(glucoseLevel);
    const targetGlucose = 100;
    
    // Cálculo de corrección por glucosa
    const correctionNeeded = Math.max(currentGlucose - targetGlucose, 0);
    const correctionUnits = Math.round((correctionNeeded / 40) * 10) / 10;
    
    // Cálculo de raciones
    const rationCalculation = estimateRations(mealDescription);
    const carbUnits = rationCalculation.total;
    
    const totalUnits = correctionUnits + carbUnits;

    setResult({
      totalUnits: Math.round(totalUnits * 10) / 10,
      correctionUnits,
      carbUnits,
      glucoseReduction: correctionNeeded,
      estimatedRations: rationCalculation.total,
      racionesDetalladas: rationCalculation.desglose,
      currentGlucose,
      targetGlucose
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
              Desglose detallado del cálculo:
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Paso 1: Cálculo de raciones por alimentos
              </Typography>
              {result.racionesDetalladas.map((item, index) => (
                <Typography key={index}>
                  • {item.alimento}: {item.raciones} raciones
                </Typography>
              ))}
              <Typography sx={{ mt: 1 }} fontWeight="bold">
                Total de raciones: {result.estimatedRations}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Paso 2: Corrección de glucosa
              </Typography>
              <Typography>• Glucosa actual: {result.currentGlucose} mg/dL</Typography>
              <Typography>• Objetivo de glucosa: {result.targetGlucose} mg/dL</Typography>
              <Typography>• Necesita reducir: {result.glucoseReduction} mg/dL</Typography>
              <Typography>• Factor de corrección: 1 unidad reduce 40 mg/dL</Typography>
              <Typography fontWeight="bold">
                Unidades para corrección: {result.correctionUnits}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Paso 3: Cálculo final
              </Typography>
              <Typography>• Por hidratos de carbono: {result.carbUnits} unidades</Typography>
              <Typography>• Por corrección de glucosa: {result.correctionUnits} unidades</Typography>
            </Box>

            <Typography variant="h6" sx={{ color: 'primary.main', mt: 2 }}>
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