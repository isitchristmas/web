import time
from fabric import Connection, task

environment = "production"
host = "christmas"

conn = Connection(host, connect_kwargs={"disabled_algorithms": {'pubkeys': ['rsa-sha2-256', 'rsa-sha2-512']}})

branch = "master"
repo = "git@github.com:isitchristmas/web.git"

username = "christmas"
home = "/home/christmas/web"
logs = "/home/christmas/data/log"
shared_path = "%s/shared" % home
versions_path = "%s/versions" % home
version_path = "%s/versions/%s" % (home, time.strftime("%Y%m%d%H%M%S"))
current_path = "%s/current" % home

# how many old releases to be kept at deploy-time
keep = 5

# can be run only as part of deploy

def checkout():
  run('git clone -q -b %s %s %s' % (branch, repo, version_path))

def links():
  run("ln -s %s/config.js %s/config.js" % (shared_path, version_path))
  # run("ln -s %s/countries.dat %s/data/countries.dat" % (shared_path, version_path))
  # hacky but it's how geoip-lite works - needs to have data inside its own dir
  run("rm -rf %s/node_modules/geoip-lite/data" % version_path)
  run("ln -s %s/data %s/node_modules/geoip-lite/data" % (shared_path, version_path))

def make_current():
  # run('rm -f %s && ln -s %s %s' % (current_path, version_path, current_path))
  run('rm -rf %s && cp -r %s %s' % (current_path, version_path, current_path))

def dependencies():
  run("cd %s && npm install" % version_path)

def cleanup():
  versions = run("ls -x %s" % versions_path).split()
  # destroy all but the most recent X
  destroy = versions[:-keep]

  for version in destroy:
    command = "rm -rf %s/%s" % (versions_path, version)
    run(command)


## can be run on their own

def test():
  conn.run("ls -a $HOME")


def start():
  # run("cd %s && NODE_ENV=%s forever -l %s/forever.log -a start app.js -p 2000" % (current_path, environment, logs))
  conn.run("cd %s && NODE_ENV=%s forever -l %s/forever.log -a start app.js -p 2000 && NODE_ENV=%s forever -l %s/forever.log -a start app.js -p 2001" % (current_path, environment, logs, environment, logs))


def stop():
  # run("forever stop app.js -p 2000")
  # run("forever stop app.js -p 2000 && forever stop app.js -p 2001")
  conn.run("forever stopall")

def restart():
  # run("forever restart app.js -p 2000")
  # run("forever restart app.js -p 2000 && forever restart app.js -p 2001")
  conn.run("forever restartall")


def deploy():
  checkout()
  dependencies()
  # links screws with dependencies, needs to come after
  links()
  make_current()
  stop()
  start()
  cleanup()

def deploy_cold():
  checkout()
  dependencies()
  # links screws with dependencies, needs to come after
  links()
  make_current()
  start()


# Finally got it upgraded to fabric 3, but paramiko and older versions of openssh server (which I have...)
# don't get along and the disabled_algorithms flag above needs to be present for all connections.
# The CLI interface in fabric3 is, by design, no longer the primary way to use the tool and it doesn't appear
# to be obvious how to customize the connection passed in to operate a task. (The object passed into a @task is
# a Context, based on the Invoke library's Context, not a Connection. Maybe it is possible, I just can't tell.)

# So, modify this to be what we need, then just execute this script with `python fabfile.py` instead of using `fab`.
deploy()
