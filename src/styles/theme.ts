export const theme = {
  colors: {
    background: {
      light: '#FDFCFB', // Warm off-white
      dark: '#0A0A0A',  // Near-black
      graphite: '#1A1A1A',
    },
    accent: {
      orange: '#FF8C00', // Primary accent (Orange fruit)
      green: '#4CAF50',  // Secondary accent (Leaf)
    },
    neutral: {
      gray100: '#F5F5F5',
      gray200: '#E5E5E5',
      gray300: '#D4D4D4',
      gray400: '#A3A3A3',
      gray500: '#737373',
      gray600: '#404040',
      gray700: '#262626',
      gray800: '#171717',
      gray900: '#0A0A0A',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#404040',
      muted: '#737373',
      inverse: '#FDFCFB',
      inverseMuted: '#A3A3A3',
    }
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  spacing: {
    section: 'clamp(4rem, 10vh, 8rem)',
    container: '1280px',
  }
} as const;
