const mongoose = require("mongoose");
const redis = require("redis");
// Update the Redis connection URL
const redisUrl = process.env.REDIS;

const client = redis.createClient({ url: redisUrl });

client.connect();

client.on("error", function (err) {
  console.log("Something went wrong ", err);
});

client.on("connect", function () {
  console.log("Redis Connected!");
});

mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

// const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  /*
        this.getOptions(), this.getQuery() will return the options and the flters of
        the query
        e.g. find({ _id : "kdsjfjfkfsSWEWQBJYJ"} , {skip : 0})
        getOptions() = { skip : 0}}
        getQuery() = { _id : "kdsjfjfkfsSWEWQBJYJ"}
        
        we'll compine the options and the filters of the query and
        stringfy it to create the key,
        note : this key will allways be uniqe, since every query will have
        diffrent options and filters
    */
  const key = JSON.stringify(
    Object.assign({}, this.getOptions(), this.getQuery())
  );

  // do we have a value for 'key' in Redis
  const cacheData = await client.get(key);
  // if we do, return that

  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  if (cacheData) {
    console.log("served from cache yaaaaaaaay");
    return JSON.parse(cacheData);
  }

  // otherwise, issue the query and store the result in Redis

  // execute the query
  const result = await exec.apply(this, arguments);
  // store the query result in Redis
  client.set(key, JSON.stringify(result));
  return result;
};

//client.set("key", "query result")

/**
 * mongoose.Query.prototype.cache = function () {
    this.useCache = true
    return this;
}

console.log('iam about to run a query');

if (!this.useCache) {
    return exec.apply(this, arguments)
}
 */
