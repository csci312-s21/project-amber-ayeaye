# Feedback for amber ayeaye

(X) tagged commit on main for sprint3
(X) working deployment on Heroku
(X) travis reports build passing
(-) handoff instructions

## Checklist notes

The handoff instructions should have been more explicit about which environment variables were needed and how to acquire them (for example, for the spotify access).

## Discussion

### Functionality

The site looks good and you got a couple of marquee pieces of functionality built, which is great (the Spotify integration, the live updates, and the embedded player). The functionality for searching and adding new tracks is pretty slick.

On the flip side, the schedule and the playlist explorer feel a bit like after thoughts. They are just sort of there on the homepage. It feels like you built the component and didn't know how to integrate them in so you just plunked them down on the homepage. They work, but feel unfinished.

I also have concerns about the DJ page flow. When you start on the page, you need to pick a show, and there wasn't really much thought about the association between DJs and shows. This feels like an interface that won't scale well. More concerning is that if the user leaves the page for any reason, the playlist is ended. It seems like there is some missing state that needs to be addressed to make that persist across the site.

My other concern (and I've not yet done my dive into the code) is that the mechanism for fetching periodic updates from the server is a bit heavy weight. I opened two browser windows to watch the live updates, and my laptop fan kicked into high gear. I suspect finding alternate solutions or reducing the frequency of updates would help.

### User stories

Most of the user stories I see for this sprint are well written. One exception is #42, which seems redundant with #41 and lacks a rationale. Most of the are missing acceptance tests as well.

### Agility/scrum

I see steady work, but there is obviously a big spike at the end in the number of changes and commits.

I also note that there is a bit of inconsistency in how you handled the backlog. You have a completed backlog column, but it looks like you switched over to keeping the items in the backlog and closing the associated issue. This is okay, but it would have been good to be consistent. One of the issues with this is illustrated by the top item in the sprint 3 backlog (#43). The issue is closed, but it is clearly not completed. Not only is there no way for the DJ to edit their show, there isn't even a real association between DJs in the system and shows.

### Integration

I'm seeing some good PR action with actual comments. I did notice that in some instances the back and forth seemed to be between two sides of a pair programming set, which is slightly sketchy.

### Implementation

You have a lot of different tables, but it doesn't seem like there is much association happening other than between song and playlist. I realize that this is probably because the database came so late in the game, but if this site was to add more functionality, it would be important to better integrate the DJ data with the schedule.

For the `setInterval` heartbeat, you added in an extra state. There is no reason for `setInterval` to set a temporary state. It should just call a function to fetch new data. The new data will cause an update to the state, which will handle re-rendering. This is particularly problematic because you call `setInterval` in the render function, so it gets called again from the update to the `timePassed` variable and then it will get called again if there is new data to load. Over time, this will cause a multiplying number of `setTimeouts` to be running simultaneously. This is evidenced by the fact that when I left the site open too long it gave me the spinning beachball of death when I went to close it because it had so many queued tasks. That was without many playlist updates. In a real scenario with playlist updates happening regularly you would crash user's browsers.

Testing is a bit hit or miss. There are a couple of things that look like they have reasonable tests (like the playlist explorer and the database functions), but there is a fair amount of functionality that is just hanging out there. I'm also not seeing much in the way of integration testing.

## Final Thoughts

The site looks great, and you have some features that I'm sure the folks working on the WRMC site will want to lift. However, it is also true that the site is on the simpler side, and there are some hidden issues that would trip up future development.
