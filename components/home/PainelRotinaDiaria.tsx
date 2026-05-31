import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/lib/constants/colors';

interface PainelRotinaDiariaProps {
  diasSeguidos: number;
  afericoesFeitas: number;
  afericoesTotais: number;
  horarioProxima: string;
}

export function PainelRotinaDiaria({
  diasSeguidos,
  afericoesFeitas,
  afericoesTotais,
  horarioProxima,
}: PainelRotinaDiariaProps) {
  const { width } = useWindowDimensions();
  
  // Detecção de telas pequenas (ex: iPhone SE, celulares compactos)
  const isSmallScreen = width < 375;

  // Cálculo da porcentagem da barra de progresso (evita divisão por zero e limita entre 0-100)
  const progressoRaw = afericoesTotais > 0 ? (afericoesFeitas / afericoesTotais) * 100 : 0;
  const porcentagemProgresso = Math.min(Math.max(progressoRaw, 0), 100);

  // Ajustes de estilo dinâmicos baseados no tamanho da tela
  const headerFontSize = isSmallScreen ? 11 : 13;
  const titleFontSize = isSmallScreen ? 18 : 22;
  const blockTitleFontSize = isSmallScreen ? 11 : 13;
  const blockValueFontSize = isSmallScreen ? 28 : 36;
  const blockPadding = isSmallScreen ? 10 : 16;

  return (
    <LinearGradient
      colors={[colors.white, colors.iceBlue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.cardContainer}
      accessible={true}
      accessibilityRole="summary"
    >
      {/* 2. Cabeçalho (Pílula) - Ajusta para coluna/wrap em telas muito estreitas para evitar quebra de layout */}
      <View style={[styles.headerPill, isSmallScreen && styles.headerPillSmall]}>
        <View style={styles.headerItem}>
          <View style={styles.dotIndicator} />
          <Text style={[styles.headerText, { fontSize: headerFontSize }]} numberOfLines={1}>
            Monitoramento ativo
          </Text>
        </View>
        
        {/* Divisor vertical visível apenas em telas maiores */}
        {!isSmallScreen && <View style={styles.verticalDivider} />}

        <View style={styles.headerItem}>
          <View style={styles.dotIndicator} />
          <Text style={[styles.headerText, { fontSize: headerFontSize }]} numberOfLines={1}>
            {diasSeguidos} {diasSeguidos === 1 ? 'dia ativo' : 'dias ativos'}
          </Text>
        </View>
      </View>

      {/* 3. Seção Central */}
      <View style={styles.centralSection}>
        <Text style={[styles.sectionTitle, { fontSize: titleFontSize }]}>
          Sua rotina de hoje
        </Text>
        
        <View style={styles.blocksContainer}>
          {/* Bloco Esquerdo */}
          <View 
            style={[styles.infoBlock, { padding: blockPadding }]}
            accessible={true} 
            accessibilityLabel={`${afericoesFeitas} de ${afericoesTotais} aferições recomendadas concluídas`}
          >
            <Text style={[styles.blockSubtitle, { fontSize: blockTitleFontSize }]} numberOfLines={2}>
              Feitas hoje
            </Text>
            <Text style={[styles.blockValue, { fontSize: blockValueFontSize }]}>
              {afericoesFeitas}/{afericoesTotais}
            </Text>
          </View>

          {/* Bloco Direito */}
          <View 
            style={[styles.infoBlock, { padding: blockPadding }]}
            accessible={true} 
            accessibilityLabel={`Próxima medição às ${horarioProxima}`}
          >
            <Text style={[styles.blockSubtitle, { fontSize: blockTitleFontSize }]} numberOfLines={2}>
              Próxima às
            </Text>
            <Text style={[styles.blockValue, { fontSize: blockValueFontSize }]}>
              {horarioProxima}
            </Text>
          </View>
        </View>
      </View>

      {/* 4. Barra de Progresso */}
      <View 
        style={styles.progressContainer}
        accessible={true}
        accessibilityLabel={`Progresso diário em ${Math.round(porcentagemProgresso)}%`}
      >
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${porcentagemProgresso}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressLabel}>
          {Math.round(porcentagemProgresso)}% concluído
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.sandy + '55',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  headerPill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.navy,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 24,
  },
  headerPillSmall: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },
  verticalDivider: {
    width: 1.5,
    height: 16,
    backgroundColor: colors.navy,
    opacity: 0.3,
    marginHorizontal: 4,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.esmeralda,
  },
  headerText: {
    fontWeight: '800',
    color: colors.navy,
  },
  centralSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
    marginBottom: 16,
  },
  blocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoBlock: {
    flex: 1,
    backgroundColor: colors.iceBlue,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  blockSubtitle: {
    fontWeight: '700',
    color: colors.placeholder,
    textAlign: 'center',
    marginBottom: 6,
  },
  blockValue: {
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -1,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTrack: {
    height: 18,
    backgroundColor: colors.border,
    borderRadius: 9,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.esmeralda,
    borderRadius: 9,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.esmeralda,
    textAlign: 'right',
  },
});

