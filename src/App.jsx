import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#ff6b35",
  primaryDark: "#e55a2b",
  secondary: "#ffd700",
  accent: "#ffa726",
  dark: "#1a1a2e",
  darker: "#0f0f1a",
  light: "#f5f5f5",
};

const gradient = "linear-gradient(135deg, #ff6b35 0%, #ffd700 100%)";
const gradientSoft = "linear-gradient(135deg, #ff8f00 0%, #ffa726 100%)";

// ─── DATA ───────────────────────────────────────────────────────────────────

const tecnicas = [
  {
    id: 1,
    icon: "🌬️",
    title: "Respiración 4-7-8",
    desc: "Inhala 4s, retén 7s, exhala 8s. Activa el sistema nervioso parasimpático.",
    categoria: "Respiración",
    duracion: "5 min",
    nivel: "Principiante",
    color: "#ff6b35",
  },
  {
    id: 2,
    icon: "🧘",
    title: "Escaneo Corporal",
    desc: "Recorre mentalmente cada parte de tu cuerpo liberando tensión acumulada.",
    categoria: "Mindfulness",
    duracion: "10 min",
    nivel: "Intermedio",
    color: "#ffa726",
  },
  {
    id: 3,
    icon: "🌊",
    title: "Visualización Guiada",
    desc: "Imagina un lugar tranquilo. Tu mente no distingue lo real de lo imaginado.",
    categoria: "Meditación",
    duracion: "8 min",
    nivel: "Principiante",
    color: "#ffd700",
  },
  {
    id: 4,
    icon: "✍️",
    title: "Diario de Gratitud",
    desc: "Escribe 3 cosas positivas al día. Reentrena tu cerebro hacia el optimismo.",
    categoria: "Hábitos",
    duracion: "3 min",
    nivel: "Principiante",
    color: "#ff6b35",
  },
  {
    id: 5,
    icon: "💪",
    title: "Relajación Muscular",
    desc: "Tensa y suelta grupos musculares. Libera el estrés almacenado físicamente.",
    categoria: "Ejercicio",
    duracion: "12 min",
    nivel: "Intermedio",
    color: "#ffa726",
  },
  {
    id: 6,
    icon: "🎯",
    title: "Técnica 5-4-3-2-1",
    desc: "5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas.",
    categoria: "Ansiedad",
    duracion: "2 min",
    nivel: "Principiante",
    color: "#ffd700",
  },
];

const entrenamientos = [
  {
    semana: 1,
    titulo: "Fundamentos de la Calma",
    subtitulo: "Construye tu base antiestrés",
    dias: [
      { dia: "Lunes", ejercicio: "Respiración diafragmática", duracion: "5 min", completado: true },
      { dia: "Martes", ejercicio: "Caminata consciente", duracion: "15 min", completado: true },
      { dia: "Miércoles", ejercicio: "Meditación guiada", duracion: "8 min", completado: false },
      { dia: "Jueves", ejercicio: "Estiramiento suave", duracion: "10 min", completado: false },
      { dia: "Viernes", ejercicio: "Diario emocional", duracion: "5 min", completado: false },
      { dia: "Sábado", ejercicio: "Baño de naturaleza", duracion: "30 min", completado: false },
      { dia: "Domingo", ejercicio: "Descanso activo", duracion: "Libre", completado: false },
    ],
  },
  {
    semana: 2,
    titulo: "Gestión Emocional",
    subtitulo: "Domina tus respuestas al estrés",
    dias: [
      { dia: "Lunes", ejercicio: "Técnica STOP", duracion: "3 min", completado: false },
      { dia: "Martes", ejercicio: "Yoga restaurativo", duracion: "20 min", completado: false },
      { dia: "Miércoles", ejercicio: "Respiración en caja", duracion: "5 min", completado: false },
      { dia: "Jueves", ejercicio: "Escritura expresiva", duracion: "10 min", completado: false },
      { dia: "Viernes", ejercicio: "Meditación de amor", duracion: "12 min", completado: false },
      { dia: "Sábado", ejercicio: "Actividad creativa", duracion: "45 min", completado: false },
      { dia: "Domingo", ejercicio: "Revisión semanal", duracion: "15 min", completado: false },
    ],
  },
  {
    semana: 3,
    titulo: "Resiliencia Profunda",
    subtitulo: "Fortalece tu mente a largo plazo",
    dias: [
      { dia: "Lunes", ejercicio: "Meditación body scan", duracion: "15 min", completado: false },
      { dia: "Martes", ejercicio: "Ejercicio aeróbico", duracion: "30 min", completado: false },
      { dia: "Miércoles", ejercicio: "Práctica de gratitud", duracion: "5 min", completado: false },
      { dia: "Jueves", ejercicio: "Visualización positiva", duracion: "10 min", completado: false },
      { dia: "Viernes", ejercicio: "Técnica de anclaje", duracion: "5 min", completado: false },
      { dia: "Sábado", ejercicio: "Conexión social", duracion: "60 min", completado: false },
      { dia: "Domingo", ejercicio: "Descanso pleno", duracion: "Libre", completado: false },
    ],
  },
];

