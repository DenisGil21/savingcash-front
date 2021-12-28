export interface Movimiento {
    total:       number;
    ingresoMensual: number;
    gastoMensual: number;
    saldoTotal: number;
    movimientos: MovimientoElement[];
}

export interface MovimientoElement {
    _id:      string;
    cantidad: number;
    tipo:     string;
    concepto: string;
    usuario:  string;
    activo:   boolean;
    fecha:    Date;
}

export interface MovimientoPost {
    cantidad: number;
    tipo: string;
    concepto: string;
}

export interface MovimientosAnios {
    _id: number;
}

export interface MovimientoParameters{
    anio?: string;
    mes?: string;
}