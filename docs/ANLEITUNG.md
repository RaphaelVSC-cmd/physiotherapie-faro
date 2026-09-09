# Praxis-Leitfaden & Inbetriebnahme – Physiotherapie Faro (München)

Herzlich willkommen zu Ihrer neuen Praxis-Website! Dieses Dokument erklärt Ihnen in einfachen Schritten alle Funktionen, wie Sie Ihr Kontaktformular scharfschalten und wie Sie Ihre eigene Web-Domain verknüpfen.

---

## 1. Was wurde für Ihre Praxis gebaut?

Ihre neue Website ist eine maßgeschneiderte High-End-Plattform, die speziell für das kaufkräftige Klientel in München Maxvorstadt entwickelt wurde:
- **Der Interaktive Schmerz- & Mobilitäts-Navigator:** Patienten können in 3 einfachen Klicks ihre Beschwerden (z. B. HWS, Bandscheibe, Knie, CMD) angeben und erhalten sofort eine evidenzbasierte Therapieempfehlung samt passendem Kassenrezept-Hinweis.
- **1-Klick-Übernahme in WhatsApp & Anruf:** Hürdenlose Kontaktaufnahme für Neupatienten – direkt von jedem Smartphone aus.
- **Lückenlose Rechtssicherheit:** Abmahnsicher nach dem neuen § 5 DDG (ersetzt TMG), DSGVO Art. 13/14 und Zwei-Klick-Datenschutz für Google Maps nach § 25 TDDDG.

---

## 2. Kontaktformular aktivieren (Formspree in 4 Schritten)

Aktuell nutzt das Formular einen Test-Endpunkt. So leiten Sie alle Terminanfragen direkt in Ihr Praxis-Postfach:

1. Gehen Sie auf [https://formspree.io](https://formspree.io) und erstellen Sie ein kostenloses Konto mit Ihrer Praxis-E-Mail.
2. Klicken Sie auf **„+ New Form“**, vergeben Sie den Namen *„Praxis Faro Anfragen“* und tragen Sie Ihre Ziel-E-Mail ein.
3. Kopieren Sie die generierte Endpoint-ID (z. B. `f/xyzkqwer`).
4. Öffnen Sie `index.html` und ersetzen Sie in Zeile 395 `action="https://formspree.io/f/xyzkqwer"` durch Ihre persönliche ID – fertig! Ab sofort landen alle Anfragen direkt in Ihrem Posteingang.

---

## 3. Besucher-Statistiken aktivieren (Plausible oder Clarity)

In `index.html` sind bereits vorbereitete Platzhalter für moderne, DSGVO-konforme Analyse-Tools hinterlegt:

### Option A: Plausible.io (Empfohlen – 100% ohne Cookie-Banner)
1. Erstellen Sie ein Konto auf [https://plausible.io](https://plausible.io).
2. Tragen Sie Ihre Web-Adresse (z. B. `physiotherapie-faro.de`) ein.
3. Entfernen Sie in `index.html` im `<head>` die Kommentarzeichen um die Zeile `<script defer data-domain="..." src="https://plausible.io/js/script.js"></script>`.

### Option B: Microsoft Clarity (Kostenlos mit Klick-Heatmaps & Aufzeichnungen)
1. Registrieren Sie sich auf [https://clarity.microsoft.com](https://clarity.microsoft.com).
2. Erstellen Sie ein Projekt und tragen Sie Ihre Projekt-ID in den vorbereiteten Clarity-Block in `index.html` ein.

---

## 4. Eigene Domain aufschalten (z. B. www.physiotherapie-faro.de)

1. Melden Sie sich bei Ihrem Domain-Provider (z. B. Strato, IONOS, All-In-One) an.
2. Wählen Sie Ihre Domain aus und öffnen Sie die **DNS-Einstellungen**.
3. Fügen Sie folgende Records hinzu:
   - **Typ CNAME:** `www` verweist auf `cname.vercel-dns.com`
   - **Typ A (Root @):** `76.76.21.21`
4. Die Website ist innerhalb weniger Minuten weltweit verschlüsselt (mit automatischem kostenlosem SSL-Zertifikat) unter Ihrem Praxisnamen erreichbar!

---

## 5. Was Sie jederzeit selbst anpassen können

Alle Inhalte sind in sauber strukturiertem, leicht lesbarem HTML hinterlegt:
- **Telefonnummer ändern:** Suchen Sie in `index.html` nach `+49 89 18914161` und ersetzen Sie die Nummer.
- **Öffnungszeiten anpassen:** In Sektion `#standort` und im Schema.org JSON-LD-Block.
- **Rezensionen austauschen:** Im Bereich `#bewertungen` können Sie jederzeit neue Zitate einfügen.

---

## 6. Ihr persönlicher Support & Wartung

Haben Sie Fragen oder möchten Sie weitere Behandlungsbereiche ergänzen?  
Ich stehe Ihnen persönlich zur Verfügung:

**Raphael Neumeier**  
Web-Entwicklung & Digitale Markenführung  
📞 Telefon: **+49 176 12345678**  
✉️ E-Mail: **kontakt@raphaelneumeier.de**  
⚡ **Garantierte Reaktionszeit:** Innerhalb von 24 Stunden
