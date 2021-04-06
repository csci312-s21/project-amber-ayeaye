# Feedback for amber-ayeaye

(X) project repository with all team members
(X) package.json updated
(X) `npm test` and `npm run lint` run without errors
(X) travis reports build passing
(-) project deployed to heroku
(X) README.md is updated
(X) one pull request
(X) commit tagged sprint0
(X) backlog populated with epic user stories
(X) lo-fi storyboards created
( ) CRC cards created

## Checklist notes

- The link you added to the Heroku deployment is to the management dashboard (which I can't access). Please update the link so it points to the actual deployed app.
- You could do some further updates the the README. You can get rid of the background information and things like "Sprint 0". Make this a README for the project that an outsider could read and understand.
- The user stories should be in the Product backlog
- If you convert the user stories to issues, you will have more capabilities
- As you make your user stories, make sure to add acceptance tests -- how do you know when you have implemented the story?

## Design notes

User stories need to have the "so that..." part of the framing that gives the feature purpose. While a number of your stories include something similar, but on several, you need to go a little deeper -- what is the value to the stakeholder of the feature. For example, one of your stories is about a DJ wanting to have a show editing page. Why? What is the scenario where the DJ needs to do anything and what is the value? (I also doubt you will find that DJs really should be editing their schedule or show description).

I don't think you have quite grasped the idea of the CRC cards. The goal is to start thinking about the kind of data the system will be working with (like `article` and `film`). In your case it might be something like 'playlist', 'show', and `user` (among others).

You will clearly need to have a conversation with someone from the station to help sort out priorities, but initially, you should focus in on one piece of functionality. My vote would probably be to either focus on the display of playlists as a DJ enters them, or the schedule.
