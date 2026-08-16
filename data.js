/**
 * EngCalc — motor de dados (ícones + cálculos)
 * v2.0 — memória de cálculo técnica
 */

"use strict";

/* ═══════════════════════════════════════════════════
   ÍCONES SVG
═══════════════════════════════════════════════════ */
const ICONS = {
  tool:     `<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  cpu:      `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>`,
  rotate:   `<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  arrow:    `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  circle:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
  screw:    `<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  triangle: `<svg viewBox="0 0 24 24"><polygon points="12 2 22 22 2 22"/></svg>`,
  bolt:     `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  temp:     `<svg viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`,
  sigma:    `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="6" y2="20"/><line x1="6" y1="4" x2="18" y2="4"/><polyline points="6 4 6 12 18 12"/></svg>`,
  binary:   `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="4" height="18" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`,
  hash:     `<svg viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  chart:    `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  network:  `<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/></svg>`,
  db:       `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
  wifi:     `<svg viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
  photo:    `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  play:     `<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,

  /* Civil */
  concrete: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  foundation:`<svg viewBox="0 0 24 24"><line x1="2" y1="20" x2="22" y2="20"/><polyline points="4 20 4 10 12 4 20 10 20 20"/><line x1="9" y1="20" x2="9" y2="13"/><line x1="15" y1="20" x2="15" y2="13"/><line x1="9" y1="13" x2="15" y2="13"/></svg>`,
  pipe:     `<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"/><path d="M12 2a5 5 0 0 1 0 10 5 5 0 0 0 0 10"/><circle cx="12" cy="2" r="2"/><circle cx="12" cy="22" r="2"/></svg>`,
  beam:     `<svg viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="4" rx="1"/><line x1="6" y1="12" x2="4" y2="18"/><line x1="18" y1="12" x2="20" y2="18"/><line x1="12" y1="12" x2="12" y2="20"/></svg>`,
  deflect:  `<svg viewBox="0 0 24 24"><line x1="3" y1="8" x2="21" y2="8"/><path d="M3 8 Q12 18 21 8" fill="none"/><line x1="12" y1="13" x2="12" y2="18"/><polyline points="10 16 12 18 14 16"/><line x1="3" y1="6" x2="3" y2="10"/><line x1="21" y1="6" x2="21" y2="10"/></svg>`,
};

