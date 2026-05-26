import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

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
  const blockValueFontSize = isSmallScreen ? 24 : 32;
  const blockPadding = isSmallScreen ? 10 : 16;

  return (
    <View style={styles.cardContainer} accessible={true} accessibilityRole="summary">
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
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D1FAE5', // Verde clarinho suave para destacar
    shadowColor: '#00A88F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
    marginHorizontal: 16, // Margem lateral para não colar nas bordas do aparelho
  },
  headerPill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#002959',
    borderRadius: 999, // Totalmente arredondado
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
    backgroundColor: '#002959',
    opacity: 0.3,
    marginHorizontal: 4,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00A878', // Esmeralda (sucesso/conectado)
  },
  headerText: {
    fontWeight: '800',
    color: '#002959',
  },
  centralSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '800',
    color: '#002959',
    textAlign: 'center',
    marginBottom: 16,
  },
  blocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoBlock: {
    flex: 1, // Divide o espaço igualmente de forma flexível
    backgroundColor: '#F3F4F6', // Cinza claro super legível
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  blockSubtitle: {
    fontWeight: '700',
    color: '#4B5563', // Cinza escuro com alto contraste
    textAlign: 'center',
    marginBottom: 6,
  },
  blockValue: {
    fontWeight: '800',
    color: '#002959', // Azul escuro para máxima legibilidade
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTrack: {
    height: 14,
    backgroundColor: '#E5E7EB', // Cinza claro
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00A88F', // Verde saúde marcante
    borderRadius: 7,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00A88F',
    textAlign: 'right',
  },
});

