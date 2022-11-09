# This is the main Image Generation api. It communicates with the database and generates the images. It uses the
# template classes to create the appropriate images.

from io import BytesIO

import requests
from PIL import ImageOps
from flask import Flask, send_file
from flask_restful import Resource, Api, reqparse

from BasicTemplate import BasicTemplate
from DailyTemplate import DailyTemplate
from WeekTemplate import WeekTemplate

app = Flask(__name__)
api = Api(app)


# sample request: http://127.0.0.1:5000/image?id=1


# helper function to convert the image into a byte stream and send it to the device
def serveImage(image):
    img = BytesIO()
    image.save(img, 'BMP', quality=20, optimize=True)

    img.seek(0)
    return send_file(img, mimetype='image/bmp')


# Function to check valid image types
def isValid(board_type):
    return board_type == 'basic' or board_type == 'week' or board_type == 'daily'


class ImageGenerator(Resource):
    # handle get requests from the device
    def get(self):
        if self:
            pass
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True, help='Please provide an image id.')
        parser.add_argument('mirror', type=str, required=False)

        # this is the data sent in with the request
        requestData = parser.parse_args()

        # get json data from the digital_door_api
        boardData = requests.get("http://127.0.0.1:8000/api/boardinfo/" + str(requestData.get('id'))).json()
        # boardData = requests.get("http://digitaldoorsigns.herokuapp.com/api/boardinfo/" + str(requestData.get(
        # 'id'))).json()
        print(boardData)
        board_type = boardData.get('type')

        if isValid(board_type):
            template = DailyTemplate(boardData)
            if board_type == 'basic':
                template = BasicTemplate(boardData)
            elif board_type == 'week':
                template = WeekTemplate(boardData)

            image = template.generateImage()
            if requestData.get('mirror') == 'true':
                image = ImageOps.mirror(image)
            return serveImage(image)
        else:
            return {'status': 'please provide a basic image type'}

    # handle post requests from the device
    def post(self):
        if self:
            pass
        return {'status': 'post hasnt been implemented, please use a get request'}


# add the endpoint for the image generator
api.add_resource(ImageGenerator, '/image')

if __name__ == "__main__":
    app.run()
