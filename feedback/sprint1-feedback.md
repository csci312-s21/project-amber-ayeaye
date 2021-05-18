# Feedback for amber-ayeaye

(X) tagged commit on main for sprint1
(X) set of closed user stories
(X) working deployment on Heroku
(X) travis reports build passing
(X) team members have completed reflection
(X) demo

## Checklist notes

It would be good if you did a little more editing to your README so that readers would encounter your information first, rather than my generic discussion.

## Discussion

### Functionality

I am glad that you got the lastFM integration in early. That is a good piece to be finished with so you can focus on the site itself. I also see that you got material-ui working, which is another good first step.

What you showed this week is obviously more of a technology demo, which is appropriate given the time and where your focus was. The result, however, is a collection of buttons and entry fields that don't necessarily all make sense on the same page.

For the next sprint I would like to see something that is more obviously a part of the final website. It would be good to sketch in the overall site -- remember that we are striving for incremental AND iterative progress.

I would also encourage you to give some thought to the UX of your pages. For example, my understanding is that the DJs enter in their playlist _as they play the music_ so it tracks with what is playing. Make sure you support this. Another possible design might support the DJ entering a list of songs ahead of time and selecting them as she plays them. Talk with some folks who DJ and see what makes the most sense and then write a user story that encompasses that use case.

### User stories

For the completed user stories, I like that you have included the acceptance tests. Issue #12 does illustrate on of the challenges we have building up the website incrementally. The acceptance criteria specifies that the song will be found in the collection, except that you have no persistence, so you will need to revisit this task again.

I am fine with you including high-level notes into the backlog to help you think about your goals, but you should perhaps mark them as such.

Going forward, think about breaking down the user stories into smaller stories to give yourself more implementation granularity.

The dropdown menu is an example of what happens when you don't focus on your user stories or break them down fine enough. This is not functionality that is described in a user story, yet someone clearly took time worrying about how to make it work. If it was part of a DJ entering in a song, then the user story should not be marked as complete. In any event, it hasn't been justified

Here is a suggestion for a user story I might contribute: "As DJ entering songs into the playlist, I would like the most recently entered song to be immediately visible so that I can quickly check that it was entered properly without having to move around on the page." Note that this is: _Independent_ - anyone could jump on this and do it at any point. _Negotiable_ - the easiest way to implement this would be to flip the list, but other options are possible. _Valuable_ - providing visible feedback to the user is almost always desirable. Here the DJ would like to know (a) that the song was entered, and (b) was it correctly identified, and because the DJ is focused on other things, they want to be able to do this without doing more than slightly moving their eyes. _Estimable_ - once the particulars of the implementation are decided it should be straightforward to estimate how long it would take (e.g., if it is displaying the list in reverse order, 15 mins or so including writing the tests). _Small_ - This is a single feature that someone could address in a single sitting. _Testable_ - The acceptance criteria is pretty easy. The song should be visible when it has been submitted. Admittedly, the actual testing of this is a little gnarlier. We don't have a great way of specifying that an element is in a visible region of the screen. The current design would already suggest that the element was "visible". But, if the implementation was to just reverse the list, then you could test that the items showed up in reverse chronological order.

I could have just suggested it would be better to make the list with the newest on top, but expressing it as a user story forces me to articulate why I think that would be better while opening the door for alternate designs that satisfy the same need. Returning to the dropdown options, I do think that there is a design justification for having it -- again thinking about the time the DJ is expending carrying out this task, but you need to articulate and justify it. Does the whole team think this is valuable and worth spending time on? What are you trying to optimize for? Is it about saving the DJ time? Making sure data is consistent? Reducing typos? Helping the DJ figure out which album something comes from? All of these are valid and not all of them suggest the same design.

### Agility/scrum

I see patterns of what appears to be regular commits and progress. I don't see any scoring on features, and issue #8 isn't even a todo item, it is background documentation (I'm glad to see it, but it should be linked to by the backlog items that need it rather than a todo list item that has been checked off). I don't see any system in place for individual developers to claim a particular item, nor any representation of what is "in-flight" as it were. I suggest adding a column to the board to represent "working" and making use of the 'Assignees' feature of issues.

### Integration

I see some reasonable use of pull requests. Myles and Brendan are perhaps overrepresented, however, and it would be good to get some other eyes in there. I also see one pull request that was accepted and closed despite Travis reporting an error. Watch out for that, Travis reported that the branch was fine but that there was an issue with the merge to main. The merge error is far more critical since you could presumably know ahead of time that the branch was passing tests.

### Implementation

The implementation largely seems fine.

As I wrote in Slack, I see that you have included the API key in the code. This is a big no no. It will now be very difficult to purge, but you should at least remove it from the head of your repository ASAP. The correct way to handle this is through [environment variables](https://nextjs.org/docs/basic-features/environment-variables). These go in a file that you exclude from github. When you deploy, you can use the config variables we used in the DB practical to communicate the variables on heroku.

I see that you have the default image hard coded into the `Song` component. This is fine, but it would be better if you pointed to a local image that you could change rather than a link to a specific (and non-default) image stored in `public`. This is a minor thing, but this is a little piece of technical debt that you will eventually have to address.

Now that the trivial bits are out of the way, I'd like to talk about `SearchBar` a little bit. There are a couple of issues in that will hold you back from making the best app that you can.

One thing to clean up would be the inclusion of the `getData` functions. We wrote these for our earlier `fetch` calls purely because we needed to add the functionality inside of a `useEffect`, which we could not make asynchronous. The helper function which are triggered by the user interaction do not have this restriction. In truth, you have already made them `async`. So, I would urge you to get rid of these extra wrapper functions, they are just making the flow of your application more difficult to reason about.

Similarly, there should not be a `song` state. The component doesn't need to remember it. At the moment, rather than just calling the `callback` when you know the value, you save it to state, and then use a `useEffect` to call the callback for you. This causes extra re-renders and again, makes it more difficult to reason about the flow of your application.

I think some more thought can be applied to how you use the lastfm API as well. Currently, I'm not entirely sure why you are making the second query that gets the track information. Are you trying to clean the data a little? In that case it might make sense to use `track.getCorrection`. It is a pity that the API doesn't support figuring out the album based on the track. You might be able to get there with some effort and a bunch of searches, but I guess you can assume that the DJ knows were the track just came from.

Of course the big missing piece here is the tests, in that there aren't any. Make sure that in the next sprint you get closer to practicing TDD.