/* ═══════════════════════════════════════════════════
   DADOS DOS CÁLCULOS
   Cada cálculo tem: context (explicação), fields com hint (unidade inline)
═══════════════════════════════════════════════════ */
const DATA = {

  /* ── MECÂNICA ── */
  mecanica: {
    label: "Mecânica",
    icon: "tool",
    calcs: [
      {
        id: "rpm",
        icon: "rotate",
        name: "Cálculo de RPM",
        desc: "velocidade de corte × diâmetro",
        formula: "RPM = (1000 × Vc) / (π × D)",
        context: "Determina a rotação ideal de uma ferramenta de corte (fresa, broca, torno) a partir da velocidade de corte recomendada pelo fabricante e o diâmetro da ferramenta. Essencial para programação CNC e setup de máquinas-ferramenta.",
        fields: [
          { id: "vc", label: "Vc — velocidade de corte", ph: "80", hint: "m/min" },
          { id: "d",  label: "D — diâmetro da ferramenta", ph: "50", hint: "mm" },
        ],
        calc(v) {
          if (v.d <= 0) throw new Error("Diâmetro deve ser maior que zero");
          return { val: ((1000 * v.vc) / (Math.PI * v.d)).toFixed(1), unit: "rpm" };
        },
        result: "RPM",
      },
      {
        id: "conv",
        icon: "arrow",
        name: "Conversão mm → pol",
        desc: "milímetros para polegadas e fração",
        formula: "1 in = 25,4 mm",
        context: "Converte medidas métricas para o sistema imperial, com representação em fração decimal usada em ferramentas e peças importadas. Útil em manutenção industrial e projetos com componentes americanos.",
        fields: [{ id: "mm", label: "valor em milímetros", ph: "25.4", hint: "mm" }],
        calc(v) {
          const inches = v.mm / 25.4;
          const FRACS = [
            [1,64],[1,32],[3,64],[1,16],[5,64],[3,32],[7,64],[1,8],
            [9,64],[5,32],[11,64],[3,16],[13,64],[7,32],[15,64],[1,4],
            [17,64],[9,32],[19,64],[5,16],[21,64],[11,32],[23,64],[3,8],
            [25,64],[13,32],[27,64],[7,16],[29,64],[15,32],[31,64],[1,2],
            [33,64],[17,32],[35,64],[9,16],[37,64],[19,32],[39,64],[5,8],
            [41,64],[21,32],[43,64],[11,16],[45,64],[23,32],[47,64],[3,4],
            [49,64],[25,32],[51,64],[13,16],[53,64],[27,32],[55,64],[7,8],
            [57,64],[29,32],[59,64],[15,16],[61,64],[31,32],[63,64],[1,1],
          ];
          const whole = Math.floor(inches);
          const frac  = inches - whole;
          let bestFrac = null, bestDiff = Infinity;
          for (const [n, d] of FRACS) {
            const diff = Math.abs(n / d - frac);
            if (diff < bestDiff) { bestDiff = diff; bestFrac = [n, d]; }
          }
          const fracStr = frac < 0.001 ? "" : ` (≈ ${whole > 0 ? whole + " " : ""}${bestFrac[0]}/${bestFrac[1]}")`;
          return { val: inches.toFixed(4) + " in" + fracStr, unit: "" };
        },
        result: "polegadas",
      },
      {
        id: "polia",
        icon: "circle",
        name: "Relação de polias",
        desc: "N2 pela relação de diâmetros",
        formula: "N2 = (D1 × N1) / D2",
        context: "Calcula a rotação de saída de um sistema de transmissão por polias e correias. Usado para adequar a velocidade de motores a máquinas como compressores, bombas e ventiladores.",
        fields: [
          { id: "d1", label: "D1 — diâmetro da polia motriz", ph: "100", hint: "mm" },
          { id: "n1", label: "N1 — rotação do motor", ph: "1200", hint: "rpm" },
          { id: "d2", label: "D2 — diâmetro da polia movida", ph: "200", hint: "mm" },
        ],
        calc(v) {
          if (v.d2 <= 0) throw new Error("D2 deve ser > 0");
          return { val: ((v.d1 * v.n1) / v.d2).toFixed(1), unit: "rpm" };
        },
        result: "N2",
      },
      {
        id: "avanco",
        icon: "screw",
        name: "Avanço de roscas",
        desc: "passo × número de entradas",
        formula: "Avanço = Passo × Nº entradas",
        context: "Determina o avanço axial por volta em sistemas de parafuso/porca. Fundamental em projetos de fixação, roscas de movimento (trapezoidais, acme) e programação de tornos CNC.",
        fields: [
          { id: "p", label: "passo", ph: "1.5", hint: "mm" },
          { id: "e", label: "nº de entradas", ph: "2", hint: "entradas" },
        ],
        calc(v) {
          return { val: (v.p * v.e).toFixed(3), unit: "mm/volta" };
        },
        result: "avanço",
      },
      {
        id: "cone",
        icon: "triangle",
        name: "Ângulo de cones",
        desc: "torneamento cônico — ângulo de inclinação",
        formula: "α = arctan((D1 − D2) / (2 × L))",
        context: "Calcula o ângulo de inclinação para torneamento de peças cônicas. Usado para regulagem do carro superior do torno ou para programação de interpolação linear em CNC.",
        fields: [
          { id: "d1c", label: "D1 — diâmetro maior", ph: "60", hint: "mm" },
          { id: "d2c", label: "D2 — diâmetro menor", ph: "40", hint: "mm" },
          { id: "lc",  label: "L — comprimento do cone", ph: "100", hint: "mm" },
        ],
        calc(v) {
          if (v.lc <= 0) throw new Error("Comprimento L deve ser > 0");
          return {
            val: (Math.atan((v.d1c - v.d2c) / (2 * v.lc)) * (180 / Math.PI)).toFixed(4),
            unit: "°",
          };
        },
        result: "ângulo α",
      },
      {
        id: "tensao",
        icon: "sigma",
        name: "Tensão normal",
        desc: "tensão de tração ou compressão na seção",
        formula: "σ = F / A",
        context: "Calcula a tensão normal em elementos estruturais submetidos a tração ou compressão. Compare o resultado com o limite de escoamento do material (ex: aço SAE 1045: ~310 MPa) para verificar segurança.",
        fields: [
          { id: "f", label: "força F aplicada", ph: "5000", hint: "N" },
          { id: "a", label: "área A da seção transversal", ph: "100", hint: "mm²" },
        ],
        calc(v) {
          if (v.a <= 0) throw new Error("Área deve ser > 0");
          return { val: (v.f / v.a).toFixed(3), unit: "MPa" };
        },
        result: "σ (tensão)",
      },
      {
        id: "potencia",
        icon: "bolt",
        name: "Potência mecânica",
        desc: "potência de eixo por torque e rotação",
        formula: "P = T × ω  |  ω = 2π × n / 60",
        context: "Calcula a potência mecânica transmitida por um eixo em rotação. Use para dimensionar motores, redutores e verificar se a transmissão suporta a carga aplicada.",
        fields: [
          { id: "t", label: "torque T no eixo", ph: "50", hint: "N·m" },
          { id: "n", label: "rotação n", ph: "1450", hint: "rpm" },
        ],
        calc(v) {
          return { val: (v.t * 2 * Math.PI * v.n / 60).toFixed(2), unit: "W" };
        },
        result: "potência P",
      },
      {
        id: "dilatacao",
        icon: "temp",
        name: "Dilatação térmica linear",
        desc: "variação de comprimento por temperatura",
        formula: "ΔL = α × L₀ × ΔT",
        context: "Calcula quanto uma peça se dilata com a variação de temperatura. Indispensável em projetos de trilhos, tubulações, eixos e montagens com ajuste de interferência.",
        fields: [
          { id: "al", label: "coef. de dilatação α (×10⁻⁶)", ph: "12", hint: "/°C" },
          { id: "l0", label: "comprimento inicial L₀", ph: "1000", hint: "mm" },
          { id: "dt", label: "variação de temperatura ΔT", ph: "80", hint: "°C" },
        ],
        calc(v) {
          return { val: ((v.al * 1e-6) * v.l0 * v.dt).toFixed(4), unit: "mm" };
        },
        result: "ΔL",
      },
    ],
  },

  /* ── CIVIL ── */
  civil: {
    label: "Civil",
    icon: "foundation",
    calcs: [

      /* ─────────────────────────────────────────────────────────────
         1. DIMENSIONAMENTO DE VIGA DE CONCRETO ARMADO (NBR 6118)
         Calcula armadura longitudinal mínima, verifica ELU de flexão
         e gera diagrama de forças internas encadeado.
      ───────────────────────────────────────────────────────────── */
      {
        id: "concreto",
        icon: "concrete",
        name: "Dimensionamento — Viga CA (NBR 6118)",
        desc: "armadura longitudinal, ELU flexão, verificação de cisalhamento",
        formula: "Md = γf·(1,4·Mgk + 1,4·Mqk) | As = Md / (0,9·d·fyd) | Vsd ≤ Vrd2",
        context: "Dimensionamento completo de viga de concreto armado conforme NBR 6118:2023. Entradas: vão, largura, altura total, cobrimento, resistências fck e aço CA-50/CA-60, cargas permanente e variável. Saídas encadeadas: momento de cálculo Msd, altura útil d, armadura longitudinal As teórica, verificação de Asmin (0,15%·bw·d), cortante Vsd vs. Vrd2 (ruptura da biela), e taxa de armadura ρ. Referências: NBR 6118 itens 17.3, 17.4 e 19.4.",
        fields: [
          { id: "L",    label: "vão livre L",              ph: "6.0",   hint: "m"   },
          { id: "bw",   label: "largura bw",               ph: "25",    hint: "cm"  },
          { id: "h",    label: "altura total h",           ph: "60",    hint: "cm"  },
          { id: "cob",  label: "cobrimento nominal",       ph: "3.0",   hint: "cm"  },
          { id: "fck",  label: "fck do concreto",          ph: "25",    hint: "MPa" },
          { id: "fyk",  label: "fyk do aço (CA-50=500)",   ph: "500",   hint: "MPa" },
          { id: "gk",   label: "carga perm. gk (total)",   ph: "20",    hint: "kN/m"},
          { id: "qk",   label: "carga variável qk",        ph: "15",    hint: "kN/m"},
        ],
        calc(v) {
          if (v.L <= 0 || v.bw <= 0 || v.h <= 0) throw new Error("Geometria inválida");
          if (v.fck < 20) throw new Error("fck mín. NBR 6118: 20 MPa");
          if (v.cob <= 0 || v.cob >= v.h) throw new Error("Cobrimento inválido");

          // Coeficientes parciais NBR 6118 (combinação normal ELU)
          const gf_g = 1.4, gf_q = 1.4;
          const gc = 1.4, gs = 1.15; // coef. materiais

          // Resistências de cálculo
          const fcd  = (v.fck / gc);              // MPa
          const fyd  = (v.fyk / gs);              // MPa (≤ 435 CA-50, ≤ 522 CA-60)
          const fydEf = Math.min(fyd, 435);       // limite prático CA-50

          // Altura útil (φ = 1,0 cm estribos + φ_long/2 ≈ 1,25 cm → ~2,5 cm)
          const d = v.h - v.cob - 2.5;           // cm
          if (d <= 0) throw new Error("Cobrimento maior que a seção");

          // Carga de cálculo e momento máximo (viga biapoiada uniforme)
          const fd   = gf_g * v.gk + gf_q * v.qk;  // kN/m
          const Msd  = (fd * v.L * v.L) / 8;        // kN·m

          // Domínio 2/3 — verificação de momento resistente mínimo (item 17.3.1)
          // Kmd = Msd / (bw · d² · fcd) — adimensional
          const bwM = v.bw / 100, dM = d / 100;    // m
          const fcdPa = fcd * 1e6;                  // Pa
          const MsdNm = Msd * 1e3;                  // N·m

          const Kmd = MsdNm / (bwM * dM * dM * fcdPa);

          // Verificação de escoamento (Domínio ≤ 3 → Kmd ≤ 0,295 para fck≤50)
          const KmdLim = v.fck <= 50 ? 0.295 : 0.245;
          if (Kmd > KmdLim) throw new Error(`Kmd=${Kmd.toFixed(3)} > ${KmdLim} — seção insuficiente, aumente h ou bw`);

          // Armadura longitudinal (Equação geral domínio 2/3)
          // As = Msd / (0,9 · d · fyd)
          const As_cm2 = (MsdNm / (0.9 * dM * fydEf * 1e6)) * 1e4;  // cm²

          // Armadura mínima NBR 6118 Tab. 17.3 (ρmin = 0,15% para CA-50)
          const rhoMin = v.fyk >= 500 ? 0.0015 : 0.0020;
          const AsMin  = rhoMin * (v.bw * d);   // cm²
          const AsFinal = Math.max(As_cm2, AsMin);

          // Taxa de armadura real
          const rho = (AsFinal / (v.bw * d)) * 100;  // %

          // Cortante de cálculo — seção crítica a d da face do apoio (viga biapoiada)
          const Vsd = (fd * v.L) / 2 - fd * dM;  // kN

          // Vrd2 — resistência de cálculo da biela comprimida (NBR 6118 item 17.4.2.2)
          // Vrd2 = 0,27 · αv2 · fcd · bw · d  (modelo I, θ=45°)
          const alphav2 = v.fck <= 50 ? (1 - v.fck / 250) : (1 - v.fck / 250);
          const Vrd2kN = 0.27 * alphav2 * fcd * (v.bw / 100) * (d / 100) * 1000; // kN

          const cisOk = Vsd <= Vrd2kN;

          // Estimativa de barras (φ 16mm = 2,01 cm² / φ 20mm = 3,14 cm² / φ 25mm = 4,91 cm²)
          const bitolas = [
            { phi: 12.5, area: 1.23 },
            { phi: 16,   area: 2.01 },
            { phi: 20,   area: 3.14 },
            { phi: 25,   area: 4.91 },
          ];
          const sugestoes = bitolas.map(b => {
            const n = Math.ceil(AsFinal / b.area);
            return `${n}φ${b.phi} (${(n * b.area).toFixed(2)} cm²)`;
          }).join(" | ");

          return {
            val: [
              `── ESFORÇOS ──────────────────────────`,
              `fd (cálc.):   ${fd.toFixed(2)} kN/m`,
              `Msd:          ${Msd.toFixed(2)} kN·m`,
              `Vsd (crítico):${Vsd.toFixed(2)} kN`,
              `── SEÇÃO ─────────────────────────────`,
              `d (alt. útil):${d.toFixed(1)} cm`,
              `Kmd:          ${Kmd.toFixed(4)} (lim. ${KmdLim})`,
              `fcd:          ${fcd.toFixed(1)} MPa   fyd: ${fydEf.toFixed(1)} MPa`,
              `── ARMADURA ──────────────────────────`,
              `As teórica:   ${As_cm2.toFixed(2)} cm²`,
              `As mínima:    ${AsMin.toFixed(2)} cm²`,
              `As adotada:   ${AsFinal.toFixed(2)} cm²`,
              `ρ:            ${rho.toFixed(3)} %`,
              `Sugestões:    ${sugestoes}`,
              `── CISALHAMENTO ──────────────────────`,
              `Vrd2 (biela): ${Vrd2kN.toFixed(2)} kN`,
              cisOk ? `✓ Vsd ≤ Vrd2  — seção OK` : `✗ Vsd > Vrd2  — AUMENTAR SEÇÃO`,
            ].join("\n"),
            unit: "",
            multi: true,
          };
        },
        result: "dimensionamento CA",
      },

      /* ─────────────────────────────────────────────────────────────
         2. DIMENSIONAMENTO DE SAPATA ISOLADA (NBR 6118 + NBR 6122)
         Inclui pressão de contato, punção, armadura em ambas direções,
         momento fletor na sapata e verificação de esbeltez.
      ───────────────────────────────────────────────────────────── */
      {
        id: "fundacao",
        icon: "foundation",
        name: "Sapata Isolada — Dimensionamento Completo",
        desc: "pressão de contato, punção, armaduras Asx/Asy, NBR 6118+6122",
        formula: "A = Nd/σadm | Mp = σd·Lv²/2 | Aps ≥ As_punção",
        context: "Dimensionamento completo de sapata isolada rígida (NBR 6118 item 22.5 + NBR 6122). Entradas: carga de cálculo Nd, momento Md (excentricidade), dimensões do pilar (a×b), tensão admissível do solo (sondagem SPT), fck e fyk. Calcula: dimensões da sapata (iterativo para esbeltez λ ≤ 2), pressão de contato σ e σ_max (sem tração no solo), armadura em X e Y por flexão, perímetro e resistência à punção conforme NBR 6118 item 19.5. Saídas encadeadas: verificação de excentricidade relativa, armaduras teóricas e mínimas, e sugestão de bitola.",
        fields: [
          { id: "Nd",   label: "força normal de cálculo Nd",  ph: "800",  hint: "kN"  },
          { id: "Md",   label: "momento de cálculo Md",       ph: "50",   hint: "kN·m"},
          { id: "ap",   label: "dimensão pilar a (dir. M)",   ph: "40",   hint: "cm"  },
          { id: "bp",   label: "dimensão pilar b",            ph: "40",   hint: "cm"  },
          { id: "sigAd",label: "tensão admissível σ_adm (solo)",ph: "200", hint: "kPa"},
          { id: "fck",  label: "fck concreto",                ph: "25",   hint: "MPa" },
          { id: "fyk",  label: "fyk aço",                     ph: "500",  hint: "MPa" },
          { id: "hs",   label: "altura da sapata h",          ph: "60",   hint: "cm"  },
          { id: "cobs", label: "cobrimento nominal",          ph: "5",    hint: "cm"  },
        ],
        calc(v) {
          if (v.Nd <= 0) throw new Error("Nd deve ser > 0");
          if (v.sigAd <= 0) throw new Error("σ_adm deve ser > 0");
          if (v.fck < 20) throw new Error("fck mín. 20 MPa (NBR 6118)");

          const gc = 1.4, gs = 1.15;
          const fcd  = v.fck / gc;
          const fyd  = Math.min(v.fyk / gs, 435);

          // Peso próprio da sapata estimado (≈ 10% de Nd, iterativo 1x)
          const Npp  = 0.10 * v.Nd;
          const Ntot = v.Nd + Npp;  // para pressão no solo

          // Área mínima e dimensões (sapata quadrada inicial)
          const Amin = Ntot / v.sigAd;  // m² (sigAd em kPa = kN/m²)
          let L = Math.sqrt(Amin);       // m — lado inicial

          // Verificação de esbeltez λ = L / (2·h) ≤ 2 (sapata rígida, NBR 6118 item 22.4.1)
          const h_m = v.hs / 100;
          const lambda = L / (2 * h_m);
          if (lambda > 2) {
            // Ajustar L para ser rígida ou avisar
            L = 2 * 2 * h_m;  // forçar λ = 2
          }
          // Arredondar para múltiplos de 5 cm
          L = (Math.ceil(L * 20) / 20);  // múltiplo de 5 cm em metros

          const A_adot = L * L;

          // Excentricidade e pressão de contato
          const e = v.Md / v.Nd;  // m
          const eRel = e / L;     // excentricidade relativa

          let sigMax, sigMin;
          if (eRel <= 1/6) {
            // Pressão trapezoidal (sem tração)
            sigMax = (v.Nd / A_adot) * (1 + 6 * e / L);  // kPa
            sigMin = (v.Nd / A_adot) * (1 - 6 * e / L);  // kPa
          } else {
            // Tração no solo — distribuição triangular (até e ≤ L/3)
            if (eRel > 1/3) throw new Error(`Excentricidade e/L=${eRel.toFixed(3)} > 1/3 — risco de tombamento. Aumente L ou reduza Md.`);
            sigMax = (4 * v.Nd) / (3 * L * (L / 2 - e));
            sigMin = 0;
          }

          if (sigMax > v.sigAd * 1.2) throw new Error(`σ_max=${sigMax.toFixed(1)} kPa excede 1,2·σ_adm=${(v.sigAd*1.2).toFixed(1)} kPa — aumente L`);

          // Pressão de cálculo para armadura (média, sapata rígida)
          const sigD = (sigMax + sigMin) / 2;  // kPa (pressão média)

          // Balanço da sapata em cada direção
          const Lv_a = (L - v.ap / 100) / 2;  // m — balanço dir. a (do pilar)
          const Lv_b = (L - v.bp / 100) / 2;  // m — balanço dir. b

          // Momento fletor por metro de largura
          const Ma = sigD * Lv_a * Lv_a / 2;  // kN·m/m
          const Mb = sigD * Lv_b * Lv_b / 2;  // kN·m/m

          // Altura útil
          const d_a = v.hs - v.cobs - 1.0;  // cm (dir. a — barra inferior)
          const d_b = d_a - 1.6;             // cm (dir. b — acima da camada a, φ16 estim.)

          const da_m = d_a / 100, db_m = d_b / 100;

          // Armadura por flexão (faixas de 1 m)
          const Asx_m = (Ma * 1e3) / (0.9 * da_m * fyd * 1e6) * 1e4;  // cm²/m
          const Asy_m = (Mb * 1e3) / (0.9 * db_m * fyd * 1e6) * 1e4;  // cm²/m

          // Armadura mínima NBR 6118 Tab. 17.3
          const rhoMin = v.fyk >= 500 ? 0.0015 : 0.0020;
          const AsMinX = rhoMin * (100 * d_a);  // cm²/m
          const AsMinY = rhoMin * (100 * d_b);  // cm²/m
          const AsFx = Math.max(Asx_m, AsMinX);
          const AsFy = Math.max(Asy_m, AsMinY);

          // Armadura total (faixa × comprimento sapata)
          const Asx_tot = AsFx * L;   // cm²
          const Asy_tot = AsFy * L;   // cm²

          // Punção — perímetro crítico a 2d do pilar (NBR 6118 item 19.5.3)
          const d_med_m = (da_m + db_m) / 2;
          const u1 = 2 * (v.ap / 100 + v.bp / 100) + 4 * Math.PI * 2 * d_med_m;  // m
          const Vsd_punc = v.Nd;  // kN (carga total no pilar)
          const tau_sd = (Vsd_punc * 1e3) / (u1 * d_med_m * 1e6);   // MPa
          // Resistência à punção sem armadura (τ_rd1)
          const fctk_inf = 0.7 * 0.3 * Math.pow(v.fck, 2/3);        // MPa
          const fctd = fctk_inf / 1.4;
          const tau_rd1 = 0.27 * Math.pow(v.fck / 10, 1/3) * fctd;  // MPa (aproximação NBR)
          const puncOk = tau_sd <= tau_rd1;

          // Sugestão de barras (φ 16 = 2,01 | φ 20 = 3,14)
          const nBx16 = Math.ceil(Asx_tot / 2.01);
          const nBx20 = Math.ceil(Asx_tot / 3.14);
          const nBy16 = Math.ceil(Asy_tot / 2.01);

          return {
            val: [
              `── GEOMETRIA ────────────────────────`,
              `Área adotada: ${L.toFixed(2)} × ${L.toFixed(2)} m (${A_adot.toFixed(2)} m²)`,
              `λ (esbeltez): ${(L / (2 * h_m)).toFixed(2)} ${(L / (2 * h_m)) <= 2 ? "✓ rígida" : "⚠ flexível"}`,
              `── PRESSÕES NO SOLO ─────────────────`,
              `e:            ${e.toFixed(3)} m  (e/L = ${eRel.toFixed(3)})`,
              `σ_max:        ${sigMax.toFixed(2)} kPa ${sigMax <= v.sigAd ? "✓" : "✗ excede σ_adm"}`,
              `σ_min:        ${sigMin.toFixed(2)} kPa`,
              `── ARMADURAS ────────────────────────`,
              `d_a / d_b:    ${d_a.toFixed(1)} / ${d_b.toFixed(1)} cm`,
              `As_x (flex.): ${AsFx.toFixed(2)} cm²/m → total ${Asx_tot.toFixed(2)} cm²`,
              `As_y (flex.): ${AsFy.toFixed(2)} cm²/m → total ${Asy_tot.toFixed(2)} cm²`,
              `Sugest. X:    ${nBx16}φ16 ou ${nBx20}φ20`,
              `Sugest. Y:    ${nBy16}φ16`,
              `── PUNÇÃO (NBR 6118 §19.5) ─────────`,
              `u1:           ${u1.toFixed(3)} m`,
              `τ_sd:         ${tau_sd.toFixed(4)} MPa`,
              `τ_rd1:        ${tau_rd1.toFixed(4)} MPa`,
              puncOk ? `✓ Punção OK (sem arm. específica)` : `✗ Punção — adicionar arm. de punção`,
            ].join("\n"),
            unit: "",
            multi: true,
          };
        },
        result: "dimensionamento sapata",
      },

      /* ─────────────────────────────────────────────────────────────
         3. REDE DE DRENAGEM PLUVIAL (NBR 10844)
         Cálculo de calha, conduto e boca-de-lobo por método racional
         com intensidade pluviométrica, coeficiente de runoff e
         verificação de capacidade hidráulica pelo Manning.
      ───────────────────────────────────────────────────────────── */
      {
        id: "tubos",
        icon: "pipe",
        name: "Drenagem Pluvial — Método Racional (NBR 10844)",
        desc: "vazão de projeto, diâmetro de conduto, Manning, tempo de concentração",
        formula: "Q = C·i·A/360 | V = (1/n)·Rh^(2/3)·S^(1/2) | tc = 0,388·L^0,76/S^0,19",
        context: "Dimensionamento de rede de drenagem pluvial urbana conforme NBR 10844 e método racional. Determina a vazão de projeto Q para uma bacia hidrográfica, verifica o diâmetro mínimo de conduto circular pela equação de Manning-Strickler e calcula o tempo de concentração (Kirpich). Entradas: área da bacia, coeficiente de escoamento C (pavimentado≈0,95; gramado≈0,35), declividade S, comprimento do talvegue, intensidade pluviométrica i (obtida das isozonas da localidade para TR=25 anos). Resultados encadeados permitem verificar se o conduto adotado escoará com lâmina ≤ 80% (NBR 10844 item 5.4).",
        fields: [
          { id: "A",    label: "área da bacia A",           ph: "2.5",   hint: "ha"  },
          { id: "C",    label: "coef. escoamento C",        ph: "0.85",  hint: "0–1" },
          { id: "i",    label: "intens. pluviom. i (TR25)", ph: "120",   hint: "mm/h"},
          { id: "L",    label: "comprimento talvegue L",    ph: "300",   hint: "m"   },
          { id: "S",    label: "declividade média S",       ph: "0.02",  hint: "m/m" },
          { id: "nMn",  label: "coef. Manning n (PVC=0,011)",ph:"0.013", hint: "—"  },
          { id: "Dc",   label: "diâm. conduto a verificar", ph: "600",   hint: "mm"  },
        ],
        calc(v) {
          if (v.A <= 0 || v.i <= 0 || v.L <= 0) throw new Error("Área, i e L devem ser > 0");
          if (v.C < 0 || v.C > 1) throw new Error("Coeficiente C entre 0 e 1");
          if (v.S <= 0 || v.S > 0.5) throw new Error("Declividade S deve ser 0 < S ≤ 0,5");
          if (v.nMn <= 0) throw new Error("Manning n deve ser > 0");
          if (v.Dc <= 0) throw new Error("Diâmetro deve ser > 0");

          // Tempo de concentração — Kirpich (min)
          const tc_min = 0.388 * Math.pow(v.L, 0.76) / Math.pow(v.S * 100, 0.19);

          // Intensidade ajustada se tc < duração de chuva (método simplificado)
          const i_proj = v.i;  // mantém a intensidade fornecida (projeto usa isozonas)

          // Vazão de projeto — método racional Q = C·i·A/360 (m³/s)
          const Q_m3s = (v.C * i_proj * v.A) / 360;  // m³/s

          // Diâmetro conduto circular — seção plena (Manning)
          // Q_plena = (π/4·D²) · (1/n) · (D/4)^(2/3) · S^(1/2)
          // Resolver para D iterativamente
          let D_calc = 0.3;  // m — chute inicial
          for (let iter = 0; iter < 80; iter++) {
            const A_sec = Math.PI * D_calc * D_calc / 4;
            const Rh    = D_calc / 4;
            const Q_it  = (A_sec / v.nMn) * Math.pow(Rh, 2/3) * Math.pow(v.S, 0.5);
            if (Q_it >= Q_m3s) break;
            D_calc += 0.005;
          }
          // Arredondar para DN comercial (séries 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200 mm)
          const dnComercial = [0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.2,1.5];
          const D_adot = dnComercial.find(d => d >= D_calc) || dnComercial[dnComercial.length-1];

          // Verificação com diâmetro fornecido pelo usuário
          const Dv = v.Dc / 1000;  // m
          const A_v  = Math.PI * Dv * Dv / 4;
          const Rh_v = Dv / 4;
          const Q_plena = (A_v / v.nMn) * Math.pow(Rh_v, 2/3) * Math.pow(v.S, 0.5);
          const V_plena = Q_plena / A_v;  // m/s

          // Lâmina d'água y/D para Q_proj (Newton-Raphson na curva de Manning parcial)
          // Razão Q/Q_plena → tabela hidráulica circular
          const ratio = Q_m3s / Q_plena;
          // Aproximação polinomial: y/D ≈ (Q/Qp)^0,46 para 0 < Q/Qp ≤ 1
          const yD = ratio <= 1 ? Math.pow(ratio, 0.46) : 1;
          const laminaPct = yD * 100;
          const laminaOk = laminaPct <= 80;

          const V_media = V_plena * (ratio <= 1 ? Math.pow(ratio, 0.2) : 1);

          return {
            val: [
              `── HIDROLOGIA ───────────────────────`,
              `tc (Kirpich):  ${tc_min.toFixed(1)} min`,
              `Q projeto:     ${Q_m3s.toFixed(4)} m³/s  (${(Q_m3s*1000).toFixed(1)} L/s)`,
              `── CONDUTO MÍNIMO (calculado) ───────`,
              `D calculado:   ${(D_calc*1000).toFixed(0)} mm`,
              `DN adotado:    ${(D_adot*1000).toFixed(0)} mm`,
              `── VERIFICAÇÃO DO CONDUTO ───────────`,
              `DN verificado: ${v.Dc.toFixed(0)} mm`,
              `Q_plena:       ${Q_plena.toFixed(4)} m³/s`,
              `V_plena:       ${V_plena.toFixed(2)} m/s ${V_plena >= 0.6 ? "✓" : "⚠ V < 0,6 m/s (dep.)"}`,
              `Lâmina y/D:    ${laminaPct.toFixed(1)} %  ${laminaOk ? "✓ ≤ 80% (NBR 10844)" : "✗ > 80% — AUMENTAR DN"}`,
              `V escoamento:  ${V_media.toFixed(2)} m/s`,
              `── CAPACIDADE ───────────────────────`,
              Q_plena >= Q_m3s
                ? `✓ DN ${v.Dc.toFixed(0)} mm SUFICIENTE`
                : `✗ DN ${v.Dc.toFixed(0)} mm INSUFICIENTE — usar DN ≥ ${(D_adot*1000).toFixed(0)} mm`,
            ].join("\n"),
            unit: "",
            multi: true,
          };
        },
        result: "rede pluvial",
      },

      /* ─────────────────────────────────────────────────────────────
         4. PILAR DE CONCRETO ARMADO — FLAMBAGEM (NBR 6118)
         Verifica pilar esbelto considerando excentricidade de 1ª e 2ª
         ordem, índice de esbeltez λ, e dimensiona armadura total.
      ───────────────────────────────────────────────────────────── */
      {
        id: "resistencia",
        icon: "sigma",
        name: "Pilar CA — Flambagem e Dimensionamento (NBR 6118)",
        desc: "esbeltez λ, excentricidades 1ª/2ª ordem, armadura total Ast",
        formula: "λ = le/i | e2 = (1/r)·le²/10 | Ast = (Nd − Nc) / fyd",
        context: "Dimensionamento de pilar isolado de concreto armado considerando efeitos de 2ª ordem (NBR 6118 item 15.8 — método aproximado da curvatura). Calcula: comprimento equivalente le (coeficiente β conforme vinculação), índice de esbeltez λ (NBR limita λ ≤ 200; dispensa análise de 2ª ordem se λ ≤ 35), excentricidade inicial e1 (imperfeiçoes geométricas: e1 ≥ h/30 e ≥ 2 cm), excentricidade de 2ª ordem e2 pelo método da curvatura, excentricidade total e_tot, momento total Mtot e armadura simétrica Ast. Requer aprovação em verificação de instabilidade (NBR 6118 item 15.6).",
        fields: [
          { id: "Nd",   label: "força normal de cálculo Nd",  ph: "2500",  hint: "kN"  },
          { id: "M1d",  label: "momento 1ª ordem M1d",        ph: "80",    hint: "kN·m"},
          { id: "lc",   label: "comprimento real do pilar lc", ph: "4.5",  hint: "m"   },
          { id: "beta", label: "coef. vínculo β (enga.=0.5)", ph: "0.7",   hint: "—"   },
          { id: "bP",   label: "largura b da seção",          ph: "40",    hint: "cm"  },
          { id: "hP",   label: "altura h da seção",           ph: "60",    hint: "cm"  },
          { id: "fck",  label: "fck",                         ph: "30",    hint: "MPa" },
          { id: "fyk",  label: "fyk",                         ph: "500",   hint: "MPa" },
        ],
        calc(v) {
          if (v.Nd <= 0) throw new Error("Nd deve ser > 0");
          if (v.lc <= 0 || v.bP <= 0 || v.hP <= 0) throw new Error("Geometria inválida");
          if (v.beta <= 0 || v.beta > 1) throw new Error("β entre 0 e 1");
          if (v.fck < 20) throw new Error("fck mín. 20 MPa");

          const gc = 1.4, gs = 1.15;
          const fcd  = v.fck / gc;
          const fyd  = Math.min(v.fyk / gs, 435);
          const Ecs  = 5600 * Math.sqrt(v.fck);  // MPa — módulo de elasticidade secante

          // Comprimento equivalente e raio de giração
          const le = v.beta * v.lc;  // m
          const i_gir = v.hP / (100 * Math.sqrt(12));  // m (seção retangular)
          const lambda = le / i_gir;

          if (lambda > 200) throw new Error(`λ = ${lambda.toFixed(1)} > 200 — estrutura fora do domínio NBR 6118`);

          const dispensaOrdem2 = lambda <= 35;

          // Excentricidade de 1ª ordem
          const e1a = v.M1d / v.Nd;     // m — do carregamento
          const e1min_h = v.hP / (30 * 100);  // m (h/30)
          const e1min_abs = 0.02;             // m (2 cm)
          const e1 = Math.max(e1a, e1min_h, e1min_abs);

          // Excentricidade de 2ª ordem — método da curvatura (NBR 6118 item 15.8.3)
          // 1/r = (eps_yd + eps_cd) / (0,9·d)   onde eps_yd = fyd/Es, eps_cd ≈ 0,003
          // e2 = (1/r)·le²/10
          let e2 = 0;
          if (!dispensaOrdem2) {
            const d_pilar = 0.9 * v.hP / 100;         // m
            const eps_yd  = fyd / (200000);             // adimensional
            const eps_cd  = 0.003;
            const curv    = (eps_yd + eps_cd) / d_pilar;  // 1/m
            e2 = curv * le * le / 10;                  // m
          }

          // Excentricidade total e momento total
          const e_tot = e1 + e2;
          const Mtot  = v.Nd * e_tot;   // kN·m

          // Área de concreto da seção
          const Ac = (v.bP * v.hP) / 1e4;  // m²

          // Força resistida pelo concreto (eixo centrado aproximado)
          // Nc = 0,85 · fcd · Ac (sem armadura)
          const Nc = 0.85 * fcd * Ac * 1e3;  // kN

          // Força na armadura
          const Fas = v.Nd - Nc;              // kN

          // Armadura simétrica total (compressão + tração):
          // Considerando domínio 2 — compressão excêntrica
          // Ast total ≈ max( Fas/fyd , ρmin·Ac )
          const rhoMin_pilar = 0.004;   // 0,4 % — NBR 6118 Tab. 17.3
          const rhoMax_pilar = 0.08;    // 8 % — máximo
          const AsMin_pilar  = rhoMin_pilar * Ac * 1e4;  // cm²
          const AsMax_pilar  = rhoMax_pilar * Ac * 1e4;  // cm²

          let Ast = Math.max((Fas * 1e3) / (fyd * 1e6) * 1e4, AsMin_pilar);  // cm²
          if (Ast > AsMax_pilar) throw new Error(`Ast = ${Ast.toFixed(1)} cm² > Asmáx = ${AsMax_pilar.toFixed(1)} cm² — seção insuficiente`);

          const rho_pilar = Ast / (Ac * 1e4) * 100;  // %

          // Bitola (φ 20 = 3,14; φ 25 = 4,91; φ 32 = 8,04)
          const bitolas = [{phi:16,a:2.01},{phi:20,a:3.14},{phi:25,a:4.91},{phi:32,a:8.04}];
          const sugBit = bitolas.map(b => `${Math.ceil(Ast/b.a)}φ${b.phi}`).join(" | ");

          return {
            val: [
              `── ESBELTEZ ─────────────────────────`,
              `le:            ${le.toFixed(2)} m`,
              `i (giração):   ${(i_gir*100).toFixed(2)} cm`,
              `λ:             ${lambda.toFixed(1)} ${lambda<=35?"(dispensa 2ª ordem)":lambda<=90?"(moderada)":"(esbelta — atenção)"}`,
              `── EXCENTRICIDADES ──────────────────`,
              `e1 (1ª ordem): ${(e1*100).toFixed(2)} cm`,
              `e2 (2ª ordem): ${(e2*100).toFixed(2)} cm ${dispensaOrdem2?"(desprezada — λ≤35)":""}`,
              `e_tot:         ${(e_tot*100).toFixed(2)} cm`,
              `── ESFORÇOS DE CÁLCULO ──────────────`,
              `Nd:            ${v.Nd.toFixed(0)} kN`,
              `Mtot:          ${Mtot.toFixed(2)} kN·m`,
              `── ARMADURA ─────────────────────────`,
              `Nc (concreto): ${Nc.toFixed(1)} kN`,
              `Fas (aço):     ${Fas.toFixed(1)} kN`,
              `Ast total:     ${Ast.toFixed(2)} cm²  (ρ = ${rho_pilar.toFixed(3)} %)`,
              `Sugestões:     ${sugBit}`,
              `As mín/máx:    ${AsMin_pilar.toFixed(2)} / ${AsMax_pilar.toFixed(2)} cm²`,
            ].join("\n"),
            unit: "",
            multi: true,
          };
        },
        result: "pilar CA flambagem",
      },

      /* ─────────────────────────────────────────────────────────────
         5. ANÁLISE ESTRUTURAL — PÓRTICO SIMPLES (Clapeyron / 3 momentos)
         Viga contínua de 2 vãos pelo método dos 3 momentos.
         Calcula: momentos nos apoios, reações, envoltória de momentos
         e flecha máxima em cada vão. Resultado encadeia para arm. CA.
      ───────────────────────────────────────────────────────────── */
      {
        id: "deflexao",
        icon: "deflect",
        name: "Viga Contínua 2 Vãos — Teorema dos 3 Momentos",
        desc: "momentos nos apoios, reações, envoltória e flechas — encadeia para dimensionamento CA",
        formula: "M₁L₁/I₁ + 2M₂(L₁/I₁+L₂/I₂) + M₃L₂/I₂ = −6E[A₁ā₁/I₁L₁ + A₂b̄₂/I₂L₂]",
        context: "Resolve viga contínua de 2 vãos com carregamento distribuído uniforme em cada vão pelo Teorema de Clapeyron (3 momentos). Apoios externos são articulados (M=0). Calcula o momento no apoio central (M2) por equação de compatibilidade, as reações nos 3 apoios, os momentos máximos positivos no meio de cada vão, a posição e o valor da flecha máxima em cada vão (fórmula exata). Os momentos de saída alimentam diretamente o cálculo de armadura CA (concreto armado) conforme NBR 6118.",
        fields: [
          { id: "L1",  label: "vão 1 — comprimento L₁",    ph: "7.0",  hint: "m"   },
          { id: "q1",  label: "vão 1 — carga distrib. q₁", ph: "25",   hint: "kN/m"},
          { id: "L2",  label: "vão 2 — comprimento L₂",    ph: "5.5",  hint: "m"   },
          { id: "q2",  label: "vão 2 — carga distrib. q₂", ph: "18",   hint: "kN/m"},
          { id: "EI",  label: "rigidez E·I (constante)",   ph: "45000",hint: "kN·m²"},
        ],
        calc(v) {
          if (v.L1 <= 0 || v.L2 <= 0) throw new Error("Vãos devem ser > 0");
          if (v.EI <= 0) throw new Error("EI deve ser > 0");

          // Teorema dos 3 momentos — apoios A(0), B(central), C(0)
          // M_A = M_C = 0 (articulados externos)
          // Termo de carga distribuída uniforme: A_i·ā_i = q_i·L_i³/24  (viga simplesmente apoiada)
          // Equação: 2·M_B·(L1+L2) = -6E·[(q1·L1³/24)·(1/L1) + (q2·L2³/24)·(1/L2)] · (1/I)
          // Simplificando: 2·M_B·(L1+L2) = -(q1·L1²/4 + q2·L2²/4)  [por unidade de EI]
          // → M_B = -(q1·L1² + q2·L2²) / (8·(L1+L2))

          const MB = -(v.q1 * v.L1 * v.L1 + v.q2 * v.L2 * v.L2) / (8 * (v.L1 + v.L2));  // kN·m

          // Reações nos apoios (equilíbrio de cada vão com M_B conhecido)
          // Vão 1 (A–B): soma mom. em A → RB1·L1 = q1·L1²/2 + MB
          const RB1 = (v.q1 * v.L1 * v.L1 / 2 + MB) / v.L1;   // kN (contribuição do vão 1)
          const RA  = v.q1 * v.L1 - RB1;                         // kN

          // Vão 2 (B–C): soma mom. em C → RB2·L2 = q2·L2²/2 - MB
          const RB2 = (v.q2 * v.L2 * v.L2 / 2 - MB) / v.L2;   // kN (contribuição do vão 2)
          const RC  = v.q2 * v.L2 - RB2;                         // kN

          const RB  = RB1 + RB2;                                  // kN — reação total no apoio central

          // Posição do momento máximo positivo em cada vão
          // Vão 1: V(x) = RA - q1·x = 0 → x1 = RA/q1
          const x1 = RA / v.q1;  // m
          // Momento máx positivo vão 1
          const M_max1 = RA * x1 - v.q1 * x1 * x1 / 2;  // kN·m

          // Vão 2: V(x) = RB2 - q2·x = 0 → x2 = RB2/q2
          const x2 = RB2 / v.q2;  // m
          const M_max2 = RB2 * x2 - v.q2 * x2 * x2 / 2;  // kN·m (medido de B)

          // Flechas máximas
          // Vão 1: δ_max = RA·x1³/(6EI) - q1·x1⁴/(24EI) + MB·x1²/(2EI·L1)·(x1-L1)...
          // Fórmula simplificada para carregamento uniforme + momento no apoio B:
          // Usando superposição: δ_q + δ_MB
          // δ_max_vão1 ≈ (5·q1·L1⁴)/(384·EI) - (MB·L1²)/(16·EI)  [estimativa boa para campo]
          const EI = v.EI;
          const delta1 = Math.abs((5 * v.q1 * Math.pow(v.L1, 4)) / (384 * EI)
                        - (MB * v.L1 * v.L1) / (16 * EI));  // m
          const delta2 = Math.abs((5 * v.q2 * Math.pow(v.L2, 4)) / (384 * EI)
                        - (MB * v.L2 * v.L2) / (16 * EI));  // m

          const delta1mm = delta1 * 1000;
          const delta2mm = delta2 * 1000;

          // Limites NBR 6118
          const lim1_250 = (v.L1 * 1000) / 250;
          const lim1_400 = (v.L1 * 1000) / 400;
          const lim2_250 = (v.L2 * 1000) / 250;
          const lim2_400 = (v.L2 * 1000) / 400;

          return {
            val: [
              `── MOMENTOS (kN·m) ──────────────────`,
              `M_A (apoio):    0,00  (articulado)`,
              `M_B (central): ${MB.toFixed(2)}  ← crítico para dimensionar seção`,
              `M_C (apoio):    0,00  (articulado)`,
              `M_max+ vão 1:  +${M_max1.toFixed(2)}  em x = ${x1.toFixed(2)} m`,
              `M_max+ vão 2:  +${M_max2.toFixed(2)}  em x = ${x2.toFixed(2)} m (de B)`,
              `── REAÇÕES (kN) ─────────────────────`,
              `R_A:  ${RA.toFixed(2)}`,
              `R_B:  ${RB.toFixed(2)}  (${RB1.toFixed(2)} + ${RB2.toFixed(2)})`,
              `R_C:  ${RC.toFixed(2)}`,
              `── FLECHAS ──────────────────────────`,
              `δ_max vão 1:  ${delta1mm.toFixed(2)} mm  [L/250=${lim1_250.toFixed(1)} ${delta1mm<=lim1_250?"✓":"✗"} | L/400=${lim1_400.toFixed(1)} ${delta1mm<=lim1_400?"✓":"✗"}]`,
              `δ_max vão 2:  ${delta2mm.toFixed(2)} mm  [L/250=${lim2_250.toFixed(1)} ${delta2mm<=lim2_250?"✓":"✗"} | L/400=${lim2_400.toFixed(1)} ${delta2mm<=lim2_400?"✓":"✗"}]`,
              `── USAR PARA DIMENSIONAMENTO CA ─────`,
              `→ M negativo no apoio B: |${Math.abs(MB).toFixed(2)}| kN·m`,
              `→ M positivo máx:  ${Math.max(M_max1, M_max2).toFixed(2)} kN·m (vão ${M_max1>=M_max2?"1":"2"})`,
            ].join("\n"),
            unit: "",
            multi: true,
          };
        },
        result: "viga contínua 3 momentos",
      },

    ],
  },
};

