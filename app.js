const API = require("./lib/API");
const readlineSync = require("readline-sync");

function displayPostsSummary(posts) {
  for (const post of posts) {
    if (post.comments.length > 0) {
      console.log(
        `--- ${post.id}: ${post.title}, upvotes: ${post.upvotes}, downvotes: ${post.downvotes}, comments: ${post.comments.length}`
      );
    } else {
      console.log(
        `--- ${post.id}: ${post.title}, upvotes: ${post.upvotes}, downvotes: ${post.downvotes}, no comments yet... why not leave one yourself?`
      );
    }
  }
}

function displayPostDetails(post) {
  console.log(`-- Title: ${post.title} --`);
  console.log(`-- upvotes: ${post.upvotes} --`);
  console.log(`-- downvotes: ${post.downvotes} --`);
  console.log(`-- Comments: --`);
  for (const comment of post.comments) {
    console.log(`${comment}`);
  }
  console.log(`-------------------`);
}

function displayPostComments(post) {
  console.log(`-- Title: ${post.title} --`);
  console.log(`-- Comments: --`);
  for (const [i, comment] of post.comments.entries()) {
    console.log(`${i}. ${comment}`);
  }
  console.log(`-------------------`);
}

function displayPostVoteScore(post) {
  console.log(`-- Title: ${post.title} ---------------`);
  console.log(`-- Post Score: (Upvotes - Downvotes) --`);
  console.log(`-- score: ${post.upvotes - post.downvotes} --------`);
  console.log(`-------------------`);
}

function displayPostVotes(post) {
  console.log(`-- Title: ${post.title} --`);
  console.log(`-- upvotes: ${post.upvotes} --`);
  console.log(`-- downvotes: ${post.downvotes} --`);
  console.log(`-- score: ${post.upvotes - post.downvotes} --`);
}

function displayPostComments(post) {
  console.log(`-- Title: ${post.title} --`);
  console.log(`-- Comments: --`);
  for (const comment of post.comments) {
    console.log(`${comment}`);
  }
  console.log(`-------------------`);
}

function chooseAPost(posts) {
  // display each ID and title
  for (const post of posts) {
    console.log(`--- ${post.id}: ${post.title}`);
  }

  // user inputs an ID number
  const postChoice = readlineSync.question(
    "Enter the post ID which you like to choose: "
  );
  const post = API.read("posts", postChoice);

  // if the API can't find that post
  // run chooseAPost again
  if (post !== undefined) {
    return post;
  } else {
    console.log("Sorry, we can't find that post!");
    return chooseAPost(posts);
  }
}

function viewOurPostsMenu() {
  console.log("-----------------");
  console.log("- ALL OUR POSTS -");
  console.log("-----------------");

  // get all posts
  const posts = API.read("posts");
  displayPostsSummary(posts);

  // return to main menu
  mainMenu();
}

function viewPostCommentsMenu() {
  console.log("-----------------");
  console.log("- CHOOSE A POST -");
  console.log("-----------------");

  // get all posts
  const posts = API.read("posts");

  // pass all posts by chooseAPost function
  const post = chooseAPost(posts);

  // chooseAPost returns a post, so show the details:
  displayPostComments(post);

  // Input review details
  const comment = readlineSync.question("Please write your comment here: ");

  // add the new review to the post reviews
  post.comments.splice(comment);

  // update the post in the API
  API.update("posts", post);

  console.log("----------------------------");
  console.log("Thanks for leaving a comment!");
  console.log("----------------------------");

  // return to main manu
  mainMenu();
}

function leaveCommentOnPostMenu() {
  console.log("-----------------");
  console.log("- CHOOSE A POST -");
  console.log("-----------------");

  // get all posts
  const posts = API.read("posts");

  // pass all posts by chooseAPost function
  const post = chooseAPost(posts);

  // chooseAPost returns a post, so show the details:
  displayPostDetails(post);

  // Input review details
  const comment = readlineSync.question("Please write your comment here: ");

  // add the new review to the post reviews
  post.comments.push(comment);

  // update the post in the API
  API.update("posts", post);

  console.log("----------------------------");
  console.log("Thanks for leaving a comment!");
  console.log("----------------------------");

  // return to main manu
  mainMenu();
}

