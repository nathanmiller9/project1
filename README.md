# Project - {Mixtape}

## Collaborators
- Yoon Lee
- Nathan Miller
- Allan Salandanan 

## Live Link 
 - https://nathanmiller9.github.io/project1/

## Description
 - A modern day mixtape maker which enables users to create mixtapes and pair them with pictures, videos, or text for somebody meaningful to them. 

## Requirements
- Must uses at least two APIs
- Must use AJAX to pull data
- Must utilize at least one new library or technology that we haven’t discussed
- Must have a polished frontend / UI
- Must meet good quality coding standards (indentation, scoping, naming)
- Must NOT use alerts, confirms, or prompts (look into modals!)
- Must have some sort of repeating element (table, columns, etc)
- Must use Bootstrap or Alternative CSS Framework
- Must be Deployed (Heroku or Firebase)
- Must have User Input Validation
- Utilize Firebase for Persistent Data Storage (Consider this basically a requirement).
- Mobile Responsive

## Technologies Used
- jQuery for DOM manipulation
- AJAX for API GET requests
- Bootstrap
- HTML/CSS
- Firebase
- YouTube API
- Giphy API

## Code Explanation
- User enters search queries to add songs onto the mixtape (YouTube API), which then loads the first result in an iFrame player
- Result is pushed up onto Firebase as a song object, saving pertinent information which will be retrieved later
- Event listeners dynamically add songs and any user-added notes to the UI
- Ability to add notes, GIFs from Giphy, and external images through separate buttons
- Modals will then pop up for adding GIFs and external images
