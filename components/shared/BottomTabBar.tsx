import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Home, Clock, Bell, Grid } from 'lucide-react-native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import type { LucideIcon } from 'lucide-react-native'
import { colors } from '@/lib/constants/colors'

const TAB_HEIGHT = 56

// Cores de dark mode ainda não no design system — mover para colors.ts quando dark mode for definido
const DARK = {
  bg:       '#111827',
  border:   '#1F2937',
  inactive: '#6B7280',
} as const

const TAB_CONFIG: Record<string, { label: string; Icon: LucideIcon }> = {
  index:         { label: 'Início',       Icon: Home },
  history:       { label: 'Histórico',    Icon: Clock },
  notifications: { label: 'Notificações', Icon: Bell },
  more:          { label: 'Mais',         Icon: Grid },
}

interface Props extends BottomTabBarProps {
  unreadNotifications?: number
}

export function BottomTabBar({ state, navigation, unreadNotifications = 0 }: Props) {
  const insets = useSafeAreaInsets()
  const isDark = useColorScheme() === 'dark'

  const activeColor   = colors.cerulean
  const inactiveColor = isDark ? DARK.inactive     : colors.placeholder

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom:   insets.bottom,
          height:          TAB_HEIGHT + insets.bottom,
          backgroundColor: isDark ? DARK.bg     : colors.white,
          borderTopColor:  isDark ? DARK.border : colors.border,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const config = TAB_CONFIG[route.name]
        if (!config) return null

        const isActive        = state.index === index
        const isNotifications = route.name === 'notifications'
        const badgeCount      = isNotifications ? unreadNotifications : 0
        const showBadge       = badgeCount > 0
        const badgeLabel      = badgeCount > 9 ? '9+' : String(badgeCount)
        const iconColor       = isActive ? activeColor : inactiveColor

        const accessibilityLabel =
          isNotifications && badgeCount > 0
            ? `Notificações, ${badgeLabel} não lida${badgeCount === 1 ? '' : 's'}`
            : config.label

        function handlePress() {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        function handleLongPress() {
          navigation.emit({ type: 'tabLongPress', target: route.key })
        }

        return (
          <Pressable
            key={route.key}
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            onPress={handlePress}
            onLongPress={handleLongPress}
            accessibilityRole="tab"
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ selected: isActive }}
          >
            <View style={styles.iconWrap}>
              <config.Icon
                size={24}
                color={iconColor}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              {showBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText} numberOfLines={1}>
                    {badgeLabel}
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={[
                styles.label,
                { color: iconColor, fontWeight: isActive ? '600' : '400' },
              ]}
              numberOfLines={1}
            >
              {config.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 4,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minHeight: 56,
    minWidth: 56,
  },
  itemPressed: {
    opacity: 0.65,
  },
  iconWrap: {
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.critical,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 14,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.1,
  },
})