function upVoteDownVotePostMenu() {
  console.log("-----------------");
  console.log("- CHOOSE A POST -");
  console.log("-----------------");

  // get all posts
  const posts = API.read("posts");

  // pass all posts by chooseAPost function
  const post = chooseAPost(posts);

  // chooseAPost returns a post, so show the votes:
  displayPostVotes(post);

  console.log("----------------------");
  console.log("---- UP/DOWN VOTE ----");
  console.log("----------------------");
  console.log("1. Upvote post");
  console.log("2. Downvote post");

  // Input review details
  const upDownVoteChoice = readlineSync.question(
    "Please choose upvote or downvote: "
  );

  if (upDownVoteChoice === "1") {
    // upvote it:

    // increase post upvote value:
    post.upvotes++;

    // update the post in the API
    API.update("posts", post);

    console.log("--------------------------------------");
    console.log("---- Thanks for upvoting the post ----");
    console.log(`---- New post score: ${post.upvotes - post.downvotes} ----`);
    console.log("--------------------------------------");

    // return to main manu
    mainMenu();
  } else if (upDownVoteChoice === "2") {
    // downvote it:

    // increase post downvote value:
    post.downvotes++;

    // update the post in the API
    API.update("posts", post);

    console.log("--------------------------------------");
    console.log("---- Thanks for downvoting the post ----");
    console.log(`---- New post score: ${post.upvotes - post.downvotes} ----`);
    console.log("--------------------------------------");

    // return to main manu
    mainMenu();
  } else {
    console.log("Sorry, invalid choice. Starting again.");
    mainMenu();
  }
}

function viewPostScoreMenu() {
  console.log("-----------------");
  console.log("- CHOOSE A POST -");
  console.log("-----------------");

  // get all posts
  const posts = API.read("posts");

  // pass all posts by chooseAPost function
  const post = chooseAPost(posts);

  // chooseAPost returns a post, so show the votes:
  displayPostVoteScore(post);

  mainMenu();
}

function deletePostMenu() {
  console.log("----------------------------");
  console.log("- CHOOSE A POST TO DELETE! -");
  console.log("----------------------------");

  // get all posts
  const posts = API.read("posts");

  // pass all posts by chooseAPost function
  const post = chooseAPost(posts);

  // Input review details
  const deleteChoice = readlineSync.question(
    "Please press 1 to confirm deletion of this post: "
  );

  if (deleteChoice === "1") {
    // update the post in the API
    API.destroy("posts", post.id);

    console.log("----------------------------");
    console.log(`You deleted post id ${post.id} !`);
    console.log("----------------------------");
  } else {
    console.log(`You did not enter 1, returning to main menu`);
  }

  // return to main manu
  mainMenu();
}

function mainMenu() {
  console.log("----------------");
  console.log("---- REDDIT ----");
  console.log("----------------");
  console.log("1. View our posts");
  console.log("2. View post comments");
  console.log("3. Leave a comment on a post");
  console.log("4. Upvote or Downvote a post");
  console.log("5. View post score");
  console.log("6. Delete a post");
  console.log("----------------");

  const choice = readlineSync.question("Please choose a menu option ");

  if (choice === "1") {
    viewOurPostsMenu();
  } else if (choice === "2") {
    viewPostCommentsMenu();
  } else if (choice === "3") {
    leaveCommentOnPostMenu();
  } else if (choice === "4") {
    upVoteDownVotePostMenu();
  } else if (choice === "5") {
    viewPostScoreMenu();
  } else if (choice === "6") {
    deletePostMenu();
  }
}

mainMenu();
