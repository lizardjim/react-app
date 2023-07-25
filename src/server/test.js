var axios = require('axios');
var qs = require('qs');
const currentDate = new Date();
const { create } = require('xmlbuilder2');

//country map for group and language id
const countryMapGroup = {
  "France" :["51489845" , "fr_FR"],
  "Poland" :["46481509", "pl_PL"],
  "United Kingdom" :["45807659", "en_GB"],
  "Czechia" :["46856796", "cs_CZ"],
  "Spain" : ["46130122", "es_ES"],
  "Croatia" :["47380066", "hr_HR"],
  "Germany" :["46167902", "de_DE"]
}

const getAuthHeaders = () => {
  const authCredentials = 'manoj.gohel@ext.cemex.com:Cemex123456';
  const base64Credentials = Buffer.from(authCredentials).toString('base64');
  return {
    Authorization: `Basic ${base64Credentials}`
  };
};

function fetchGroupInfo(countryName){
if (countryName in countryMapGroup) {
    return countryMapGroup[countryName];
  }
}

// to create web content in liferay
const addArticle = async (values) => {
    try {
    const groupInfo=fetchGroupInfo(values[0]);
    const xmlBuilder = create({ version: '1.0' })
      .ele('root', { 'available-locales': groupInfo[1], 'default-locale': groupInfo[1] });

    createXMLContent(xmlBuilder, values, groupInfo);
    const xmlContent = xmlBuilder.end({ prettyPrint: true });
    const data = qs.stringify({
      groupId: groupInfo[0],
      folderId: '0',
      classNameId: '0',
      classPK: '0',
      articleId: '',
      autoArticleId: 'true',
     titleMap: JSON.stringify({ [groupInfo[1]]: values[3] }),
      descriptionMap: JSON.stringify({ [groupInfo[1]]: `Plant - ${values[3]}` }),
      content: xmlContent,
      ddmStructureKey: '59791276',
      ddmTemplateKey: '59791280',
      layoutUuid: '',
      displayDateMonth: currentDate.getMonth(),
      displayDateDay: currentDate.getDate(),
      displayDateYear: currentDate.getFullYear(),
      displayDateHour: currentDate.getHours(),
      displayDateMinute: currentDate.getMinutes(),
      expirationDateMonth: currentDate.getMonth(),
      expirationDateDay: currentDate.getDate(),
      expirationDateYear: currentDate.getFullYear() + 1,
      expirationDateHour: '0',
      expirationDateMinute: '0',
      neverExpire: 'true',
      reviewDateMonth: currentDate.getMonth(),
      reviewDateDay: currentDate.getDate(),
      reviewDateYear: currentDate.getFullYear(),
      reviewDateHour: currentDate.getHours(),
      reviewDateMinute: currentDate.getMinutes(),
      neverReview: 'true',
      indexable: 'true',
      articleURL: ''
    });
    const headers = getAuthHeaders();
    // Make the request to create the web content
    const response = await axios.post('https://liferayqa.cemex.com/api/jsonws/journal.journalarticle/add-article', data, { headers });
    console.log('Web content created');
  } catch (error) {
    console.error('Error creating content');
  }
}


// to update web content in liferay
const updateArticle = async (contentTitle, updateFieldsObj) => {
  try {
    const groupInfo=fetchGroupInfo(updateFieldsObj.Country);
    const {articleId , articleVersion} = await getArticleByPlantName(contentTitle,groupInfo[0]);
     if (articleId) {
       const xmlBuilder = create({ version: '1.0' })
        .ele('root', { 'available-locales': groupInfo[1], 'default-locale': groupInfo[1] });

      createXMLContent(xmlBuilder, Object.values(updateFieldsObj),groupInfo);
      const xmlContent = xmlBuilder.end({ prettyPrint: true });

      const data = qs.stringify({
        userId: '58951475',
        groupId: groupInfo[0],
        folderId: '0',
        articleId, articleId,
        version: articleVersion,
        titleMap: JSON.stringify({  [groupInfo[1]]: updateFieldsObj.PlantName }),
        descriptionMap: JSON.stringify({ [groupInfo[1]]: `Plant - ${updateFieldsObj.PlantName}` }),
        content: xmlContent,
        layoutUuid: ''
      });
      const headers = getAuthHeaders();
      const config = {
        method: 'post',
        url: 'https://liferayqa.cemex.com/api/jsonws/journal.journalarticle/update-article',
        headers,
        data
      };
      const response = await axios(config);
      console.log('Web content updated successfully');
    } else {
      console.log('Article ID not found for the given plant name:', contentTitle);
    }
  } catch (error) {
    console.error('Error updating web content:', error);
  }
};

