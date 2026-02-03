@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Inter', sans-serif;
  --font-heading: 'Outfit', sans-serif;

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));

  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));

  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));

  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
}

:root {
  /* Amazon-inspired but cleaner: Dark Blue & Orange Accents */
  --background: 0 0% 98%;      /* Very light grey for depth */
  --foreground: 222 47% 11%;   /* Deep Navy almost black */

  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;

  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;

  /* Trustworthy Navy Blue */
  --primary: 221 83% 53%;      /* A nice bright tech blue */
  --primary-foreground: 210 40% 98%;

  /* Action Orange (Buy Buttons) */
  --secondary: 35 92% 56%;     /* Golden/Orange */
  --secondary-foreground: 222 47% 11%;

  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221 83% 53%;

  --radius: 0.5rem;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;

  --card: 222 47% 14%;
  --card-foreground: 210 40% 98%;

  --popover: 222 47% 14%;
  --popover-foreground: 210 40% 98%;

  --primary: 217 91% 60%;
  --primary-foreground: 222 47.4% 11.2%;

  --secondary: 35 92% 56%;
  --secondary-foreground: 222 47% 11%;

  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;

  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply font-sans antialiased bg-background text-foreground;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-bold tracking-tight;
  }
}

/* Custom Utilities for E-commerce */
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.card-hover {
  @apply transition-all duration-300 hover:shadow-lg hover:-translate-y-1;
}
