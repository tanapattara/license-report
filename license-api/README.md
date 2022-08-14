# Database structure
## users table
|field|type|null|key|default|extra|
|-----|----|----|---|-------|-----|
|id|int(11)|NO|PRI|NULL|auto_increment|
|username|varchar(255)|YES||NULL|
|email|varchar(255)|YES||NULL|
|password|varchar(255)|YES||NULL|
|createdAt|datetime|NO||NULL|
|updatedAt|datetime|NO||NULL|

# roles table
|field|type|null|key|default|extra|
|-----|----|----|---|-------|-----|
|id|int(11)|NO|PRI|NULL|auto_increment|
|name|varchar(255)|YES||NULL|
|createdAt|datetime|NO||NULL|
|updatedAt|datetime|NO||NULL|

# user_roles table
|field|type|null|key|default|extra|
|-----|----|----|---|-------|-----|
|roleid|int(11)|NO|PRI|NULL|
|userid|int(11)|NO|PRI|NULL|
|createdAt|datetime|NO||NULL|
|updatedAt|datetime|NO||NULL|