# NewsScraper

This application is hosted on Heroku and can be found here: https://news-scraper-am1.herokuapp.com/


The problem:

Scrape articles from NPR and save to a database. Once saved, users can attach notes to each article and save them in a separate database.

Solution:

This is a full stack application to demonstrate a CRUD API. I chose express for routing and Mongoose for my database. I used Cheerio to scrape data from the NPR website. This application uses Handlebars to render the HTML page.

When the application loads, the user will see titles for articles that have been scraped already, links to the articles and a button to add a note . If the user wants to see new articles, they can click the button provided. If no new articles appear, they may have already been scraped that day. No duplicate articles will be saved to the database.

If the user wants to attach a note, they can click the "add note" button to display the note form. User can write a headline and body for their note and save with the provided button. 

----------

![Screen Shot 2019-11-09 at 12 16 59 PM](https://user-images.githubusercontent.com/48491411/68536525-65ce1f00-0322-11ea-9c7f-9aa37b643c87.png)

---------

![Screen Shot 2019-11-09 at 6 51 21 PM](https://user-images.githubusercontent.com/48491411/68536526-6c5c9680-0322-11ea-8e70-eab756ae4678.png)

---------

![Screen Shot 2019-11-09 at 6 53 58 PM](https://user-images.githubusercontent.com/48491411/68536527-6f578700-0322-11ea-9d85-ee7943aafdd1.png)

----------

![Screen Shot 2019-11-09 at 6 53 18 PM](https://user-images.githubusercontent.com/48491411/68536529-71b9e100-0322-11ea-9a0d-117b0572973b.png)