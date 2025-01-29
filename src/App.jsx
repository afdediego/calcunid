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

  // Base de datos mejorada y ampliada
  const foodDatabase = {
    harinas: {
      pan: {
        raciones: 1,
        descripcion: 'Pan (20g = 1 ración)',
        aliases: ['pan', 'rebanada']
      },
      pan_molde: {
        raciones: 1,
        descripcion: 'Pan de molde (20g = 1 ración)',
        aliases: ['pan de molde', 'sandwich']
      },
      biscotes: {
        raciones: 1,
        descripcion: 'Biscotes (15g = 1 ración)',
        aliases: ['biscote', 'biscotes']
      },
      arroz: {
        raciones: 4,
        descripcion: 'Plato de arroz (60g = 4 raciones)',
        aliases: ['arroz', 'arroz hervido']
      },
      pasta: {
        raciones: 4,
        descripcion: 'Plato de pasta (60g = 4 raciones)',
        aliases: ['pasta', 'macarrones', 'espaguetis']
      },
      patata_cocida: {
        raciones: 4,
        descripcion: 'Plato de patatas (200g = 4 raciones)',
        aliases: ['patata', 'patatas', 'patata cocida', 'patatas cocidas', 'plato de patatas']
      },
      patatas_fritas: {
        raciones: 2,
        descripcion: 'Patatas fritas (50g = 2 raciones)',
        aliases: ['patatas fritas', 'patata frita', 'patatas de bolsa']
      },
      legumbres: {
        raciones: 2,
        descripcion: 'Legumbres cocidas (60g = 2 raciones)',
        aliases: [
          'garbanzos', 'lentejas', 'alubias', 'judías', 
          'garbanzos hervidos', 'lentejas hervidas', 'alubias hervidas'
        ]
      },
      cereales_desayuno: {
        raciones: 1.5,
        descripcion: 'Cereales desayuno (15g = 1.5 raciones)',
        aliases: ['cereales', 'corn flakes']
      },
      muesli: {
        raciones: 2,
        descripcion: 'Muesli (15g = 2 raciones)',
        aliases: ['muesli']
      }
    },

    cereales: {
      cereales_desayuno: {
        raciones: 1.5,
        descripcion: 'Cereales desayuno (15g = 1.5 raciones)',
        aliases: ['cereales', 'corn flakes']
      },
      muesli: {
        raciones: 2,
        descripcion: 'Muesli (15g = 2 raciones)',
        aliases: ['muesli']
      }
    },

    galletas: {
      galletas_maria: {
        raciones: 1,
        descripcion: '4 galletas María (15g = 1 ración)',
        aliases: ['galletas maria', 'galletas maría']
      },
      galletas_chocolate: {
        raciones: 1.5,
        descripcion: '2 galletas chocolate (15g = 1.5 raciones)',
        aliases: ['galletas chocolate', 'galletas con chocolate']
      }
    },

    frutas: {
      fresas: {
        raciones: 1,
        descripcion: 'Fresas (150g = 1 ración)',
        aliases: ['fresas', 'fresa']
      },
      higos: {
        raciones: 1,
        descripcion: 'Higos (50g = 1 ración)',
        aliases: ['higos', 'higo']
      },
      kiwi: {
        raciones: 1,
        descripcion: 'Kiwi (100g = 1 ración)',
        aliases: ['kiwi']
      },
      mandarina: {
        raciones: 1,
        descripcion: 'Mandarina (100g = 1 ración)',
        aliases: ['mandarina']
      },
      manzana: {
        raciones: 1,
        descripcion: 'Manzana (100g = 1 ración)',
        aliases: ['manzana']
      },
      melocoton: {
        raciones: 1,
        descripcion: 'Melocotón (100g = 1 ración)',
        aliases: ['melocoton', 'melocotón']
      },
      melon: {
        raciones: 0.5,
        descripcion: 'Melón (150g = 0.5 raciones)',
        aliases: ['melon', 'melón']
      },
      naranja: {
        raciones: 1,
        descripcion: 'Naranja (100g = 1 ración)',
        aliases: ['naranja']
      },
      pera: {
        raciones: 1,
        descripcion: 'Pera (100g = 1 ración)',
        aliases: ['pera']
      },
      piña_jugo: {
        raciones: 1,
        descripcion: 'Piña en su jugo (100g = 1 ración)',
        aliases: ['piña en su jugo', 'piña']
      },
      platano: {
        raciones: 2,
        descripcion: 'Plátano (50g = 2 raciones)',
        aliases: ['platano', 'plátano']
      },
      sandia: {
        raciones: 0.5,
        descripcion: 'Sandía (150g = 0.5 raciones)',
        aliases: ['sandia', 'sandía']
      },
      uva: {
        raciones: 1,
        descripcion: 'Uvas (50g = 1 ración)',
        aliases: ['uva', 'uvas']
      }
    },

    verduras: {
      alcachofas: {
        raciones: 0.5,
        descripcion: 'Alcachofas (150g = 0.5 raciones)',
        aliases: ['alcachofa', 'alcachofas']
      },
      coliflor: {
        raciones: 0.5,
        descripcion: 'Coliflor (150g = 0.5 raciones)',
        aliases: ['coliflor']
      },
      ensalada_verde: {
        raciones: 0.2,
        descripcion: 'Ensalada verde (300g = 0.2 raciones)',
        aliases: ['ensalada', 'ensalada verde', 'lechuga']
      },
      ensalada_mixta: {
        raciones: 0.5,
        descripcion: 'Ensalada mixta (300g = 0.5 raciones)',
        aliases: ['ensalada mixta']
      },
      tomate: {
        raciones: 0.3,
        descripcion: 'Tomate (300g = 0.3 raciones)',
        aliases: ['tomate']
      },
      judia_verde: {
        raciones: 0.5,
        descripcion: 'Judía verde (150g = 0.5 raciones)',
        aliases: ['judia verde', 'judía verde', 'judias verdes']
      }
    },

    frutos_secos: {
      almendras: {
        raciones: 1,
        descripcion: 'Almendras (30g = 1 ración)',
        aliases: ['almendras', 'almendra']
      },
      nueces: {
        raciones: 1,
        descripcion: 'Nueces (30g = 1 ración)',
        aliases: ['nueces', 'nuez']
      },
      aceitunas: {
        raciones: 0.5,
        descripcion: 'Aceitunas (40g = 0.5 raciones)',
        aliases: ['aceitunas', 'aceituna']
      }
    },

    platos_preparados: {
      paella: {
        raciones: 4,
        descripcion: 'Paella (60g arroz = 4 raciones)',
        aliases: ['paella']
      },
      tortilla_patata: {
        raciones: 1,
        descripcion: 'Tortilla de patata (100g = 1 ración)',
        aliases: ['tortilla', 'tortilla de patata', 'tortilla española', 'tortilla de patatas'],
        imagen: 'tortilla_patata'
      },
      croquetas: {
        raciones: 1,
        descripcion: '2 croquetas (60g = 1 ración)',
        aliases: ['croquetas', 'croqueta']
      },
      pizza: {
        raciones: 2.5,
        descripcion: 'Porción pizza (100g = 2.5 raciones)',
        aliases: ['pizza']
      },
      hamburguesa: {
        raciones: 2,
        descripcion: 'Hamburguesa completa (pan 40g = 2 raciones)',
        aliases: ['hamburguesa', 'burger']
      }
    },

    postres: {
      cruasan: {
        raciones: 2,
        descripcion: 'Cruasán (40g = 2 raciones)',
        aliases: ['cruasan', 'croissant']
      },
      donut: {
        raciones: 2,
        descripcion: 'Donut (40g = 2 raciones)',
        aliases: ['donut', 'donuts']
      },
      magdalena: {
        raciones: 1.5,
        descripcion: 'Magdalena (30g = 1.5 raciones)',
        aliases: ['magdalena']
      },
      pastel_chocolate: {
        raciones: 3,
        descripcion: 'Pastel chocolate (50g = 3 raciones)',
        aliases: ['pastel chocolate', 'tarta chocolate']
      },
      helado: {
        raciones: 2,
        descripcion: 'Helado (100g = 2 raciones)',
        aliases: ['helado']
      },
      chocolate: {
        raciones: 1.5,
        descripcion: 'Chocolate (20g = 1.5 raciones)',
        aliases: ['chocolate']
      },
      tarta_santiago: {
        raciones: 3,
        descripcion: 'Tarta Santiago (50g = 3 raciones)',
        aliases: ['tarta santiago']
      },
      bizcocho: {
        raciones: 2,
        descripcion: 'Bizcocho (30g = 2 raciones)',
        aliases: ['bizcocho']
      },
      mermelada: {
        raciones: 1,
        descripcion: 'Mermelada (20g = 1 ración)',
        aliases: ['mermelada']
      }
    },

    lacteos: {
      leche: {
        raciones: 1,
        descripcion: 'Vaso de leche (200ml = 1 ración)',
        aliases: ['leche', 'vaso de leche']
      },
      queso_fresco: {
        raciones: 0.5,
        descripcion: 'Queso fresco (40g = 0.5 raciones)',
        aliases: ['queso fresco']
      },
      quesito: {
        raciones: 0.5,
        descripcion: 'Quesito (30g = 0.5 raciones)',
        aliases: ['quesito', 'queso en porciones']
      },
      queso_manchego: {
        raciones: 0.2,
        descripcion: 'Queso manchego (40g = 0.2 raciones)',
        aliases: ['queso manchego']
      },
      natillas: {
        raciones: 2,
        descripcion: 'Natillas (200ml = 2 raciones)',
        aliases: ['natillas']
      },
      flan: {
        raciones: 2,
        descripcion: 'Flan (100g = 2 raciones)',
        aliases: ['flan']
      },
      yogur_azucarado: {
        raciones: 1.5,
        descripcion: 'Yogur azucarado (125g = 1.5 raciones)',
        aliases: ['yogur azucarado', 'yogurt con azúcar']
      },
      yogur_natural: {
        raciones: 0.5,
        descripcion: 'Yogur natural sin azúcar (125g = 0.5 raciones)',
        aliases: ['yogur natural', 'yogur sin azúcar']
      }
    },

    carnes: {
      pollo: {
        raciones: 0,  // El pollo solo no tiene hidratos
        descripcion: 'Pollo (sin hidratos)',
        aliases: ['pollo', 'pechuga', 'muslo de pollo', 'pechuga de pollo']
      },
      carne: {
        raciones: 0,  // La carne sola no tiene hidratos
        descripcion: 'Carne (sin hidratos)',
        aliases: ['carne', 'ternera', 'cerdo', 'lomo', 'filete']
      }
    }
  };

  const estimateRations = (description) => {
    const description_lower = description.toLowerCase();
    let racionesDetalladas = [];
    let totalRaciones = 0;

    // Primero buscamos si hay tortilla
    const hasTortilla = foodDatabase.platos_preparados.tortilla_patata.aliases.some(
        alias => description_lower.includes(alias)
    );

    // Si hay tortilla, solo añadimos la tortilla
    if (hasTortilla) {
        const tortilla = foodDatabase.platos_preparados.tortilla_patata;
        racionesDetalladas.push({
            alimento: `${tortilla.descripcion} (platos_preparados)`,
            raciones: tortilla.raciones,
            grupo: 'platos_preparados'
        });
        totalRaciones += tortilla.raciones;
    } else {
        // Si no hay tortilla, buscamos todos los alimentos normalmente
        Object.entries(foodDatabase).forEach(([grupo, alimentos]) => {
            Object.entries(alimentos).forEach(([nombre, data]) => {
                const found = data.aliases.some(alias => 
                    description_lower.includes(alias)
                );

                if (found) {
                    racionesDetalladas.push({
                        alimento: `${data.descripcion} (${grupo})`,
                        raciones: data.raciones,
                        grupo: grupo
                    });
                    totalRaciones += data.raciones;
                }
            });
        });
    }

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
            {result.racionesDetalladas.some(item => 
              item.alimento.toLowerCase().includes('tortilla de patata') ||
              item.alimento.toLowerCase().includes('tortilla española')
            ) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Referencia visual de porciones:
                </Typography>
                <img 
                  src="/tortilla.jpg"
                  alt="Porciones de tortilla de patata"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  onError={(e) => {
                    console.error('Error cargando imagen:', e);
                    e.target.style.display = 'none';  // Ocultar la imagen si hay error
                  }}
                />
              </Box>
            )}

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