const reelsData = [
  {
    id: 1,
    titulo: "Respira y Suelta",
    autor: "Mindfulness Diario",
    likes: 1240,
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    emoji: "🌬️",
    tip: "Inhala por 4 segundos, retén por 4, exhala por 4. Repite 4 veces.",
  },
  {
    id: 2,
    titulo: "Momento Presente",
    autor: "Calma Interior",
    likes: 893,
    bg: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b69 100%)",
    emoji: "🧘",
    tip: "Nota 5 cosas a tu alrededor. Estás aquí, estás bien.",
  },
  {
    id: 3,
    titulo: "Suelta la Tensión",
    autor: "Bienestar Total",
    likes: 2100,
    bg: "linear-gradient(135deg, #1a0a00 0%, #2e1503 50%, #3d1f00 100%)",
    emoji: "💆",
    tip: "Tensa los hombros 5 segundos y suéltalos. Siente la diferencia.",
  },
  {
    id: 4,
    titulo: "Tu Lugar Seguro",
    autor: "Paz Mental",
    likes: 567,
    bg: "linear-gradient(135deg, #0a1a0a 0%, #0f2e0f 50%, #1a3d1a 100%)",
    emoji: "🌿",
    tip: "Cierra los ojos. Imagina tu lugar favorito. Estás ahí ahora.",
  },
];

