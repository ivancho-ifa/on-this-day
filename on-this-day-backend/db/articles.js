const mongodb = require('mongodb')

const Collection = require('./collection')


class Articles extends Collection {
	constructor(collection) {
		super(collection)
	}

	getArticle(id) {
		return this.collection.findOne({_id: new mongodb.ObjectID(id)})
	}

	getArticles(criteria) {
		return this.collection.aggregate([{
			$project: {
				'date': { $dayOfMonth: '$date' },
				'month': { $month: '$date' },
				'year': { $year: '$date' }
			}}, {
			$match: criteria }, {
			$project: {
				'_id': { $toObjectId: '$_id' }
			}
		}])
	}

	addArticle(articleData) {
		return this.collection.insertOne({
			title: articleData.title,
			titleImageSrc: articleData.titleImageSrc,
			titleImageCaption: articleData.titleImageCaption,
			subtitle: articleData.subtitle,
			content: articleData.content.split(/\n\r|\r\n|\n|\r/).filter(paragraph => paragraph !== ""),
			date: new Date(articleData.date),
			authorID: new mongodb.ObjectID(articleData.authorID)
		})
	}

	editArticle(articleID, articleData) {
		return this.collection.updateOne({
			_id: new mongodb.ObjectID(articleID)
		}, {
			$set: articleData
		})
	}
}


module.exports = Articles
