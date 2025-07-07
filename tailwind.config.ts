
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		fontFamily: {
    			arima: [
    				'Arima',
    				'serif'
    			],
    			montserrat: [
    				'Montserrat',
    				'sans-serif'
    			]
    		},
    		colors: {
    			'azul-petrol': 'hsl(var(--primary))',
    			'verde-agua': 'hsl(var(--secondary))',
    			'cinza-claro': 'hsl(var(--muted))',
    			'cinza-escuro': 'hsl(var(--primary))',
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))',
    				glow: 'hsl(var(--primary-glow))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 4px)',
    			sm: 'var(--radius-sm)',
    			xl: 'var(--radius-lg)'
    		},
    		boxShadow: {
    			elegant: 'var(--shadow-elegant)',
    			glow: 'var(--shadow-glow)',
    			card: 'var(--shadow-card)',
    			glass: 'var(--shadow-glass)',
    			warm: 'var(--shadow-warm)'
    		},
    		backgroundImage: {
    			'gradient-primary': 'var(--gradient-primary)',
    			'gradient-hero': 'var(--gradient-hero)',
    			'gradient-card': 'var(--gradient-card)',
    			'gradient-glass': 'var(--gradient-glass)',
    			'gradient-warm': 'var(--gradient-warm)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'fade-in': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'slide-up': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(40px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'glow-pulse': {
    				'0%, 100%': {
    					boxShadow: '0 0 20px hsl(var(--primary-glow) / 0.3)'
    				},
    				'50%': {
    					boxShadow: '0 0 40px hsl(var(--primary-glow) / 0.6)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			wiggle: {
    				'0%, 100%': {
    					transform: 'rotate(-3deg)'
    				},
    				'50%': {
    					transform: 'rotate(3deg)'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in': 'fade-in 0.8s ease-out',
    			'slide-up': 'slide-up 0.6s ease-out',
    			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
    			float: 'float 3s ease-in-out infinite',
    			wiggle: 'wiggle 1s ease-in-out infinite'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
