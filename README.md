# shortly #
A URL shortening application

# run server
npm start

# run UI
_goto: public/shortly-ui_ 

npm start

Note: Mongo should be running on *27017* port. You can change the config from ```./config.js``` file

# eslint fix
npm run fix

# test
npm test

# pretest
pretest

# TODO
* Make UI to use the shortly

# API

## 1. /api/url/shortify
This api will enshort the provided url

**METHOD**
POST

**HEADERS**
Content-Type    :   application/json

**BODY**

```
{
    "url": "http://google.com/"
}
```

**RESPONSE**
```
{
    "shortedUrl": "http://localhost:3000/1d5920f4b44b27a802bd77c4f0536f5a"
}
```

## 2. /api/url/shortify?url=http://google.com/
This api will fetch the details of the enshorted url

**METHOD**
GET

**RESPONSE**
```
{
    "hash": "1d5920f4b44b27a802bd77c4f0536f5a",
    "urlPath": "google.com/",
    "protocol": "http:",
    "timeStamp": "2018-07-29T17:20:07.133Z"
}
```

## 3. /api/url/shortify
This api will delete the provided url

**METHOD**
DELETE

**HEADERS**
Content-Type    :   application/json

**BODY**

```
{
    "url": "http://google.com/"
}
```

## 4. /api/url/stats ##
This api will fetch the statistics of the enshorted url

**METHOD**
POST

**HEADERS**
Content-Type    :   application/json

**BODY**
```
{
    "url": "http://google.com/"
}
```

**RESPONSE**
```
[
    {
        "hits": 3,
        "userAgents": [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:60.0) Gecko/20100101 Firefox/60.0",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
        ],
        "device": [
            "windows"
        ],
        "type": "access",
        "ip": 1,
        "host": 1,
        "origin": 0,
        "referer": 0
    },
    {
        "hits": 4,
        "userAgents": [
            "PostmanRuntime/7.2.0"
        ],
        "device": [
            "windows"
        ],
        "type": "create",
        "ip": 1,
        "host": 1,
        "origin": 0,
        "referer": 0
    }
]
```


