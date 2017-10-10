const mongoose = require('mongoose');
const Story = require('../model/story.model');
const Editor = require('../model/editor.model');

const getAllStories = async (ctx, next) => {
  try {
    const page = parseInt(ctx.params.page);
    if (typeof page === 'number') {
      const stories = await Story.getAllStories();
      const pagination = page - 1;
      const limit = 20;
      const results = stories.slice(pagination*limit, pagination*limit + limit);
      ctx.body = results;
    } else {
      console.log('foo')
    }
  } catch (error) {
    console.log(error);
  }
};

const viewStory = async (ctx, next) => {
  try {
    const story = await Story.viewStory(ctx.params);
    ctx.body = story;
  } catch (error) {
    console.log(error);
  }
};

const createStory = async (ctx, next) => {
  try {
    const storyData = {
      editor: await Editor.findOne(),
      title: ctx.request.body.title,
      tagLine: ctx.request.body.tagLine,
      map: ctx.request.body.map,
      duration: ctx.request.body.duration,
    };
    const createdStory = await Story.createStory(storyData);
    ctx.status = 201;
    ctx.body = createdStory;
  } catch (error) {
    ctx.throw('Could not create story!');
  }
};

const editStoryMeta = async (ctx, next) => {
  try {
    const editedStory = await Story.editStoryMeta(ctx.request.body, ctx.params);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(401, 'Could not edit story!');
  }
};

module.exports = {
  getAllStories,
  viewStory,
  createStory,
  editStoryMeta,
};
