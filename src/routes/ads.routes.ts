import { Router } from 'express';
import AdsController from '../controllers/ads.controller';
import { GetAdsDto } from '../dtos/getAds.dto';
import validate from '../middleware/validate.middleware';

// import { CreateAdsDto } from '../dtos/createAdss.dto';
// import validate from '../middlewares/validate.middleware';

class AdsRouters {
  public router = Router();
  public adsController: AdsController;
  readonly baseUrl: string;

  constructor(adsController: AdsController) {
    this.adsController = adsController;
    this.baseUrl = '/ads';
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.baseUrl}`, validate(GetAdsDto, 'query', false), this.adsController.getAds);
    this.router.get(
      `${this.baseUrl}/best`,
      validate(GetAdsDto, 'query', false),
      this.adsController.getBestAd
    );
    this.router.post(
      `${this.baseUrl}`,
      // validate(CreateAdsDto, 'body', false),
      this.adsController.createAd
    );
  }
}

export default AdsRouters;
