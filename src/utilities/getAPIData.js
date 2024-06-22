const baseUrl =` https://foodish-api.com/api/images/dessert`


const getData = async function () {

  try {
    const requestUrl = baseUrl;
    const response = await fetch(requestUrl, {
      method: 'GET',
      mode: 'cors'
    })

    const JSONData = await response.json();
    return JSONData;

  } catch (error) {
    console.log('here')
    return {error: 'Not found'}
  }

}


const getBatchData = async function (count, arr = []) {
  // Note: count parameter -> number of images to get
  let imagesArr = [...arr];

  let imgObj = await getData();

  // Reroll imgObj if same image is already in the imagesArr
  while (imagesArr.includes(imgObj.image)) {
    imgObj = await getData();
  }

  if (imagesArr.length < count) {
    console.log('loading');
    return await getBatchData(count, [...imagesArr, imgObj.image]);

  } else {
    return imagesArr
  }

}

export default getBatchData