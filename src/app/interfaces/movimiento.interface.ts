export interface Movimiento {
    total:       number;
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