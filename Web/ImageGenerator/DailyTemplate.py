from PIL import ImageFont

from BasicTemplate import BasicTemplate, parse
from BasicTemplate import fontPath


# height, width are set by class.
class DailyTemplate(BasicTemplate):

    # constructor
    def __init__(self, data):
        super().__init__(data)  # inherit functions and variables
        self._content = parse(data.get('message'))  # only one that needs work

    # create the image out of the data
    def generateImage(self):
        # font = self._font
        draw = self._draw

        super().drawHeader()

        # Draw Content.
        font = ImageFont.truetype(fontPath, 22)
        k = 0

        for i in range(2):

            for j in range(9):
                draw.text((420 + (i * 180), 185 + (j * 60)), self._content[k], font=font, fill='black', align='left')
                k += 1

        # Draw the grid
        # vertical lines
        for i in range(3):
            draw.line((410 + (i * 180), 170, 410 + (i * 180), 710), fill='black')

        # horizontal lines
        for j in range(10):
            draw.line((410, 170 + (j * 60), 770, 170 + (j * 60)), fill='black')

        self._image = self._image.convert('L')  # grayscale setting
        return self._image
