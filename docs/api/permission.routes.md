## Permission Endpoints

### Create Permission ✅

```
POST api/v1/permissions
```

#### Create Permission Request
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
  "name": "view:user"
}
```

#### Create Permission Response

```
201 Created
```

```json
{
  "id": "65e59331e8ce762676341749"
}
```
<hr>
<br>



### Get Permissions ✅

```
GET api/v1/permissions/
```
#### Get Permissions Request
Authorization Policy

- Policy.Authenticated

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Get Permissions Response

```
200 Ok
```

```json
{
  "permissions": [
    {
    "id" : "65e59331e8ce762676341749",
      "name": "view:user"
    },
    {
      "id" : "65e59331e8ce762676341749",
      "name": "create:user"
    }
  ]
}
```
<hr>
<br>

### Get Permission ✅

```
GET api/v1/roles/65e59331e8ce762676341749
```
#### Get Permission Request

Authorization Policy

- Policy.Authenticated

Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Get Permission Response

```
200 Ok
```

```json
{
  "id": "65e59331e8ce762676341749",
  "name":"view:user"
}
```
<hr>
<br>

### Edit Permission ✅

```
PATCH api/v1/roles/65e59331e8ce762676341749
```

#### Edit Permission Request
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
  "name": "65e59331e8ce762676341749"
}
```

#### Edit Permission Response

```
204 No Content
```
<hr>
<br>

### Delete Permission ✅

```
DELETE api/v1/roles/65e59331e8ce762676341749
```

#### Delete Permission Request
Authorization Policy

- Permission.Admin

- Policy.Admin


Headers

```
Authorization: Bearer eyJhbGciOiJSUzI1...
```

#### Delete Permission Response

```
204 No Content
```
<hr>
<br>