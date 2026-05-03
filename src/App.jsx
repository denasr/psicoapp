import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#0F4C75",
  primaryLight: "#1B6CA8",
  secondary: "#3282B8",
  accent: "#BBE1FA",
  accentSoft: "#E8F4FD",
  bg: "#F7FAFC",
  card: "#FFFFFF",
  text: "#1A202C",
  textMuted: "#718096",
  textLight: "#A0AEC0",
  success: "#38A169",
  successBg: "#F0FFF4",
  warning: "#DD6B20",
  warningBg: "#FFFAF0",
  danger: "#E53E3E",
  dangerBg: "#FFF5F5",
  border: "#E2E8F0",
  tabBg: "#FFFFFF",
  shadow: "0 -2px 10px rgba(0,0,0,0.06)",
};

const FONTS = {
  display: "'Segoe UI', system-ui, sans-serif",
  body: "'Segoe UI', system-ui, sans-serif",
};

const modules = [
  {
    id: 1, name: "Fundamentos de la Psicología", progress: 100, status: "completado",
    icon: "🧠",
    topics: [
      { id: 1, name: "Definición y objeto de estudio", completed: true, resources: [
        { type: "pdf", name: "¿Qué es la psicología?", detail: "PDF · 12 páginas", done: true },
        { type: "video", name: "Orígenes de la psicología", detail: "Video · 8:32", done: true },
        { type: "slides", name: "Presentación: Objeto de estudio", detail: "18 diapositivas", done: true },
        { type: "guide", name: "Guía de estudio: Tema 1.1", detail: "Preguntas guía", done: true },
      ]},
      { id: 2, name: "Historia de la psicología", completed: true, resources: [
        { type: "pdf", name: "Línea del tiempo: escuelas psicológicas", detail: "PDF · 15 páginas", done: true },
        { type: "video", name: "De Wundt a la actualidad", detail: "Video · 10:15", done: true },
        { type: "slides", name: "Grandes figuras de la psicología", detail: "22 diapositivas", done: true },
        { type: "guide", name: "Mapa conceptual: corrientes", detail: "Actividad interactiva", done: true },
      ]},
      { id: 3, name: "Métodos de investigación", completed: true, resources: [
        { type: "pdf", name: "Métodos cualitativos y cuantitativos", detail: "PDF · 10 páginas", done: true },
        { type: "video", name: "El método científico en psicología", detail: "Video · 7:48", done: true },
        { type: "slides", name: "Diseños de investigación", detail: "14 diapositivas", done: true },
        { type: "guide", name: "Guía: Análisis de caso", detail: "Ejercicio práctico", done: true },
      ]},
    ],
  },
  {
    id: 2, name: "Bases Biológicas de la Conducta", progress: 45, status: "en_curso",
    icon: "🔬",
    topics: [
      { id: 4, name: "Sistema nervioso", completed: true, resources: [
        { type: "pdf", name: "El sistema nervioso central y periférico", detail: "PDF · 14 páginas", done: true },
        { type: "video", name: "Anatomía del sistema nervioso", detail: "Video · 9:10", done: true },
        { type: "slides", name: "Presentación: SNC y SNP", detail: "20 diapositivas", done: true },
        { type: "guide", name: "Guía de estudio: Tema 2.1", detail: "Preguntas guía", done: true },
      ]},
      { id: 5, name: "Neurona y sinapsis", completed: false, resources: [
        { type: "pdf", name: "La neurona: estructura y función", detail: "PDF · 11 páginas", done: true },
        { type: "video", name: "Sinapsis y neurotransmisores", detail: "Video · 8:32", done: false },
        { type: "slides", name: "Comunicación neuronal", detail: "16 diapositivas", done: false },
        { type: "guide", name: "Glosario: neurotransmisores", detail: "Términos clave", done: false },
      ]},
      { id: 6, name: "Cerebro y funciones cognitivas", completed: false, resources: [
        { type: "pdf", name: "Lóbulos cerebrales y sus funciones", detail: "PDF · 13 páginas", done: false },
        { type: "video", name: "El cerebro en acción", detail: "Video · 11:05", done: false },
        { type: "slides", name: "Mapeo cerebral", detail: "19 diapositivas", done: false },
        { type: "guide", name: "Actividad: Funciones cognitivas", detail: "Ejercicio práctico", done: false },
      ]},
    ],
  },
  {
    id: 3, name: "Procesos Psicológicos Básicos", progress: 0, status: "bloqueado",
    icon: "⚡",
    topics: [
      { id: 7, name: "Percepción y atención", completed: false, resources: [] },
      { id: 8, name: "Memoria y aprendizaje", completed: false, resources: [] },
      { id: 9, name: "Motivación y emoción", completed: false, resources: [] },
    ],
  },
  {
    id: 4, name: "Desarrollo y Personalidad", progress: 0, status: "bloqueado",
    icon: "🌱",
    topics: [
      { id: 10, name: "Desarrollo humano (Erikson)", completed: false, resources: [] },
      { id: 11, name: "Teorías de la personalidad", completed: false, resources: [] },
      { id: 12, name: "Psicología y educación", completed: false, resources: [] },
    ],
  },
];

