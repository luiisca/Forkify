import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addNewRecipeView from './views/addNewRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // Updating results
    resultsView.update(model.getSearchResultsPage());
    if (!id) return;
    // 1) Update bookmarks VIew
    bookmarksView.update(model.state.bookmarks);
    // 2)loading recipe
    await model.loadRecipe(id);
    // 3) Rendering recipe
    recipeView.renderSpinner();

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query || query === '') throw new Error(resultsView._errMessage);

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err);
  }
};

const controlPaginationButtons = function (goto) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goto));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // change servings on state
  model.changeServings(newServings);
  // update recipeView
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  // 1) Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipeview
  recipeView.update(model.state.recipe);

  // 3) Update bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addNewRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    // Render the uploaded recipe
    recipeView.render(model.state.recipe);
    addNewRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    // change the url with the id of the uploaded recipe
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close the modal after 1 second
    setTimeout(() => addNewRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err.message);
    addNewRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerClick(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPaginationButtons);

  addNewRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
