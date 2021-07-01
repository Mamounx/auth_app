const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://admin:1@cluster0.8a99v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function connectdb(loginCred, isReset){
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try{
        await client.connect();

        const authdb = client.db('auth_app');   
        // const user = await findUser(authdb, loginCred)
        // return user;
        if (isReset){
            updateUser(authdb, loginCred);
        }

        if (loginCred.username){
            const user = await createUser(authdb, loginCred);
            return user;
        } else{
            const user = await findUser(authdb, loginCred)
            return user;
        }

    } catch(err){
        console.error(err);
    } finally {
        await client.close();
    }

    
}

async function listAllDatabases(authdb){
    const allDatabases = await client.db().admin().listDatabases();
    console.log("Databases:");
    allDatabases.databases.forEach(db => {
        console.log(`-${db.name}`);
    })
}

async function createUser(authdb, user) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            console.log(`HASH: ${user.password} - ${hash}`)
            user.password = hash;
            // Store hashed password in DB.    
            const createdUser = authdb.collection("Users").insertOne(user);
            return createdUser;

        });
    });
}

async function updateUser(authdb, user) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            console.log(`HASH: ${user.password} - ${hash}`)
            user.password = hash;
            // Store hashed password in DB.    
            const updatedUser = authdb.collection("Users").updateOne({email: user.email}, { $set: {passwrod: user.password}});
            return updatedUser;

        });
    });
}

async function findUser(authdb, user){
    // Find the user in the database by the entered credintials
    const foundUser = await authdb.collection('Users').findOne({"email": user.email});
    
    if (foundUser){
        const match = await bcrypt.compare(user.password, foundUser.password)
        if (match){
            return foundUser;
        }
    }
    return {};
}


module.exports.connectdb = connectdb;