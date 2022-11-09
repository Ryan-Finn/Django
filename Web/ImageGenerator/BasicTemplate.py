# This is the basic parent class that is used to generate images. It has functions that are used by all the other
# classes. The header function is written once here and  used by all the children classes. The fontpath is also set
# here. Fontpath can be finicky when used in deployment. The production branch has all the necessary changes that
# are needed to deploy the app.


from PIL import Image, ImageDraw, ImageFont

fontPath = 'arial.ttf'


# height, width are set by class.
def parse(message):
    # print(message)
    if message is None:
        return "No Message"

    message = message.split(';')
    print(message)
    return message


class BasicTemplate:
    # constructor
    def __init__(self, data):
        self._width = 1200
        self._height = 825
        self._id = data.get('id')
        self._connected = data.get('connection') or 'N/A'
        self._addedAt = data.get('added_at')[:10] or 'N/A'
        self._battery = data.get('battery_status') or 'N/A'
        self._displayMessage = data.get('message')
        self._roomName = data.get('room_name') or 'N/A'
        self._refreshRate = data.get('refresh_rate') or 'N/A'

        # setup image variables
        self._image = Image.new('RGB', (self._width, self._height), color='white')
        self._draw = ImageDraw.Draw(self._image)
        self._font = ImageFont.truetype(fontPath, 40)

    # create the image out of the data
    def generateImage(self):
        font = self._font  # convenience

        # draw image header
        self.drawHeader()

        w, h = self._draw.textsize(self._displayMessage, font=font)
        self._draw.text(((self._width - w) / 2, (self._height - h) / 2), self._displayMessage, font=font, fill='black',
                        align='center')

        self._image = self._image.convert('L')  # grayscale setting
        return self._image

    def drawHeader(self):
        font = ImageFont.truetype(fontPath, 25)
        self._draw.text((10, 10), 'ID: ' + str(self._id), font=font, fill='black', align='left')
        self._draw.text((10, 50), 'Connected: ' + self._connected, font=font, fill='black', align='left')
        self._draw.text((10, 90), 'Added At: ' + self._addedAt, font=font, fill='black', align='left')

        w, h = self._draw.textsize(self._roomName, font=font)  # get the size of the text
        self._draw.text(((self._width - w) / 2, 10), self._roomName, font=font, fill='black', align='center')
        self._draw.text((self._width - 165, 10), 'Battery: ' + str(self._battery), font=font, fill='black',
                        align='left')
        self._draw.text((self._width - 250, 50), 'Refresh Rate: ' + str(int(self._refreshRate / 60)) + ' min',
                        font=font, fill='black', align='left')

    def getFileName(self):
        return str(self._id) + '.jpg'
