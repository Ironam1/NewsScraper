# NewsScraper

This application is hosted on Heroku and can be found here: https://news-scraper-am1.herokuapp.com/


The problem:

Scrape articles from NPR and save to a database. Once saved, users can attach notes to each article and save them in a separate database.

Solution:

This is a full stack application to demonstrate a CRUD API. I chose express for routing and Mongoose for my database. I used Cheerio to scrape data from the NPR website. This application uses Handlebars to render the HTML page.

When the application loads, the user will see titles for articles that have been scraped already, links to the articles and a button to add a note . If the user wants to see new articles, they can click the button provided. If no new articles appear, they may have already been scraped that day. No duplicate articles will be saved to the database.

If the user wants to attach a note, they can click the "add note" button to display the note form. User can write a headline and body for their note and save with the provided button.

