const Koa = require('koa');
const router = require('koa-router')();
const Twitter = require('twitter');

const app = new Koa();

let twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.get('/getTwits/:hashTag', async (ctx) => {
  const hashTag = ctx.params.hashTag;
  let params = {q: `#${hashTag}`};

  ctx.body = await getTwits(params);
});

async function getTwits(params) {
  return new Promise((resolve, reject) => {
    let tweets = twitter.get('search/tweets', params, (error, tweets, response) => {
      if (error) {
        throw error;
      }

      resolve(tweets);
    });
  });
}

app.use(router.routes());
app.listen(3000);
