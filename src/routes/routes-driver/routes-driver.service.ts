import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma/prisma.service";

@Injectable()
export class RoutesDriverService {
    constructor(private prismaService: PrismaService) {}

    createOrUpdate(dto: { route_id: string, lat: number, lng: number }) {
        return this.prismaService.routeDriver.upsert({
            where: { routeId: dto.route_id },
            include: {
                route: true
            },
            create: {
                routeId: dto.route_id,
                points: {
                    set: {
                        location: {
                            lat: dto.lat,
                            lng: dto.lng
                        }
                    }
                }
            },
            update: {
                points: {
                    push: {
                        location: {
                            lat: dto.lat,
                            lng: dto.lng
                        }
                    }
                }
            }
        });
    }
}
