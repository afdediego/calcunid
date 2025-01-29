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

  // Base de datos de alimentos y sus raciones basada en la documentación
  const foodDatabase = {
    // Harinas (1 ración = aprox 20g HC)
    harinas: {
      pan: { racionPer: 20, unidad: 'g' }, // 20g = 1 ración
      arroz: { racionPer: 15, unidad: 'g' },
      pasta: { racionPer: 15, unidad: 'g' },
      patatas: { racionPer: 50, unidad: 'g' },
      cereales: { racionPer: 15, unidad: 'g' },
      galletas: { racionPer: 15, unidad: 'g' },
      tarta: { racionPer: 20, unidad: 'porción', raciones: 3 }, // Una porción típica = 3 raciones
      bizcocho: { racionPer: 20, unidad: 'porción', raciones: 2 },
      chocolate: { racionPer: 20, unidad: 'porción', raciones: 2 },
    },
    
    // Lácteos (1 ración = aprox 12g HC)
    lacteos: {
      leche: { racionPer: 200, unidad: 'ml' },
      yogur: { racionPer: 2, unidad: 'unidades' },
    },
    
    // Frutas (1 ración = aprox 10g HC)
    frutas: {
      manzana: { racionPer: 100, unidad: 'g' },
      pera: { racionPer: 100, unidad: 'g' },
      platano: { racionPer: 50, unidad: 'g' },
      naranja: { racionPer: 100, unidad: 'g' },
      mandarina: { racionPer: 100, unidad: 'g' },
      uva: { racionPer: 50, unidad: 'g' },
      sandia: { racionPer: 150, unidad: 'g' },
      melon: { racionPer: 150, unidad: 'g' },
    },
    
    // Verduras (bajas en HC)
    verduras: {
      lechuga: { racionPer: 300, unidad: 'g', raciones: 0.2 },
      tomate: { racionPer: 300, unidad: 'g', raciones: 0.3 },
      zanahoria: { racionPer: 150, unidad: 'g', raciones: 0.5 },
      judias: { racionPer: 150, unidad: 'g', raciones: 1 },
      guisantes: { racionPer: 60, unidad: 'g', raciones: 1 },
    }
  };

  // Función mejorada para estimar raciones
  const estimateRations = (description) => {
    const description_lower = description.toLowerCase();
    let totalRaciones = 0;

    // Función auxiliar para buscar coincidencias
    const findFoodMatches = (foodGroup) => {
      Object.entries(foodGroup).forEach(([food, data]) => {
        if (description_lower.includes(food)) {
          // Si el alimento tiene raciones predefinidas, usar ese valor
          if (data.raciones) {
            totalRaciones += data.raciones;
          } else {
            // Por defecto, asumimos una ración estándar
            totalRaciones += 1;
          }
        }
      });
    };

    // Buscar en cada grupo de alimentos
    Object.values(foodDatabase).forEach(foodGroup => {
      findFoodMatches(foodGroup);
    });

    // Ajustes especiales para combinaciones comunes
    if (description_lower.includes('tarta') && description_lower.includes('chocolate')) {
      totalRaciones = 4; // Una porción de tarta de chocolate suele ser más alta en HC
    }

    return Math.round(totalRaciones * 10) / 10;
  };

  const calculateInsulin = () => {
    const currentGlucose = parseFloat(glucoseLevel);
    const targetGlucose = 100;
    
    const correctionNeeded = Math.max(currentGlucose - targetGlucose, 0);
    const correctionUnits = Math.round((correctionNeeded / 40) * 10) / 10;
    
    const estimatedRations = estimateRations(mealDescription);
    const carbUnits = estimatedRations; // 1:1 ratio
    
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