const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: "UcbpzrLXdzteA4qrTZWkNUje5",
  consumer_secret: "zfFYCfb8Wt9aUslIt6JvYkyvB8XRxkt28SCPdUUqT9NmCsEPCV",
  access_token_key: "cHFGVXBVdTVHcjhLdzFjZXRzZ3I6MTpjaQ",
  access_token_secret: "gK4Zrnl9AbxD6IJg2V0JMSEk3mlCLvNlnHFO",
});

const getTrends = async (req, res) => {
  try {
    const trends = await client.get('trends/place.json', {
      id: 1, 
    });

    res.json({
      success: true,
      trends: trends,
    });
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getTrends };
