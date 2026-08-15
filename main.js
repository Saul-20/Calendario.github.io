// ==========================================
// CALENDARIO DE TURNOS Y FERIADOS
// GUATEMALA
// ==========================================


// ==========================================
// MES INICIAL
// ==========================================

let fechaActual = new Date(2026, 7, 1);
// 7 = agosto


// ==========================================
// PATRÓN DE TURNOS
// ==========================================
//
// 4 DÍAS
// 2 DESCANSOS
// 4 NOCHES
// 2 DESCANSOS
//
// Después vuelve a comenzar.
// ==========================================

const patronTurnos = [
    "DÍA",
    "DÍA",
    "DÍA",
    "DÍA",

    "DESCANSO",
    "DESCANSO",

    "NOCHE",
    "NOCHE",
    "NOCHE",
    "NOCHE",

    "DESCANSO",
    "DESCANSO"
];


// ==========================================
// FECHA DE REFERENCIA
// ==========================================
//
// ESTA ES MUY IMPORTANTE.
//
// El 3 de agosto de 2026 será:
// PRIMER DÍA DE TURNO DE DÍA
//
// Si tu patrón comienza en otra fecha,
// solamente cambia esta fecha.
// ==========================================

const fechaReferencia = new Date(2026, 7, 3);


// ==========================================
// NOMBRES DE LOS MESES
// ==========================================

const nombresMeses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE"
];


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const calendario =
    document.getElementById("calendario");

const mesTitulo =
    document.getElementById("mes");

const botonAnterior =
    document.getElementById("anterior");

const botonSiguiente =
    document.getElementById("siguiente");


// ==========================================
// CALCULAR PASCUA
// ==========================================
//
// Esto permite calcular Semana Santa
// automáticamente para cualquier año.
// ==========================================

function calcularPascua(año) {

    const a = año % 19;

    const b = Math.floor(año / 100);

    const c = año % 100;

    const d = Math.floor(b / 4);

    const e = b % 4;

    const f = Math.floor((b + 8) / 25);

    const g = Math.floor((b - f + 1) / 3);

    const h =
        (19 * a + b - d - g + 15) % 30;

    const i = Math.floor(c / 4);

    const k = c % 4;

    const l =
        (32 + 2 * e + 2 * i - h - k) % 7;

    const m =
        Math.floor(
            (a + 11 * h + 22 * l) / 451
        );

    const mes =
        Math.floor(
            (h + l - 7 * m + 114) / 31
        );

    const dia =
        ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(año, mes - 1, dia);
}


// ==========================================
// FORMATEAR FECHA
// ==========================================

function claveFecha(fecha) {

    const año = fecha.getFullYear();

    const mes =
        String(fecha.getMonth() + 1)
        .padStart(2, "0");

    const dia =
        String(fecha.getDate())
        .padStart(2, "0");

    return `${año}-${mes}-${dia}`;
}


// ==========================================
// OBTENER FERIADOS
// ==========================================

function obtenerFeriado(fecha) {

    const año = fecha.getFullYear();

    const mes = fecha.getMonth();

    const dia = fecha.getDate();

    const clave = claveFecha(fecha);


    // ======================================
    // FERIADOS FIJOS
    // ======================================

    const feriados = {

        "01-01":
            "Año Nuevo",

        "05-01":
            "Día del Trabajo",

        "09-15":
            "Día de la Independencia",

        "10-20":
            "Día de la Revolución",

        "11-01":
            "Día de Todos los Santos",

        "12-25":
            "Navidad"
    };


    const mesDia =
        String(mes + 1).padStart(2, "0")
        + "-" +
        String(dia).padStart(2, "0");


    if (feriados[mesDia]) {

        return {
            nombre: feriados[mesDia],
            tipo: "asueto"
        };
    }


    // ======================================
    // SEMANA SANTA
    // ======================================

    const pascua =
        calcularPascua(año);


    // Jueves Santo
    const juevesSanto =
        new Date(pascua);

    juevesSanto.setDate(
        pascua.getDate() - 3
    );


    // Viernes Santo
    const viernesSanto =
        new Date(pascua);

    viernesSanto.setDate(
        pascua.getDate() - 2
    );


    // Sábado Santo
    const sabadoSanto =
        new Date(pascua);

    sabadoSanto.setDate(
        pascua.getDate() - 1
    );


    if (
        clave === claveFecha(juevesSanto)
    ) {

        return {
            nombre: "Jueves Santo",
            tipo: "semana-santa"
        };
    }


    if (
        clave === claveFecha(viernesSanto)
    ) {

        return {
            nombre: "Viernes Santo",
            tipo: "semana-santa"
        };
    }


    if (
        clave === claveFecha(sabadoSanto)
    ) {

        return {
            nombre: "Sábado Santo",
            tipo: "semana-santa"
        };
    }


    // ======================================
    // 26 DE ABRIL
    // Día Nacional de la Secretaria
    // ======================================

    if (mes === 3 && dia === 26) {

        return {
            nombre:
                "Día Nacional de la Secretaria",

            tipo: "especial"
        };
    }


    // ======================================
    // 10 DE MAYO
    // Día de la Madre
    // ======================================

    if (mes === 4 && dia === 10) {

        return {
            nombre:
                "Día de la Madre",

            tipo: "especial"
        };
    }


    // ======================================
    // 30 DE JUNIO
    // Día del Ejército
    // ======================================

    if (mes === 5 && dia === 30) {

        return {
            nombre:
                "Día del Ejército",

            tipo: "asueto"
        };
    }


    // ======================================
    // TRASLADO DEL 30 DE JUNIO
    // ======================================
    //
    // En 2026:
    // lunes 29 de junio
    //
    // Esto se puede ampliar para otros años.
    // ======================================

    if (
        año === 2026 &&
        mes === 5 &&
        dia === 29
    ) {

        return {
            nombre:
                "Asueto por Día del Ejército",

            tipo: "trasladado"
        };
    }


    // ======================================
    // 15 DE AGOSTO
    // Virgen de la Asunción
    //
    // Es feriado de la Ciudad de Guatemala.
    // ======================================

    if (mes === 7 && dia === 15) {

        return {
            nombre:
                "Virgen de la Asunción",

            tipo: "local"
        };
    }


    // ======================================
    // 24 DE DICIEMBRE
    // MEDIO DÍA
    // ======================================

    if (mes === 11 && dia === 24) {

        return {
            nombre:
                "Nochebuena - desde el mediodía",

            tipo: "medio-dia"
        };
    }


    // ======================================
    // 31 DE DICIEMBRE
    // MEDIO DÍA
    // ======================================

    if (mes === 11 && dia === 31) {

        return {
            nombre:
                "Fin de año - desde el mediodía",

            tipo: "medio-dia"
        };
    }


    return null;
}