const flashcards = [
  {
    pregunta: "¿Qué es el cortisol?",
    respuesta: "La hormona del estrés",
    explicacion: "El cortisol es liberado por las glándulas suprarrenales ante situaciones de estrés. Niveles crónicamente altos afectan el sistema inmune y el estado de ánimo.",
  },
  {
    pregunta: "¿Cuántos minutos de meditación diaria son efectivos?",
    respuesta: "Con 10 minutos es suficiente",
    explicacion: "Estudios muestran que 10 minutos diarios de meditación reducen significativamente el estrés y mejoran la concentración en 8 semanas.",
  },
  {
    pregunta: "¿Qué activa la respiración profunda?",
    respuesta: "El nervio vago",
    explicacion: "La respiración diafragmática lenta activa el nervio vago, que conecta el cerebro con los órganos internos y desencadena la respuesta de relajación.",
  },
  {
    pregunta: "¿Qué significa 'mindfulness'?",
    respuesta: "Atención plena al momento presente",
    explicacion: "Mindfulness es la práctica de dirigir la atención al momento presente, sin juzgar. Reduce la rumia mental y la ansiedad anticipatoria.",
  },
  {
    pregunta: "¿Cuál es la duración ideal del sueño?",
    respuesta: "7 a 9 horas para adultos",
    explicacion: "La privación del sueño aumenta el cortisol hasta un 37% y reduce la resiliencia emocional. El sueño es la herramienta antiestrés más potente.",
  },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function SplashScreen({ visible }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition: "opacity 0.6s ease",
        gap: "24px",
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 28,
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "4rem",
          boxShadow: "0 0 60px rgba(255,107,53,0.5), 0 0 120px rgba(255,215,0,0.2)",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        🧘
      </div>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2.2rem",
            letterSpacing: "4px",
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ANTIESTRÉS
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: 4 }}>
          Calma la mente, fortalece el yo
        </p>
      </div>
      <div
        style={{
          width: 48,
          height: 48,
          border: "3px solid transparent",
          borderTopColor: COLORS.primary,
          borderRightColor: COLORS.accent,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}

function BottomNav({ active, setActive }) {
  const items = [
    { id: "inicio", icon: "🏠", label: "Inicio" },
    { id: "tecnicas", icon: "🌬️", label: "Técnicas" },
    { id: "entrenar", icon: "💪", label: "Entrenar" },
    { id: "reels", icon: "▶️", label: "Reels" },
    { id: "flashcards", icon: "🃏", label: "Aprender" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(15,15,26,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0 16px",
        zIndex: 1000,
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: 12,
            transition: "all 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize: "1.4rem",
              filter: active === item.id ? "none" : "grayscale(60%)",
              transform: active === item.id ? "scale(1.15)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            {item.icon}
          </span>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: active === item.id ? 700 : 400,
              color: active === item.id ? COLORS.primary : "rgba(255,255,255,0.4)",
              fontFamily: "'Poppins', sans-serif",
              transition: "color 0.2s",
            }}
          >
            {item.label}
          </span>
          {active === item.id && (
            <div
              style={{
                width: 20,
                height: 3,
                borderRadius: 2,
                background: gradient,
                marginTop: 1,
              }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}

// ─── PÁGINAS ────────────────────────────────────────────────────────────────

function PaginaInicio({ setActive }) {
  const stats = [
    { valor: "12", label: "Técnicas", icon: "🧘" },
    { valor: "3", label: "Semanas", icon: "📅" },
    { valor: "5", label: "Reels", icon: "▶️" },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ padding: "80px 20px 120px", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(255,215,0,0.08) 100%)",
          border: "1px solid rgba(255,107,53,0.2)",
          borderRadius: 24,
          padding: "28px 24px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -20,
            fontSize: "6rem",
            opacity: 0.1,
          }}
        >
          🧘
        </div>
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,107,53,0.2)",
            border: "1px solid rgba(255,107,53,0.4)",
            borderRadius: 20,
            padding: "4px 14px",
            fontSize: "0.7rem",
            color: COLORS.primary,
            fontWeight: 600,
            marginBottom: 12,
            letterSpacing: 1,
          }}
        >
          ✨ PROGRAMA ANTIESTRÉS
        </div>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2.4rem",
            letterSpacing: "2px",
            lineHeight: 1.1,
            marginBottom: 10,
            color: "#fff",
          }}
        >
          CALMA LA MENTE,<br />
          <span
            style={{
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FORTALECE EL YO
          </span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 20 }}>
          Descubre técnicas probadas para reducir el estrés, controlar la ansiedad y cultivar el bienestar emocional.
        </p>
        <button
          onClick={() => setActive("tecnicas")}
          style={{
            background: gradient,
            border: "none",
            borderRadius: 50,
            padding: "12px 28px",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(255,107,53,0.35)",
            transition: "all 0.3s",
          }}
        >
          Comenzar ahora →
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.6rem", marginBottom: 4 }}>{s.icon}</div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.8rem",
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.valor}
            </div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.3rem",
          letterSpacing: "2px",
          color: "#fff",
          marginBottom: 14,
        }}
      >
        ACCESO RÁPIDO
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { id: "entrenar", icon: "💪", title: "Plan de Entrenamiento", sub: "3 semanas · 21 sesiones", color: "#ff6b35" },
          { id: "reels", icon: "▶️", title: "Reels de Bienestar", sub: "Videos cortos de mindfulness", color: "#ffa726" },
          { id: "flashcards", icon: "🃏", title: "Tarjetas de Aprendizaje", sub: "Refuerza tu conocimiento", color: "#ffd700" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === item.id ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered === item.id ? `${item.color}44` : "rgba(255,255,255,0.08)"}`,
              borderRadius: 16,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              transition: "all 0.25s",
              transform: hovered === item.id ? "translateX(4px)" : "none",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${item.color}22`,
                border: `1px solid ${item.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", marginTop: 2 }}>{item.sub}</div>
            </div>
            <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.25)", fontSize: "1.1rem" }}>›</div>
          </button>
        ))}
      </div>

      {/* Footer empresa */}
      <div style={{ textAlign: "center", marginTop: 32, color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>
        Hecho con ❤️ por Soluciones Digitales
      </div>
    </div>
  );
}

function PaginaTecnicas() {
  const [selected, setSelected] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const categorias = ["Todas", "Respiración", "Mindfulness", "Meditación", "Hábitos", "Ejercicio", "Ansiedad"];

  const filtradas =
    categoriaActiva === "Todas" ? tecnicas : tecnicas.filter((t) => t.categoria === categoriaActiva);

  return (
    <div style={{ padding: "80px 20px 120px", minHeight: "100vh" }}>
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.8rem",
          letterSpacing: "3px",
          marginBottom: 4,
          color: "#fff",
        }}
      >
        TÉCNICAS ANTIESTRÉS
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: 20 }}>
        Métodos respaldados por la ciencia
      </p>

      {/* Filtros */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 12,
          marginBottom: 20,
          scrollbarWidth: "none",
        }}
      >
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              background: categoriaActiva === cat ? gradient : "rgba(255,255,255,0.06)",
              border: `1px solid ${categoriaActiva === cat ? "transparent" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 50,
              padding: "6px 16px",
              color: categoriaActiva === cat ? "#fff" : "rgba(255,255,255,0.55)",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.25s",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtradas.map((t) => (
          <div
            key={t.id}
            onClick={() => setSelected(selected === t.id ? null : t.id)}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${selected === t.id ? t.color + "66" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 20,
              padding: "18px",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: selected === t.id ? `0 8px 30px ${t.color}22` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: `${t.color}22`,
                  border: `1px solid ${t.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  flexShrink: 0,
                }}
              >
                {t.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: 3 }}>
                    {t.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      background: `${t.color}22`,
                      color: t.color,
                      border: `1px solid ${t.color}44`,
                      borderRadius: 20,
                      padding: "2px 8px",
                      fontWeight: 600,
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {t.nivel}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                    🕐 {t.duracion}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                    📂 {t.categoria}
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.3)",
                  transform: selected === t.id ? "rotate(90deg)" : "none",
                  transition: "transform 0.3s",
                }}
              >
                ›
              </div>
            </div>

            {selected === t.id && (
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                }}
              >
                {t.desc}
                <button
                  style={{
                    display: "block",
                    marginTop: 14,
                    background: gradient,
                    border: "none",
                    borderRadius: 50,
                    padding: "10px 22px",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Practicar ahora
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ejercicio de respiración interactivo */}
      <RespirationExercise />
    </div>
  );
}

function RespirationExercise() {
  const [phase, setPhase] = useState("idle"); // idle | inhale | hold | exhale
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef(null);

  const phases = {
    inhale: { label: "Inhala", duration: 4, next: "hold", color: "#ff6b35" },
    hold: { label: "Retén", duration: 7, next: "exhale", color: "#ffa726" },
    exhale: { label: "Exhala", duration: 8, next: "inhale", color: "#ffd700" },
  };

  const start = () => {
    setPhase("inhale");
    setCount(4);
    setCycles(0);
  };

  const stop = () => {
    setPhase("idle");
    setCount(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (phase === "idle") return;
    const p = phases[phase];
    setCount(p.duration);
    intervalRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current);
          if (p.next === "inhale") setCycles((cy) => cy + 1);
          setPhase(p.next);
          return p.duration;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const currentPhase = phase !== "idle" ? phases[phase] : null;
  const progress = currentPhase ? ((currentPhase.duration - count) / currentPhase.duration) * 100 : 0;

  return (
    <div
      style={{
        marginTop: 32,
        background: "rgba(255,107,53,0.06)",
        border: "1px solid rgba(255,107,53,0.2)",
        borderRadius: 24,
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.3rem",
          letterSpacing: "2px",
          color: "#fff",
          marginBottom: 6,
        }}
      >
        RESPIRACIÓN 4-7-8
      </h3>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginBottom: 24 }}>
        Ciclos completados: {cycles}
      </p>

      {/* Círculo animado */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          margin: "0 auto 20px",
          background:
            phase === "idle"
              ? "rgba(255,255,255,0.05)"
              : `radial-gradient(circle, ${currentPhase.color}33 0%, transparent 70%)`,
          border: `3px solid ${phase === "idle" ? "rgba(255,255,255,0.1)" : currentPhase.color + "66"}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.5s ease",
          transform: phase === "inhale" ? "scale(1.15)" : phase === "exhale" ? "scale(0.9)" : "scale(1)",
          boxShadow: phase !== "idle" ? `0 0 40px ${currentPhase.color}33` : "none",
        }}
      >
        <span style={{ fontSize: "2.5rem", fontWeight: 800, color: phase === "idle" ? "rgba(255,255,255,0.3)" : currentPhase.color }}>
          {phase === "idle" ? "🌬️" : count}
        </span>
        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
          {phase === "idle" ? "Listo" : currentPhase.label}
        </span>
      </div>

      <button
        onClick={phase === "idle" ? start : stop}
        style={{
          background: phase === "idle" ? gradient : "rgba(255,255,255,0.1)",
          border: phase === "idle" ? "none" : "1px solid rgba(255,255,255,0.2)",
          borderRadius: 50,
          padding: "12px 32px",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.9rem",
          cursor: "pointer",
          fontFamily: "'Poppins', sans-serif",
          transition: "all 0.3s",
        }}
      >
        {phase === "idle" ? "▶ Iniciar Ejercicio" : "⏹ Detener"}
      </button>
    </div>
  );
}

