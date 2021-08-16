export interface UserData {
    "cell" : string,
    "dob": {
      "age": number,
      "data": string
    },
    "email": string,
    "gender" : string,
    "id" : {
      "name" : string,
      "value" : number
    },
    "location" : {
      "city": string,
      "coordinates" : {
        "latitude" : string,
        "longitude" : string
      },
      "country" : string,
      "postcode" : number,
      "state": string,
      "street" : {
        "name" : string,
        "number" : number
      },
      "timezone" : {
        "offset" : string,
        "description": string
      },
    },
    "login" : {
      "md5": string,
      "password" : string,
      "salt" : string,
      "sha1" : string,
      "sha256" : string,
      "username" : string,
      "uuid" : string
    },
    "name" : {
      "first" : string,
      "last" : string,
      "title" : string
    },
    "nat" : string,
    "phone" : string,
    "picture" : {
      "large" : string,
      "medium" : string,
      "thumbnail" : string
    },
    "registered" : {
      "age" : number,
      "date" : string
    }
  }
  
  export interface DataMap {
    "info" : {
      "page" : number,
      "results": number,
      "seed" : string,
      "version" : string
    },
    "results" : Array<UserData>
  }
  
  export interface CountryUser {
    "name" : string,
    "gender": string,
    "city": string,
    "state": string,
    "registered": Date
  }
  
  export interface Countries {
    [country : string] : Array<CountryUser>
  }
  
  