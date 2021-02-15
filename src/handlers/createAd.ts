import Ad from '../model/ad';

export async function createAd(newAd: any) {
  try {
    console.log('Handler start create new ad');
    const newAdObj = JSON.parse(newAd);
    let result = await Ad.insertMany([
      {
        id: newAdObj.id,
        description: newAdObj.description,
        imageUrl: newAdObj.imageUrl,
        location: { type: 'Point', coordinates: [newAdObj.targeting.long, newAdObj.targeting.lat] },
        radius: newAdObj.targeting.radius,
        operatingSystems: newAdObj.operatingSystems,
        tags: newAdObj.tags,
        browsers: newAdObj.browsers,
      },
    ]);
    console.log('Handler start create new ad');
    return result;
  } catch (error) {
    console.log('Failed to create new ad: ', error);
    throw new Error('Failed to create new ad');
  }
}