const tasks = [
  { id: 1, title: "Ensayo: Métodos de Investigación", module: 1, moduleName: "Módulo 1", dueDate: "30 abr 2026", daysLeft: 0, value: 15, status: "urgente",
    instructions: "Elaborar un ensayo de 1000-1500 palabras que compare al menos dos métodos de investigación en psicología. Debe incluir introducción, desarrollo argumentativo con referencias a los autores vistos en clase, y conclusiones personales.",
    rubric: [
      { criterio: "Argumentación", exc: 40, bien: 30, suf: 20 },
      { criterio: "Estructura", exc: 30, bien: 20, suf: 15 },
      { criterio: "Redacción y formato", exc: 30, bien: 20, suf: 15 },
    ]},
  { id: 2, title: "Mapa conceptual: Neurociencia", module: 2, moduleName: "Módulo 2", dueDate: "8 may 2026", daysLeft: 8, value: 10, status: "proxima",
    instructions: "Diseñar un mapa conceptual que represente las relaciones entre los componentes del sistema nervioso, los tipos de neuronas y los principales neurotransmisores. Formato libre (digital o escaneado).",
    rubric: [
      { criterio: "Contenido completo", exc: 40, bien: 30, suf: 20 },
      { criterio: "Relaciones correctas", exc: 35, bien: 25, suf: 15 },
      { criterio: "Presentación visual", exc: 25, bien: 20, suf: 15 },
    ]},
  { id: 3, title: "Cuestionario: Bases biológicas", module: 2, moduleName: "Módulo 2", dueDate: "15 may 2026", daysLeft: 15, value: 10, status: "proxima",
    instructions: "Cuestionario de 20 preguntas (opción múltiple y abiertas) sobre los temas del Módulo 2. Se abre el 12 de mayo y cierra el 15 de mayo a las 23:59.",
    rubric: [] },
  { id: 4, title: "Reflexión: Corrientes psicológicas", module: 1, moduleName: "Módulo 1", dueDate: "20 abr 2026", daysLeft: -10, value: 5, status: "calificada", grade: 92,
    feedback: "Excelente reflexión. Demuestras comprensión profunda de las diferencias entre conductismo y cognitivismo. La conexión con tu experiencia personal como estudiante de pedagogía es muy pertinente. Área de mejora: profundizar más en las implicaciones educativas.",
    instructions: "Redactar un texto de 500 palabras reflexionando sobre cuál corriente psicológica te parece más relevante para la educación y por qué.",
    rubric: [] },
];

const announcements = [
  { id: 1, title: "Sesión presencial el viernes", date: "28 abr", body: "Recuerden que la clase del viernes 2 de mayo será presencial en el Aula 204. Traigan sus apuntes del Módulo 2." },
  { id: 2, title: "Nuevo material: Video Sinapsis", date: "25 abr", body: "Se ha subido un nuevo video explicativo sobre sinapsis y neurotransmisores al Tema 2.2." },
  { id: 3, title: "Cambio de fecha: Cuestionario", date: "22 abr", body: "El cuestionario del Módulo 2 se recorre al 15 de mayo para darles más tiempo de preparación." },
];

