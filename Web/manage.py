import datetime as dt
import os
import subprocess as sp
import sys


def update(file):
    file.seek(0)
    file.write(str(dt.date.today()))
    file.truncate()
    print("\nUpdating...")
    sp.Popen('npm update & npx browserslist@latest --update-db & npm audit fix',
             shell=True).wait()


def main():
    if sys.argv[1] != 'runserver':
        args = ' '.join([str(elem) for elem in sys.argv[1:]])
        return sp.Popen(f'python3.8 main.py {args}', shell=True).wait()

    if 'RDS_HOSTNAME' in os.environ:
        sp.Popen('npm run build', shell=True)
    else:
        try:
            with open('last_update.txt', 'r+') as f:
                if dt.datetime.strptime(f.readline(), '%Y-%m-%d').date() + dt.timedelta(days=30) <= dt.date.today():
                    update(f)
        except FileNotFoundError:
            with open('last_update.txt', 'a') as f:
                update(f)

        sp.Popen('npm run dev', shell=True)
        sp.Popen('python main.py migrate --noinput', shell=True).wait()
        sp.Popen('python main.py collectstatic -c --noinput', shell=True).wait()

    sp.Popen('python ImageGenerator/ImageGenerator.py', shell=True)
    sp.Popen('python RequestHandler/RequestHandler.py', shell=True)
    return sp.Popen('python main.py runserver', shell=True).wait()


if __name__ == '__main__':
    main()
