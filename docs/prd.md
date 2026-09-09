# Product Requirements Document (PRD) - Physiotherapie Faro
Tier: TIER 1 - GOLD | Projekt: physiotherapie-faro | Datum: 2026-09-09

## 1. Grammatik
**Grammatik 4: The Interactive Kinetic & Biomechanics Stage**
- **Fokus:** Evidenzbasierte Schmerzlinderung, Wiederherstellung physiologischer Gelenk- und Muskelfunktion, post-operative Rehabilitation und Performance-Optimierung.
- **Scroll-Gefühl:** Souverän, anatomisch präzise, beruhigend und gleichzeitig dynamisch-vitalisierend.
- **Hero-Architektur:** 2-spaltiger Widescreen-Hero (54% Text/CTA/Social-Proof, 46% Interaktive 3D-Therapie-Stage mit schwebenden Schmerzfrei-Badges und reaktivem Maus-Tilt).
- **Verbotene Klischees:** Keine düsteren Baustellenfarben, kein Notdienst-Rohrbruch-Panik-Design, keine kitschigen Emojis, keine reinen Textwüsten ohne Interaktion.

## 2. Brand Climate & Design-System
- **Brand Archetype:** Modern Clinical Excellence & Dynamic Biomechanics (München Maxvorstadt).
- **CSS-Rollen:**
  - `--sc-canvas`: `#f4f7f6` (Pristine Titanium Mist – hell, sauber, einladend)
  - `--sc-surface`: `#ffffff` (Pure Clinical Pearl)
  - `--sc-surface-raised`: `rgba(255, 255, 255, 0.85)` (Glassmorphismus mit `backdrop-filter: blur(16px)`)
  - `--sc-ink`: `#0e1f1c` (Deep Biomechanical Slate / Nordic Spruce – maximaler Kontrast > 12:1)
  - `--sc-ink-muted`: `#445752` (Soft Toned Sage Slate – Kontrast > 5:1 WCAG AA)
  - `--sc-accent`: `#0d8a7d` (Kinetic Medical Teal – Gesundheit, Vitalität, Präzision)
  - `--sc-accent-hover`: `#0a6f64`
  - `--sc-accent-subtle`: `rgba(13, 138, 125, 0.08)`
  - `--sc-pulse`: `#0284c7` (High-Pulse Cyan)
  - `--sc-border`: `rgba(14, 31, 28, 0.08)`
