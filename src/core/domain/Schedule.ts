import { differenceInHours, format, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export class Schedule {
    public from: Date;
    public to: Date;

    constructor(from: string, to: string) {
        this.from = this.dateToUTC(from);
        this.to = this.dateToUTC(to);
    }

    private dateToUTC(dateStr: string): Date {
        return zonedTimeToUtc(parseISO(dateStr), 'America/Sao_Paulo');
    }

    static toObject(date: Date): { day: string; time: string } {
        return {
            day: format(date, 'dd/MM/yyyy'),
            time: format(date, 'hh:mm'),
        };
    }

    static toFormattedString(date: Date): string {
        const { day, time } = this.toObject(date);
        return `${day} às ${time}`;
    }

    public getDurationInHours(): number {
        return differenceInHours(this.to, this.from);
    }
}