// ==========================================
// CALCULAR TURNO
// ==========================================

function obtenerTurno(fecha) {

    const diferencia =
        Math.floor(
            (
                fecha -
                fechaReferencia
            ) /
            (1000 * 60 * 60 * 24)
        );


    let posicion =
        diferencia % patronTurnos.length;


    if (posicion < 0) {

        posicion +=
            patronTurnos.length;
    }


    return patronTurnos[posicion];
}


// ==========================================
// GENERAR CALENDARIO
// ==========================================

function generarCalendario() {

    calendario.innerHTML = "";


    const año =
        fechaActual.getFullYear();

    const mes =
        fechaActual.getMonth();


    // Título

    mesTitulo.textContent =
        `${nombresMeses[mes]} ${año}`;


    // Primer día del mes

    const primerDia =
        new Date(año, mes, 1);


    // Último día del mes

    const ultimoDia =
        new Date(año, mes + 1, 0);


    // Convertir domingo = 6
    // lunes = 0

    let primerDiaSemana =
        primerDia.getDay() - 1;


    if (primerDiaSemana < 0) {

        primerDiaSemana = 6;
    }


    // ======================================
    // ESPACIOS ANTES DEL PRIMER DÍA
    // ======================================

    for (
        let i = 0;
        i < primerDiaSemana;
        i++
    ) {

        const espacio =
            document.createElement("div");

        espacio.classList.add(
            "dia",
            "vacio"
        );

        calendario.appendChild(espacio);
    }


    // ======================================
    // CREAR DÍAS
    // ======================================

    for (
        let dia = 1;
        dia <= ultimoDia.getDate();
        dia++
    ) {

        const fecha =
            new Date(
                año,
                mes,
                dia
            );


        const tarjeta =
            document.createElement("div");


        tarjeta.classList.add("dia");


        // ==================================
        // NÚMERO DEL DÍA
        // ==================================

        const numero =
            document.createElement("div");

        numero.classList.add("numero");

        numero.textContent = dia;

        tarjeta.appendChild(numero);


        // ==================================
        // TURNO
        // ==================================

        const turno =
            obtenerTurno(fecha);


        const turnoElemento =
            document.createElement("div");

            turnoElemento.classList.add("turno");

        if (turno !== "DESCANSO") {
            turnoElemento.textContent = turno;
}


        // Clase según turno

        if (turno === "DÍA") {

            tarjeta.classList.add(
                "turno-dia"
            );

        } else if (turno === "NOCHE") {

            tarjeta.classList.add(
                "turno-noche"
            );

       } else {

    tarjeta.classList.add("descanso");
}


        tarjeta.appendChild(
            turnoElemento
        );


        // ==================================
        // FERIADO
        // ==================================

        const feriado =
            obtenerFeriado(fecha);


        if (feriado) {

            const feriadoElemento =
                document.createElement("div");


            feriadoElemento.classList.add(
                "feriado"
            );


            feriadoElemento.textContent =
                "🇬🇹 " +
                feriado.nombre;


            tarjeta.appendChild(
                feriadoElemento
            );


            tarjeta.classList.add(
                "tiene-feriado"
            );


            tarjeta.classList.add(
                "feriado-" +
                feriado.tipo
            );
        }


        calendario.appendChild(
            tarjeta
        );
    }
}


// ==========================================
// MES ANTERIOR
// ==========================================

botonAnterior.addEventListener(
    "click",
    function () {

        fechaActual.setMonth(
            fechaActual.getMonth() - 1
        );

        generarCalendario();
    }
);


// ==========================================
// MES SIGUIENTE
// ==========================================

botonSiguiente.addEventListener(
    "click",
    function () {

        fechaActual.setMonth(
            fechaActual.getMonth() + 1
        );

        generarCalendario();
    }
);


// ==========================================
// INICIAR
// ==========================================

generarCalendario();