- **Typografie:**
  - Display: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif` (moderne geometrische Grotesk mit hoher Präzision)
  - Fließtext: `'Inter', system-ui, -apple-system, sans-serif` (maximale Lesbarkeit, optimiert für medizinische Inhalte)

## 3. Das Motion- & Interaktions-System (7 aufeinander abgestimmte Primitiven)
**Kreative Kernmetapher:** *„Biomechanical Precision & Fluid Human Kinetics“* – Das visuelle und haptische Gefühl, wie blockierte Bewegungsmuster sich fließend lösen und der Körper in seine natürliche Mobilität zurückfindet.

1. **Primitiv 1: Hero Kinetic Typography (3D Perspective SplitType)**
   - Die Leit-Headline *„Zurück in Ihre schmerzfreie Bewegung.“* teilt sich via SplitType in Worte und Zeichen, die mit `rotateX: -30deg`, subtiler Unschärfe und gestaffeltem Stagger (0.02s) dreidimensional in den Raum gleiten.
2. **Primitiv 2: Editorial Text-Scrubbing / Dim-to-Reveal (Apple-Style)**
   - Das Praxisleitbild *„Jeder Mensch besitzt das biologische Potenzial zur vollständigen Regeneration...“* ist initial dezent gedimmt (`opacity: 0.22`) und deckt sich beim Herunterscrollen Wort für Wort auf 100% gestochen scharf auf.
3. **Primitiv 4: Dynamic Stat, Time & Rating Counters**
   - Live-Hochzählen der Leistungsdaten: `5.0` Google-Sterne, `26` Patientenbewertungen, `100%` Behandlungsfokus, `20–60 Min` gezielte Therapie-Einheit.
4. **Primitiv 6: Native CSS-3D Perspective Tilt & Parallax (0 KB Payload)**
   - Die Therapiekarten (Manuelle Therapie, Krankengymnastik, CMD, Sportreha) neigen sich auf Desktop synchron zur Cursor-Position mit weichem Tiefenschatten; anatomische Gütesiegel schweben mit `translateZ(35px)` physisch vor der Karte. Auf Touchgeräten sanfter Scroll-Tilt.
5. **Primitiv 8: Endless Marquee Track (Infinite Seamless Flow)**
   - Ein butterweiches, endlos gleitendes horizontales Band mit zertifizierten Behandlungsqualifikationen (Manuelle Therapie nach Maitland, KG am Gerät, CMD-Kiefergelenktherapie, Kinesio-Taping, PNF, Faszientherapie).
6. **Primitiv 10: Dynamic SVG Path Drawing (Kinetic Spine & Movement Stroke)**
   - Eine fein geschwungene, anatomische Wirbelsäulen- und Bewegungslinie zeichnet sich beim Herunterscrollen via `strokeDashoffset` fließend selbst.
7. **Primitiv 12: Continuous Rotating Stamp / Seal (Praxis-Qualitätssiegel)**
   - Ein kreisrundes, typografisches Qualitätssiegel (*„Physiotherapie Faro • München Maxvorstadt • 5.0 Sterne •“*), das sich beim Scrollen kontinuierlich um die eigene Achse dreht.

## 4. Signature Feature
**Der Interaktive 3-Klick Schmerz- & Mobilitäts-Navigator (Symptom-to-Therapy Triage)**
- **Schritt 1 (Lokalisation):** Patient wählt aus 5 anatomischen Regionen:
  1. HWS, Nacken & Kopfschmerz
  2. LWS, Bandscheibe & Ischias
  3. Schulter, Ellenbogen & Hand
  4. Knie, Hüfte & Sprunggelenk
  5. Kiefer CMD (Zähneknirschen, Tinnitus)
- **Schritt 2 (Symptomatik & Phase):**
  - Akuter Schmerz (< 2 Wochen)
  - Chronische Bewegungseinschränkung (> 3 Monate)
  - Post-operativer Reha-Aufbau
  - Prävention & Sportler-Betreuung
- **Schritt 3 (Evidenzbasierte Empfehlung & Sofort-Transfer):**
  - Sofortige Analyse der empfohlenen Therapie (z. B. *„Manuelle Therapie (MT) + Kinesio-Taping“*)
  - Rezept-Schlüssel-Erklärung für den Arztbesuch (z. B. *„Heilmittelverordnung: MT 6x / 10x“*)
  - Abrechnungshinweis (Privat, Beihilfe & alle gesetzlichen Kassen mit Kassenrezept)
  - 1-Klick Übergabe des individuellen Beschwerdebilds an das Kontaktformular oder den WhatsApp-Direktchat!

## 5. Tageszeit-Personalisierung (v6.1 Standard)
- **06:00 – 12:00:** *„Guten Morgen in München. Starten Sie vital und schmerzfrei in den Tag.“*
- **12:00 – 18:00:** *„Guten Tag. Wir helfen Ihnen, Ihre volle Bewegungsfreiheit zurückzugewinnen.“*
- **18:00 – 06:00:** *„Guten Abend. Gönnen Sie Ihrem Körper Regeneration – Termine flexibel anfragen.“*
- **Off-Hours / Wochenende:** *„Termine nach telefonischer Vereinbarung – 24h Online-Anfrage aktiv.“*

## 6. Full-Canvas Raumnutzung & Widescreen-Harmonie (1440px Canvas)
- Containerbreite: `max-width: 1440px` mit fluiden Rändern (`clamp(1.25rem, 3.5vw, 3.5rem)`).
- 2-spaltiger Hero: 54% Text-Spalte / 46% 3D-Therapie-Stage.
- 4-Spalten Grid (`repeat(4, 1fr)`) für Therapiebereiche und Reha-Schritte auf Desktop.
- Floating Navbar mit dynamischem Breakpoint bei `1024px` (kein unschöner Zeilenumbruch, kein Verquetschen).