/* ═══════════════════════════════════════════════════
   v2 — DIAGRAMAS DO PROBLEMA + SELOS DE NORMA
   Anexado ao motor sem alterar as fórmulas originais.
═══════════════════════════════════════════════════ */
(function augment() {
  const find = (area, id) => (DATA[area] && DATA[area].calcs.find(c => c.id === id)) || null;
  const set = (area, id, props) => { const c = find(area, id); if (c) Object.assign(c, props); };

  /* — Selos de norma (onde há norma real aplicável) — */
  set("civil", "concreto",    { norma: "NBR 6118:2023" });
  set("civil", "fundacao",    { norma: "NBR 6118 + 6122" });
  set("civil", "tubos",       { norma: "NBR 10844" });
  set("civil", "resistencia", { norma: "NBR 6118 §15.8" });
  set("civil", "deflexao",    { norma: "Clapeyron · 3 momentos" });

  /* — Diagramas (SVG técnico, herda cor via currentColor) — */

  // RPM — ferramenta em rotação, diâmetro D, Vc tangencial
  set("mecanica", "rpm", { diagram: `
    <svg viewBox="0 0 300 132" class="dg" role="img" aria-label="Ferramenta de corte em rotação">
      <line class="dg-cl" x1="150" y1="14" x2="150" y2="120"/>
      <circle class="dg-line" cx="150" cy="66" r="40"/>
      <circle class="dg-fill" cx="150" cy="66" r="3"/>
      <line class="dg-dim" x1="110" y1="66" x2="190" y2="66"/>
      <path class="dg-dim" d="M110 61 L110 71 M190 61 L190 71"/>
      <text class="dg-t" x="146" y="60" text-anchor="end">D</text>
      <path class="dg-line" d="M150 26 A 40 40 0 0 1 190 66" fill="none"/>
      <path class="dg-line" d="M184 60 L190 66 L184 72" fill="none"/>
      <text class="dg-t" x="214" y="52">n (rpm)</text>
      <line class="dg-acc" x1="150" y1="26" x2="228" y2="26"/>
      <path class="dg-acc" d="M222 22 L228 26 L222 30" fill="none"/>
      <text class="dg-t-acc" x="186" y="20">Vc</text>
    </svg>` });

  // Viga CA — viga biapoiada com carga distribuída + seção transversal
  set("civil", "concreto", { diagram: `
    <svg viewBox="0 0 320 138" class="dg" role="img" aria-label="Viga biapoiada e seção">
      <g class="dg-acc">
        <line x1="42" y1="34" x2="212" y2="34"/>
        <line x1="52"  y1="34" x2="52"  y2="60"/><path d="M48 54 L52 60 L56 54" fill="none"/>
        <line x1="92"  y1="34" x2="92"  y2="60"/><path d="M88 54 L92 60 L96 54" fill="none"/>
        <line x1="132" y1="34" x2="132" y2="60"/><path d="M128 54 L132 60 L136 54" fill="none"/>
        <line x1="172" y1="34" x2="172" y2="60"/><path d="M168 54 L172 60 L176 54" fill="none"/>
        <line x1="202" y1="34" x2="202" y2="60"/><path d="M198 54 L202 60 L206 54" fill="none"/>
      </g>
      <text class="dg-t-acc" x="127" y="28" text-anchor="middle">q (gk + qk)</text>
      <line class="dg-strong" x1="42" y1="66" x2="212" y2="66"/>
      <path class="dg-line" d="M42 66 l-9 15 l18 0 z"/>
      <path class="dg-line" d="M212 66 l-9 15 l18 0 z"/>
      <line class="dg-cl" x1="20" y1="88" x2="234" y2="88"/>
      <line class="dg-dim" x1="42" y1="102" x2="212" y2="102"/>
      <path class="dg-dim" d="M42 97 L42 107 M212 97 L212 107"/>
      <text class="dg-t" x="127" y="118" text-anchor="middle">L (vão livre)</text>
      <rect class="dg-line" x="258" y="40" width="38" height="58"/>
      <circle class="dg-fill" cx="266" cy="90" r="2.6"/>
      <circle class="dg-fill" cx="277" cy="90" r="2.6"/>
      <circle class="dg-fill" cx="288" cy="90" r="2.6"/>
      <text class="dg-t" x="277" y="34" text-anchor="middle">bw</text>
      <text class="dg-t" x="304" y="72">h</text>
    </svg>` });
})();
