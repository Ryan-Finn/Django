# The request handler api is used to handle the requests from the device. It communicates with the webserver and is
# the first point of contact of the device. It sets up the device by changing the isSetup flag.

import requests
from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)


# handle a request sent from the device which contains data in json format.
class RequestHandler(Resource):

    # handle get requests from the device
    def get(self):
        return {'status': 'get currently not implemented, use a post request'}

    # handle post requests from the device
    def post(self):

        # parsing block
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True, help='Please provide an image id.')
        parser.add_argument('isSetup', type=str, required=True,
                            help='Please provide a boolean stating if the board has been setup.')
        requestData = parser.parse_args()

        if requestData.isSetup.lower() == 'true':
            link = self.createLink(requestData.get('id'))
            reqToApp = requests.get("http://127.0.0.1:8000/api/boardinfo/" + str(requestData.get('id')))
            # reqToApp = requests.get("http://digitaldooorsigns.herokuapp.com/api/boardinfo/" + str(requestData.get(
            # 'id')))
            response = reqToApp.json()
            response['isSetup'] = 'true'  # append this information so that form is the same in both parts.
            response['link'] = link

            # return the json response object.
            return response
        else:
            # compose a post request to the digital_door_api
            reqToApp = requests.post("http://127.0.0.1:8000/api/boardinfo/",
                                     json={'isSetup': requestData.get('isSetup')})
            # reqToApp = requests.post("http://digitaldooorsigns.herokuapp.com/api/boardinfo/", json={'isSetup':
            # requestData.get('isSetup')})
            response = reqToApp.json()
            response['isSetup'] = 'true'  # the board has now been setup.
            response['link'] = self.createLink(
                response.get('id'))  # append the image link to the json response from the webapp.

            return response
            # test using this: http://127.0.0.1:5001/handler?id=10&isSetup=false

    # helper function to create a link to the image
    def createLink(self, id) -> str:
        return "http://127.0.0.1:5000/image?id=" + str(id)
        # return "http://ddsimagegen.herokuapp.com/image?id=" + str(id)


# add the endpoint for the image generator
api.add_resource(RequestHandler, '/handler')

if __name__ == "__main__":
    app.run(port=5001)
