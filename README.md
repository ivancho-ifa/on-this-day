# On this day...

## Description
A website for exploring and sharing information about historic events. Created following the idea of [our Facebook page](https://www.facebook.com/natoziden681/notifications/).


### For contributors

#### For developers

Prerequisites:
- Installed [Node.js LTS](https://nodejs.org/dist/v10.16.3/node-v10.16.3-x64.msi). LTS is required because [bcrypt](https://www.npmjs.com/package/bcrypt) works only with LTS.

Getting the project:
1. Clone this repository.
2. Go to project dir.
3. Install the project
```bash
git clone https://github.com/ivancho-ifa/on-this-day.git # 1
cd on-this-day/on-this-day-backend                       # 2
npm install                                              # 3
cd on-this-day/on-this-day-frontend                      # 2
npm install                                              # 3
```

Running the project in delopment environment:
```bash
# From the project folder:
cd on-this-day-backend
# Create a file ./config.js with content:
#
# module.exports = {
#     JWTSecret: 'A JWT secret',
#     mongoConnectionURI: 'A MongoDB connection URI' 
# }
#
npm start
```
```bash
# From the project folder:
cd on-this-day-frontend
npm start
```
