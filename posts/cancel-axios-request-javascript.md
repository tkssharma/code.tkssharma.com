---
tags:
  - javascript
published: true
date: 2020-03-09T13:54:07.809Z
title: cancelling axios request javascript
---

I have to implement a search functionality and it will trigger the search api in every key up event. After I complete typing a long search key, the search results will be override by the sub-string of my search key. Why?
For example, my keyword is frontend.

* when I type front, it will trigger the search api
* when I finish the word frontend, it will trigger another api call
* when i change text in field 

the api result for frontend return
the api result for front return, and it will override the result frontend

the search results of “front” return slower than search results of “frontend” because there will be definitely more results containing “front” comparing to “frontend”

Therefore, I need to come up a way to cancel the previous axios request when a new request is triggered.


```javascript
const makeRequestCreator = () => {
  let cancel;
  return query => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    query.cancelToken = cancel.token;
    return axios(query)
      .then(res => {
        const result = res.data.result;
        // Store response
        return Promise.resolve(result);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          // eslint-disable-next-line no-console
          console.log('request has been cancelled');
          return Promise.reject(err);
          // Handle if request was cancelled
          // console.log("Request canceled", error.message);
        } else {
          return Promise.reject(err);
          // Handle usual errors
          //console.log("Something went wrong: ", error.message);
        }
      });
  };
  ```
The server api will keep searching on multiple request but only the last request will get the api response returning back since all previous request is cancelled.

Each cancelled request will raise the error in catch block, but you can check if it is real error or just because of request cancelled.