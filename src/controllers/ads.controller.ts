import { NextFunction, Request, Response } from 'express';
// import { CreateAdDto } from '../dtos/createAds.dto';
import Ad from '../interfaces/ads.interface';
import AdService from '../services/ads.service';

class AdsController {
  public adService: AdService;

  constructor(adService: AdService) {
    this.adService = adService;
  }
  public getAds = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const lat: number = parseFloat(req.query.lat?.toString()!);
      const long: number = parseFloat(req.query.long?.toString()!);
      const tag: string[] = <string[]>req.query.tag;
      const browser: string = req.useragent?.browser || '';
      const os: string = req.useragent?.os || '';

      const ads: Object[] = await this.adService.getAds({ lat, long, tag, browser, os });
      console.log('ADS --->', ads);
      res.status(200).json({
        ads,
        status: 'ok',
      });
    } catch (error) {
      next(error);
    }
  };

  public getBestAd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const lat: number = parseFloat(req.query.lat?.toString()!);
      const long: number = parseFloat(req.query.long?.toString()!);
      const tag: string[] = <string[]>req.query.tag;
      const browser: string = req.useragent?.browser || '';
      const os: string = req.useragent?.os || '';

      const ads: Object[] = await this.adService.getAds({ lat, long, tag, browser, os });
      const bestAd = ads[0];
      res.status(200).json({
        bestAd,
        status: 'ok',
      });
    } catch (error) {
      next(error);
    }
  };

  public createAd = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const adDto: any = req.body;
      // const newAd: Ad = this.adService();

      // res.status(201).json({ id: newAd.id });
    } catch (error) {
      next(error);
    }
  };
}

export default AdsController;
