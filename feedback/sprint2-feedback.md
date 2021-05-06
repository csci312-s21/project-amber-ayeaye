# Feedback for alabaster-armadillo

(X) tagged commit on main for sprint2
(X) set of closed user stories
(X) working deployment on Heroku
(X) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

- Missing Matthew's reflection

## Discussion

### Functionality

The search is a nice feature and looks good. It would be good to catch errors and report them to the user however. I'll note that the search functionality does not work in my Firefox, but it does in my Chromium based browser (there is a CORS error). Look in the Spotify developer dashboard to see if you can authorize your app in some way to avoid this.

I will admit that I am a little worried about the amount of work you have left to make this a viable website. I think during your sprint meeting you will need to really focus on what you are going to deliver at the end of the project. What you have looks good, but I would hate to see you finish up with what is basically an attractive display component.

### User stories

The most recent user stories are reasonable, but I'll note that most of the items you actually accomplished _weren't_ user stories. While it is fine to have action items that aren't user stories, they should be linked back to a user story with justification. I would caution about items like "establish server/database". Yes, it needs to get done, but it is done in support of some functionality. I would prefer to see you focus on what the functionality is and let the work on the server (for example) fall out of that. Part of the problem is that I'm not sure when a task like this is done. Is it after typing `knex init`? After adding a file under `pages/api`?

I would like to see some more granularity in your user stories in the final sprint. For example, I see a user story about entering the songs of the playlist, but it includes album art populating and saving playlists to the server. You have accomplished some of those things, but clearly not all of them yet.

Then we have user stories like the "As a listener, I would like to see the whole playlist...". You don't even have a listener view yet, let alone support for storing the playlists and pushing changes to the listener's browser.

### Agility/scrum

I would suggest another column for storing your completed project board items. It is difficult to quickly assess what is left to accomplish in the sprint. This is especially true since you have some things that are not issues in there, so they can't be "closed". (I would also urge you to convert everything to issues for consistency).

I see assignees and some acceptance tests, but I'm not seeing any scoring on the items in the backlog.

I do see a fairly consistent pattern of work over the sprint, which is promising.

### Integration

The pull request process seems to be working well. I see some evidence that you are actively looking at each other's work and not passing it along trivially.

### Implementation

- You should update the README to include the things that the user needs to do to successfully deploy the site. I gave you generic instructions, but you should remove all of the generic stuff and make it specific to your app.

- If you are going to use NextAuth to allow users to log in you will need to move your spotify token endpoint to a new location -- it uses `auth`

- On the server, when you have terminal routes, you don't need an extra file (e.g., instead of `api/shows/index.js` you could just have `api/shows.js`). That said, it does look like all of endpoints are currently GET methods and I could imagine that you will add additional methods as you go.

- I see propTypes and some tests in there -- keep it up as you move forward.

- I'll admit that I set eslint up to look in src, but you should run it on your migrations and seed loaders as well.

- You don't actually need a separate migration for every table. If you are adding several tables that are related, it makes sense to add them all in the same migration (there is an example of this in the auth practical)

- You should put \*.sqlite3 in your gitignore file so you don't include the database in the repo
