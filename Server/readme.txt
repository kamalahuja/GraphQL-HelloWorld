1. Use nodemon src/index.js so you do not have to restart server again and again after change.
2. Since this uses prisma database you have to use npm install -g prisma
3. After making any chnages to prisma file you have to use prisma deploy
4. Initially you have to write datamodel.prisma file. And also prisma.yml.
5. then type prisma deploy.
6.Also you have to generate javascript clitn by typing prisma generate.

7. Instal postgre database using windows/ mac installer

8. INstalling Mongodb ->

 brew uninstall mongodb
 brew tap mongodb/brew
 brew install mongodb-community
 brew services start mongodb-community
 to start mongo client -> mongo