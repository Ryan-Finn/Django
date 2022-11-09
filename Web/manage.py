import os
import datetime as dt
import subprocess as sp


def update(file):
    file.seek(0)
    file.write(str(dt.date.today()))
    file.truncate()
    print("\nUpdating...")
    sp.Popen('npm update & npx browserslist@latest --update-db & npm install --save-dev webpack & npm audit fix',
             shell=True).wait()


if __name__ == '__main__':
    if 'RDS_HOSTNAME' not in os.environ:
        try:
            with open('last_update.txt', 'r+') as f:
                if dt.datetime.strptime(f.readline(), '%Y-%m-%d').date() + dt.timedelta(days=30) <= dt.date.today():
                    update(f)
        except FileNotFoundError:
            with open('last_update.txt', 'a') as f:
                update(f)

        sp.Popen('python main.py migrate --noinput', shell=True).wait()
        sp.Popen('python main.py collectstatic --noinput', shell=True).wait()

    sp.Popen('npm run dev', shell=True)
    sp.Popen('python ImageGenerator/ImageGenerator.py', shell=True)
    sp.Popen('python RequestHandler/RequestHandler.py', shell=True)
    sp.Popen('python main.py runserver', shell=True).wait()
