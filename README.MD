# Music-room
* server => nodeJs
* client => React Native

# Installation

* ```brew install mongodb```
* ```brew install cocoapods```
* ```brew install nodejs```
* ```npm install -g yarn```
* ```npm install -g expo```

# Start Server

* Start mongo ```mongod --dbpath mongo```
* Start server```cd server && yarn && yarn start-dev```

# Start Client

* ```yarn fix```
* ```exp start```
* ```cd ios && pod install```
* ```open ios/music-room-client.xcworkspace/```
* Run simulateur in Xcode
* Be patient.
* GO!

# Documentation

* ```yarn doc && open doc/index.html```

# Lint

* ```yarn lint```

# Test
* make some test for the server


# CI 
* runner git-lab to run test on the serveur

# Deploy
* shipit to deploy to AWS EC2

# Monnitoring
* Pm2 && keymetrics

# Benchmark
* Siege
* siege -c 50 ``adresse:80/users`` (ec2 adresse)
* Open htop on server and keymetrics

## Todo
* Music Track Vote
* Test the project
* Make correction
