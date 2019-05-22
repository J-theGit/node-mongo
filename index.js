const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:mongo');

const url = config.get('server.host') + '/play';

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => debug('connected to', url))
    .catch(e => debug('could not connect', e.message));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean    
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse(author) {
    const course = new Course({
        name: 'node.js',
        author: author,
        tags: [
            'one',
            'two', 
        ],
        isPublished: false
    });
    return await course.save();
}

async function getCourses() {
    const results = await Course
        .find({ name: 'node.js' })
        .limit(10)
        .sort({ author: 1 })
        .select({ name: 1, tags: 1});
    debug(results);
}

getCourses();
// createCourse('Jevgenij').then((res) => debug('created', res._id));
// createCourse('Karolina').then((res) => debug('created', res._id))

