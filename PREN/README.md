# WebApp
This is the web application for the Digital Doors Senior Design Project. It consists of the Django Web app as well as the ImageGenerator API.

### Django Web Application:
This is the main landing website for the digital door signs project. A user can interact with the different boards, add a board, delete and change the message displayed on a board.

### ImageGenerator API:
This is the application that communicates with the database api of the web app and creates the image that is then served to the devices. The device triggers this process by sending a get request to the ImageGenerator API.

### RequestHandler API:
This API allows communication between the device and the web app by sending a json object to the device which sets up its fields appropriately. It also allows device setup. 


## Running the project:
In base directory, web, start up the application
> python run.py
