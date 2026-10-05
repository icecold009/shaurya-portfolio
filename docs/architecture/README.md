# Shaurya Portfolio: architecture case study

Curated project records drive a static React archive with optional server-side Jev discovery.

Source snapshot: `dc8e784e00b631376d8a4d31afc88a0e54c93151`. Reviewed on **2026-10-04**. This describes the selected committed source, excluding unrelated uncommitted work in the canonical checkout. It is not a runtime, provider, deployment or security certification.

## Overview

```mermaid
%% Source-reviewed overview; 2026-10-04; commit dc8e784e00b631376d8a4d31afc88a0e54c93151
%% Solid edges: core flow. Dashed edges: optional or separately invoked services.
%%{init: {"theme":"base","securityLevel":"loose","fontFamily":"Arial, sans-serif","themeVariables":{"background":"#0b1220","primaryColor":"#17283d","primaryTextColor":"#edf4ff","primaryBorderColor":"#71c4ec","lineColor":"#9fadc1","secondaryColor":"#213548","tertiaryColor":"#17283d","edgeLabelBackground":"#0b1220","clusterBkg":"#101d2e","clusterBorder":"#456783","fontSize":"17px"},"flowchart":{"htmlLabels":true,"curve":"linear","nodeSpacing":35,"rankSpacing":50}}}%%
flowchart TD
  V["Visitor + React routes"]
  P["Curated project records"]
  M["MDX writing + assets"]
  A["URL filters + project archive"]
  D["Case study dialog"]
  L["Local shortlist + keywords"]
  F["Optional Project Finder"]
  S["Server-only picker endpoint"]
  J["Optional TypeSafe / Jev"]
  V --> A
  P --> A
  M --> V
  A --> D
  A <-->|saved projects| L
  P --> F
  F -.->|bounded query| S
  S -.->|public metadata selection| J
  J -.->|typed relevance judgments| S
  S -.->|validated IDs| F
  F -->|provider unavailable| L
  F --> D
  click V "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/app/App.jsx" "Open source"
  click P "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/data/projects.js" "Open source"
  click M "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/posts/index.js" "Open source"
  click A "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/components/Projects.jsx" "Open source"
  click D "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/components/ProjectDetailDialog.jsx" "Open source"
  click L "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/lib/projectFinder.js" "Open source"
  click F "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/components/ProjectFinder.jsx" "Open source"
  click S "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/api/project-picker.js" "Open source"
  click J "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/lib/projectFinder.js" "Open source"
  classDef core fill:#17283d,stroke:#71c4ec,stroke-width:1.6px,color:#edf4ff;
  class V,P,M,A,D,L,F,S,J core;
```

[Editable Mermaid](overview.mmd). Solid edges show the core flow; dashed edges show optional or separately invoked paths. Diagram connections summarize control/data flow rather than a complete import graph.

## Main flow

Vite builds the React application, routes and static assets. Project records and MDX writing supply curated content; archive filters and URL state determine visible projects and detail dialogs. Shortlists remain browser-local. The optional Project Finder sends a bounded query to a server endpoint, which selects existing project IDs through TypeSafe/Jev. Responses are checked against the known archive; unavailable inference falls back to local keyword matching.

## Engineering decision

Keep project content authoritative and curated, with deterministic browsing as the baseline. Jev may select from existing records, but does not invent projects or rewrite evidence. A server-only optional endpoint protects credentials while the local fallback keeps discovery usable when the provider is absent.

## Source map

| Component | Review path |
| --- | --- |
| Visitor + React routes | [src/app/App.jsx](../../src/app/App.jsx) |
| Curated project records | [src/data/projects.js](../../src/data/projects.js) |
| MDX writing + assets | [src/posts/index.js](../../src/posts/index.js) |
| URL filters + project archive | [src/components/Projects.jsx](../../src/components/Projects.jsx) |
| Case study dialog | [src/components/ProjectDetailDialog.jsx](../../src/components/ProjectDetailDialog.jsx) |
| Local project discovery helpers | [src/lib/projectFinder.js](../../src/lib/projectFinder.js) |
| Optional Project Finder | [src/components/ProjectFinder.jsx](../../src/components/ProjectFinder.jsx) |
| Server-only picker endpoint | [api/project-picker.js](../../api/project-picker.js) |
| Optional TypeSafe / Jev | [src/lib/projectFinder.js](../../src/lib/projectFinder.js) |

## Boundaries and limitations

- The server endpoint receives the query and selected public project metadata only; the browser never receives the provider key. The feature does not persist the query in browser storage or the page URL.
- Request budgets are held in server-process memory; they are not a global distributed quota. Live provider behavior and deployment were not exercised for these docs.
- Other projects’ architecture diagrams are delivered as documentation; this package does not change portfolio components or publish them into the live site.

## GitDiagram provenance

GitDiagram draft dated 2026-10-03 was inspected. Its broad page map is condensed; the reviewed overview adds the optional Project Finder, server credential boundary and local fallback.

[GitDiagram reference](https://gitdiagram.com/icecold009/shaurya-portfolio) · [Repository](https://github.com/icecold009/shaurya-portfolio)

The compact overview is a source-reviewed adaptation authored for this snapshot and rendered locally, not an unmodified GitDiagram export.

## Interview explanation

> The archive is curated data rendered by React, with URL-backed filtering and accessible details. Jev is an optional selector over existing records behind a server endpoint. When it is unavailable, local keyword matching still works and is labelled honestly.

## Verification and refresh

Documentation-only acceptance: validate every relative source link and commit-specific diagram link, render Mermaid, inspect the dark PNG for readability, inspect the complete diff, and obtain a bounded Jev diff review. The repository proposal contains no new binary images; separately delivered PNG previews are independently checked because Jev reviews text. Results and Jev coverage are recorded in this task’s delivery report rather than treated as application test evidence.

After an architecture change, inspect the new source, update this snapshot identifier, regenerate the overview from Mermaid, and recheck links and image appearance. Keep planned integrations explicitly separate from implemented paths.

## Review status

Integration is pending warning resolution. Earlier Jev uncertainty has not been accepted or waived. The proposed repository changes are text only, including embedded Mermaid; PNG previews are separate delivery outputs. Source claims describe this committed snapshot. The coverage register accounts for tracked paths and does not prove every execution path or deployed behavior.

## Detailed coverage

See [the subsystem diagram and complete tracked-file register](coverage.md) and [editable detail Mermaid](detail.mmd). This supplement records recovery, optional services, delivery boundaries and original-checkout drift beyond the overview.

[Documentation verification record](verification.md).
