// ============================================
// VARIABLES GLOBALES (CRÍTICAS PARA app.js y index.html <script>)
// ============================================
const month_names = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let date = new Date();
let curr_day = date.getDate();
let curr_month = { value: date.getMonth() };
let curr_year = { value: date.getFullYear() };

// 🛑 IMPORTANTE: TABLA DE FASES LUNARES CORREGIDA Y AJUSTADA POR AÑO
// Formato: [Mes (0=Enero, 11=Diciembre)]: { Dia: 'Fase' }
// Las fechas están corregidas para 2025 (H. Sur).
const moon_phases_by_year = {
    2025: {
        0: { 6: 'First', 13: 'Full', 21: 'Last', 29: 'New' }, // Enero
        1: { 5: 'First', 12: 'Full', 20: 'Last', 28: 'New' }, // Febrero
        2: { 7: 'First', 14: 'Full', 22: 'Last', 29: 'New' }, // Marzo
        3: { 6: 'First', 13: 'Full', 21: 'Last', 28: 'New' }, // Abril
        4: { 5: 'First', 12: 'Full', 20: 'Last', 27: 'New' }, // Mayo
        5: { 3: 'First', 10: 'Full', 18: 'Last', 25: 'New' }, // Junio
        6: { 2: 'First', 9: 'Full', 17: 'Last', 25: 'New' }, // Julio
        7: { 1: 'First', 7: 'Full', 15: 'Last', 23: 'New', 30: 'First' }, // Agosto
        8: { 6: 'Full', 14: 'Last', 22: 'New', 29: 'First' }, // Septiembre
        9: { 6: 'Full', 14: 'Last', 21: 'New', 29: 'First' }, // Octubre
        10: { 4: 'Full', 12: 'Last', 20: 'New', 27: 'First' }, // Noviembre
        11: { 4: 'Full', 12: 'Last', 20: 'New', 27: 'First' }  // Diciembre (¡Corregido!)
    }
    // Agrega más años si lo necesitas
};


