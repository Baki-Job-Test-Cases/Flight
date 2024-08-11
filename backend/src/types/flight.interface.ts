import type { Airline } from './airline.interface';
import type { Destination } from './destination.interface';

interface AircraftTypeType {
    iataMain?: string;
    iataSub?: string;
}

interface BaggageClaimType {
    belts?: string[];
}

interface CheckinClassType {
    code?: string;
    description?: string;
}

interface DeskType {
    checkinClass?: CheckinClassType;
    position?: number;
}

interface DesksType {
    desks?: DeskType[];
}

interface RowType {
    position?: string;
    desks?: DesksType;
}

interface RowsType {
    rows?: RowType[];
}

interface CheckinAllocationType {
    endTime?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    rows?: RowsType;
    startTime?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
}

interface RemarksType {
    remarks?: string[];
}

interface CheckinAllocationsType {
    checkinAllocations?: CheckinAllocationType[];
    remarks?: RemarksType;
}

interface CodesharesType {
    codeshares?: string[];
}

interface PublicFlightStateType {
    flightStates?: string[];
}

interface RouteType {
    destinations?: string[];
    eu?: 'S' | 'E' | 'N'; // S = Schengen, E = Europe, N = non-Europe
    visa?: boolean;
}

interface TransferPositionsType {
    transferPositions?: number[];
}

export interface Flight {
    lastUpdatedAt?: string;
    actualLandingTime?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    actualOffBlockTime?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    aircraftRegistration?: string;
    aircraftType?: AircraftTypeType;
    baggageClaim?: BaggageClaimType;
    checkinAllocations?: CheckinAllocationsType;
    codeshares?: CodesharesType;
    estimatedLandingTime?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    expectedTimeBoarding?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    expectedTimeGateClosing?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    expectedTimeGateOpen?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    expectedTimeOnBelt?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    expectedSecurityFilter?: string; // Expected security filter
    flightDirection?: 'A' | 'D';
    flightName?: string;
    flightNumber?: number;
    gate?: string;
    pier?: string;
    id?: string;
    isOperationalFlight?: boolean;
    mainFlight?: string;
    prefixIATA?: string;
    prefixICAO?: string;
    airlineCode?: number;
    publicEstimatedOffBlockTime?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    publicFlightState?: PublicFlightStateType;
    route?: RouteType;
    scheduleDateTime?: string; // Format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
    scheduleDate?: string; // Format: yyyy-MM-dd
    scheduleTime?: string; // Format: hh:mm:ss
    serviceType?: 'J' | 'C' | 'F' | 'H'; // Examples: J = Passenger Line, C = Passenger Charter, F = Freight Line, H = Freight Charter
    terminal?: number;
    transferPositions?: TransferPositionsType;
    schemaVersion?: string;
    airline?: Airline;
    destinations?: Destination[];
}
