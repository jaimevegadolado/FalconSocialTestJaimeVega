                                          Falcon Social Test 
                                          
                                              JaimeVega
                                        
                                      =========================
                                      
---------------------   

Step1: Download as ZIP

Step2:UNZIP the file

Step 3: Open the terminal

Step 4: Access the folder of the unzipped project

Step 5: Start an HHTP Server for instance on port 8000 : python -m SimpleHTTPServer 8000

Step 6: Open the browser with url: http://localhost:8000/
   
-----------------


In this test I have been told to use Knockout.js and D3.js to play with some data saved in json files. 

I have used the big ability of Knockout.js: the mapping, in order to update data automatically whenever the 
observable properties change.

I have retrieved the json data trough an ajax request  using a callback function knowing when the request has finished.

I have used tables to display the data:

In the Organization Table it can be seen the "id" (as a button) and the name of the Organization.

When you click on the id button you are able to see the users that belong to that organization.

You can see the number of organizations that you have in total and when you click you can see the number of users in each organization

You can add, delete and edit organizations and users.

When you add one user with the same id as one existing organization, it is going to be added to the listed of users of the organization.



Then it is shown three graphs made in d3.js taking the data of the usage.json,zendesk_tickets.json and error_percentage.json.

The "x" axis uses the data of the time displaying in format Day-Month(%d-%B) and the "y" axis for the first two have 
the variable count of the json file used in both. On the other hand I used a percentage format y axis to display 
the percentage error for the third one.



The project is structured as:
- a main index.html file with the html code considering the data bindings used with knockout.js
and indexing the files used for the project.

- data folder with all the json files

- styles folder with the css files 

- js folder with the javascript files

- image file with the image icon


As I am using ajax requests I had to test my project using a simple HTTP server: python -m SimpleHTTPServer 8000

and accesing it on the browser using the url:  http://localhost:8000/







