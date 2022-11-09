from flask import Flask, send_file
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class ImageTest(Resource):
    def get(self):
        if self:
            pass
        return send_file('test.jpg', mimetype='image/jpeg')


api.add_resource(ImageTest, '/image')

if __name__ == "__main__":
    app.run()
