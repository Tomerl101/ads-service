import { GetAdsDto } from '../dtos/getAds.dto';

// Ignore terrible var name
export function GET_ADS_WITHIN_LOCATION_BY_OS_AND_BROWSER({ long, lat, browser, os, tag }: GetAdsDto) {
  return [
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [long, lat] },
        distanceField: 'distance',
      },
    },
    {
      $redact: {
        $cond: {
          if: { $gte: ['$distance', '$radius'] },
          then: '$$PRUNE',
          else: '$$KEEP',
        },
      },
    },
    {
      $match: {
        $and: [{ browsers: { $in: [browser] } }, { operatingSystems: { $in: [os] } }],
      },
    },
    {
      $addFields: { commonToBoth: { $size: { $setIntersection: ['$tags', tag] } } },
    },
    {
      $sort: { commonToBoth: -1 },
    },
    {
      $project: {
        id: 1,
        description: 1,
        imageUrl: 1,
        operatingSystems: 1,
        tags: 1,
        browsers: 1,
        radius: 1,
        location: 1,
        distance: 1,
        // commonToBoth: 1,
      },
    },
  ];
}