// ============================================
// DATOS DE SIEMBRA POR MES (PARA LA VISTA "Guia Mensual")
// Los números de mes van del 1 (Enero) al 12 (Diciembre)
// ============================================
const planting_advice = {
    1: { // Enero
        sur: { title: 'Enero (H. Sur)', desc: 'Crecimiento vegetativo alto. Evita trasplantes grandes debido al calor. Control de plagas y estrés hídrico.' },
        norte: { title: 'Enero (H. Norte)', desc: 'Invierno. Reposo total. Preparación de sustrato y planificación de la siembra en interior.' }
    },
    2: { // Febrero
        sur: { title: 'Febrero (H. Sur)', desc: 'Fin del verano. La floración está en su apogeo para fotoperiódicas. Controla el moho por humedad nocturna.' },
        norte: { title: 'Febrero (H. Norte)', desc: 'Invierno. Siembra de semillas fotoperiódicas en interior (luces) para un gran crecimiento en primavera.' }
    },
    3: { // Marzo
        sur: { title: 'Marzo (H. Sur)', desc: 'Cosecha de fotoperiódicas. El clima es fresco y seco, ideal para el curado. Siembra automáticas tardías.' },
        norte: { title: 'Marzo (H. Norte)', desc: 'Pre-primavera. Germinación de automáticas y trasplante al exterior de fotoperiódicas iniciadas en interior.' }
    },
    4: { // Abril
        sur: { title: 'Abril (H. Sur)', desc: 'El otoño exige cosechas rápidas y protección contra heladas. Limpieza de cultivos. Comienza el reposo.' },
        norte: { title: 'Abril (H. Norte)', desc: 'Primavera. Trasplantes y siembra directa de automáticas y fotoperiódicas. Inicia el crecimiento vegetativo fuerte.' }
    },
    5: { // Mayo
        sur: { title: 'Mayo (H. Sur)', desc: 'Invierno. Limpieza y preparación de tierras. Excelente para el mantenimiento y cultivo indoor.' },
        norte: { title: 'Mayo (H. Norte)', desc: 'Crecimiento activo. Poda de bajo y tutorado para las fotoperiódicas. La época más fácil para automáticas.' }
    },
    6: { // Junio
        sur: { title: 'Junio (H. Sur)', desc: 'Invierno. Reposo total. Solo interior. Es el mes de los días más cortos.' },
        norte: { title: 'Junio (H. Norte)', desc: 'Pico de sol. Crecimiento vegetativo explosivo. Ideal para trasplantes a macetas finales.' }
    },
    7: { // Julio
        sur: { title: 'Julio (H. Sur)', desc: 'Invierno. Planificación de la temporada. Germinación indoor de fotoperiódicas para adelantar la cosecha.' },
        norte: { title: 'Julio (H. Norte)', desc: 'Verano. El crecimiento vegetativo sigue fuerte. Ideal para podas de alto rendimiento y control de plagas.' }
    },
    8: { // Agosto
        sur: { title: 'Agosto (H. Sur)', desc: 'Fin del invierno. Germinación y trasplante de automáticas al exterior. Preparación de sustratos.' },
        norte: { title: 'Agosto (H. Norte)', desc: 'Transición a floración (fotoperiódicas). Reducir nitrógeno y aumentar fósforo/potasio.' }
    },
    9: { // Septiembre
        sur: { title: 'Septiembre (H. Sur)', desc: 'Primavera. Siembra de fotoperiódicas para aprovechar el ciclo completo. El riesgo de heladas disminuye.' },
        norte: { title: 'Septiembre (H. Norte)', desc: 'Floración y Cosecha. Las plantas maduran. Controlar la humedad por riesgo de moho. Cosecha de automáticas.' }
    },
    10: { // Octubre
        sur: { title: 'Octubre (H. Sur)', desc: 'Crecimiento inicial. Trasplante de fotoperiódicas. Los días se alargan rápidamente.' },
        norte: { title: 'Octubre (H. Norte)', desc: 'Cosecha. La gran mayoría de fotoperiódicas estarán listas. Tiempo para curar y limpiar.' }
    },
    11: { // Noviembre
        sur: { title: 'Noviembre (H. Sur)', desc: 'Crecimiento fuerte. Primeras podas de formación. Siembra masiva de automáticas.' },
        norte: { title: 'Noviembre (H. Norte)', desc: 'Invierno. Reposo. Limpieza y desinfección de indoor. Preparación para el próximo ciclo.' }
    },
    12: { // Diciembre (El mes que se muestra por defecto)
        sur: { title: 'Diciembre (H. Sur)', desc: 'Máxima actividad. Siembra fotoperiódicas para aprovechar el sol. Ideal para podas de formación.' },
        norte: { title: 'Diciembre (H. Norte)', desc: 'Reposo invernal. Excelente mes para la planificación, mantenimiento de herramientas e indoor.' }
    }
};


// ============================================
// LÓGICA DEL CALENDARIO Y LUNAS (CORREGIDA)
// ============================================
function getMoonPhase(day, month, year) {
    const yearData = moon_phases_by_year[year];
    if (!yearData) return null;

    const monthPhases = yearData[month];
    return monthPhases ? monthPhases[day] : null;
}

// CORREGIDO: Usando emojis Unicode y clases CSS para el estilo
function getMoonIcon(phase) {
    switch (phase) {
        case 'New': return '<span class="moon-icon new-moon" title="Luna Nueva">🌑</span>';
        case 'First': return '<span class="moon-icon first-quarter" title="Cuarto Creciente">🌓</span>';
        case 'Full': return '<span class="moon-icon full-moon" title="Luna Llena">🌕</span>';
        case 'Last': return '<span class="moon-icon last-quarter" title="Cuarto Menguante">🌗</span>';
        default: return '';
    }
}

// CORREGIDO: Función para marcar el día con la clase 'moon-phase'
function generateCalendar(month = curr_month.value, year = curr_year.value) {
    let calendarDays = document.querySelector('.calendar-days');
    calendarDays.innerHTML = '';

    let newDate = new Date();
    let isCurrentMonth = (month === newDate.getMonth() && year === newDate.getFullYear());
    curr_day = isCurrentMonth ? newDate.getDate() : -1;

    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    let startDayOfWeek = firstDay.getDay(); // 0 = Domingo, 6 = Sábado
    let daysInMonth = lastDay.getDate();

    // Días de relleno del mes anterior
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.innerHTML += '<div></div>';
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
        let dayClass = 'calendar-day-hover';
        let moonPhase = getMoonPhase(i, month, year); // Obtiene 'New', 'Full', 'Last', 'First' o null
        let moonIcon = getMoonIcon(moonPhase);

        if (i === curr_day) {
            dayClass += ' curr-date';
        }

        // AÑADIDO: Si hay fase lunar, añade la clase 'moon-phase' para el CSS
        if (moonPhase) {
            dayClass += ' moon-phase';
        }

        calendarDays.innerHTML += `<div class="${dayClass}" data-day="${i}">${i}${moonIcon}</div>`;
    }
    
    // Llama a la función global para adjuntar los clics del modal
    if (window.reattachDayClicks) {
        window.reattachDayClicks();
    }
}

