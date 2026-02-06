import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          500: "#2B7DB0",
          600: "#246A95",
          700: "#1E5679"
        },
        sky: {
          100: "#D9EEF8",
          200: "#C6E4F4"
        },
        sand: {
          50: "#F8FAFB",
          100: "#F4F7F9"
        },
        coral: {
          500: "#FF6B6B",
          600: "#FF8364"
        },
        accent: {
          500: "#6F42C1",
          600: "#5A34A6"
        },
        land: {
          500: "#6FAE3F"
        }
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        card: "22px"
      }
    }
  },
  plugins: []
};

export default config;
