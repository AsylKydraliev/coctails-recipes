const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        email: 'user@gmail.com',
        displayName: 'user',
        password: '123',
        token: nanoid(),
        role: 'user',
        avatar: 'user.png',
    }, {
        email: 'admin@gmail.com',
        displayName: 'admin',
        password: '123',
        token: nanoid(),
        role: 'admin',
        avatar: 'user.png',
    });

    const [TheWeekend, KanyeWest, Drake] = await Artist.create({
        title: 'TheWeekend',
        photo: 'weekend.jpeg',
        info: 'The best artist 2020!',
        isPublished: true,
    }, {
        title: 'KanyeWest',
        photo: 'west.jpg',
        info: 'Top performer 2021!',
        isPublished: false,
    }, {
        title: 'Drake',
        photo: 'drake.jpg',
        info: 'Amazing performer 2022!',
        isPublished: false,
    });

    const [Long, Fourth, Songs, Never, New, Some] = await Album.create({
            title: 'Long story short',
            artist_id: TheWeekend,
            year: '2020',
            image: 'album.jpeg',
            isPublished: true,
        }, {
            title: 'Fourth dimension',
            artist_id: KanyeWest,
            year: '2021',
            image: 'album.jpeg',
            isPublished: true,
        }, {
            title: 'Songs for two',
            artist_id: Drake,
            year: '2022',
            image: 'album.jpeg',
            isPublished: true,
        },{
            title: 'Never give up',
            artist_id: TheWeekend,
            year: '2022',
            image: 'album.jpeg',
            isPublished: false,
        },{
            title: 'New Album 2022',
            artist_id: KanyeWest,
            year: '2022',
            image: 'album.jpeg',
            isPublished: false,
        },{
            title: 'Some Album 2021',
            artist_id: Drake,
            year: '2021',
            image: 'album.jpeg',
            isPublished: false,
        }
    );

    await Track.create({
            title: 'Commercial brake',
            album: Long,
            duration: '3:16',
            isPublished: false,
        }, {
            title: 'New song',
            album: Fourth,
            duration: '3:20',
            isPublished: false,
        }, {
            title: 'For two song',
            album: Songs,
            duration: '3:21',
            isPublished: true,
        }, {
            title: 'Song for new year',
            album: Never,
            duration: '3:16',
            isPublished: false,
        }, {
            title: 'Song for summer',
            album: Never,
            duration: '3:16',
            isPublished: true,
        }, {
            title: 'Song for autumn',
            album: Long,
            duration: '3:16',
            isPublished: true,
        }, {
            title: 'Song for winter Fourth',
            album: Fourth,
            duration: '3:20',
            isPublished: true,
        },{
            title: 'Song for new year Fourth',
            album: New,
            duration: '3:20',
            isPublished: false,
        }, {
            title: 'Song for summer Fourth',
            album: New,
            duration: '3:20',
            isPublished: true,
        }, {
            title: 'Song for autumn Fourth',
            album: Fourth,
            duration: '3:20',
            isPublished: false,
        }, {
            title: 'For two song Songs',
            album: Songs,
            duration: '3:21',
            isPublished: false,
        },{
            title: 'For child song Songs',
            album: Songs,
            duration: '3:21',
            isPublished: true,
        },{
            title: 'For new year song Songs',
            album: Some,
            duration: '3:21',
            isPublished: false,
        },{
            title: 'For five song Songs',
            album: Some,
            duration: '3:21',
            isPublished: true,
        },
    );

    await mongoose.connection.close();
};

run().catch(e => console.error(e));