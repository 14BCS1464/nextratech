// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          nextra: {
            green: "#2A8E3D",
            blue: "#0055A4",
            lightblue: "#0078D7",
            dark: "#0A0F1C",
            gray: "#8A8FA3",
            bg: "#F5F8FA",
          },
        },
        backgroundImage: {
          "nextra-primary": "linear-gradient(to right, #2A8E3D, #0055A4)",
          "nextra-accent": "linear-gradient(to bottom right, #0078D7, #2A8E3D)",
          "nextra-soft": "linear-gradient(to top right, #E8F5E9, #F0F7FF)",
          "nextra-dark": "linear-gradient(to bottom right, #0A0F1C, #003366)",
          "nextra-light": "linear-gradient(to bottom, #F5F8FA, #FFFFFF)",
          "nextra-hero": "linear-gradient(to bottom right, #E8F5E9, #F5F8FA, #F0F7FF)",
        },
        keyframes: {
          float: {
            "0%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-8px)" },
            "100%": { transform: "translateY(0px)" },
          },
          "float-slow": {
            "0%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-12px)" },
            "100%": { transform: "translateY(0px)" },
          },
          "rotate-slow": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        },
        animation: {
          float: "float 3.4s ease-in-out infinite",
          "float-slow": "float-slow 5s ease-in-out infinite",
          "rotate-slow": "rotate-slow 12s linear infinite",
          "spin-slow": "spin 4s linear infinite",
        },
      },
    },
    plugins: [],
  };
  