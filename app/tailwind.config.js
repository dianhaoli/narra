const withOpacity = (variable) => ({ opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgb(var(${variable}) / ${opacityValue})`
  }

  return `rgb(var(${variable}))`
}

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: withOpacity("--background-rgb"),
        foreground: withOpacity("--foreground-rgb"),
        card: withOpacity("--card-rgb"),
        "card-foreground": withOpacity("--card-foreground-rgb"),
        popover: withOpacity("--popover-rgb"),
        "popover-foreground": withOpacity("--popover-foreground-rgb"),
        primary: withOpacity("--primary-rgb"),
        "primary-foreground": withOpacity("--primary-foreground-rgb"),
        secondary: withOpacity("--secondary-rgb"),
        "secondary-foreground": withOpacity("--secondary-foreground-rgb"),
        muted: withOpacity("--muted-rgb"),
        "muted-foreground": withOpacity("--muted-foreground-rgb"),
        accent: withOpacity("--accent-rgb"),
        "accent-foreground": withOpacity("--accent-foreground-rgb"),
        destructive: withOpacity("--destructive-rgb"),
        "destructive-foreground": withOpacity("--destructive-foreground-rgb"),
        border: withOpacity("--border-rgb"),
        input: withOpacity("--input-rgb"),
        ring: withOpacity("--ring-rgb"),
        sidebar: withOpacity("--sidebar-rgb"),
        "sidebar-foreground": withOpacity("--sidebar-foreground-rgb"),
        "sidebar-primary": withOpacity("--sidebar-primary-rgb"),
        "sidebar-primary-foreground": withOpacity("--sidebar-primary-foreground-rgb"),
        "sidebar-accent": withOpacity("--sidebar-accent-rgb"),
        "sidebar-accent-foreground": withOpacity("--sidebar-accent-foreground-rgb"),
        "sidebar-border": withOpacity("--sidebar-border-rgb"),
        "sidebar-ring": withOpacity("--sidebar-ring-rgb"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
        mono: "var(--font-mono)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        soft: "var(--shadow-soft)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}