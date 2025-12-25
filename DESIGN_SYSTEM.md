# Botanical Earth Design System

 Systemet er bygget for å gi en rolig og organisk brukeropplevelse ved bruk av dempede grønn- og beigetoner.

---

## 1. Fargepalett (Matte Earth)

| Farge | Navn | Hex | CSS Variabel | Bruksområde |
|:--- |:--- |:--- |:--- |:--- |
| ![#F1F3E0](https://placehold.co/15x15/F1F3E0/F1F3E0.png) | **Matte Beige** | `#F1F3E0` | `--color-text` | Hovedtekst, ikoner, lyse detaljer |
| ![#D2DCB6](https://placehold.co/15x15/D2DCB6/D2DCB6.png) | **Beige Green** | `#D2DCB6` | `--color-accent` | Aksentfarge, lenker, knapper, viktige ord |
| ![#A1BC98](https://placehold.co/15x15/A1BC98/A1BC98.png) | **Sage Green** | `#A1BC98` | `--color-ui` | Kort, sekundære bakgrunner, rammer |
| ![#778873](https://placehold.co/15x15/778873/778873.png) | **Deep Forest** | `#778873` | `--color-bg` | Hovedbakgrunn, mørke flater, footer |

---

## 2. Global CSS Implementering

Kopier dette inn i din `/src/style.css`. Dette fjerner de gamle blå variablene og etablerer det nye systemet.

```css
:root {
  /* Primærfarger */
  --color-bg: #778873;      /* Bakgrunn */
  --color-ui: #A1BC98;      /* UI Elementer / Kort */
  --color-accent: #D2DCB6;  /* Highlights / Knapper */
  --color-text: #F1F3E0;    /* Tekst */

  /* Glassmorfisme og Overlay */
  --glass-bg: rgba(161, 188, 152, 0.15);
  --glass-border: rgba(241, 243, 224, 0.1);
  
  /* Gradients */
  --bg-gradient: linear-gradient(
    to bottom left,
    #778873,
    #5F6E5C
  );

  --overlay-gradient: linear-gradient(
    to bottom left,
    rgba(119, 136, 115, 0.85),
    rgba(95, 110, 92, 0.95)
  );
}

/* Aksent-tekst (erstatter gammel .purple klasse) */
.accent-text {
  color: var(--color-accent) !important;
}

/* Matte scrollbar-stiler */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--color-ui);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}