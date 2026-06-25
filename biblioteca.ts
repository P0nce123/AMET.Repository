interface Libro {
    titulo: string;
    autor: string;
    isbn: string;
    fechaPrestamo: string;
    fechaDevolucionPrevista: string;
    tipoUsuario: "estudiante" | "profesor" | "general";
}

interface ReporteMulta {
    titulo: string;
    autor: string;
    diasRetraso: number;
    multa: number;
    tipoUsuario: string;
}

function calcularDiasRetraso(fechaDevolucionPrevista: string, fechaActual: string): number {
    const fecha1 = new Date(fechaActual);
    const fecha2 = new Date(fechaDevolucionPrevista);

    const diferencia = fecha1.getTime() - fecha2.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (dias < 0) {
        return 0;
    }

    return dias;
}

function calcularMulta(diasRetraso: number, tipoUsuario: string): number {
    if (diasRetraso === 0) {
        return 0;
    }

    if (tipoUsuario === "estudiante") {
        return diasRetraso * 50;
    } else if (tipoUsuario === "profesor") {
        return diasRetraso * 30;
    } else if (tipoUsuario === "general") {
        return diasRetraso * 100;
    }

    return 0;
}

function procesarBiblioteca(libros: Libro[], fechaActual: string): ReporteMulta[] {
    const reportes: ReporteMulta[] = [];

    for (let libro of libros) {
        const diasRetraso = calcularDiasRetraso(libro.fechaDevolucionPrevista, fechaActual);
        const multa = calcularMulta(diasRetraso, libro.tipoUsuario);

        const reporte: ReporteMulta = {
            titulo: libro.titulo,
            autor: libro.autor,
            diasRetraso: diasRetraso,
            multa: multa,
            tipoUsuario: libro.tipoUsuario
        };

        reportes.push(reporte);
    }

    return reportes;
}

const librosEnPrestamo: Libro[] = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        isbn: "001",
        fechaPrestamo: "2024-06-01",
        fechaDevolucionPrevista: "2024-06-20",
        tipoUsuario: "estudiante"
    },
    {
        titulo: "El Aleph",
        autor: "Jorge Luis Borges",
        isbn: "002",
        fechaPrestamo: "2024-05-15",
        fechaDevolucionPrevista: "2024-06-01",
        tipoUsuario: "estudiante"
    },
    {
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        isbn: "003",
        fechaPrestamo: "2024-05-20",
        fechaDevolucionPrevista: "2024-06-10",
        tipoUsuario: "profesor"
    },
    {
        titulo: "Martín Fierro",
        autor: "José Hernández",
        isbn: "004",
        fechaPrestamo: "2024-05-25",
        fechaDevolucionPrevista: "2024-06-05",
        tipoUsuario: "general"
    }
];

const fechaHoy = "2024-06-15";
const reportes = procesarBiblioteca(librosEnPrestamo, fechaHoy);

let totalMultas = 0;
let librosConRetraso = 0;

console.log("=======================================");
console.log("REPORTE DE BIBLIOTECA");
console.log("=======================================");

for (let reporte of reportes) {
    console.log(`Libro: ${reporte.titulo}`);
    console.log(`Autor: ${reporte.autor}`);

    if (reporte.tipoUsuario === "estudiante") {
        console.log("Usuario: Estudiante");
    } else if (reporte.tipoUsuario === "profesor") {
        console.log("Usuario: Profesor");
    } else {
        console.log("Usuario: General");
    }

    if (reporte.diasRetraso === 0) {
        console.log("Estado: Sin retraso");
    } else {
        console.log(`Días de retraso: ${reporte.diasRetraso}`);
        librosConRetraso++;
    }

    console.log(`Multa: $${reporte.multa}`);
    console.log("");

    totalMultas += reporte.multa;
}

console.log("=======================================");
console.log(`TOTAL DE MULTAS: $${totalMultas}`);
console.log(`LIBROS CON RETRASO: ${librosConRetraso} de ${reportes.length}`);
console.log("=======================================");