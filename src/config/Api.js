import axios from 'axios';
import {append} from 'domutils';
import {Form} from 'native-base';

export const BASE_URL = 'https://queryq.veevotech.com/';
export const STORY = 'inbox/story?page=1';

export const CHAT = 'inbox/message';
export const SENDMESSAGE = 'inbox/sendMessage/';
export const READSTATUS = 'inbox/message/read-status/';
export const IMAGEREADER = 'inbox/attachments/';
export const STATUS = 'inbox/story';
export const TEAM = 'team/org/';
export const SHARESTORY = 'inbox/story/share/';
export const DASHBOARD = 'dashboard';

export let userData = 'inbox/story';
export const setUserData = data => {
  userData = data;
  // alert(JSON.stringify(userData.org_oneid));
};

export const allStory = () => {
  return axios({
    headers: {
      Authorization: `bearer ${userData.jwt}`,
    },
    url: STORY,
    method: 'GET',

    baseURL: BASE_URL,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(`Story Error ${error}`);
    });
};

export const allChat = storyid => {
  return axios({
    headers: {
      Authorization: `bearar ${userData.jwt}`,
    },
    url: CHAT + '/' + storyid,
    method: 'GET',
    params: {
      page: '1',
    },
    baseURL: BASE_URL,
  })
    .then(res => {
      // alert(JSON.stringify(res.data, null, 2));
      return res;
    })
    .catch(error => {
      console.log('Ahmed' + error);
    });
};

export const sendMessage = (sendText, storyid, profile) => {
  console.log(sendText);
  console.log(profile);

  return axios({
    headers: {Authorization: `bearar ${userData.jwt}`},
    method: 'POST',
    baseURL: BASE_URL,
    url: SENDMESSAGE + profile,
    data: {
      message: {
        storyId: storyid,
        message: sendText,
        attachments: false,
      },
    },
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log('send message' + error);
    });
};

export const readStatus = storyid => {
  return axios({
    headers: {Authorization: `bearar ${userData.jwt}`},
    baseURL: BASE_URL,
    url: READSTATUS + storyid,
    method: 'PATCH',
  });
};

export const imageRead = id => {
  return axios({
    headers: {Authorization: `bearar ${userData.jwt}`},
    baseURL: BASE_URL,
    url: IMAGEREADER + id,
    method: 'GET',
  });
};
export const statusChange = (storyid, status) => {
  //alert(JSON.stringify({Authorization: `bearar ${userData.jwt}`}));
  return axios({
    headers: {Authorization: `bearar ${userData.jwt}`},
    baseURL: BASE_URL,
    url: STATUS + '/' + storyid,
    method: 'PATCH',
    data: {
      status: status,
    },
  })
    .then(res => {
      // alert(res);
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};

export const filePost = (file, storyid, profile) => {
  let type = Attachment(file.type);
  let Size = validateFileSize(file.size, type);

  if (Size == false) {
    return alert(' Please Upload 5MB Size File  ');
  }

  var bodyFormData = new FormData();
  bodyFormData.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  });

  console.log(bodyFormData);
  // alert(JSON.stringify(bodyFormData));
  //alert(JSON.stringify({Authorization: `bearar ${userData.jwt}`}));
  fetch('https://wa-api.veevotech.com/upload', {
    method: 'POST',
    body: bodyFormData,
  })
    .then(res => res.json())
    .then(res => {
      console.log(JSON.stringify(res));
      if (res.message == 'OK') {
        // alert('typee' + type);
        return axios({
          headers: {Authorization: `bearar ${userData.jwt}`},
          method: 'POST',
          baseURL: BASE_URL,
          url: SENDMESSAGE + profile,
          data: {
            message: {
              storyId: storyid,
              message: ' ',
              attachments: true,
            },
            attachments: {
              url: res.file.url,
              type: type,
              mimeType: res.file.FILE_MIME,
              fileName: res.file.FILE_NAME,
            },
          },
        });
      }
    })
    .catch(err => {
      console.log('Faraz Error' + JSON.stringify(err.response.data));
    });
};
const validateFileSize = (size, type) => {
  const sizeInMB = size / 1024 / 1024;
  if (sizeInMB <= 5 && type == 'IMAGE') return true;
  else if (sizeInMB <= 16 && type == 'AUDIO') return true;
  else if (sizeInMB <= 16 && type == 'VIDEO') return true;
  else if (sizeInMB <= 100 && type == 'FILE') return true;
  else return false;
};
const Attachment = MINETYPE => {
  const AllowType = ['IMAGE', 'VIDEO', 'AUDIO'];
  let type = MINETYPE.split('/')[0].toUpperCase();
  if (AllowType.includes(type)) {
    return type;
  } else {
    return 'FILE';
  }
};

// function validateFileSize(size, type) {
//   const sizeInMB = size / 1024 / 1024;
//   if (sizeInMB <= 5 && type == 'IMAGE') return true;
//   else if (sizeInMB <= 16 && type == 'AUDIO') return true;
//   else if (sizeInMB <= 16 && type == 'VIDEO') return true;
//   else if (sizeInMB <= 100 && type == 'FILE') return true;
//   else return false;
// }

export const filterCall = keyVal => {
  // alert(JSON.stringify(keyVal));
  return axios({
    headers: {Authorization: `bearar ${userData.jwt}`},
    url: STORY,
    method: 'GET',
    params: keyVal,
    baseURL: BASE_URL,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(`Story Error ${error}`);
    });
};

export const TeamList = () => {
  return axios({
    headers: {Authorization: `bearar ${userData.jwt}`},
    method: 'GET',
    baseURL: BASE_URL,
    url: TEAM + userData.org_oneid,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(`Story Error ${error}`);
    });
};

export const mineList = () => {
  return axios({
    headers: {
      Authorization: `bearer ${userData.jwt}`,
    },
    url: STORY,
    method: 'GET',
    params: {mine: 1},
    baseURL: BASE_URL,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      // alert(`Story Error ${JSON.stringify(error.response.data.message)}`);
    });
};

export const unassingList = () => {
  return axios({
    headers: {
      Authorization: `bearer ${userData.jwt}`,
    },
    url: STORY,
    method: 'GET',
    params: {replyEnd: 1},
    baseURL: BASE_URL,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(`Story Error ${error}`);
    });
};

export const shareStory = (storyid, data) => {
  return axios({
    headers: {
      Authorization: `bearer ${userData.jwt}`,
    },
    url: SHARESTORY + storyid,
    method: 'PATCH',
    baseURL: BASE_URL,
    data: {
      teamId: data,
    },
  })
    .then(res => {
      return res;

      // console.log('share' + JSON.stringify(res));
    })
    .catch(error => {
      console.log(error);
    });
};

export const dashboardData = () => {
  return axios({
    headers: {
      Authorization: `bearer ${userData.jwt}`,
    },
    url: DASHBOARD,
    method: 'GET',
    baseURL: BASE_URL,
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
      // alert(` ${JSON.stringify(err.response.data.message)}`);
      // if (err.response.data.message) {
      // }
    });
};
