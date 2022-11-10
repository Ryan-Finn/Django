import datetime as dt
import subprocess as sp


def update(file):
    file.seek(0)
    file.write(str(dt.date.today()))
    file.truncate()
    print("\nUpdating...")
    sp.Popen('npm update & npx browserslist@latest --update-db & npm install --save-dev webpack & npm audit fix',
             shell=True).wait()


def main():
    try:
        with open('last_update.txt', 'r+') as f:
            if dt.datetime.strptime(f.readline(), '%Y-%m-%d').date() + dt.timedelta(days=30) <= dt.date.today():
                update(f)
    except FileNotFoundError:
        with open('last_update.txt', 'a') as f:
            update(f)

    return sp.Popen('eb deploy & eb status & eb open', shell=True).wait()


if __name__ == '__main__':
    main()