function updateMonthPicker() {
    document.getElementById('month-picker').textContent = month_names[curr_month.value];
    document.getElementById('year').textContent = curr_year.value;
}

function changeMonth(delta) {
    curr_month.value += delta;

    if (curr_month.value > 11) {
        curr_month.value = 0;
        curr_year.value++;
    } else if (curr_month.value < 0) {
        curr_month.value = 11;
        curr_year.value--;
    }
    updateMonthPicker();
    generateCalendar(curr_month.value, curr_year.value);
}

// ============================================
// LÓGICA DE LA VISTA DE SEMILLAS (NUEVO)
// ============================================
function updateSeedAdvice(month) {
    const container = document.getElementById('seed-advice-container');
    const advice = planting_advice[month];

    if (!container) return;

    if (advice) {
        container.innerHTML = `
            <div class="advice-card">
                <h3>${advice.sur.title}</h3>
                <p><strong>Germinación y Trasplante:</strong> ${advice.sur.desc}</p>
            </div>
            <div class="advice-card">
                <h3>${advice.norte.title}</h3>
                <p><strong>Germinación y Trasplante:</strong> ${advice.norte.desc}</p>
            </div>
        `;
    } else {
        container.innerHTML = `<div class="advice-card" style="grid-column: 1 / -1;">
            <h3>Información no disponible</h3>
            <p>Aún no hay consejos de siembra cargados para este mes. Consulta tu hemisferio.</p>
        </div>`;
    }
}

function enableSeedViewLogic() {
    const selector = document.getElementById('seed-month-select');
    
    // Si el selector no existe, salimos
    if (!selector) return; 

    // Carga la información del mes seleccionado al iniciar
    updateSeedAdvice(parseInt(selector.value));

    // Escucha el evento de cambio
    selector.addEventListener('change', (e) => {
        const selectedMonth = parseInt(e.target.value);
        updateSeedAdvice(selectedMonth);
    });
}


// ============================================
// MODO OSCURO, MESES Y NAVEGACIÓN
// ============================================
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.onclick = () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark') ? 'enabled' : 'disabled');
    }
}


function initializeDarkMode() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
    }
}

function renderMonthList() {
    const monthList = document.querySelector('.month-list');
    month_names.forEach((e, index) => {
        let month = document.createElement('div');
        month.innerHTML = `<div>${e}</div>`;
        month.onclick = () => {
            curr_month.value = index;
            updateMonthPicker();
            generateCalendar(curr_month.value, curr_year.value);
            monthList.classList.remove('show');
        }
        monthList.appendChild(month);
    });
}

function enableMonthPicker() {
    document.getElementById('month-picker').onclick = () => {
        document.querySelector('.month-list').classList.toggle('show');
    }
}

function enableNavigationView() {
    const navButtons = document.querySelectorAll('.nav-button');
    const views = document.querySelectorAll('.view-container > div');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetId = button.id.replace('nav-', '') + '-view';
            views.forEach(view => {
                if (view.id === targetId) {
                    view.classList.remove('hidden');
                } else {
                    view.classList.add('hidden');
                }
            });
        });
    });
}


// ============================================
// INICIALIZACIÓN (CRÍTICO)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicialización del calendario
    updateMonthPicker();
    generateCalendar(); 

    // Eventos de Navegación del Calendario
    document.getElementById('prev-year').onclick = () => changeMonth(-1);
    document.getElementById('next-year').onclick = () => changeMonth(1);

    // Inicialización de Vistas
    enableNavigationView();
    
    // 💡 IMPORTANTE: Inicializa la lógica de Semillas y su actualización de contenido
    enableSeedViewLogic(); 

    // Inicialización de Meses y Modo Oscuro
    renderMonthList();
    enableMonthPicker();
    initializeDarkMode();
});