// to delete web content from liferay
async function deleteArticle(contentTitle,countryName) {
  const groupInfo= fetchGroupInfo(countryName)
  const {articleId }= await getArticleByPlantName(contentTitle,groupInfo[0]);
   if (articleId) {
    var data = qs.stringify({
      'groupId': groupInfo[0],
      'articleId': articleId,
      'articleURL': ''
    });
    const headers = getAuthHeaders();
    var config = {
      method: 'post',
      url: 'https://liferayqa.cemex.com/api/jsonws/journal.journalarticle/delete-article',
      headers,
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log("Web content deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//get article by plant name to delete and update article
async function getArticleByPlantName(plantName,groupId) {
  var data = qs.stringify({
    'groupId': groupId,
    'ddmStructureKey': '59791276',
    'start': '-1',
    'end': '-1',
    '-obc': ''
  });
  const headers = getAuthHeaders();
  var config = {
    method: 'post',
    url: 'https://liferayqa.cemex.com/api/jsonws/journal.journalarticle/get-articles-by-structure-id',
    headers,
    data: data
  };
  try {
    const response = await axios(config);
    const articles = response.data;
    let articleId = null;
    let articleVersion = null;
    for (const article of articles) {
      const extractedTitle = article.title.replace(/<[^>]+>/g, '');
      if (extractedTitle.indexOf(plantName) !== -1) {
        articleId = article.articleId;
        articleVersion = await getLatestVersionArticle(articleId,groupId);
        break;
      }
    }
    return {articleId,articleVersion};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// to create xml content for add and update article
const createXMLContent = (xmlBuilder, values, groupInfo) => {
  const dynamicElementNames = [
    'Country', 'Region', 'Plant', 'PlantName', 'PlantAddressLine', 'PlantTown',
    'PlantCountry', 'PlantPostcode', 'PlantManagerName', 'PlantManagerPhone', 'PlantManagerEmail'
  ];

  const dynamicElementTypes = ['list', 'list', 'list', 'text', 'text', 'text',
    'text', 'text', 'text', 'text', 'text'];

  values.forEach((value, index) => {
    const name = dynamicElementNames[index];
    const type = dynamicElementTypes[index];
    const instanceId = name.toLowerCase();

    const dynamicElement = xmlBuilder.ele('dynamic-element', {
      name: name,
      type: type,
      'index-type': 'keyword',
      'instance-id': instanceId
    });

    const dynamicContent = dynamicElement.ele('dynamic-content', { 'language-id': groupInfo[1] });
    if (type === 'list' || type === 'text') {
      dynamicContent.txt(value);
    }

    dynamicContent.up();
    dynamicElement.up();
  });
};



//to get latest version article
async function getLatestVersionArticle(articleId,groupId) {
  var data = qs.stringify({
    'groupId': groupId,
    'articleId': articleId
  });
  const headers = getAuthHeaders();
  var config = {
    method: 'post',
    url: 'https://liferayqa.cemex.com/api/jsonws/journal.journalarticle/get-article',
    headers,
    data: data
  };
  try {
    const response = await axios(config);
    const article = response.data;
    return parseFloat(article.version).toFixed(1);
  } catch (error) {
    console.log(error);
    throw error;
  }
}


module.exports = {
  addArticle,
  deleteArticle,
  updateArticle
};