function PaginaEntrenar() {
  const [semanaActiva, setSemanaActiva] = useState(0);
  const [completados, setCompletados] = useState({ "0-0": true, "0-1": true });

  const semana = entrenamientos[semanaActiva];

  const toggleDia = (key) => {
    setCompletados((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completadosSemana = semana.dias.filter((_, i) => completados[`${semanaActiva}-${i}`]).length;
  const porcentaje = Math.round((completadosSemana / semana.dias.length) * 100);

  return (
    <div style={{ padding: "80px 20px 120px", minHeight: "100vh" }}>
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.8rem",
          letterSpacing: "3px",
          marginBottom: 4,
          color: "#fff",
        }}
      >
        PLAN DE ENTRENAMIENTO
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: 20 }}>
        Programa de 3 semanas para la calma
      </p>

      {/* Tabs de semanas */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {entrenamientos.map((s, i) => (
          <button
            key={i}
            onClick={() => setSemanaActiva(i)}
            style={{
              flex: 1,
              background: semanaActiva === i ? gradient : "rgba(255,255,255,0.06)",
              border: `1px solid ${semanaActiva === i ? "transparent" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 12,
              padding: "10px 6px",
              color: semanaActiva === i ? "#fff" : "rgba(255,255,255,0.45)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              transition: "all 0.25s",
            }}
          >
            Sem {i + 1}
          </button>
        ))}
      </div>

      {/* Info semana */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255,107,53,0.12) 0%, rgba(255,167,38,0.08) 100%)",
          border: "1px solid rgba(255,107,53,0.2)",
          borderRadius: 20,
          padding: "20px",
          marginBottom: 20,
        }}
      >
        <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>{semana.titulo}</h3>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", marginBottom: 14 }}>
          {semana.subtitulo}
        </p>

        {/* Progreso */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>Progreso semanal</span>
          <span style={{ color: COLORS.primary, fontSize: "0.75rem", fontWeight: 700 }}>
            {completadosSemana}/{semana.dias.length} días · {porcentaje}%
          </span>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 50,
            height: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${porcentaje}%`,
              height: "100%",
              background: gradient,
              borderRadius: 50,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Lista de días */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {semana.dias.map((dia, i) => {
          const key = `${semanaActiva}-${i}`;
          const done = !!completados[key];
          return (
            <div
              key={i}
              onClick={() => toggleDia(key)}
              style={{
                background: done ? "rgba(255,107,53,0.08)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${done ? "rgba(255,107,53,0.3)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 16,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: done ? gradient : "rgba(255,255,255,0.06)",
                  border: `2px solid ${done ? "transparent" : "rgba(255,255,255,0.15)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: done ? "1rem" : "0.75rem",
                  color: done ? "#fff" : "rgba(255,255,255,0.3)",
                  fontWeight: 700,
                  flexShrink: 0,
                  transition: "all 0.25s",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: done ? "rgba(255,255,255,0.5)" : "#fff", fontSize: "0.88rem", fontWeight: 600, textDecoration: done ? "line-through" : "none" }}>
                  {dia.ejercicio}
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", marginTop: 2 }}>
                  {dia.dia} · {dia.duracion}
                </div>
              </div>
              <span style={{ fontSize: "0.65rem", color: done ? COLORS.primary : "rgba(255,255,255,0.25)", fontWeight: 600 }}>
                {done ? "✅ Hecho" : "Pendiente"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PaginaReels() {
  const [likedReels, setLikedReels] = useState({});
  const [currentReel, setCurrentReel] = useState(0);

  const toggleLike = (id) => {
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "#000",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
        scrollbarWidth: "none",
        zIndex: 1,
      }}
    >
      {reelsData.map((reel, idx) => (
        <div
          key={reel.id}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            background: reel.bg,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Fondo decorativo */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "12rem",
              opacity: 0.06,
              filter: "blur(2px)",
            }}
          >
            {reel.emoji}
          </div>

          {/* Contenido central */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              padding: "0 32px",
              maxWidth: 380,
            }}
          >
            <div style={{ fontSize: "5rem", marginBottom: 20, filter: "drop-shadow(0 0 30px rgba(255,107,53,0.5))" }}>
              {reel.emoji}
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.2rem",
                letterSpacing: "3px",
                color: "#fff",
                marginBottom: 16,
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              {reel.titulo}
            </h2>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 16,
                padding: "16px 20px",
                marginBottom: 20,
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                💡 {reel.tip}
              </p>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>por {reel.autor}</p>
          </div>

          {/* Acciones laterales */}
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 100,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              zIndex: 10,
            }}
          >
            <button
              onClick={() => toggleLike(reel.id)}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: likedReels[reel.id] ? "rgba(255,107,53,0.8)" : "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                transition: "all 0.3s",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>{likedReels[reel.id] ? "❤️" : "🤍"}</span>
              <span style={{ fontSize: "0.55rem", color: "#fff", fontWeight: 700 }}>
                {reel.likes + (likedReels[reel.id] ? 1 : 0)}
              </span>
            </button>
            <button
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
              }}
            >
              🔖
            </button>
          </div>

          {/* Indicador de scroll */}
          {idx < reelsData.length - 1 && (
            <div
              style={{
                position: "absolute",
                bottom: 90,
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.7rem",
                animation: "bounce 2s infinite",
              }}
            >
              ↓ Desliza
            </div>
          )}

          {/* Número de reel */}
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 16,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.6)",
              zIndex: 10,
            }}
          >
            {idx + 1}/{reelsData.length}
          </div>
        </div>
      ))}
    </div>
  );
}

function PaginaFlashcards() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  const card = flashcards[currentIdx];

  const responder = (correcto) => {
    const nuevos = [...resultados, correcto];
    setResultados(nuevos);

    if (currentIdx + 1 >= flashcards.length) {
      setFinalizado(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setFlipped(false);
    }
  };

  const reiniciar = () => {
    setCurrentIdx(0);
    setFlipped(false);
    setResultados([]);
    setFinalizado(false);
  };

  const correctas = resultados.filter(Boolean).length;

  if (finalizado) {
    return (
      <div
        style={{
          padding: "80px 20px 120px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>
          {correctas >= 4 ? "🏆" : correctas >= 2 ? "⭐" : "💪"}
        </div>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2rem",
            letterSpacing: "3px",
            color: "#fff",
            marginBottom: 8,
          }}
        >
          SESIÓN COMPLETADA
        </h2>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "4rem",
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "8px 0",
          }}
        >
          {correctas}/{flashcards.length}
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginBottom: 28 }}>
          {correctas >= 4 ? "¡Excelente! Dominas estos conceptos." : correctas >= 2 ? "¡Bien! Sigue practicando." : "¡Continúa aprendiendo, lo lograrás!"}
        </p>
        <button
          onClick={reiniciar}
          style={{
            background: gradient,
            border: "none",
            borderRadius: 50,
            padding: "14px 36px",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 8px 25px rgba(255,107,53,0.35)",
          }}
        >
          🔄 Repetir Sesión
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "80px 20px 120px", minHeight: "100vh" }}>
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.8rem",
          letterSpacing: "3px",
          marginBottom: 4,
          color: "#fff",
        }}
      >
        TARJETAS DE APRENDIZAJE
      </h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: 20 }}>
        Toca la tarjeta para revelar la respuesta
      </p>

      {/* Progreso */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
          Tarjeta {currentIdx + 1} de {flashcards.length}
        </span>
        <span style={{ color: COLORS.primary, fontSize: "0.75rem", fontWeight: 700 }}>
          ✅ {resultados.filter(Boolean).length} correctas
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 50, height: 6, marginBottom: 24 }}>
        <div
          style={{
            width: `${((currentIdx) / flashcards.length) * 100}%`,
            height: "100%",
            background: gradient,
            borderRadius: 50,
            transition: "width 0.4s",
          }}
        />
      </div>

      {/* Tarjeta */}
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          minHeight: 280,
          borderRadius: 24,
          padding: "32px 24px",
          cursor: "pointer",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: flipped
            ? "linear-gradient(135deg, rgba(255,167,38,0.15) 0%, rgba(255,107,53,0.1) 100%)"
            : "linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(26,26,46,0.8) 100%)",
          border: `1px solid ${flipped ? "rgba(255,167,38,0.35)" : "rgba(255,107,53,0.2)"}`,
          transition: "all 0.4s ease",
          boxShadow: flipped ? "0 12px 40px rgba(255,167,38,0.15)" : "0 8px 30px rgba(255,107,53,0.1)",
        }}
      >
        <div style={{ position: "absolute", top: 12, right: 14, fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>
          {flipped ? "✨ RESPUESTA" : "❓ PREGUNTA"}
        </div>

        {!flipped ? (
          <>
            <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🤔</div>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.5 }}>
              {card.pregunta}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 16 }}>
              Toca para ver la respuesta
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>💡</div>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.6rem",
                letterSpacing: "1px",
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 14,
              }}
            >
              {card.respuesta}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.6 }}>
              {card.explicacion}
            </p>
          </>
        )}
      </div>

      {/* Botones de respuesta */}
      {flipped && (
        <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
          <button
            onClick={() => responder(false)}
            style={{
              flex: 1,
              background: "rgba(244,67,54,0.15)",
              border: "1px solid rgba(244,67,54,0.35)",
              borderRadius: 16,
              padding: "14px",
              color: "#f44336",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              transition: "all 0.2s",
            }}
          >
            😕 No lo sabía
          </button>
          <button
            onClick={() => responder(true)}
            style={{
              flex: 1,
              background: "rgba(76,175,80,0.15)",
              border: "1px solid rgba(76,175,80,0.35)",
              borderRadius: 16,
              padding: "14px",
              color: "#4caf50",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              transition: "all 0.2s",
            }}
          >
            😊 ¡Lo sabía!
          </button>
        </div>
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ───────────────────────────────────────────────────────────

export default function App() {
  const [splash, setSplash] = useState(true);
  const [activePage, setActivePage] = useState("inicio");

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleSetActive = (page) => {
    setActivePage(page);
    if (page !== "reels") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {/* Estilos globales */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: #0f0f1a;
          color: #f5f5f5;
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        
        ::-webkit-scrollbar { display: none; }
        scrollbar-width: none;
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(3deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>

      {/* Splash */}
      <SplashScreen visible={splash} />

      {/* Header — oculto en reels */}
      {activePage !== "reels" && (
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            background: "rgba(15,15,26,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "10px 20px",
            zIndex: 1000,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "linear-gradient(135deg, #ff6b35, #ffd700)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
              }}
            >
              🧘
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "2px",
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                }}
              >
                ANTIESTRÉS
              </div>
              <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.5px" }}>
                por Soluciones Digitales
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                background: "rgba(255,107,53,0.15)",
                border: "1px solid rgba(255,107,53,0.3)",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: "0.7rem",
                color: COLORS.primary,
                fontWeight: 600,
              }}
            >
              ✨ Premium
            </div>
          </div>
        </header>
      )}

      {/* Contenido de páginas */}
      <main style={{ animation: "fadeIn 0.4s ease" }}>
        {activePage === "inicio" && <PaginaInicio setActive={handleSetActive} />}
        {activePage === "tecnicas" && <PaginaTecnicas />}
        {activePage === "entrenar" && <PaginaEntrenar />}
        {activePage === "reels" && <PaginaReels />}
        {activePage === "flashcards" && <PaginaFlashcards />}
      </main>

      {/* Bottom Nav */}
      <BottomNav active={activePage} setActive={handleSetActive} />
    </>
  );
}