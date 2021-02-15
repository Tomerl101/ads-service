// import { CreateAdDto } from '../dtos/createAds.dto';
// import { isEmpty } from '../utils/isEmpty';
import { GetAdsDto } from '../dtos/getAds.dto';
import Ad from '../model/ad';
import HttpError from '../errors/httpError';
import { GET_ADS_WITHIN_LOCATION_BY_OS_AND_BROWSER } from '../db/quries';

class AdsService {
  constructor() {}

  /**
   * In order for an ad to be served, the user has to:
    1. Be within a maximum distance of radius from the (lat, long) point.
    This means the distance between the user’s position and (lat, long) should be at
    most radius.
    2. Using one of the supported operating systems.
    3. Using one of the supported browsers.
    Of the ads that match these conditions, priority will be given to ads that have most
    intersecting tags.
   * @param adParams
   */
  public async getAds(getAdsDto: GetAdsDto): Promise<Object[]> {
    console.log('getAdsDto--->', getAdsDto.tag);
    console.log('Start Getting ads with params: ', getAdsDto);
    try {
      const ads = await Ad.aggregate(GET_ADS_WITHIN_LOCATION_BY_OS_AND_BROWSER(getAdsDto)).exec();
      console.log('Success gettings ads');
      return ads;
    } catch (error) {
      console.log(error);
      throw new HttpError(500, 'Server failed to get ads');
    }
  }

  // public async createAd(adDto: CreateAdDto): Promise<Ad> {
  //   if (isEmpty(adDto)) throw new HttpError(400, 'Invalid ad body');

  //   return ad;
  // }
}

export default AdsService;

// Use this to add dummy ad
// try {
//   let result = await Ad.insertMany([
//     {
//       id: 'coolAd1',
//       description: 'coolAds1Description',
//       imageUrl: 'blabla',
//       location: { type: 'Point', coordinates: [-73.9928, 40.7193] },
//       radius: 100,
//       operatingSystems: ['Windows 10', 'macOs', 'Linux'],
//       browsers: ['Chrome', 'Firefox', 'Edge'],
//       tags: ['travel', 'asia', 'israel'],
//     },
//   ]);
//   console.log('RESULT --> ', result);
// } catch (error) {
//   console.log('ERROR GETTING AD --->', error);
// }

//test get add with user long and lat : -73.992, 40.7192
