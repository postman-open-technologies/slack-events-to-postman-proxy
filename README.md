# slack-events-to-postman-proxy
This is a mini proxy server that lets you receive slack events(over the events API), and forward those events to Postmans webhook. 

[Slack Events API](https://api.slack.com/apis/connections/events-api) forwards all subscribed events as an HTTP requests to verified endpoint that you provide. When working with this API in Postman, you can use the [Postman's API to create a webhook](https://learning.postman.com/docs/collections/running-collections/collection-webhooks/) that can receive these events. 

The first step is to verify this URL which cannot be done since you have to [respond to the verification request with a challenge code](https://api.slack.com/apis/connections/events-api#challenge) provided by slack. Webhooks in Postman are meant to help you trigger a collection run, and hence, does not provide an interface that let's you describe the response to a webhook request

This repo is a work-around for this limitation, it acts as a proxy between slack's API(the client) and Postman webhook(the server), enabling you to easily complete the verification process while still routing all the necessary events to your Webhook in Postman.