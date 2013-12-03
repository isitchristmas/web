import time
from fabric.api import run, execute, env

environment = "production"

env.use_ssh_config = True
env.hosts = ["christmas"]

branch = "master"
repo = "git@github.com:isitchristmas/web.git"

username = "christmas"
home = "/home/christmas/web"
logs = "/home/christmas/log"
shared_path = "%s/shared" % home
version_path = "%s/versions/%s" % (home, time.strftime("%Y%m%d%H%M%S"))
current_path = "%s/current" % home


# can be run only as part of deploy

def checkout():
  run('git clone -q -b %s %s %s' % (branch, repo, version_path))

def links():
  run("ln -s %s/config.js %s/config.js" % (shared_path, version_path))
  run("ln -s %s/countries.dat %s/data/countries.dat" % (shared_path, version_path))

def make_current():
  # run('rm -f %s && ln -s %s %s' % (current_path, version_path, current_path))
  run('rm -rf %s && cp -r %s %s' % (current_path, version_path, current_path))

def prune_releases():
  pass


## can be run on their own

def start():
  run("cd %s && NODE_ENV=%s forever -l %s/forever.log -a start app.js" % (current_path, environment, logs))

def stop():
  run("forever stop app.js")

def restart():
  run("forever restart app.js")

def deploy():
  execute(checkout)
  execute(links)
  execute(make_current)
  execute(stop)
  execute(start)
