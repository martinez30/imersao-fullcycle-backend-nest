import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsClient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import {ConstantEnvName} from "../../constants/ConstantEnvName";

@Injectable()
export class PlacesService {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}

  async findPlace(text: string) {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
          input: text,
          inputtype: PlaceInputType.textQuery,
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          key: this.configService.get(ConstantEnvName.GOOGLE_MAPS_API_KEY)
      },
    });
    return data;
  }
}