const resourceIcons = { pdf: "📖", video: "🎬", slides: "📊", guide: "📝" };

// --- COMPONENTS ---

function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 20px", fontSize: 11, color: "#1A202C", fontWeight: 600, fontFamily: FONTS.body }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 10 }}>📶</span>
        <span style={{ fontSize: 10 }}>🔋</span>
      </div>
    </div>
  );
}

function BottomNav({ active, onNav }) {
  const tabs = [
    { id: "home", label: "Inicio", icon: "🏠" },
    { id: "content", label: "Contenidos", icon: "📚" },
    { id: "tasks", label: "Tareas", icon: "✅" },
    { id: "profile", label: "Perfil", icon: "👤" },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", alignItems: "center",
      background: COLORS.tabBg, borderTop: `1px solid ${COLORS.border}`,
      padding: "6px 0 10px", boxShadow: COLORS.shadow,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          padding: "4px 12px", borderRadius: 8,
          transition: "all 0.2s",
        }}>
          <span style={{ fontSize: 18, filter: active === t.id ? "none" : "grayscale(0.5)", opacity: active === t.id ? 1 : 0.5 }}>{t.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: active === t.id ? 700 : 500,
            color: active === t.id ? COLORS.primary : COLORS.textMuted,
            fontFamily: FONTS.body,
          }}>{t.label}</span>
          {active === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.primary, marginTop: 1 }} />}
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ value, height = 6, color = COLORS.success, bg = "#E2E8F0" }) {
  return (
    <div style={{ width: "100%", height, borderRadius: height, background: bg, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min(value, 100)}%`, height: "100%", borderRadius: height,
        background: value >= 100 ? COLORS.success : value > 0 ? COLORS.secondary : "transparent",
        transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

function TopBar({ title, onBack, rightAction }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", background: COLORS.primary,
      color: "white", fontFamily: FONTS.display,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: 18, padding: "2px 4px" }}>
            ←
          </button>
        )}
        <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3 }}>{title}</span>
      </div>
      {rightAction}
    </div>
  );
}

function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: COLORS.card, borderRadius: 14, padding: 16,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.15s, box-shadow 0.15s",
      ...style,
    }}
    onMouseEnter={e => { if (onClick) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}}
    onMouseLeave={e => { if (onClick) { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)"; }}}
    >
      {children}
    </div>
  );
}

// --- SCREENS ---

function DashboardScreen({ onNav, setScreen }) {
  const totalProgress = 36;
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      {/* Header gradient */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
        padding: "20px 16px 28px", borderRadius: "0 0 24px 24px",
        color: "white",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, fontFamily: FONTS.body }}>Bienvenido/a</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: FONTS.display, letterSpacing: -0.5 }}>PsicoApp</div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            cursor: "pointer",
          }} onClick={() => setScreen({ type: "announcements" })}>
            🔔
          </div>
        </div>
        {/* Progress card */}
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 14, backdropFilter: "blur(10px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, fontFamily: FONTS.body }}>MI PROGRESO GENERAL</span>
            <span style={{ fontSize: 20, fontWeight: 800, fontFamily: FONTS.display }}>{totalProgress}%</span>
          </div>
          <ProgressBar value={totalProgress} height={8} color="rgba(255,255,255,0.9)" bg="rgba(255,255,255,0.2)" />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {modules.map(m => (
              <div key={m.id} style={{
                flex: 1, textAlign: "center", fontSize: 10, fontFamily: FONTS.body,
                padding: "6px 0", borderRadius: 8,
                background: m.status === "completado" ? "rgba(56,161,105,0.3)" : m.status === "en_curso" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
              }}>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{m.icon}</div>
                <div style={{ fontWeight: 600 }}>Mód. {m.id}</div>
                <div style={{ fontSize: 9, opacity: 0.8 }}>
                  {m.status === "completado" ? "✓" : m.status === "en_curso" ? `${m.progress}%` : "🔒"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Upcoming tasks */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 8, fontFamily: FONTS.display, letterSpacing: 0.5, textTransform: "uppercase" }}>
            Próximas entregas
          </div>
          {tasks.filter(t => t.status !== "calificada").slice(0, 3).map(t => (
            <Card key={t.id} onClick={() => setScreen({ type: "taskDetail", task: t })} style={{ marginBottom: 8, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: t.status === "urgente" ? COLORS.dangerBg : COLORS.warningBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>
                  {t.status === "urgente" ? "⚠️" : "📋"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, fontFamily: FONTS.body, lineHeight: 1.3 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>
                    {t.moduleName} · Valor: {t.value}%
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, fontFamily: FONTS.body,
                    color: t.status === "urgente" ? COLORS.danger : COLORS.warning,
                  }}>
                    {t.daysLeft === 0 ? "¡Hoy!" : `${t.daysLeft} días`}
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.textLight }}>{t.dueDate}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Announcements preview */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, fontFamily: FONTS.display, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Avisos recientes
            </div>
            <button onClick={() => setScreen({ type: "announcements" })} style={{
              background: "none", border: "none", color: COLORS.secondary, fontSize: 12,
              fontWeight: 600, cursor: "pointer", fontFamily: FONTS.body,
            }}>Ver todos →</button>
          </div>
          {announcements.slice(0, 2).map(a => (
            <Card key={a.id} style={{ marginBottom: 8, padding: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, marginTop: 1 }}>📢</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, fontFamily: FONTS.body }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>{a.date}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Continue studying */}
        <Card onClick={() => { onNav("content"); setScreen({ type: "moduleDetail", module: modules[1] }); }} style={{
          background: `linear-gradient(135deg, ${COLORS.accentSoft} 0%, #fff 100%)`,
          border: `1px solid ${COLORS.accent}`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.secondary, marginBottom: 6, fontFamily: FONTS.display, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Continuar estudiando
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, fontFamily: FONTS.body }}>
            {modules[1].icon} {modules[1].name}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4, fontFamily: FONTS.body }}>
            Tema actual: Neurona y sinapsis
          </div>
          <div style={{ marginTop: 8 }}>
            <ProgressBar value={45} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function ContentScreen({ setScreen }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      <TopBar title="Contenidos del Curso" />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {modules.map(m => (
          <Card
            key={m.id}
            onClick={m.status !== "bloqueado" ? () => setScreen({ type: "moduleDetail", module: m }) : undefined}
            style={{
              opacity: m.status === "bloqueado" ? 0.55 : 1,
              borderLeft: `4px solid ${m.status === "completado" ? COLORS.success : m.status === "en_curso" ? COLORS.secondary : COLORS.textLight}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.textMuted, fontFamily: FONTS.body, textTransform: "uppercase", letterSpacing: 0.8 }}>Módulo {m.id}</span>
                  {m.status === "completado" && <span style={{ fontSize: 10, background: COLORS.successBg, color: COLORS.success, padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>✓ Completado</span>}
                  {m.status === "en_curso" && <span style={{ fontSize: 10, background: COLORS.accentSoft, color: COLORS.secondary, padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>▶ En curso</span>}
                  {m.status === "bloqueado" && <span style={{ fontSize: 10, background: "#F7FAFC", color: COLORS.textLight, padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>🔒 Bloqueado</span>}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, fontFamily: FONTS.display, marginBottom: 4 }}>
                  {m.icon} {m.name}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body }}>
                  {m.topics.length} temas · {m.topics.reduce((a, t) => a + t.resources.length, 0)} recursos
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: m.progress >= 100 ? COLORS.success : COLORS.secondary, fontFamily: FONTS.display }}>
                {m.progress}%
              </div>
            </div>
            {m.status !== "bloqueado" && (
              <div style={{ marginTop: 10 }}>
                <ProgressBar value={m.progress} />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function ModuleDetailScreen({ module, setScreen }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      <TopBar title={`Módulo ${module.id}`} onBack={() => setScreen(null)} />
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
        padding: "16px 16px 20px", color: "white",
      }}>
        <div style={{ fontSize: 28, marginBottom: 4 }}>{module.icon}</div>
        <div style={{ fontSize: 17, fontWeight: 800, fontFamily: FONTS.display, marginBottom: 4 }}>{module.name}</div>
        <div style={{ fontSize: 12, opacity: 0.8, fontFamily: FONTS.body, marginBottom: 10 }}>
          {module.topics.length} temas · {module.topics.reduce((a, t) => a + t.resources.length, 0)} recursos
        </div>
        <ProgressBar value={module.progress} height={6} color="rgba(255,255,255,0.9)" bg="rgba(255,255,255,0.2)" />
        <div style={{ fontSize: 11, textAlign: "right", marginTop: 4, opacity: 0.8, fontFamily: FONTS.body }}>{module.progress}% completado</div>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: FONTS.display }}>Temas</div>
        {module.topics.map((t, i) => (
          <Card key={t.id} onClick={t.resources.length > 0 ? () => setScreen({ type: "topicDetail", topic: t, module }) : undefined}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: t.completed ? COLORS.successBg : COLORS.accentSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: t.completed ? COLORS.success : COLORS.secondary,
                fontFamily: FONTS.display,
                border: `2px solid ${t.completed ? COLORS.success : COLORS.secondary}`,
              }}>
                {t.completed ? "✓" : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: FONTS.body }}>{t.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>
                  {t.resources.length} recursos · {t.resources.filter(r => r.done).length} completados
                </div>
              </div>
              <span style={{ color: COLORS.textLight, fontSize: 16 }}>›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TopicDetailScreen({ topic, module, setScreen }) {
  const [resourceState, setResourceState] = useState(topic.resources.map(r => r.done));
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      <TopBar title={topic.name} onBack={() => setScreen({ type: "moduleDetail", module })} />
      <div style={{ padding: "8px 16px 4px" }}>
        <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body }}>Módulo {module.id} · Tema</div>
      </div>
      <div style={{ padding: "4px 16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {topic.resources.map((r, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{resourceIcons[r.type]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, fontFamily: FONTS.body }}>{r.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>{r.detail}</div>
              </div>
              <button onClick={() => {
                const next = [...resourceState];
                next[i] = !next[i];
                setResourceState(next);
              }} style={{
                width: 28, height: 28, borderRadius: "50%", border: `2px solid ${resourceState[i] ? COLORS.success : COLORS.border}`,
                background: resourceState[i] ? COLORS.success : "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "white", fontSize: 14, fontWeight: 700,
                transition: "all 0.2s",
              }}>
                {resourceState[i] ? "✓" : ""}
              </button>
            </div>
            {/* Simulated content preview */}
            {r.type === "video" && (
              <div style={{
                marginTop: 10, background: "#1A202C", borderRadius: 10, height: 120,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ fontSize: 36, opacity: 0.9, cursor: "pointer" }}>▶</div>
                <div style={{
                  position: "absolute", bottom: 8, right: 10, fontSize: 10,
                  background: "rgba(0,0,0,0.7)", color: "white", padding: "2px 8px", borderRadius: 4,
                  fontFamily: FONTS.body,
                }}>
                  {r.detail.split("· ")[1]}
                </div>
              </div>
            )}
            {r.type === "pdf" && (
              <div style={{
                marginTop: 10, display: "flex", gap: 8,
              }}>
                <button style={{
                  flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${COLORS.secondary}`,
                  background: "white", color: COLORS.secondary, fontSize: 12, fontWeight: 600,
                  cursor: "pointer", fontFamily: FONTS.body,
                }}>
                  📖 Abrir
                </button>
                <button style={{
                  flex: 1, padding: "8px 0", borderRadius: 8, border: "none",
                  background: COLORS.accentSoft, color: COLORS.secondary, fontSize: 12, fontWeight: 600,
                  cursor: "pointer", fontFamily: FONTS.body,
                }}>
                  ⬇ Descargar
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function TasksScreen({ setScreen }) {
  const [filter, setFilter] = useState("pendientes");
  const filtered = filter === "pendientes" ? tasks.filter(t => t.status !== "calificada") :
    filter === "entregadas" ? tasks.filter(t => t.status === "calificada") : tasks;
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      <TopBar title="Mis Tareas" />
      <div style={{ display: "flex", gap: 6, padding: "12px 16px 8px" }}>
        {["pendientes", "entregadas", "todas"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "6px 14px", borderRadius: 20, border: "none",
            background: filter === f ? COLORS.primary : COLORS.card,
            color: filter === f ? "white" : COLORS.textMuted,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONTS.body,
            boxShadow: filter === f ? "none" : `0 0 0 1px ${COLORS.border}`,
            textTransform: "capitalize",
          }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ padding: "8px 16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: COLORS.textMuted, fontSize: 13, fontFamily: FONTS.body }}>
            No hay tareas en esta categoría
          </div>
        )}
        {filtered.map(t => (
          <Card key={t.id} onClick={() => setScreen({ type: "taskDetail", task: t })} style={{
            borderLeft: `4px solid ${t.status === "urgente" ? COLORS.danger : t.status === "calificada" ? COLORS.success : COLORS.warning}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, fontFamily: FONTS.body, lineHeight: 1.3 }}>{t.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 4 }}>
                  {t.moduleName} · Valor: {t.value}%
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>
                  Vence: {t.dueDate}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                {t.status === "urgente" && (
                  <span style={{ fontSize: 10, background: COLORS.dangerBg, color: COLORS.danger, padding: "3px 8px", borderRadius: 10, fontWeight: 700 }}>⚠ Urgente</span>
                )}
                {t.status === "proxima" && (
                  <span style={{ fontSize: 10, background: COLORS.warningBg, color: COLORS.warning, padding: "3px 8px", borderRadius: 10, fontWeight: 700 }}>{t.daysLeft} días</span>
                )}
                {t.status === "calificada" && (
                  <div>
                    <span style={{ fontSize: 10, background: COLORS.successBg, color: COLORS.success, padding: "3px 8px", borderRadius: 10, fontWeight: 700 }}>✓ Calificada</span>
                    <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.success, marginTop: 4, fontFamily: FONTS.display }}>{t.grade}</div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TaskDetailScreen({ task, setScreen }) {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(task.status === "calificada");
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      <TopBar title="Detalle de Tarea" onBack={() => setScreen(null)} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.text, fontFamily: FONTS.display }}>{task.title}</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 4 }}>
            {task.moduleName} · Valor: {task.value}% · Vence: {task.dueDate}
          </div>
          {task.status !== "calificada" && task.daysLeft >= 0 && (
            <div style={{
              marginTop: 8, padding: "8px 12px", borderRadius: 10,
              background: task.daysLeft <= 2 ? COLORS.dangerBg : COLORS.warningBg,
              fontSize: 12, fontWeight: 700,
              color: task.daysLeft <= 2 ? COLORS.danger : COLORS.warning,
              fontFamily: FONTS.body, textAlign: "center",
            }}>
              {task.daysLeft === 0 ? "⚠ ¡La entrega vence hoy!" : `Quedan ${task.daysLeft} días para la entrega`}
            </div>
          )}
        </div>

        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 8, fontFamily: FONTS.display, textTransform: "uppercase", letterSpacing: 0.5 }}>Instrucciones</div>
          <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontFamily: FONTS.body }}>{task.instructions}</div>
        </Card>

        {task.rubric.length > 0 && (
          <Card>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 10, fontFamily: FONTS.display, textTransform: "uppercase", letterSpacing: 0.5 }}>Rúbrica de evaluación</div>
            <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", background: COLORS.primary, color: "white", fontSize: 10, fontWeight: 700, fontFamily: FONTS.body }}>
                <div style={{ flex: 2, padding: "8px 10px" }}>Criterio</div>
                <div style={{ flex: 1, padding: "8px 6px", textAlign: "center" }}>Exc.</div>
                <div style={{ flex: 1, padding: "8px 6px", textAlign: "center" }}>Bien</div>
                <div style={{ flex: 1, padding: "8px 6px", textAlign: "center" }}>Suf.</div>
              </div>
              {task.rubric.map((r, i) => (
                <div key={i} style={{ display: "flex", fontSize: 12, fontFamily: FONTS.body, background: i % 2 === 0 ? COLORS.accentSoft : "white" }}>
                  <div style={{ flex: 2, padding: "8px 10px", fontWeight: 600, color: COLORS.text }}>{r.criterio}</div>
                  <div style={{ flex: 1, padding: "8px 6px", textAlign: "center", color: COLORS.success, fontWeight: 700 }}>{r.exc}</div>
                  <div style={{ flex: 1, padding: "8px 6px", textAlign: "center", color: COLORS.secondary, fontWeight: 600 }}>{r.bien}</div>
                  <div style={{ flex: 1, padding: "8px 6px", textAlign: "center", color: COLORS.textMuted }}>{r.suf}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {task.status === "calificada" ? (
          <Card style={{ borderLeft: `4px solid ${COLORS.success}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.success, fontFamily: FONTS.display, textTransform: "uppercase", letterSpacing: 0.5 }}>Calificación</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.success, fontFamily: FONTS.display }}>{task.grade}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 6, fontFamily: FONTS.display }}>Retroalimentación del docente:</div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontFamily: FONTS.body }}>{task.feedback}</div>
          </Card>
        ) : (
          <Card>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 10, fontFamily: FONTS.display, textTransform: "uppercase", letterSpacing: 0.5 }}>Entregar actividad</div>
            {!submitted ? (
              <>
                <button onClick={() => setFile("Mi_Ensayo_Metodos.pdf")} style={{
                  width: "100%", padding: 16, borderRadius: 12,
                  border: `2px dashed ${file ? COLORS.success : COLORS.border}`,
                  background: file ? COLORS.successBg : "white",
                  cursor: "pointer", textAlign: "center", marginBottom: 12,
                  transition: "all 0.2s",
                }}>
                  {file ? (
                    <div>
                      <span style={{ fontSize: 22 }}>📄</span>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.success, marginTop: 4, fontFamily: FONTS.body }}>{file}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Toca para cambiar archivo</div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: 22 }}>📎</span>
                      <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4, fontFamily: FONTS.body }}>Adjuntar archivo (PDF / DOCX)</div>
                    </div>
                  )}
                </button>
                <button onClick={() => { if (file) setSubmitted(true); }} style={{
                  width: "100%", padding: 14, borderRadius: 12, border: "none",
                  background: file ? COLORS.primary : COLORS.border,
                  color: file ? "white" : COLORS.textMuted,
                  fontSize: 14, fontWeight: 700, cursor: file ? "pointer" : "default",
                  fontFamily: FONTS.display, letterSpacing: 0.3,
                  transition: "all 0.2s",
                }}>
                  Enviar Entrega
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.success, fontFamily: FONTS.display }}>¡Entrega enviada!</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4, fontFamily: FONTS.body }}>
                  30 abril 2026 · 09:41 hrs
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8, fontFamily: FONTS.body }}>
                  Recibirás una notificación cuando el docente califique tu trabajo.
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

