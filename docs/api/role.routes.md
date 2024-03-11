## Role Endpoints

### Create Role ✅

```
POST api/v1/roles
```

#### Create Role Request
Authorization Policy

- Permission.Admin
- Role.Admin

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```
Body

```json
{
  "name": "admin"
}
```

#### Create Role Response 

```
201 Created
```

```json
{
  "id": "00000000000000000000"
}
```
<hr>
<br>



### Get Roles ✅

```
GET api/v1/roles/
```
#### Get Roles Request
Authorization Policy

- Policy.Authenticated

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Get Roles Response

```
200 Ok
```

```json
{
  "roles": [
    {
      "id": "00000000000000000000",
      "name": "admin",
      "permissions": [
        {
          "id": "00000000000000000000",
          "name": "crud:all"
        }
      ]
    },
    {
      "id": "00000000000000000000",
      "name": "editor",
      "permissions": [
        {
          "id": "00000000000000000000",
          "name": "view:user"
        },
        {
          "id": "00000000000000000000",
          "name": "create:user"
        },
        {
          "id": "00000000000000000000",
          "name": "delete:user"
        },
        {
          "id": "00000000000000000000",
          "name": "edit:user"
        }
      ]
    }
  ]
}
```
<hr>
<br>

### Get Role ✅

```
GET api/v1/roles/00000000000000000000
```
#### Get Role Request

Authorization Policy

- Policy.Authenticated

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Get Role Response

```
200 Ok
```

```json
{
  "id" : "00000000000000000000",
  "name":"admin",
  "permissions" : [
    {
      "id": {
        "value": "00000000000000000000"
      },
      "name": "crud:all"
    }
  ]
}
```
<hr>
<br>

### Edit Role ✅

```
PATCH api/v1/roles/00000000000000000000
```

#### Edit Role Request
Authorization Policy

- Permission.Admin

- Policy.Admin

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

Body

```json
{
  "changes":{
    "name":"user2",
    "permissions": [
      "00000000000000000000",
      "00000000000000000000"
    ]
  }
}
```

#### Edit Role Response

```
204 No Content
```
<hr>
<br>

### Delete Role ✅

```
DELETE api/v1/roles/00000000000000000000
```

#### Delete Role Request
Authorization Policy

- Permission.Admin

- Policy.Admin


Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Delete Role Response

```
204 No Content
```
<hr>
<br>