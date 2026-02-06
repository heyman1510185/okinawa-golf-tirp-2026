# DESIGN_SPEC --- OKINAWA GOLF TRIP 2026

## Design Layer Only (Visual / UI / Tone Specification)

------------------------------------------------------------------------

## 1. Design Concept

Concept Name: Golf Scoreboard × Handmade Shiori × Okinawa Ocean

Design Intent: - Preserve the handmade "travel booklet" feeling - Avoid
system-like dashboard aesthetics - Create warmth, playfulness, and
softness - Maintain clarity and readability on mobile

Emotional Goals: - Feels exciting before the trip - Feels easy and
intuitive during the trip - Feels personal, not corporate - Slightly
playful and self-aware

------------------------------------------------------------------------

## 2. Color System (Okinawa Palette)

All colors should be defined in Tailwind theme or CSS variables.

### 2.1 Ocean Gradient (Main Background)

Primary Background Gradient:

-   Top: #2B7DB0
-   Bottom: #63A9D4

CSS:

background: linear-gradient( 180deg, #2B7DB0 0%, #63A9D4 100% );

Purpose: - Base page background - Establish Okinawa ocean atmosphere

------------------------------------------------------------------------

### 2.2 Land Green (Decorative Accent)

-   #6FAE3F

Usage: - Decorative elements only - Map silhouettes or small highlight
visuals - Not for large UI blocks

------------------------------------------------------------------------

### 2.3 Accent Purple (Day / Section Highlight)

-   Default: #6F42C1
-   Hover / Active: #5A34A6

Usage: - Day labels - Selected tab state - Section headings

------------------------------------------------------------------------

### 2.4 Sand Card Background

Avoid pure white.

Recommended: - #F4F7F9 - #F8FAFB

Usage: - Event cards - Panels - Secondary surfaces

------------------------------------------------------------------------

### 2.5 Coral Accent (Optional Highlights)

-   #FF6B6B or
-   #FF8364

Usage: - "Today" highlight - Important CTA buttons - Small accent
indicators

------------------------------------------------------------------------

## 3. Typography System

### 3.1 Primary Font (Latin)

-   Japanese: Zen Kaku Gothic New
-   English: Jersey 25

Style: - Letter spacing: 0.08em (for titles) - Weight: 700 for main
titles

------------------------------------------------------------------------

### 3.2 Japanese Font

-   Noto Sans JP or
-   Zen Kaku Gothic New

Style: - Line height: 1.8 - Avoid tight spacing - Keep readability
priority

------------------------------------------------------------------------

### 3.3 Numeric Styling

Use tabular numbers for time display:

font-variant-numeric: tabular-nums;

Ensures alignment in timeline layout.

------------------------------------------------------------------------

## 4. Component Visual Design

This section defines visual styling only (no structural logic).

------------------------------------------------------------------------

### 4.1 Day Tabs

Style: - Pill shape (border-radius: 999px) - Semi-transparent white
background - Selected state: - Background: Accent Purple - Text: White -
Optional small dot indicator below

Interaction: - Smooth background color transition - No heavy borders

------------------------------------------------------------------------

### 4.2 Timeline Cards

Card Surface: - Background: Sand tone - Border-radius: 20px--24px -
Padding: Generous (minimum 20px) - Avoid visible borders

Shadow:

box-shadow: 0 8px 20px rgba(0,0,0,0.08);

Layout Feel: - Spacious - Soft edges - Light elevation

------------------------------------------------------------------------

### 4.3 Map Button

Style: - Small pill button - Background: Ocean-500 - Hover: Ocean-700 -
Text: White - Optional ↗ icon

Must not look like admin panel button.

------------------------------------------------------------------------

## 5. Background Enhancements

Optional subtle enhancements.

### 5.1 Noise Texture

Add very subtle texture overlay.

Example:

background-image: url('/noise.png'); opacity: 0.03;

Purpose: - Reduce flat digital feeling - Add slight printed-paper warmth

------------------------------------------------------------------------

### 5.2 Island Silhouette (Optional Hero Detail)

-   Low-opacity Okinawa island SVG
-   opacity: 0.05
-   Positioned near top section
-   Never distract from content

------------------------------------------------------------------------

## 6. Spacing & Layout Rules

-   Max content width: 480px (mobile-first)
-   Horizontal padding: 20px
-   Vertical rhythm: generous spacing between sections
-   Avoid dense UI clusters

------------------------------------------------------------------------

## 7. Tone Control Rules

To prevent system-like appearance, avoid:

-   Neutral gray-heavy palettes
-   Strong visible borders
-   Boxy rectangular layouts
-   Dashboard-like grid density
-   Hard black text on white background

Instead:

-   Use warmth
-   Use air (white space)
-   Use soft shadows
-   Use gradient light shifts instead of borders

------------------------------------------------------------------------

## 8. Optional Playful Elements

-   Memo section with paper-like background
-   Slightly different font style for informal text
-   Micro-animations (subtle fade, soft hover glow)
-   No aggressive motion

------------------------------------------------------------------------

## 9. Design Summary

This is not a scheduling system UI.

It is: - A digital travel booklet - A soft scoreboard-inspired layout -
A personal trip companion - Designed for friends, not users

The UI must feel handmade, breathable, and warm.
