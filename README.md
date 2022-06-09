# deploy-nodejs

This repository is for the **GitHub** Action to deploy a **NodeJS** application 
## How to use

To use this **API** Action you will need to complete the following:
- run `npm install` to install the dependencies
- run `npm run build` to build the file

To use Seeder
- run `npx sequelize-cli db:seed:all` to run in development mode or deployment
- Default Email `demo@gmail.com`
- Default Password `12345678`

To use Migration
- run `npx sequelize-cli db:migrate` to run in development mode or deployment



Developer Side
-run `npm run start:dev` to run in development mode
- run `npm run serve` to automatically build and run the server in development mode after building


### User API


The link bellow is use for API:

```yml
---
###########################
###########################
## User API ##
###########################
###########################
name: NodeJS API

#
# Login:
# {{URL}}/user/login
#

#
# User List:
# {{URL}}/user
#

#
# Create User:
# {{URL}}/user/store
#

#
# Update User:
# {{URL}}/user/update
#

#
# Delete User:
# {{URL}}/user/delete/:id
#

#
# Bulk Delete User:
# {{URL}}/user/delete/:[ids]
#