function ProfileScreen({ setScreen }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      <TopBar title="Mi Perfil" />
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
        padding: "20px 16px 24px", textAlign: "center", color: "white",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 10px", fontSize: 28, border: "3px solid rgba(255,255,255,0.4)",
        }}>
          👤
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, fontFamily: FONTS.display }}>Estudiante</div>
        <div style={{ fontSize: 12, opacity: 0.8, fontFamily: FONTS.body, marginTop: 2 }}>Lic. en Pedagogía · 1er Semestre</div>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 10, fontFamily: FONTS.display, textTransform: "uppercase", letterSpacing: 0.5 }}>Resumen de calificaciones</div>
          <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.success, fontFamily: FONTS.display }}>92</div>
              <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONTS.body }}>Reflexión</div>
            </div>
            <div style={{ width: 1, background: COLORS.border }} />
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.textLight, fontFamily: FONTS.display }}>—</div>
              <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONTS.body }}>Ensayo</div>
            </div>
            <div style={{ width: 1, background: COLORS.border }} />
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.textLight, fontFamily: FONTS.display }}>—</div>
              <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONTS.body }}>Mapa C.</div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "8px 12px", background: COLORS.accentSoft, borderRadius: 8, textAlign: "center" }}>
            <span style={{ fontSize: 11, color: COLORS.secondary, fontWeight: 600, fontFamily: FONTS.body }}>Promedio parcial: </span>
            <span style={{ fontSize: 14, color: COLORS.primary, fontWeight: 800, fontFamily: FONTS.display }}>92.0</span>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 10, fontFamily: FONTS.display, textTransform: "uppercase", letterSpacing: 0.5 }}>Progreso por módulo</div>
          {modules.map(m => (
            <div key={m.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, fontFamily: FONTS.body }}>{m.icon} Módulo {m.id}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: m.progress >= 100 ? COLORS.success : COLORS.secondary, fontFamily: FONTS.display }}>{m.progress}%</span>
              </div>
              <ProgressBar value={m.progress} />
            </div>
          ))}
        </Card>

        {[
          { icon: "🔔", label: "Configurar notificaciones" },
          { icon: "⬇️", label: "Descargas offline" },
          { icon: "❓", label: "Ayuda y soporte" },
        ].map((item, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, fontFamily: FONTS.body }}>{item.label}</span>
              <span style={{ marginLeft: "auto", color: COLORS.textLight }}>›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AnnouncementsScreen({ setScreen }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: COLORS.bg }}>
      <TopBar title="Avisos" onBack={() => setScreen(null)} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {announcements.map(a => (
          <Card key={a.id}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: COLORS.accentSoft,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0,
              }}>📢</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, fontFamily: FONTS.body }}>{a.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginTop: 2 }}>{a.date}</div>
                <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5, fontFamily: FONTS.body, marginTop: 8 }}>{a.body}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function PsicoApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [screen, setScreen] = useState(null);

  const handleNav = (tab) => {
    setActiveTab(tab);
    setScreen(null);
  };

  const renderScreen = () => {
    if (screen) {
      switch (screen.type) {
        case "moduleDetail": return <ModuleDetailScreen module={screen.module} setScreen={(s) => { if (!s) setScreen(null); else setScreen(s); }} />;
        case "topicDetail": return <TopicDetailScreen topic={screen.topic} module={screen.module} setScreen={(s) => { if (!s) setScreen(null); else setScreen(s); }} />;
        case "taskDetail": return <TaskDetailScreen task={screen.task} setScreen={(s) => { if (!s) { setActiveTab("tasks"); setScreen(null); } else setScreen(s); }} />;
        case "announcements": return <AnnouncementsScreen setScreen={(s) => { if (!s) { setActiveTab("home"); setScreen(null); } else setScreen(s); }} />;
      }
    }
    switch (activeTab) {
      case "home": return <DashboardScreen onNav={handleNav} setScreen={setScreen} />;
      case "content": return <ContentScreen setScreen={setScreen} />;
      case "tasks": return <TasksScreen setScreen={setScreen} />;
      case "profile": return <ProfileScreen setScreen={setScreen} />;
    }
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "linear-gradient(145deg, #E2E8F0 0%, #CBD5E0 100%)",
      padding: 20, fontFamily: FONTS.body,
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 740, borderRadius: 40,
        background: "#0D0D0D",
        padding: "12px 10px",
        boxShadow: "0 25px 80px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.1) inset",
        position: "relative",
      }}>
        {/* Notch */}
        <div style={{
          position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 28, borderRadius: 14, background: "#0D0D0D", zIndex: 20,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%", background: "#1a1a2e",
            position: "absolute", right: 22, top: 9, boxShadow: "inset 0 0 3px rgba(50,50,80,0.5)",
          }} />
        </div>
        {/* Screen */}
        <div style={{
          width: "100%", height: "100%", borderRadius: 30,
          overflow: "hidden", background: COLORS.bg,
          display: "flex", flexDirection: "column",
        }}>
          <StatusBar />
          {renderScreen()}
          <BottomNav active={screen ? (screen.type === "announcements" ? "home" : screen.type === "taskDetail" ? "tasks" : activeTab) : activeTab} onNav={handleNav} />
        </div>
      </div>
    </div>
  );
}
