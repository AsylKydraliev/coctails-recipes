const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Cocktail = require("./models/Cocktail");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin] = await User.create({
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

    await Cocktail.create({
            user: user,
            title: 'Mojito',
            image: 'mojito.jpg',
            recipe: 'Use freshly squeezed limes for best flavor. When shopping for limes, look for fruits with smooth skin, as this indicates the fruit is full of juice.',
            ingredients: [
                {name: 'Lime', amount: '1 slice'},
                {name: 'Sprite', amount: '50ml'},
                {name: 'Schwepess', amount: '20ml'},
            ],
            isPublished: false,
        }, {
            user: user,
            title: 'Dry Martini',
            image: 'martini.jpg',
            recipe: 'Scoop ice into a shaker. Pour in gin and vermouth. Cover shaker, and gently shake to mix vermouth and gin.',
            ingredients: [
                {name: 'Gin', amount: '50ml'},
                {name: 'Dry vermouth', amount: '50ml'},
                {name: 'Ice', amount: 'three thing'},
                {name: 'Green olive', amount: '1 thing'},
            ],
            isPublished: true,
        }, {
            user: user,
            title: 'Margarita',
            image: 'margarita.png',
            recipe: 'Moisten the rim of a glass with a lime wedge. Sprinkle salt onto a plate. Lightly dip the moistened rim into the salt. Place a large ice cube in the glass and freeze the prepared glass until ready to serve.',
            ingredients: [
                {name: 'Lime', amount: '1 slice'},
                {name: 'Tequila', amount: '50ml'},
                {name: 'Lime juice', amount: '20ml'},
            ],
            isPublished: false,
        }, {
            user: admin,
            title: 'Whiskey Sour',
            image: 'Whiskey.jpeg',
            recipe: 'Combine the simple syrup, lemon juice and whiskey in a shaker. Fill with ice. Cover and shake for about 30 seconds, until the shaker is frosty. Strain into martini glasses and garnish with a maraschino cherry. This can also be served in tumblers full of ice',
            ingredients: [
                {name: 'Simple syrup', amount: '30ml'},
                {name: 'Fresh lemon juice', amount: '50ml'},
                {name: 'Whiskey', amount: '40ml'},
            ],
            isPublished: true,
        }, {
            user: admin,
            title: 'Aperol Spritz',
            image: 'aperol.jpg',
            recipe: 'Fill a wine glass with ice cubes; pour in Prosecco and carbonated water. Top cocktail with bitter orange aperitif. Garnish with orange slice',
            ingredients: [
                {name: 'Carbonated water', amount: '1 splash'},
                {name: 'Orange aperitif', amount: '1.5 fluid'},
                {name: 'Orange', amount: '1 slice'},
            ],
            isPublished: true,
        }, {
            user: admin,
            title: 'Bloody Mary',
            image: 'mary.jpg',
            recipe: 'Salt the rim of a tall glass. To do so, pour salt onto a small plate, moisten the rim of the glass on a damp towel and press into the salt. Fill the glass with ice cubes.!',
            ingredients: [
                {name: 'Jigger vodka', amount: '1.5 fluid'},
                {name: 'Tomato-vegetable juice cocktail', amount: '50ml'},
                {name: 'Green olives', amount: '2 stuffed'},
            ],
            isPublished: true,
        }
    );

    await mongoose.connection.close();
};

run().catch(e => console.error(e));