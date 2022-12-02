// eslint-disable-next-line import/no-extraneous-dependencies
const contentfulManagement = require('contentful-management');
require('dotenv').config();

module.exports = function getClient() {
	const contentfulClient = contentfulManagement.createClient({
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	return contentfulClient
		.getSpace(process.env.CONTENTFUL_SPACE_ID)
		.then(space => space.getEnvironment('master'));
};
